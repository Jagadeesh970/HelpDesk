import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
  
      <NavBar />

      
      <main className="layout-content">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;
