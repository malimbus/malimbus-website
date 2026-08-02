import { FETCH_PROFILES, FETCH_PROFILES_BY_USER, CREATE_PROFILE, UPDATE_PROFILE, DELETE_PROFILE, FETCH_PROFILE_BY_USER, START_LOADING, END_LOADING, FETCH_PROFILE } from './constants';
import * as api from '../api/index.js';

export const getProfile = (id) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING })
    const { data } = await api.fetchProfile(id);
    console.log(data)

    dispatch({ type: FETCH_PROFILE, payload: data });
    // dispatch({ type: END_LOADING })

  } catch (error) {
    console.log(error.response);
  } };

export const getProfiles = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchProfiles();
    dispatch({ type: FETCH_PROFILES, payload: data });
    dispatch({ type: END_LOADING })

  } catch (error) {
    console.log(error);
  } };


export const getProfilesByUser =(searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data: { data } } = await api.fetchProfilesByUser(searchQuery)
    console.log(data)
    dispatch({ type: FETCH_PROFILE_BY_USER, payload: data });
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
    
  }
}


export const getProfilesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchProfilesBySearch(searchQuery);

    dispatch({ type: FETCH_PROFILES_BY_USER, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};



export const createProfile = (profile, openSnackbar) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING })
    const { data } = await api.createProfile(profile);
    // history.push(`/profiles/${data._id}`)

    dispatch({ type: CREATE_PROFILE, payload: data });
    openSnackbar('Profile created successfully')
    // dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (id, profile, openSnackbar) => async (dispatch) => {

console.log(profile)
  try {
    const { data } = await api.updateProfile(id, profile);

    dispatch({ type: UPDATE_PROFILE, payload: data });
    openSnackbar('Profile updated successfully')
  } catch (error) {
    console.log(error);
  }
};


export const deleteProfile = (id, openSnackbar) => async (dispatch) => {
  try {
   await api.deleteProfile(id);

    dispatch({ type: DELETE_PROFILE, payload: id });
    openSnackbar('Profile deleted successfully')
  } catch (error) {
    console.log(error);
  }
};
