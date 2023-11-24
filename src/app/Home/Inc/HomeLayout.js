import Header from "./Header";
import Footer from "./Footer";
import Allpopudp from "../popupAllpage/Allpopudp";

const HomeLayout = ({ children }) => {
  return (
    <>
      <main>
        <Header></Header>
        <Allpopudp />
        {children}
        <Footer></Footer>
      </main>
    </>
  );
};

export default HomeLayout;
