import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import AddBlog from "./components/AddBlog";
import Togglable from "./components/Togglable";
import LogOut from "./components/Logout";
import Footer from "./components/Footer";
import { setNotification } from "./reducers/notificationReducer";
import { appendBlog, initialBlogs } from "./reducers/blogReducer";
import { useDispatch } from "react-redux";

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null)
  // const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // blogService.getAll().then((initialBlogs) => {
    //   setBlogs(sortBlogs(initialBlogs));
    dispatch(initialBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON); //because it parsed to string for window localeStorage(DOM)
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    try {
      await dispatch(appendBlog(blogObject));
      dispatch(setNotification(`${blogObject.title} added`, "success", 5));

      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(
        setNotification(
          `Error adding blog ${error.response?.data?.error || error.message}`,
          "error",
          5
        )
      );
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="add new blog" ref={blogFormRef}>
      <AddBlog createBlog={addBlog} />
    </Togglable>
  );

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      dispatch(setNotification("You successfully logged in!", "success", 5));
    } catch (error) {
      dispatch(
        setNotification(
          `${error.response?.data?.error || error.message}`,
          "error",
          5
        )
      );
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm handleLogForm={handleLogin} />
    </Togglable>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  // const handleDelete = async (id) => {
  //   try {
  //     if (window.confirm("Do you want to delete this blog ?")) {
  //       await blogService.deleteBlog(id);
  //       blogs((prev) => {
  //         const withoutDeleteBlog = prev.filter((blog) => blog.id !== id);
  //         return sortBlogs(withoutDeleteBlog);
  //       });
  //     }
  //     dispatch(setNotification("Deleted successfully", "success", 5));
  //   } catch (error) {
  //     // Обработка ошибки, например, показать сообщение об ошибке
  //     dispatch(
  //       setNotification(
  //         `Error deleting blog  ${
  //           error.response?.data?.error || error.message
  //         }`,
  //         "error",
  //         5
  //       )
  //     );
  //   }
  // };

  return (
    <div>
      <Notification />
      <h1>Blogs</h1>
      {user === null ? (
        <div>{loginForm()}</div>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <LogOut handleLogout={handleLogout} />
          {blogForm()}
        </div>
      )}
      <Blogs />
      <Footer />
    </div>
  );
};

export default App;
