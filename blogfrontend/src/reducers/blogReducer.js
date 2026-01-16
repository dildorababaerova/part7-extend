import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const blog = action.payload;
      return [...state, blog];
    },
    setBlogs(state, action) {
      return action.payload;
    },
    likesFor(state, action) {
      const updatedLike = action.payload;
      const id = updatedLike.id;
      return state.map((blog) => (blog.id === id ? updatedLike : blog));
    },
  },
});

const { setBlogs, createBlog, likesFor } = blogSlice.actions;

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const appendBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(createBlog(newBlog));
  };
};

export const likedBlog = (blog) => {
  return async (dispatch) => {
    const likeBlog = await blogService.updateLikes(blog);
    dispatch(likesFor(likeBlog));
  };
};

export default blogSlice.reducer;
