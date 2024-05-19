import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";

function App() {
  function Redirect({ children }) {
    let user = localStorage.getItem("user") ?? false;

    return user ? children : <Navigate to="/" />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LoginPage />}></Route>

        <Route
          path="/layout"
          element={
            <Redirect>
              <Layout />
            </Redirect>
          }
        ></Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
