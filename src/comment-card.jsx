import React, { useEffect, useState } from "react";
import Counter from "./Counter";
import  replyimg from'./images/icon-reply.svg';
import  edit from'./images/icon-edit.svg';
import deleteimg from './images/icon-delete.svg';
import data from './data.json';

import { useSelector,useDispatch } from "react-redux";
import { inputevntDispatch,updateStoreComment } from "./comment-slice";
import ReplyBox from './replyBox'


export var idArray=[]
function CardComponent(){
var [datastate,datastatefn]=useState(data);
var [showedit,showEditfn]=useState('')
var [deletedialog,changedelete]=useState(false)
var updatedData=useSelector((state)=>state.commentform);
var updateComment=useSelector((state)=>state.commntCounter);
var decrementComment=useSelector((state)=>state.commntCounter);
var getAppendInputJson=useSelector((state)=>state.inputeditJson);
var getCommentUpdateJson=useSelector((state)=>state.update);
var getReplydata=useSelector((state)=>state.reply);
console.log('getReplydata....',getReplydata);
useEffect(()=>{
    sessionStorage.setItem('data',JSON.stringify(getReplydata));
    datastatefn(getReplydata)
},[getReplydata])
useEffect(()=>{
    sessionStorage.setItem('data',JSON.stringify(getAppendInputJson));
    datastatefn(getAppendInputJson)
},[getAppendInputJson]);
useEffect(()=>{
    sessionStorage.setItem('data',JSON.stringify(getCommentUpdateJson));
    datastatefn(getCommentUpdateJson);
    showEditfn('')

},[getCommentUpdateJson])


// console.log('getAppendInputJson.....',getAppendInputJson);
// console.log(' outside usEffct updateComment...',updateComment);
var evntDispatch=useDispatch()
useEffect(()=>{
    datastatefn(updatedData);
    sessionStorage.setItem('data',JSON.stringify(updatedData))
},[updatedData]);
useEffect(()=>{
    datastatefn(updateComment);
    // console.log('Inside  usEffct updateComment...',updateComment);
    sessionStorage.setItem('data',JSON.stringify(updateComment))
},[updateComment]);
useEffect(()=>{
    datastatefn(decrementComment);
    sessionStorage.setItem('data',JSON.stringify(decrementComment))
},[decrementComment]);
var inputAppend=(e)=>{
    // console.log(e.target.closest('.card-section').getAttribute('id'))
     evntDispatch(inputevntDispatch({type:"append_input",input_id:e.target.closest('.card-section').getAttribute('id')}))
}
var DeleteDialog=(deleteTarget)=>{
    alert('delete called')
    changedelete(deleteTarget);
}
var removeDialog=()=>{
    changedelete('');
}
var deletecmnt=(getId)=>{


var deleteupdatecmt=datastate.comments.filter((value)=> value.id != getId);
var deleteupdate=deleteupdatecmt.map((replyVal)=>{
    if(replyVal.replies.length > 0){
       let filteredArry= replyVal.replies.filter((thisreply)=> thisreply.id != getId);
        return {...replyVal,replies:filteredArry}   
    }
    else{
        return {...replyVal,replies:[]}
    }
})
    datastatefn({...data,comments:deleteupdate});
    sessionStorage.setItem('data',JSON.stringify({...data,comments:deleteupdate}))
    changedelete('');
}
var editfn=(editId)=>{
    console.log(editId)
    showEditfn(editId)
   
}
var updateCmnt=(e,getId)=>{
    console.log('commentworks');
    console.log(e.target.parentElement.closest('.editBox').querySelector('textarea').value);
    let get_content=e.target.parentElement.closest('.editBox').querySelector('textarea').value
    evntDispatch(updateStoreComment({update_id:getId,update_content:get_content}))
}
useEffect(()=>{
    datastatefn(data);
    sessionStorage.setItem('data',JSON.stringify(data))
},[])
    return(
        <>
        
        { datastate!=null && datastate.comments.map(function(val){
            
            if(val != undefined &&  val !== null){
                // console.log('val..',val)
                return(
                     <>
                    <div className="main">
                    <div className="card-parent card-section" id={val.id}>
                        { <Counter jsonData={val} />}
                        <div className="inline-block card-content">
                         <div className="">
                         
                         <span className="image-span">
                        { val.user?.image?<img src={require('./images/users/'+val.user.image.png+'.png')} alt="userd" />:''}
                            </span>
                            <span className="user-name">{val.user.username}</span>
                            <span className="tym-span">{val.createdAt}</span> 
                            {datastate.currentUser.username != val.user.username  && <span className="reply-part cur-pointer" onClick={inputAppend}><img src={replyimg} alt="reply"/><span>Reply</span></span>}
                            {datastate.currentUser.username == val.user.username  && <span className="edit-part cur-pointer" onClick={editfn}><img src={edit} className="" alt="edit"/><span>Edit</span></span>}
                            {datastate.currentUser.username == val.user.username  && <span className="delete-part rmar-10 center" onClick={()=>DeleteDialog(val.id)}><img src={deleteimg} className="rmar-5" alt="edit"/><span>Delete</span></span>}
                         </div>
                            <p>{val.content}</p>
                            
                            {/* {showedit && <ReplyBox prop={{"isChild":'N','parent_id':val.id,'comment_id':val.id,'user':val.user.username}}/>} */}
                        </div>
                        
                        </div>
                        {deletedialog == val.id && <div className="deleteDialog">
                            <div className="dialogParnet">
                            <h3>Delete Comment</h3>
                            <div className="content">
                                <p>Are you sure you want to delete this commnet ? This will remove the content and can't be undone</p>
                            </div>
                            <div className="center">
                                <button className="cancel-btn" onClick={removeDialog}>No,Cancel</button>
                                <button className="delete-confimartion" onClick={()=>deletecmnt(val.id)}>Yes,Delete</button>
                            </div>
                            </div>
                        </div>}
                        {val.isEditActivate == 'Y' && <ReplyBox prop={{"isChild":'N','parent_id':val.id,'comment_id':val.id,'user':val.user.username}}/>}
                       { val.replies.length > 0 && <div className="replyContainer">
                       
                       
                       {val.replies.map(function(reply){
                           // console.log(reply)
                           return(
                               <>
                               <div className="reply-card card-section" id={reply.id} parent_id={val.id}>
                                   { <Counter jsonData={reply}/>}
                                <div className=" card-content">
                                    
                                   <span className="image-span">
                                       <img src={require('./images/users/'+reply.user.image.png+'.png')} alt="userd" />
                                    </span>
                                 <span className="user-name">{reply.user.username}</span>
                                 <span className="tym-span">Just Now</span> 
                               {datastate.currentUser.username != reply.user.username && <span className="reply-part" onClick={inputAppend}><img src={replyimg} alt="reply"/><span>Reply</span></span>}
                               {datastate.currentUser.username == reply.user.username  && <span className="edit-part" onClick={()=>editfn(reply.id)}><img src={edit} className="" alt="edit"/><span>Edit</span></span>}
                               {datastate.currentUser.username == reply.user.username  && <span className="delete-part rmar-10 center"onClick={()=>DeleteDialog(reply.id)}><img src={deleteimg} className="" alt="edit"/><span>Delete</span></span>}
                               { showedit != reply.id && <p><span class="mentionCommenter">@{reply.replyingTo} ,</span>{reply.content}</p>}
                                {showedit == reply.id && <div className="editBox"><textarea defaultValue={reply.content}/>
                                <div><button className="Updatebtn" onClick={(e)=>updateCmnt(e,reply.id)}>Update</button></div>
                                </div>}
                                </div>
                                
                                </div>
                                {deletedialog == reply.id && <div className="deleteDialog">
                           <div className="dialogParnet">
                           <h3>Delete Comment</h3>
                           <div className="content">
                               <p>Are you sure you want to delete this commnet ? This will remove the content and can't be undone</p>
                           </div>
                           <div className="center">
                               <button className="cancel-btn" onClick={removeDialog}>No,Cancel</button>
                               <button className="delete-confimartion" onClick={()=>deletecmnt(reply.id)}>Yes,Delete</button>
                           </div>
                           </div>
                       </div>}
                                {reply.isEditActivate == 'Y' && <ReplyBox prop={{"isChild":'Y','parent_id':val.id,'comment_id':reply.id,'user':reply.user.username}}/>}
                                   
                                
                                </>
                            
                           )
                           
       
                       })
                       
                         } 
                       </div>}
                        
                         </div>
                        </>
        
                )
            }
          
        })}
        </>
        
    )
        
    
    
}
export default CardComponent
//{val.user.image.webp}