import React from "react";
import CardComponent from "./comment-card";
import InputBox from "./Input";

function ParentLayout(){
    return (
        <div className="container">
            <div className="wrapper">
                   {<CardComponent />}
                   {<InputBox/>}

                
            </div>

        </div>
    )
}
export default ParentLayout