from typing import Union
from fastapi import FastAPI
import joblib
import pandas as pd
from get_poster import fetch_poster, fetch_details
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv(".env")

api_key: str = os.getenv("API_KEY")
api_token: str = os.getenv("API_TOKEN")

origins = [
    "http://localhost:5173",
]



model = joblib.load("cosine_sim.joblib") 
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df_movies = pd.read_csv("./data/tmdb_5000_movies.csv")

@app.get("/")
def read_root() -> Union[str, dict]:
    return {"Hello": "World"}

@app.get("/items/{id}")
def read_item(id: int) :
    item_id = int(df_movies[df_movies['id'] == id].index[0])
    sim_scores = list(enumerate(model[item_id]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    ids = []
    for x,y in sim_scores:
        id = df_movies.iloc[x]['id']
        ids.append(int(id))
    return {"similar_items": ids}  

@app.get("/movie_list")
def read_movie_list() -> dict:
    print("movie_list")
    return {"movie_list": df_movies['title'].tolist()} 

@app.get("/get_id/{name}")
def get_id(name: str) -> dict:
    item_id: int = int(df_movies[df_movies['title'] == name]['id'])
    return {"id": item_id}