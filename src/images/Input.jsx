import React from "react";
import img from '../public/users/image-amyrobson.webp'
import  * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from "./comment-slice";
import initialdata from './data.json';
import {idArray} from "./comment-card";


function InputBox(){
    console.log(idArray)
var createDispatch=useDispatch()
    var schema=Yup.object().shape({
        'thiscommnt':Yup.string().required('this is required')
    })
   var {register,handleSubmit,}=useForm({
    resolver:yupResolver(schema)
   })
   var onsubmit=(data)=>{
    var createJson={
        id:"",
        content:data.thiscommnt,
        user:initialdata.currentUser,
        replies:[],
        score:0

    }
    alert('j')
    console.log(data);
    createDispatch(updateComment(createJson))
   }
   var submitthis=()=>{
    return  handleSubmit(onsubmit)()
   
   }
    return (
        <>
        <div className="comment-upload">
            <span className="commentUserImage">
                <img src={img} alt="user-img"/>
            </span>
            <textarea {...register('thiscommnt')}>
                </textarea>
                <button className="commentSendBtn" onClick={submitthis}>SEND</button>
         </div>
            </>
    )
}
export default InputBox