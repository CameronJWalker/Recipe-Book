import React from "react"
import {Plus} from "react-bootstrap-icons"
import {useContext} from "react"
import {CurrentUser} from "../contexts/CurrentUser"
function Category(props){
    const {currentUser} = useContext(CurrentUser)

    function ListRecipes(props){
        return(
            <div id="RecipeList">
                {props.recipes.length === 0 ? <p id="EmptyMessage">No Recipes</p> : props.recipes.map((r,i) => {
                    return(
                        <a href={`/recipe/${r._id}`} key={i}>
                            <div id="Recipe">
                                <img src={r.image} alt={r.title}/>
                                <p>{r.title}</p>
                            </div>
                        </a>
                    )
                })}
            </div>
        )
    }

    function AddButton(title){
        if(currentUser){
            return(
                <a id="Icon" href={`/recipe/new/${title}`}>
                    <Plus/>
                </a>
            )
        }
    }

    return(
        <div id="Category">
            <h1>{props.title}</h1>
            {AddButton(props.title)}
            
            {ListRecipes(props)}
        </div>
    )
}







export default Category