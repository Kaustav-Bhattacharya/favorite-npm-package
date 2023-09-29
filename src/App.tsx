import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { Home } from "./pages/Home/Home";
import {AddFavorite} from "./pages/AddFavorite";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/add-favorite",
      element: <AddFavorite/>,
    },
    {
      path: "*",
      element: <div> not Hello world!</div>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
