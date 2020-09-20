import { GET_PROFILE,GET_PROFILES,GET_PROFILE_ID,GET_REPOS,LOGOUT,PROFILE_ERROR, UPDATE_PROFILE } from "../actions/types";



const initialState={
    profile:null,
    loading:true,
    profiles:[],
    repos:[],
    error:{}
}

const profile=(state=initialState,action)=>{
    const {type,payload} = action;

    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
        case GET_PROFILE_ID:
            return {
                ...state,
                profile:payload,
                error:{},
                loading:false
            }
        case GET_PROFILES:
        
            console.log({payload})
             return {
                 ...state,
                 profiles:payload,
                 loading:false,
                 error:{}
             }
        case GET_REPOS:
            return {
                ...state,
                loading:false,
                repos:payload,
                error:{}
            }
        case PROFILE_ERROR:
        case LOGOUT:
            return {
                ...state,
               // profile:{message:"no profile, all cleared"},
                error:payload,
                profile:null,
                loading:false
            }
        default:
            return state;

    }
}

export default profile;