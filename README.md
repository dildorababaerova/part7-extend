# part7-extend

Exercises 7.9-7.21

1. Install Redux dependencies

- `npm install redux`
- `npm install react-redux`
- `npm install @reduxjs/toolkit`
  or `npm install redux react-redux @reduxjs/toolkit`

2. Create src/store.js

```js
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    anecdotes: reducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;
```

3. Update main.js to use Redux Provider. Connect Redux to React (main.js)

```js
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

4. Notification reducer (Redux Toolkit + Thunk)
   In the exercise Redux Thunk is used.
   The initialState was changed to an object, because notification logic now includes a message type (error/ success).

Note: In the setNotification thunk function, an object is passed to the reducer because the notification initialState contains two properties: message and type

`dispatch(addNotification({ message, type }))`

This allows the reducer to update both values at the same time.

```js
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", type: "" },
  reducers: {
    addNotification(state, action) {
      return { message: action.payload.message, type: action.payload.type };
    },
    clearNotification() {
      return "";
    },
  },
});

const { addNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (message, type, seconds) => {
  return async (dispatch) => {
    dispatch(addNotification({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
```

5. Notification component (important part)
   Notification state is now fully managed by Redux.
   Destructured notification state in Notification.jsx:
   `const { message, type } = useSelector((state) => state.notification)`

This is equivalent to:

```js
const message = useSelector((state) => state.notification.message);
const type = useSelector((state) => state.notification.type);
```

```js
import { useSelector } from "react-redux";
const Notification = () => {
  const { message, type } = useSelector((state) => state.notification);
  if (!message) {
    return null;
  }

  return (
    <div className={`notification ${type === "error" ? "error" : "success"}`}>
      {message}
    </div>
  );
};

export default Notification;
```

6. Use dispatch to App.jsx

```js
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

// inside component
const dispatch = useDispatch();
```

- Then call it whenever you need to show a notification:

`dispatch(setNotification(`${blogObject.title} added`, "success", 5));`

Key ideas

- Global notification state is managed by Redux

- Async logic (timeouts) lives in thunk, not in components

- Components only dispatch actions and read state

- message + type stored as one object for clarity

## Redux, Step 2
