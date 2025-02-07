import { configureStore } from "@reduxjs/toolkit";
import { commentReducer,commnetstoreCounter,expInput,replystoreexport,commandUpdateToStore } from "./comment-slice";

export const store = configureStore({
    reducer: {
        commentform:commentReducer,
        commntCounter:commnetstoreCounter,
        inputeditJson:expInput,
        reply:replystoreexport,
        update:commandUpdateToStore
                                     // profile is the unique  name  in slice and  userProfile is the exported value
    }
  });