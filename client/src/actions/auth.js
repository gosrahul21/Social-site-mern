import {LOGOUT,REGISTER_SUCCESS,REGISTER_FAIL,LOGIN_SUCCESS,LOGIN_FAIL, AUTH_ERROR,USER_LOADED}  from './types'
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import { Redirect } from 'react-router-dom';
import {setAlert} from './alert'


export const register=({name,email,password})=>{

    return async (dispatch)=>{
        try{
            const res = await axios.post('/api/users',{name,email,password});
            dispatch({
                type:REGISTER_SUCCESS,
                payload:{
                    ...res.data
                }
            })
        }catch(err){
            dispatch({
                type:REGISTER_FAIL
            })
        }
    }

}


export const login = ({email,password}) =>{

    
    
    return async (dispatch)=>{
        try{
            const res = await axios.post('/api/auth',{email,password});
            dispatch({
                type:LOGIN_SUCCESS,
                payload:{
                    ...res.data
                }
            });

            dispatch(loadUser())

        }catch(err){
           // dispatch(setAlert("Email or password doesn't match","danger"))
            
           const errors = err.response.data.error;
           if(errors){
               errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
               
           }
           
           dispatch({
                type:LOGIN_FAIL
            })
        }
    }
}


export const loadUser = () => {
    return async (dispatch) => {
        if(localStorage.token){
            setAuthToken(localStorage.token);  
        }
        try{
            const res = await axios.get('/api/auth');
            
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
          
        } catch(err) {
            
            console.log({error:err})
            dispatch({
                type:AUTH_ERROR,
                
            })
        }
    }
}



//LOGOUT, CLEAR PROFILE
export const logout = () => async (dispatch)=>{ 
    console.log("hello")
    const res=await axios.get('api/auth/logout');
    console.log(res.data);
    dispatch({type:LOGOUT})
}