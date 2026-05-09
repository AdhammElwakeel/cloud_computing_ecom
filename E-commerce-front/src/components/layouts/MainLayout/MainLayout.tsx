import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Header, Footer } from "@components/common";



const MainLayout = () => {
  return (
    <Container className="container space-between d-flex flex-column min-vh-100">
      <Header />
      <div className="wrapper">
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

export default MainLayout;