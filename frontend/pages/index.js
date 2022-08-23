import Banner from "../components/index/banner/banner";
import Intro from "../components/index/Introduction/Intro";
import { EmptySpace } from "../components/utils/cssUtils";

const Index = () => {
  return (
    <>
      <Banner />
      <EmptySpace marH={"3rem"} />
      <Intro />
    </>
  );
};
export default Index;
