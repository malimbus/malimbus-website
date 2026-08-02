import { AUTH, LOGOUT, RESET, FORGOT } from '../actions/constants'

const authReducer =(state = {authData: null}, action)=> {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            // console.log(action?.data)
            return {...state, authData: action?.data}

            case LOGOUT:
                localStorage.clear()
                return {...state, authData: null}
                
            case RESET:
                return state
            
            case FORGOT:
                return state
        
        default:
            return state
    }
}

export default authReducer