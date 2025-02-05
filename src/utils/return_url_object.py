from fastapi.responses import FileResponse, JSONResponse
from src.database.models import Images
from config import Config
config = Config()


def return_url_object(image: Images) -> str:
    return (f"https://reed-shop.ru:{config.__getattr__('SERVER_PORT')}/"
            f"public{image.Url}")
