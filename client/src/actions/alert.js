import { SET_ALERT,REMOVE_ALERT } from "./types";
import uuid from 'uuid';

export const setAlert =(msg,alertType) =>{

    return (dispatch)=>{
        const id = uuid.v4();
        dispatch({
            type:SET_ALERT,
            payload:{
                id,
                alertType,
                msg

            }
        });
        setTimeout(()=>{
            dispatch({
                type:REMOVE_ALERT,
                payload:id
            })
        },3000);
    }
}


