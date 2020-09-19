import axios from "axios";
import {setAlert} from './alert';


import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from './types';


//get current users profile

export const getCurrentProfile= () => {
    return async(dispatch) => {
        try{
            const res= await axios.get('/api/profile/me');
            dispatch({
                type:GET_PROFILE,
                payload:res.data
            })
        } catch(err){
            console.log({err,function:"getCUrrentProfile"});
            if(!err.message)
            dispatch({
                type:PROFILE_ERROR,
                payload: {msg:err.response.statusText, status:err.response.status}
            })
            else
            {
                dispatch(
                    {type:PROFILE_ERROR,
                    payload:{err}}
                )
            }
        }
    }
}

//create or update profile
//w'll use history which will redirect to client side route using push method
export const createProfile =(formData,history,edit=false) => async dispatch => {
    try{
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile',formData,config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        dispatch(setAlert(edit?'Profile Update':'Profile Created',"success"));
        if(!edit){
            history.push('/dashboard');  //we can use Redirect only in component
        }

        
           
    }catch(err){
        console.log({err,function:"createProfile"});
        const errors = err.response.data.error;
           if(errors.length>0){
               errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
               
           }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });

        
    }
}

//ADD EXPERIENCE
//put request

export const addExperience = (formData,history,edit=false) =>{

    return async (dispatch) => {
        try{
            const config ={
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.put('/api/profile/experience',formData,config);
            // dispatch({
            //     type:UPDATE_PROFILE,
            //     payload:res.data
            // });
            console.log("/experience")
            dispatch(getCurrentProfile());
            dispatch(setAlert("EXPERIENCE ADDED","success"));
            history.push('/dashboard');
        }catch(err){
            console.log(err);
            const errors = err.response.data.error;
               if(errors.length>0){
                   errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
               }
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.statusText,status:err.response.status}
            });
        }
    }
}


export const addEducation = (formData,history) => {
   return async (dispatch) => {
    try{
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education',formData,config);

        // dispatch({
        //     type:UPDATE_PROFILE,
        //     payload:res.data
        // });
        dispatch(getCurrentProfile());
        dispatch(setAlert("EDUCATION ADDED","success"));
         history.push('/dashboard');

    }catch(err){
        console.log(err);
        const errors = err.response.data.error;
           if(errors){
               errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
               
           }
        dispatch({

            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });

        
    }
   }
}


//DELETE EXPERIENCE


export const deleteExperience =(id) =>{

    console.log("rahul",id)
    return async (dispatch) => {
        try{
            const res =await axios.delete(`api/profile/experience/delete/${id}`);
            dispatch(getCurrentProfile());
            dispatch(setAlert("EXPERIENCE REMOVED",'success'));
        }catch(err){
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.statusText,status:err.response.status}
            })
    
        }
    }
}


export const deleteEducation =(id) =>{

    return async (dispatch)=>{
        try{
            const res =await axios.delete(`api/profile/education/delete/${id}`);
            dispatch(getCurrentProfile());
            dispatch(setAlert("Education REMOVED",'success'));
        }catch(err){
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.statusText,status:err.response.status}
            })
    
        }
    }
}