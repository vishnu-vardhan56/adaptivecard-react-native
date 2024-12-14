"""
Module for extracting the font features like size and weight
can switch for different implementation to obtain font properties
"""

from typing import Tuple, Dict, List
import statistics
import numpy as np
import cv2
from PIL import Image
from mystique import default_host_configs
from mystique.extract_properties_abstract import AbstractFontSizeAndWeight


def classify_font_weights(design_objects):
    """
    Calculates thresholds using normal distribution from font
    weights of each design_objects to classify and
    returns font weight label accordingly.
    @param design_objects: input design objects dictionary
    @return: design_objects dictionary with weight labelled
    """
    dynamic_thresh = []
    for item in design_objects:
        if item["object"] == "textbox":
            # For debugging purposes
            # print(f"{item['data']}, weight is {item['weight']}")
            dynamic_thresh.append(item["weight"][item["uuid"]])

    if len(set(dynamic_thresh)) > 1:
        std = statistics.pstdev(dynamic_thresh)
        mean = np.mean(dynamic_thresh)
        # Setting threshold limits based on
        # difference between mean and std deviation
        bold_limit = round(mean + std, 2)
        light_limit = round(mean - std, 2)

    else:
        bold_limit = default_host_configs.FONT_WEIGHT_MORPH["bolder"]
        light_limit = default_host_configs.FONT_WEIGHT_MORPH["lighter"]

    for item in design_objects:
        if item["object"] == "textbox":
            if item["weight"][item["uuid"]] < light_limit:
                item["weight"] = "Lighter"
            elif item["weight"][item["uuid"]] >= bold_limit:
                item["weight"] = "Bolder"
            else:
                item["weight"] = "Default"
    return design_objects


class FontPropBoundingBox(AbstractFontSizeAndWeight):
    """
    Class handles extraction of font size and weight using contours
    from pytesseract image to data api
    """

    @staticmethod
    def get_bbox_properties(img_data: Dict) -> Tuple[List, List]:
        """
        Static method to get list of font height and weight
        from the pytesseract image data dictionary
        @param : img_data
        @return : box_height and box_width
        """
        box_height = []
        box_width = []
        n_boxes = len(img_data["level"])
        for i in range(n_boxes):
            if len(img_data["text"][i]) > 1:  # to ignore img with wrong bbox
                (_, _, char_w, char_h) = (
                    img_data["left"][i],
                    img_data["top"][i],
                    img_data["width"][i],
                    img_data["height"][i],
                )
                # h = text_size_processing(img_data['text'][i], h)
                # Approximate character width
                char_w = char_w / len(img_data["text"][i])
                box_height.append(char_h)
                box_width.append(char_w)

        return box_height, box_width

    def get_size(self, image: Image, coords: Tuple, img_data: Dict) -> str:
        """
        Extract the size by taking an average of
        ratio of height of each character to height
        input image using pytesseract

        @param image : input PIL image
        @param coords: list of coordinated from which
                       text and height should be extracted
        @param img_data : input image data from pytesseract
        @return: size
        """
        _, image_height = image.size
        box_height = self.get_bbox_properties(img_data)[0]
        font_size = default_host_configs.FONT_SIZE
        # Handling of unrecognized characters
        if not box_height:
            heights_ratio = font_size["default"]
        else:
            heights = int(np.mean(box_height))
            heights_ratio = round((heights / image_height), 4)

        if font_size["small"] < heights_ratio < font_size["default"]:
            size = "Small"
        elif font_size["default"] < heights_ratio < font_size["medium"]:
            size = "Default"
        elif font_size["medium"] < heights_ratio < font_size["large"]:
            size = "Medium"
        elif font_size["large"] < heights_ratio < font_size["extralarge"]:
            size = "Large"
        elif font_size["extralarge"] < heights_ratio:
            size = "ExtraLarge"
        else:
            size = "Default"

        return size

    # pylint: disable=arguments-differ
    def get_weight(self, image: Image, coords: Tuple, img_data: Dict) -> str:
        """
        Extract the weight by taking an average of
        ratio of width of each character to image width from
        input image using pytesseract

        @param image : input PIL image
        @param coords: list of coordinated from which
                       text and width should be extracted
        @param img_data : input image data from pytesseract
        @return: weight
        """
        image_width, _ = image.size
        # using the box width list that has each character width of input text
        box_width = self.get_bbox_properties(img_data)[1]
        # Handling of unrecognized characters
        if not box_width:
            weights_ratio = default_host_configs.FONT_WEIGHT_BBOX["default"]
        else:
            weights = int(np.mean(box_width))
            weights_ratio = round((weights / image_width), 4)

        return {img_data["uuid"]: weights_ratio}


class FontPropMorph(FontPropBoundingBox):
    """
    Class handles extraction of font weight property
    using morphology operations.
    """

    # pylint: disable=too-many-locals
    def get_weight(self, image: Image, coords: Tuple, img_data: None) -> str:
        """
        Extract the weight of the each words by
        skeletization applying morph operations on
        the input image

        @param image : input PIL image
        @param coords: list of coordinated from which
                       text and height should be extracted
        @return: weight
        """
        cropped_image = image.crop(coords)
        c_img = np.asarray(cropped_image)
        # """
        # if(image_height/image_width) < 1:
        #     y_scale = round((800/image_width), 2)
        #     x_scale = round((500/image_height), 2)
        #     c_img = cv2.resize(c_img, (0, 0), fx=x_scale, fy=y_scale)
        # """
        gray = cv2.cvtColor(c_img, cv2.COLOR_BGR2GRAY)
        # Converting input image to binary format
        _, img = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)
        area_of_img = np.count_nonzero(img)
        # creating an empty skeleton
        skel = np.zeros(img.shape, np.uint8)
        kernel = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))
        # Loop until erosion leads to thinning text in image to singular pixel
        while True:
            morph_open = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)
            temp = cv2.subtract(img, morph_open)
            eroded = cv2.erode(img, kernel)
            skel = cv2.bitwise_or(skel, temp)
            img = eroded.copy()
            # if no white pixels left the image has been completely eroded
            if cv2.countNonZero(img) == 0:
                break
        # length of the lines in text
        area_of_skel = np.sum(skel) / 255
        # width of line = area of the line / length of the line
        thickness = round(area_of_img / area_of_skel, 2)
        return {img_data["uuid"]: thickness}
