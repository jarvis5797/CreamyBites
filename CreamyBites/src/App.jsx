import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from './components/base';
import LoginPage from './pages/LoginPage';
import { ToastContainer } from "react-toastify";
import AdminPage from './pages/AdminPage';


function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App;
