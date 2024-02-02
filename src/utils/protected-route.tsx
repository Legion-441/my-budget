import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
//* Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ProtectedRoute: React.FC = () => {
  const [authLoading, setAuthLoading] = useState(true);

  const navigate = useNavigate()
  const location = useLocation();
  
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login', { state: { from: location.pathname } })        
      }
      setAuthLoading(false)
    });

    return () => unsubscribe()
  }, [navigate, location]);
  

  return authLoading ? null : <Outlet />

};

export default ProtectedRoute;