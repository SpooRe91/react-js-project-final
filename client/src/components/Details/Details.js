import { useEffect, useState } from "react";
import { OnwerButtons } from "./OwnerButtons"
import { endpoints } from "../../API/endpoints";
import { getOne } from "../../services/mealService";

export const Details = () => {

    const [meal, setMeal] = useState({});
    const ID = "62b178243cf2539b1d58c442"

    useEffect(() => {
        const mealData = async (endpoint) => {
            const result = await getOne(endpoint);
            console.log(result);
            setMeal(result);
        };
        mealData(endpoints.API_DETAILS(ID));
    }, []);


    return (
        <div className="details">
            <h1 className="meal-name">{meal.name}</h1>
            <a href={meal.image} target="_blank" rel="noreferrer"><img className="meal" src={meal.image}
                alt="" /></a>
            {meal.owner !== undefined && meal.owner !== null
                ? <OnwerButtons meal={meal} />
                : <a className="btn" href="/recipe/browse">Назад</a>
            }
            <article className="recipe-details">
                <label htmlFor="ingredients">Необходими съставки:</label>
                <p className="recipe" name="ingredients"><span>{meal.ingredients}</span></p>
                <label htmlFor="ingredients">Рецепта:</label>
                <p className="recipe" name="ingredients"><span>{meal.fullRecipe}</span></p>
            </article>
        </div>
    );
}