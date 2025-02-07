import { createSlice } from '@reduxjs/toolkit';
import data from './data.json';
import { act } from 'react';
import { jsx } from 'react/jsx-runtime';
// let localdata=localStorage.getItem('data');
// console.log(localdata);
// console.log(JSON.parse(localdata))

  var init_data=data
var slice=createSlice({
    name:'commentform',
    initialState:data,
    reducers:{
        updateComment:(state,action)=>{
            var updatedData=JSON.parse(sessionStorage.getItem('data')) || data
            // console.log(action.payload);
            // console.log(JSON.parse(JSON.stringify(state)));
            var idArray=[];
            init_data=  JSON.parse(JSON.stringify(state));
              state.comments.map((val)=>{   
                idArray.push(val.id);
                if(val.replies.length > 0){
                    val.replies.map((replyId)=>{
                        idArray.push(replyId.id);
                    })
                }
                // console.log(JSON.parse(JSON.stringify(idArray)));
                 return idArray
            });
            // console.log(JSON.parse(JSON.stringify(idArray)));
            action.payload.id=Math.max(...idArray) + 1
            return {
              ...updatedData,
              comments:[...updatedData.comments,action.payload]
            };
    }
}
})
const commentSlice = createSlice({
    name: 'commentCounter',
    initialState:JSON.parse(sessionStorage.getItem('data')), // Assuming data is an array of comment objects
    reducers: {
      counterEventIncrement: (state, action) => {
    //   console.log("Current State:", JSON.parse(JSON.stringify(state)));
      const updatedState = JSON.parse(sessionStorage.getItem('data')) || state;
          return{
            ...state,
            comments:updatedState.comments.map((item)=>{
                if(item.id == action.payload.id_req){
                    // console.log('prentmatched',JSON.parse(JSON.stringify(item)));
                    return {
                        ...item,
                        score: Number(item.score) + 1
                      };
                }
                else if(item.replies.length){
                    // console.log('item',JSON.parse(JSON.stringify(item)));
                    var changedVal=item.replies.map((val,idx)=>{
                        if(val.id == action.payload.id_req){
                            // console.log("rplymatched:", JSON.parse(JSON.stringify(val)))
                            return{
                               
                                ...val,score:Number(val.score)+ 1
                            }
                        }
                        return  val 
                    });
                    // console.log('returned Val...',JSON.parse(JSON.stringify(changedVal)));
                    return {...item,replies:changedVal}
                }
                // console.log('itemlast',JSON.parse(JSON.stringify(item)))
                return item
            })
             
          }
      },
      counterDecrement:(state,action)=>{
        // console.log(action.payload);
        // console.log(JSON.parse(JSON.stringify(state)));
        const updatedState = JSON.parse(sessionStorage.getItem('data')) || state;
        return {
            ...state,
            comments:updatedState.comments.map((cmtval,idx)=>{
                if(cmtval.id == action.payload.id_req){
                    return{
                        ...cmtval,score:Number(cmtval.score)-1
                    }
                    
                }
                else if(cmtval.replies){
                    var decrementedVal=cmtval.replies.map((repliedVal,idx)=>{
                        if(repliedVal.id == action.payload.id_req){
                            return{
                                ...repliedVal,score:Number(repliedVal.score) -1
                            }
                        }
                        return repliedVal

                    })
                        return {...cmtval,replies:decrementedVal}
                }
                return cmtval
            })
        }

      }
    }
  });


