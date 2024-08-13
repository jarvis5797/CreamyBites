import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import { ToastContainer } from "react-toastify";
import AdminPage from './pages/AdminPage';
import AdminItemsPage from './pages/admin/AdminItemsPage';
import UserItemPage from './pages/user/UserItemPage';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="admin" element={<AdminItemsPage />} >
        <Route path='items' element={<AdminItemsPage />}/>
        </Route>
        <Route path="user" element={<UserItemPage />}>
        <Route path="items" element={<UserItemPage/>}/>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App;
