"""utils module for the prediction flow"""
import time
import io
import re
import json
import http.client
import urllib
from typing import Optional, Dict, Tuple
import glob
import xml.etree.ElementTree as Et
from contextlib import contextmanager
from importlib import import_module

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from PIL import Image

from mystique import config

# Colro map used for the plotting.
COLORS = [
    [0.000, 0.447, 0.888],
    [0.000, 0.447, 0.741],
    [0.850, 0.325, 0.098],
    [0.929, 0.694, 0.125],
    [0.494, 0.184, 0.556],
    [0.466, 0.674, 0.188],
    [0.301, 0.745, 0.933],
]


@contextmanager
def timeit(name="code-block"):
    """
    Execute the codeblock and measure the time.

    >> with timeit('name') as f:
    >>     # Your code block
    """
    try:
        start = time.time()
        yield
    finally:
        # Execution is over.
        end = time.time() - start
        print(f"Execution block: {name} finishes in : {end} sec.")


def xml_to_csv(labelmg_dir: str) -> pd.DataFrame:
    """
    Maps the xml labels of each object
    to the image file

    @param labelmg_dir: Folder with labelmg exported image and tags.

    @return: xml dataframe
    """
    xml_list = []
    for xml_file in glob.glob(labelmg_dir + "/*.xml"):
        tree = Et.parse(xml_file)
        root = tree.getroot()
        for member in root.findall("object"):
            value = (
                root.find("filename").text,
                int(root.find("size")[0].text),
                int(root.find("size")[1].text),
                member[0].text,
                int(member[4][0].text),
                int(member[4][1].text),
                int(member[4][2].text),
                int(member[4][3].text),
            )
            xml_list.append(value)
    column_name = [
        "filename",
        "width",
        "height",
        "class",
        "xmin",
        "ymin",
        "xmax",
        "ymax",
    ]
    xml_df = pd.DataFrame(xml_list, columns=column_name)

    return xml_df


def id_to_label(label_id: int) -> Optional[str]:
    """Id to label"""
    return config.ID_TO_LABEL.get(label_id)


# pylint: disable=too-many-locals, too-many-arguments
def plot_results(
    pil_img: Image,
    classes: np.array,
    scores: np.array,
    boxes: np.array,
    label_map: Dict = None,
    score_threshold=0.8,
) -> io.BytesIO:
    """
    Generic bounding box plotting, inspired from detr implementation.

    Returns binary representation of the image with bounding box drawn, Use
    `Image.open` to render the image.
    """
    label_map = label_map or config.ID_TO_LABEL
    plt.imshow(pil_img)
    plt.margins(0, 0)
    plt.axis("off")
    ax_ = plt.gca()

    keep = scores >= score_threshold
    scores = scores[keep]
    boxes = boxes[keep]
    classes = classes[keep]

    for cl_id, score, (xmin, ymin, xmax, ymax), col in zip(
        classes, scores, boxes.tolist(), COLORS * 100
    ):

        ax_.add_patch(
            plt.Rectangle(
                (xmin, ymin),
                xmax - xmin,
                ymax - ymin,
                fill=False,
                color=col,
                linewidth=1,
            )
        )
        text = f"{label_map[cl_id]}: {score:0.2f}"
        ax_.text(
            xmin,
            ymin,
            text,
            fontsize=8,
            bbox=dict(facecolor="yellow", alpha=0.5),
        )

    img_buf = io.BytesIO()
    plt.savefig(img_buf, format="png", bbox_inches="tight", pad_inches=0)
    img_buf.seek(0)
    plt.close()
    return img_buf


def load_od_instance():
    """
    Load the object detection instance from class_path
    """
    class_path = config.MODEL_REGISTRY[config.ACTIVE_MODEL_NAME]
    p_split = class_path.split(".")
    module_path, class_name = ".".join(p_split[:-1]), p_split[-1]
    module = import_module(module_path)
    od_obj = getattr(module, class_name)()
    return od_obj


def get_property_method(prop_instance, design_object_name: str):
    """
    Loads the respective method for design object from class_path
    providing plug in functionality.
    @param prop_instance: input Collect properties instance
    @param design_object_name: input name of the design object
    @return: property_method
    """
    class_path = config.PROPERTY_EXTRACTOR_FUNC[design_object_name]
    p_split = class_path.split(".")
    module_path, class_name = ".".join(p_split[:-2]), p_split[-2]
    method_name = p_split[-1]
    if class_name == prop_instance.__class__.__name__:
        property_method = getattr(prop_instance, method_name)
        return property_method
    module = import_module(module_path)
    prop_obj = getattr(module, class_name)()
    property_method = getattr(prop_obj, method_name)
    return property_method


def load_instance_with_class_path(class_path: str):
    """
    Loads an instance of the class using the class path
    @param class_path: input path of the class instantiated
    @return: class_obj instance
    """
    p_split = class_path.split(".")
    module_path, class_name = ".".join(p_split[:-1]), p_split[-1]
    module = import_module(module_path)
    class_obj = getattr(module, class_name)()
    return class_obj


def text_size_processing(text: str, height: int):
    """
    Reduces the extra pixels to normalize the height of text boxes
    @param text: input extraced text from pytesseract
    @param height: input height of the extracted text
    @return: height int
    """
    extra_pixel_char = r"y|g|j|p|q"
    match = re.search(extra_pixel_char, text)
    if match or text[0].isupper():
        height -= 2
    return height


def send_json_payload(
    path: str,
    body: Dict,
    host_port: str,
    method: str = "POST",
    url_params: Optional[Dict] = None,
) -> Dict:
    """
    Send Json payload via http post method.

    @param path: API path, eg; /predict_json
    @param body: Request payload
    @param host_port: Host and port of the api server eg; localhost:5050
    @param method: Http request method.
    """
    headers = {"Content-Type": "application/json"}
    if url_params:
        path += "?" + urllib.parse.urlencode(url_params)
    conn = http.client.HTTPConnection(host_port)
    conn.request(method, path, json.dumps(body), headers)
    response = json.loads(conn.getresponse().read())
    return response


def load_image(image_path: str) -> Tuple[Image.Image, np.array]:
    """
    Image preprocessing and convert to tensor.
    """
    image = Image.open(image_path)
    # width, height = image.size
    image = image.convert("RGB")
    image_np = np.asarray(image)
    return image, image_np
