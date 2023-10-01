import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
//* Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
//* MUI
import { Box } from "@mui/material";

const ProtectedRoute: React.FC = () => {
  const [authLoading, setAuthLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  const navigate = useNavigate()
  const location = useLocation();
  
  
  useEffect(() => {
    setIsMounted(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && isMounted) {
        navigate('/login', { state: { from: location.pathname } })        
      }
      setAuthLoading(false)
    });

    return () => {
      setIsMounted(false);
      unsubscribe()
    }
  }, [navigate, location, isMounted]);
  

  return (
    <Box
      display='flex'
      minHeight='100vh'
      bgcolor='background.default'
    >
      {authLoading ? null : <Outlet />} 
    </Box>
  )

};

export default ProtectedRoute;