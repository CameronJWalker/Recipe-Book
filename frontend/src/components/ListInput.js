import React from "react"
import {Plus, Dash} from "react-bootstrap-icons"
import {useState} from "react"

function ListInput(props){
    const [inputValue, setInputValue] = useState("")
    return(
        <div className="input-wrap">
            <div className="addform">
                <label>{props.label}</label>
                <div className="list-input-container">
                    {CreateInput(props.formtype, setInputValue,inputValue, props.placeholdertext)}
                    <button className="add-direction-submit-btn" onClick={e =>{
                        AddInputValue(e, props, inputValue, setInputValue)
                    }}>
                        <Plus/>
                    </button>
                </div>
                {CreateList(props)}
            </div>
        </div>
        
    )
}

function CreateInput(formtype, setInputValue, inputValue, placeholdertext){
    if(formtype === "textarea"){
        return(<textarea placeholder={placeholdertext} value = {inputValue} className="add-input" onChange={e => setInputValue(e.target.value)}/>)
    }
    else{
        return(<input placeholder={placeholdertext} value = {inputValue} className="add-input" type={formtype} onChange={e => setInputValue(e.target.value)}/>)
    }
}

function AddInputValue(e, props, inputValue, setInputValue){
    e.preventDefault()
    if(/\S/.test(inputValue)){
        let temp = {...props.data}
        temp[props.field].push(inputValue)
        props.set(temp)
        setInputValue("")
    }
}

function CreateList(props){
    return(
        <ul className="add-ingredient-list">
            {props.data[props.field].map((d, index) => {
                return(
                    <div className="list-list-item-container">
                        <li key={index}>{d}</li>
                        <button className="sub-ingredient-submit-btn" onClick={e => RemoveFromList(props, e, index)}>
                            <Dash/>
                        </button>
                    </div>
                )
            })}
        </ul>
    )
}

function RemoveFromList(props, e, index){
    e.preventDefault()
    let temp = {...props.data}
    temp[props.field].splice(index,1)
    props.set(temp)
}



export default ListInput

