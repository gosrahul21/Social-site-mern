
import {REGISTER_SUCCESS,LOGOUT,REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, USER_LOADED} from '../actions/types'
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated:false,
    loading:true,
    user:null
}

export default (state=initialState,action) => {
    switch(action.type)
    {
        case USER_LOADED:
            return {
                ...state,
                user:{...action.payload},
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                 token:action.payload.token,
                 user:action.payload.user,
                 isAuthenticated:true,
                 loading:false,
                 
            }
        case REGISTER_FAIL:
        case  LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null
                
            }

        default:
            return state

    }
}

