"""Module to handle the  returning of debugging images"""

from typing import List, Tuple
import base64
import io

import cv2
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

from mystique.predict_card import PredictCard
from mystique.image_extraction import ImageExtraction
from mystique.utils import plot_results


class Debug:
    """
    Class to handle debugging the pic2card conversion returing set of
       images from diffrent modules.
    """

    def __init__(self, od_model=None):
        """
        Find the card components using Object detection model
        """
        self.od_model = od_model

    # pylint: disable=no-self-use
    def visualize_custom_image_pipeline_objects(
        self,
        image_copy: np.array,
        detected_coords: List[Tuple],
        image: Image,
        image_np: np.array,
    ):
        """
        Visualize the custom image pipeline objects
        @param image_copy: opencv input image
        @param detected_coords: rcnn model's object's coordinates
        @param image: PIL input image
        @param image_np: faster rcnn display image
        """
        image_extraction = ImageExtraction()
        image_extraction.get_image_with_boundary_boxes(
            image=image_copy,
            detected_coords=detected_coords,
            pil_image=image,
            faster_rcnn_image=image_np,
        )

    # pylint: disable=no-self-use
    def plot_debug_images(
        self, faster_rcnn_image: np.array, image_pipeline_image: np.array
    ):
        """
        Plots the debugs images and returns the base64 string of the plot

        @param faster_rcnn_image: rcnn model object visualization
        @param image_pipeline_image: custom image pipeline object visualization

        @return: base64 string of the plot
        """
        plt.figure(figsize=(20, 8))
        plt.subplot(1, 2, 1)
        plt.title("RCNN Model Objects")
        plt.imshow(cv2.cvtColor(faster_rcnn_image, cv2.COLOR_BGR2RGB))
        plt.axis("off")
        plt.subplot(1, 2, 2)
        plt.title("Custom Image Pipeline Objects")
        plt.imshow(cv2.cvtColor(image_pipeline_image, cv2.COLOR_BGR2RGB))
        plt.axis("off")
        pic_iobytes = io.BytesIO()
        plt.savefig(pic_iobytes, format="png")
        pic_iobytes.seek(0)

        return base64.b64encode(pic_iobytes.read()).decode()

    def get_boundary_boxes(self, image_np: np.array, image: Image):
        """
        Get the predicted objects and classes from the rcnn model.

        @param image_np: input open cv image
        @param image: PIL image object

        @return: list of boundaries, classes , scores , output dict
        """
        # Extract the design objects from faster rcnn model
        output_dict = self.od_model.get_objects(image_np=image_np, image=image)
        boxes = np.squeeze(output_dict["detection_boxes"])
        classes = np.squeeze(output_dict["detection_classes"]).astype(np.int32)
        scores = np.squeeze(output_dict["detection_scores"])

        return boxes, classes, scores, output_dict

    def main(self, pil_image=None, card_format=None):
        """
        Handles the different components calling and returns the
        predicted card json to the API

        @param image: input image path

        @return: predicted card json
        """
        pil_image = pil_image.convert("RGB")
        image_np = np.asarray(pil_image)
        image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)
        (boxes, classes, scores, output_dict) = self.get_boundary_boxes(
            image_np, pil_image
        )
        predict_card = PredictCard(self.od_model)

        # Custom pipelne
        image_buffer = plot_results(pil_image, classes, scores, boxes)
        # retval, image_buffer = cv2.imencode(".png", image_np)
        image_model_base64_string = base64.b64encode(
            image_buffer.read()
        ).decode()
        # {"image": self.plot_debug_images(image_np, image_copy)}
        debug_output = {"image": image_model_base64_string}
        # generate card from existing workflow
        predict_json = predict_card.generate_card(
            output_dict, pil_image, image_np, card_format
        )
        debug_output.update(predict_json)
        return debug_output
