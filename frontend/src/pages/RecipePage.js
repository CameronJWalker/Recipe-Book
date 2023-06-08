import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import { Dash } from "react-bootstrap-icons"
import {CurrentUser} from '../contexts/CurrentUser'

function RecipePage(){
    const {currentUser} = useContext(CurrentUser)

    const {id} = useParams()

    const [data, setData] = useState()

    useEffect(() => {
        fetch(`/api/recipes/${id}`)
        .then(res => res.json())
        .then(r => {
            setData(r)
        })
    }, []);
    return(
        <>
            <NavBar/>
            <div id="RecipeInfo">
                    <h2>{!data ? "Loading...": data.title}</h2>
                    {!data ? "Loading...": DeleteButton(currentUser)}
                    <p id="Author"> Recipe by {!data ? "Loading...": data.author}</p>
                    <p id="Description">{!data ? "Loading...": data.description}</p>
                    <img src={!data ? "Loading...": data.image} alt={!data ? "Loading...": data.title}/>
                    {!data ? "Loading...": ListIngredients(data.ingredients)}
                    {!data ? "Loading...": ListEquipment(data.equipment)}
                    {!data ? "Loading...": ListInstructions(data.instructions)}
            </div>
        </>
    )

    function HandleDelete(){
        fetch(`/api/recipes/${id}/delete`,{
            method: "POST"
        })
        window.location.href = "/";
    }

    function DeleteButton(){
        if(currentUser && currentUser.username == data.author){
            return(
                <button id="IconButton" onClick={HandleDelete}>
                    <Dash/>
                </button>
            )
        }
    }
    
    function ListIngredients(ingredients){
        return(
            <div id="List">
                <h3>Ingredients</h3>
                <ul>
                    {ingredients.map((i,index )=> {
                        return (<p key={index}>{i}</p>)
                    })}
                </ul>
            </div>
            
        )
    }
    
    function ListEquipment(equipment){
        return(
            <div id="List">
                <h3>Equipment</h3>
                    {equipment.map((e,index) => {
                        return (<p key={index}>{e}</p>)
                    })}
            </div>
        )
    }
    
    
    function ListInstructions(instructions){
        let count = 0;
        return(
            <>
                {instructions.map((i, index) => {
                    count++
                    return (
                        <div id="Step" key={index}>
                            <h3>{"Step "+ count}</h3>
                            <p>{i}</p>
                        </div>
                    )
                })}
            </>
        )
    }
}



export default RecipePage