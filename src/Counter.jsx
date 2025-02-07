import React from "react";
import add from './images/icon-plus.svg'
import minus from './images/icon-minus.svg'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterEventIncrement,counterDecrement} from "./comment-slice";

function Counter({jsonData}){
    var storedData=useSelector((state)=>state.commentform);
    
    var [getscore,changeScore]=useState(0);
    var thisDispatch=useDispatch();
    var incrementScore=(e)=>{
    var getParent= e.target.parentElement.parentElement;
    var getChangeCommentId=getParent.getAttribute('counterid')
    thisDispatch(counterEventIncrement({type:'increment',id_req:getChangeCommentId,lastState:storedData}))
     

    }
    var decrementScore=(e)=>{
        var getParent= e.target.parentElement.parentElement;
        // console.log(getParenx`t)
        // console.log(getParent.getAttribute('counterid'));
        var getChangeCommentId=getParent.getAttribute('counterid')
        thisDispatch(counterDecrement({"type":"decrement",id_req:getChangeCommentId,lastState:storedData}))
    }
    
    if(jsonData){
        return(
            <div className="inline-block counterparenet" counterid={jsonData.id}>
                <span className="curpointer" onClick={incrementScore} getScore={jsonData.score}>
                    <img src={add} alt="add"/>
                </span>
                <span className="">{jsonData.score}</span>
                <span className="curpointer" onClick={decrementScore} getScore={jsonData.score}>
                <img src={minus} alt="minus"/>
                </span>
            </div>
        )
    }
    
}
export default Counter