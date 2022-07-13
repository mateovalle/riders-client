import './App.css';
import LoginPage from "./pages/login/LoginPage";
import {BrowserRouter, Route, Routes, Outlet, Navigate} from "react-router-dom";
import {ThemeProvider} from "@mui/system";
import {ridersTheme} from "./util/ridersTheme";
import SignUpPage from "./pages/signUp/SignUpPage";
import HomePage from "./pages/homePage/HomePage";
import NavBar from "./components/navBar/NavBar";
import CallPage from "./pages/callPage/CallPage";
import OngoingCallsPage from "./pages/ongoingCalls/OngoingCallsPage";
import HistoryPage from "./pages/historyPage/HistoryPage";
import {socket, SocketContext} from "./context/socket";
import ChatRoom from "./pages/chatRoom/ChatRoom";
import SettingsPage from "./pages/settingsPage/SettingsPage";

const Auth = () => window.localStorage.getItem('token') ? <Outlet /> : <Navigate to={'/'} />;

function App() {
  return (
      <SocketContext.Provider value={socket}>
          <ThemeProvider theme={ridersTheme} >
              <BrowserRouter>
                  <NavBar />
                  <Routes>
                      <Route path='/' element={<LoginPage /> } />
                      <Route path='/sign-up' element={<SignUpPage /> } />
                      <Route element={<Auth />} >
                          <Route path='/home' element={<HomePage />} />
                          <Route path='/call' element={<CallPage />} />
                          <Route path='/ongoingCalls' element={<OngoingCallsPage />} />
                          <Route path='/history' element={<HistoryPage />} />
                          <Route path='/chat/:rideId' element={<ChatRoom />}/>
                          <Route path='/settings' element={<SettingsPage />} />
                      </Route>
                  </Routes>
              </BrowserRouter>
          </ThemeProvider>
      </SocketContext.Provider>
  );
}

export default App;
