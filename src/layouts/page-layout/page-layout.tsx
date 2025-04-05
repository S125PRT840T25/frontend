import { Footer, Header, MainNavigation } from "@components";
import { Outlet } from "react-router-dom";
import './page-layout.css';

export const PageLayout = () => {
    return (
      <div className="page-container">
        <Header />
        <MainNavigation />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  };