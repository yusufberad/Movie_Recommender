import requests
import json
from dotenv import load_dotenv
import os


load_dotenv("./server/.env")
api_key: str = os.getenv("API_KEY")
api_token: str = os.getenv("API_TOKEN")

headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {api_token}"
}

def fetch_poster(id: int) :
    url = f"https://api.themoviedb.org/3/movie/{id}?language=tr-TR"
    response = requests.get(url, headers=headers)
    response = json.loads(response.text)
    print(response)
    if response.get("Poster") == "N/A":
        return "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
    return f"https://image.tmdb.org/t/p/w500/{response['poster_path']}"
    
fetch_poster(209112)