import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import FormPage from './pages/FormPage';


function App() {

  return (
    <>
      <BrowserRouter>
      <ToastContainer position='top-right' />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="formpage" element={<FormPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
