import './App.css';
import LoginPage from "./pages/login/LoginPage";
import {BrowserRouter, Route, Routes, Outlet, Navigate} from "react-router-dom";
import {ThemeProvider} from "@mui/system";
import {ridersTheme} from "./util/ridersTheme";
import SignUpPage from "./pages/signUp/SignUpPage";
import HomePage from "./pages/homePage/HomePage";
import NavBar from "./components/navBar/NavBar";
import CallPage from "./pages/callPage/CallPage";

const Auth = () => window.localStorage.getItem('token') ? <Outlet /> : <Navigate to={'/'} />;

function App() {
  return (
      <ThemeProvider theme={ridersTheme} >
          <BrowserRouter>
              <NavBar />
              <Routes>
                  <Route path='/' element={<LoginPage /> } />
                  <Route path='/sign-up' element={<SignUpPage /> } />
                  <Route element={<Auth />} >
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/call' element={<CallPage />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
