import axios from 'axios';
import {setAlert} from './alert';

import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKE
} from './types';


//get posts

export const getPosts=()=>{
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/post');
            dispatch({type:GET_POSTS,payload:res.data});
        } catch (error) {
            dispatch({
                type:POST_ERROR,
                payload:{
                    msg:error.response.statusText,
                    status:error.response.status
                }
            })
        }
    }
}


export const addLike = (id) =>{
    return async (dispatch)=>{
        try {
            const likes = await axios.put(`/api/post/like/${id}`);
        dispatch({
            type:UPDATE_LIKE,
            payload:{id,likes:likes.data}
        });
        } catch (error) {
            dispatch({
                type:POST_ERROR,
                payload:{
                    msg:error.response.statusText,
                    status:error.response.status
                }
            })
        }
    }
}