const appendInput=createSlice({
    name:'inputeditJson',
    initialState:data,
    reducers:{
        inputevntDispatch:(state,action)=>{
            // console.log(action.payload.input_id);
            var updatedInputComment= (JSON.parse(sessionStorage.getItem('data'))) || data
            // console.log(updatedInputComment);
            return ({
                ...state,
                comments:updatedInputComment.comments.map((thisVal)=>{
                    if(thisVal.id == action.payload.input_id){
                       
                        return{
                            ...thisVal,
                            isEditActivate:'Y'
                        }
                    }
                    else if(thisVal.replies.length > 0){
                        // console.log(JSON.parse(JSON.stringify(thisVal.replies)));
                        var newComments=thisVal.replies.map((val)=>{
                        if(val.id == action.payload.input_id){
                            return{
                                ...val,isEditActivate:"Y"
                            }
                        }
                          return val
                        })
                    //   console.log('eeeee',JSON.parse(JSON.stringify({...thisVal,replies:newComments})))
                       return {
                          ...thisVal,replies:newComments
                       }
                    }
                    return  thisVal
                    
                })
            }  
            )

        },
        
    }
    
});
const commentUpdate=createSlice({
    name:'update',
    initialState:data,
    reducers:{
        updateStoreComment:(state,action)=>{
            console.log(action.payload);
            var getUpdatedData=JSON.parse(sessionStorage.getItem('data'))|| data;
            var updateComments=getUpdatedData.comments.map((value)=>{
                if(value.id == action.payload.update_id){
                    value.content=action.payload.update_content
                }
                else if(value.replies.length > 0){
                    var matched_content=value.replies.map((repliedVal)=>{
                        if(repliedVal.id == action.payload.update_id){
                            repliedVal.content = action.payload.update_content
                        }
                        return repliedVal
                    })
                    return {...value,replies:matched_content}
                }
                return value

            });
            console.log('😶',JSON.parse(JSON.stringify(updateComments)));
           return {
            ...getUpdatedData,
            comments:updateComments
           }
        }
        
        
    }
    
})
const replySection=createSlice({
    name:'reply',
    initialState:data,
    reducers:{
        createReplyBox:(state,action)=>{
            console.log('reply...',action.payload);
            var setId=[];
            var getData=JSON.parse(sessionStorage.getItem('data'));
            console.log('getData1...',getData);
            getData.comments.map((val)=>{
                setId.push(val.id);
                if(val.replies.length > 0){
                    val.replies.map((replyVal)=>{
                        setId.push(replyVal.id);

                    })
                }
            })
           var getValues= getData.comments.map((val)=>{
                
                if(val.id == action.payload.parent_id){
                      action.payload.id = Math.max(...setId)+1;
                      console.log(action.payload.id);
                      val.replies.push(action.payload);
                      if(action.payload.cmntid == val.id){
                        val.isEditActivate ='N'
                    }
                      val.replies.map((function(editVal){
                        if(action.payload.cmntid == editVal.id){
                            editVal.isEditActivate ='N'
                        }

                      }))
                    
                      return val
               }
               return val
            
               
                
            });
            
            return {
            ...getData,comments:getValues
            }
            // console.log('getValues..',JSON.parse(JSON.stringify(getValues)))
 
        },
        cancelPost:(state,action)=>{
            console.log(action.payload.id);
            var updatedData=JSON.parse(sessionStorage.getItem('data')) || data;
            console.log(updatedData);
            var getIseditUpdate=updatedData.comments.map((val)=>{
                if(val.id == action.payload.id){
                    val.isEditActivate='N'
                }
                else if(val.replies.length > 0){
                    val.replies.map((repliedVal)=>{
                        if(repliedVal.id == action.payload.id){
                            repliedVal.isEditActivate='N'
                            
                        }
                    })

                }
                  return val
            });
            console.log('isedot',JSON.parse(JSON.stringify(getIseditUpdate)))
             return {...updatedData,comments:getIseditUpdate}
            



        }
    },
})
  
  // Accessing the state in your component
  
export var {updateComment}=slice.actions;
export var commentReducer=slice.reducer;
export var {counterEventIncrement,counterDecrement}=commentSlice.actions;
export var commnetstoreCounter=commentSlice.reducer;
export var {inputevntDispatch} = appendInput.actions;
export var expInput =appendInput.reducer;
export var replystoreexport=replySection.reducer
export var {createReplyBox}=replySection.actions;
export var {cancelPost}=replySection.actions;
export var commandUpdateToStore=commentUpdate.reducer
export var {updateStoreComment}=commentUpdate.actions;
 
