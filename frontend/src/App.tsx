import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Game from "./pages/Game";
import { ToastContainer } from "react-toastify";

function App() {

  const isLoggedIn = !!localStorage.getItem("token"); 

  return (<>
  <div className="font-mono">
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={isLoggedIn ? <Game /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
    <ToastContainer />
    </div>
    </>
    
  )
}

export default App
