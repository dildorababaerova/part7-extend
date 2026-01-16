import { useRef } from "react";
import Togglable from "./Togglable";
import { useSelector, useDispatch } from "react-redux";
import { likedBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
  // console.log('Blog', blog);
  const blogRef = useRef();
  const dispatch = useDispatch();
  const handleLikes = async (blog) => {
    try {
      await dispatch(likedBlog(blog));
      dispatch(setNotification(`${blog.title} updated`, "success", 5));
    } catch (error) {
      dispatch(
        setNotification(
          `Error updating blog ${error.response?.data?.error || error.message}`,
          "error",
          5
        )
      );
    }
  };

  return (
    <div
      className="blog-item"
      style={{
        border: "1px solid #ccc",
        background: "#e6e1e1ff",
        borderRadius: "10px",
        margin: "10px",
        padding: "10px",
      }}
    >
      <h2>{blog.title}</h2>
      <Togglable buttonLabel="view" ref={blogRef}>
        <button onClick={() => blogRef.current.toggleVisibility()}>hide</button>
        <p>
          <strong>Author:</strong> {blog.author}
        </p>
        <p>
          <strong>URL:</strong>{" "}
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </p>
        <p>
          <strong>Likes:</strong> {blog.likes}
          <button onClick={() => handleLikes(blog)}>likes</button>
        </p>
      </Togglable>
    </div>
  );
};

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="blog-grid">
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
