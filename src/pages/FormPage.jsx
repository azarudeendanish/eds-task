import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import Invoice from "../components/Invoice";


function FormPage() {
  const [session, setSession] = useState(localStorage.getItem('email'))
  const navigate = useNavigate()
  useEffect(() => {
    
    if (session) {
      return
    }
    navigate('/')
  }, [session])
  return (
    <>
      <Header />
      <Invoice />
    </>
  );
}

export default FormPage;