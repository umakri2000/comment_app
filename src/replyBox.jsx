import React from "react";
import data from './data.json'
import { useDispatch,useSelector } from "react-redux";
import {createReplyBox,cancelPost} from'./comment-slice'
 function ReplyBox({prop}){
    console.log('prop....',prop);
    var sendReply=useDispatch();
    var addReply =(e)=>{
        console.log(e.target.parentElement.previousElementSibling.value);
        console.log(e.target);
       
        sendReply(createReplyBox({
                "parent_id":e.target.parentElement.closest('.parentReply').getAttribute('reply_to'),
                'cmntid':e.target.parentElement.closest('.parentReply').getAttribute('commmentid'),
                
                "id": 99,
                "content": e.target.parentElement.previousElementSibling.value,
                "createdAt": "1 week ago",
                "score": 0,
                "replyingTo": e.target.parentElement.closest('.parentReply').getAttribute('user'),
                "isEditActivate":"N",
                "user": {
                  "image": { 
                    "png": "image-juliusomo",
                    "webp": "image-juliusomo"
                  },
                  "username": "juliusomo"
                }
              
        }))

    }
    var cancelReply=(e)=>{
        sendReply(cancelPost({'id':prop.comment_id}))
    }
    return(
        <>
        <div commmentid={prop.comment_id} reply_to={prop.parent_id} user={prop.user} className={`parentReply ${prop.isChild !=undefined && prop.isChild == 'Y' ? 'l-100' : ''}`}>
            <div className="textareaparent">
            <span className="image-span">
                        { data.currentUser?.image?<img src={require('./images/users/'+data.currentUser.image.png+'.png')} alt="userd" />:''}
            </span>
              
                <textarea></textarea>
                <div>
                <button className="send" onClick={addReply}>Send</button>
                <button className="cancel" onClick={cancelReply}>Cancel</button>
                </div>

            </div>
        </div>
        </>
    )
 }
 export default ReplyBox
 //parentReply