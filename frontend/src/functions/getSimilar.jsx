
async function getSimilar(id) {
    response = await fetch(`http://127.0.0.1:8000/items/${id}`);
    data = await response.json();
    return data["similar_items"];
}