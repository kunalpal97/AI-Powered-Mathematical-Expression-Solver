

# from fastapi import APIRouter

# import base64 

# from io import BytesIO

# from apps.calculator.utils import analyze_image

# from schema import ImageData

# from PIL import Image


# router = APIRouter()

# @router.post('/calculate')

# async def run(data : ImageData):
#     image_data = base64.b64decode(data.image.split(',')[1])
#     image_bytes = BytesIO(image_data)
#     image = Image.open(image_bytes)
#     responses = analyze_image(image , dict_of_vars=data.dict_of_vars)
#     data = []

#     for response in responses:
#         data.append(response)
#     print("response in route :" , response) # to test response is there 
#     return {
#         "message" : "Image Processed",
#         "type" : "Success",
#         "data" : data,
#     }


# this is fine ->> okay

from fastapi import APIRouter, HTTPException  # type: ignore
import base64 
from io import BytesIO
from .utils import analyze_image
from schema import ImageData
from PIL import Image
import logging

router = APIRouter()

@router.post('/calculate')
async def run(data: ImageData):
    try:
        # Validate image data
        if not data.image or ',' not in data.image:
            raise HTTPException(status_code=400, detail="Invalid image data")

        # Decode image
        try:
            image_data = base64.b64decode(data.image.split(',')[1])
        except Exception as e:
            logging.error(f"Error decoding image: {e}")
            raise HTTPException(status_code=400, detail="Invalid image encoding")

        # Process image
        try:
            image_bytes = BytesIO(image_data)
            image = Image.open(image_bytes)
        except Exception as e:
            logging.error(f"Error processing image: {e}")
            raise HTTPException(status_code=400, detail="Unable to process image")

        # Analyze image
        try:
            responses = analyze_image(image, dict_of_vars=data.dict_of_vars)
        except Exception as e:
            logging.error(f"Error analyzing image: {e}")
            raise HTTPException(status_code=500, detail="Error analyzing image")

        return {
            "message": "Image Processed",
            "type": "Success",
            "data": responses,
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

