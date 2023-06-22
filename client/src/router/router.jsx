import { createBrowserRouter } from "react-router-dom";
// prettier-ignore
import { AddToy, AllToys, Blog, EditToy, Home, Login, MyToys, Notfound, Signup, ViewToyDetails } from "../pages";
import Main from "../layout/Main";
import LoadingRoute from "./LoadingRoute";
import PrivateRoute from "./PrivateRoute";
import Private from "./Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoadingRoute>
        <Main />
      </LoadingRoute>
    ),
    errorElement: <Notfound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/all-toys",
        element: <AllToys />,
      },
      {
        path: "/toy/:id",
        element: (
          <Private>
            <ViewToyDetails />
          </Private>
        ),
        loader: ({ params }) =>
          fetch(`https://toy-palace.vercel.app/api/toys/${params.id}`),
      },
      {
        path: "/my-toys",
        element: (
          <PrivateRoute>
            <MyToys />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-toys/:id",
        element: (
          <PrivateRoute>
            <EditToy />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-a-toy",
        element: (
          <PrivateRoute>
            <AddToy />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
