import { 
  FETCH_ALL, 
  CREATE, 
  UPDATE, 
  DELETE, 
  FETCH_BY_USER, 
  FETCH_THESES, 
  FETCH_RESEARCH, 
  FETCH_BY_SEARCH, 
  START_LOADING, 
  END_LOADING, 
  FETCH_POST, 
  FETCH_NEWS, 
  FETCH_PUBLICATIONS, 
  FETCH_DOCUMENTS,
} from './constants';
import * as api from '../api/index.js';

export const getPost = (slug) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchPost(slug);
    console.log(data)

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING })

  } catch (error) {
    console.log(error.response);
  } };

// export const getPosts = () => async (dispatch) => {
//   try {
//     dispatch({ type: START_LOADING })
//     const { data } = await api.fetchPosts();
//     // console.log(data.title)

//     dispatch({ type: FETCH_ALL, payload: data });
//     dispatch({ type: END_LOADING })

//   } catch (error) {
//     console.log(error);
//   } };


export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages, total } } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages, total } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getNews = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages, total } } = await api.fetchNews(page);

    dispatch({ type: FETCH_NEWS, payload: { data, currentPage, numberOfPages, total } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPublications = (page) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages, total } } = await api.fetchPublications(page);

    dispatch({ type: FETCH_PUBLICATIONS, payload: { data, currentPage, numberOfPages, total } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getDocuments = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages, total } } = await api.fetchDocuments(page);

    dispatch({ type: FETCH_DOCUMENTS, payload: { data, currentPage, numberOfPages, total } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getResearch = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages, total } } = await api.fetchResearch(page);

    dispatch({ type: FETCH_RESEARCH, payload: { data, currentPage, numberOfPages, total } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};


export const getTheses = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages, total } } = await api.fetchTheses(page);

    dispatch({ type: FETCH_THESES, payload: { data, currentPage, numberOfPages, total } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};






export const getPostsByUser =(searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data: { data } } = await api.fetchPostsByUser(searchQuery)
    console.log(data)
    dispatch({ type: FETCH_BY_USER, payload: data });
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
    
  }
}


export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  dispatch({ type: START_LOADING });

  try {
    const response = await api.fetchPostsBySearch(searchQuery);

    const {
      data = [],
      currentPage = 0,
      numberOfPages = 1,
      total
    } = response.data;

    dispatch({
      type: FETCH_BY_SEARCH,
      payload: {
        data,
        currentPage,
        numberOfPages,
        total: total ?? data.length
      }
    });
  } catch (error) {
    console.error('Publication search failed:', error);

    dispatch({
      type: FETCH_BY_SEARCH,
      payload: {
        data: [],
        currentPage: 0,
        numberOfPages: 1,
        total: 0
      }
    });
  } finally {
    dispatch({ type: END_LOADING });
  }
};

export const createPost = (post, openSnackbar) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING })
    const { data } = await api.createPost(post);
    // history.push(`/posts/${data._id}`)
    // dispatch({ type: HIDE_MESSAGE });
    dispatch({ type: CREATE, payload: data });
    openSnackbar('Post added successfully')
    // dispatch({ type: DISPLAY_MESSAGE });
    // dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.response);
  }
};

export const updatePost = (id, post, openSnackbar) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
    openSnackbar('Post updated successfully')
  } catch (error) {
    console.log(error);
  }
};


export const deletePost = (id, openSnackbar) => async (dispatch) => {
  try {
   await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
    openSnackbar('Post deleted successfully')
  } catch (error) {
    console.log(error);
  }
};
