import { useState } from "react";
import { useEffect } from "react";
import RecipeItem from "./component/RecipeItem";

const api = "https://dummyjson.com/recipes?select=name,image";
const LIMIT = 20;

function App() {
  const [page, setPage] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [totalRecipe, setTotalRecipe] = useState(null);

  useEffect(() => {
    if (totalRecipe != recipes.length || !totalRecipe) {
      fetchRecipes();
    }
  }, [page]);

  const handleScroll = (e) => {
    let scrollY = window.scrollY;
    const INNER_HEIGHT = window.innerHeight;
    let fullPageHeight = document.documentElement.scrollHeight;

    if (scrollY >= fullPageHeight - INNER_HEIGHT) {
      setPage((prev) => prev + 1);
    }
  };

  const fetchRecipes = async () => {
    try {
      const res = await fetch(api + `&limit=${LIMIT}&skip=${page * LIMIT}`);
      const data = await res.json();

      if (!res.ok) throw new Error("Unable to fetch recipes");

      setRecipes((prev) => [...prev, ...data.recipes]);

      if (!totalRecipe) {
        setTotalRecipe(data.total);
      }
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Recipes</h2>
      <div
        style={{
          maxWidth: "1200px",
          margin: "3rem auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default App;
