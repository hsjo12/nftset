import styled from "styled-components";
import Background from "../components/index/banner/background";
import Navigation from "./navigation";
import Footer from "./footer";
import { useRouter } from "next/router";
const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <Outer>
      <Innner>
        <Navigation />
        {router.route === "/" ? <Background /> : null}
        {children}
        <Footer />
      </Innner>
    </Outer>
  );
};

const Outer = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
`;
const Innner = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`;

export default Layout;
