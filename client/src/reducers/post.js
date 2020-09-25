import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKE
} from '../actions/types';


const initialState={
    posts:[],
    post:null,
    loading:true,
    error:{}
}


export default function(state=initialState,action){
    const {type,payload} = action;
    switch(type){

        case GET_POSTS:
            return{
                ...state,
                posts:payload,
                loading:false,
                error:{}

            }

        case POST_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            }

        case UPDATE_LIKE:
            return {
                ...state,
                loading:false,
                error:{},
                posts: state.posts.map((post)=>(post._id===payload.id?{...post,likes:payload.likes}:post))
            }

        default:
            return state;

    }
}