import {SET_ALERT , REMOVE_ALERT} from './constant';
import uuid from 'uuid';

export const setAlert=(msg,alertType)=>{
    const id=uuid.v5;
    return (dispatch)=>{
        dispatch({
            type:SET_ALERT,
            payload:{msg,alertType,id}
        });

        setTimeout(()=>dispatch({type:REMOVE_ALERT,payload:id}),2000)

    }
}