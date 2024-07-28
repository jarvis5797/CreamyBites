import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import { ToastContainer } from "react-toastify";
import AdminPage from './pages/AdminPage';
import AdminItemsPage from './pages/admin/AdminItemsPage';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="admin" element={<AdminItemsPage />} >
          <Route path='items' element={<AdminItemsPage />}/>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App;
