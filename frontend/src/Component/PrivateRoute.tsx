import {Navigate, Outlet, useLocation } from 'react-router-dom';
import Appbar from './Appbar';

const PrivateRoute=() => {

  const {pathname} = useLocation();
 

  const renderAppbar = ()=>{
    if(pathname !== '/signin' && pathname !== "/signup"){
      return <Appbar/>
    }
    return null;
  }

  const isAuthenticated = !!localStorage.getItem("token");

  return (
   isAuthenticated ? <>{renderAppbar()}<Outlet/></> : <Navigate to="/signin"/>
  );
};

export default PrivateRoute;
