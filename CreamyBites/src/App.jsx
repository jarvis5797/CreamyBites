import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from './components/base';
import LoginPage from './pages/LoginPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LoginPage />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App;
