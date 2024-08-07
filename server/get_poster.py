import requests
import json
from dotenv import load_dotenv
import os

load_dotenv(".env")
api_key: str = os.getenv("API_KEY")
api_token: str = os.getenv("API_TOKEN")

headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {api_token}"
}

def fetch_poster(id: int) -> str:
    url = f"https://api.themoviedb.org/3/movie/{id}?language=tr-TR"
    response = requests.get(url)
    response = json.loads(response.text)
    if response.get("Poster") == "N/A":
        return "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
    return response.get("posters")[1]

def fetch_details(id: int) -> dict:
    url = f"https://api.themoviedb.org/3/movie/{id}?language=tr-TR"
    response = requests.get(url)
    response = json.loads(response.text)
    return response.get("Plot")