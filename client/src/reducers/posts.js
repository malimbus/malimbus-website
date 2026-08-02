import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING, FETCH_BY_USER, FETCH_BY_SEARCH, FETCH_NEWS, FETCH_PUBLICATIONS, FETCH_DOCUMENTS } from '../actions/constants';

const posts = (state = { isLoading: true, message: false, posts: [], post: {title: '', content: '', doi: '', year: '', _id: '', slug: '', fileUrl: '', authors: []} }, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true }
    case END_LOADING:
      return {...state, isLoading: false }
    
    // case FETCH_ALL:
    //   return {
    //     ...state,
    //     posts: action.payload
    //   }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        total: action.payload.total
      };



      case FETCH_NEWS:
        return {
          ...state,
          posts: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
          total: action.payload.total
        };

  

    case FETCH_PUBLICATIONS:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        total: action.payload.total
      };

    case FETCH_DOCUMENTS:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        total: action.payload.total
      };
      
    case FETCH_BY_USER:
      return {...state, posts: action.payload }
    case FETCH_BY_SEARCH:
        return { ...state, posts: action.payload.data };
    case FETCH_POST:
      return {...state, post: action.payload}
    case CREATE:
      return {...state, posts: [...state.posts, action.payload]}
    case UPDATE:
      return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
    case DELETE:
      return {...state, posts: state.posts.filter((post) => post._id !== action.payload)}
    default:
      return state;
  }
};

export default posts
