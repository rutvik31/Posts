import axiosInstance from './axios';
import posts from '../services/post';

export default {
    posts: posts(axiosInstance)
}