import requests
import json

def fetch_poster(title: str) -> str:
    url = f"http://www.omdbapi.com/?t={title}&apikey=9774c2f8"
    response = requests.get(url)
    response = json.loads(response.text)
    if response.get("Poster") == "N/A":
        return "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
    return response.get("Poster")