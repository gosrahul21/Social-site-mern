import { GET_PROFILE,LOGOUT,PROFILE_ERROR, UPDATE_PROFILE } from "../actions/types";



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
            return {
                ...state,
                profile:payload,
                error:{},
                loading:false
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