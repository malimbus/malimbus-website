import * as api from '../api/index'
import { AUTH, CREATE_PROFILE } from './constants'
// import { AUTH, FETCH_USERS, UPDATE_USER, CREATE_USER} from './constants'

export const signin =(formData, history, openSnackbar) => async(dispatch) => {

    try {
        //login the user
        const { data } = await api.signIn(formData)
        console.log(data)
        dispatch({ type: AUTH, data})
        openSnackbar("Sign in successful")
        history.push('/profile')

    } catch (error) {
        // alert(error.response.data.message)
        openSnackbar(error.response.data.message)
    }
}

export const signup =(formData, history, openSnackbar) => async(dispatch) => {

    try {
        //Sign up the user
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH, data})
        //Create profile for the user on signup
        const { profile } = await api.createProfile({
                name: data?.result?.name, 
                email: data?.result?.email, 
                userId: data?.result?._result,
                createProfile: '',
                address: '',
                phone: '',
            });
        
        dispatch({ type: CREATE_PROFILE, payload: profile });
        openSnackbar("Sign up successful")
        history.push('/profile')

    } catch (error) {
        openSnackbar(error.response.data.message)
    }
}


export const forgot =(formData, history) => async(dispatch) => {
    try {
        await api.forgot(formData)
    } catch (error) {
        alert(error)
    }
}


export const reset =(formData, history) => async(dispatch) => {

    try {
        await api.reset(formData)
        history.push('/profile')

    } catch (error) {
        alert(error)
    }
}
