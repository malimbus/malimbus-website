import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000' });
const API = axios.create({ baseURL: 'https://malimbus.onrender.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (slug) => API.get(`/posts/${slug}`)
// export const fetchPosts = () => API.get('/posts');
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchNews = (page) => API.get(`/posts/news?page=${page}`);
export const fetchResearch = (page) => API.get(`/posts/research?page=${page}`);
export const fetchPublications = (page) => API.get(`/posts/publications?page=${page}`);
export const fetchDocuments = (page) => API.get(`/posts/documents?page=${page}`);
export const fetchTheses = (page) => API.get(`/posts/theses?page=${page}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || searchQuery.year || searchQuery.region ||'none'}`);
export const fetchPostsByUser = (searchQuery) => API.get(`/posts/user?searchQuery=${searchQuery.search}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const forgot = (formData) => API.post('/user/forgot', formData);
export const reset = (formData) => API.post('/user/reset', formData);

export const fetchProfilesBySearch = (searchQuery) => API.get(`/profiles/search?searchQuery=${searchQuery.search || searchQuery.year || 'none'}`);
export const fetchProfile = (id) => API.get(`/profiles/${id}`)
export const fetchProfiles = () => API.get('/profiles');
export const fetchProfilesByUser = (searchQuery) => API.get(`/profiles/user?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createProfile = (newProfile) => API.post('/profiles', newProfile);
export const updateProfile = (id, updatedProfile) => API.patch(`/profiles/${id}`, updatedProfile);
export const deleteProfile = (id) => API.delete(`/profiles/${id}`);