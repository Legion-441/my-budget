import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
//* Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
//* MUI
import { Box } from "@mui/material";

const ProtectedRoute: React.FC = () => {
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate()
  const location = useLocation();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(Boolean(user))
      setAuthLoading(false)
    });
    
  }, []);
  

  if (authLoading) {
    return (
      <Box
        minHeight='100vh'
        bgcolor='background.default'
      />
    )
  }
  
  if (isAuthenticated) {
    return <Outlet/>  
  }

  return <Navigate to={"/login"} state={{ from: location }} replace />
};

export default ProtectedRoute;