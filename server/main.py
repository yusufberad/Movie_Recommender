from typing import Union
from fastapi import FastAPI
import joblib
import pandas as pd
from get_poster import fetch_poster, fetch_details
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/items/{name}")
def read_item(name: str, q: str = None) -> dict :
    item_id = int(df_movies[df_movies['title'] == name].index[0])
    sim_scores = list(enumerate(model[item_id]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    titles = []
    idxs = []
    for (x, y) in sim_scores:
        poster = fetch_poster(df_movies.iloc[x]['title'])
        titles.append([df_movies.iloc[x]["title"],poster])
        idxs.append(x)
    return {"item_id": item_id, "title": df_movies.iloc[item_id]['title'], "poster": fetch_poster(df_movies.iloc[item_id]['title']), "details":fetch_details(df_movies.iloc[item_id]["title"]), "similar_items": titles}  

@app.get("/movie_list")
def read_movie_list() -> dict:
    print("movie_list")
    return {"movie_list": df_movies['title'].tolist()} 