import styled from "styled-components";
import LoadingImage from "../../images/loading.gif";
const Loading = () => {
  return (
    <>
      <DisplayBox>
        <ImageBox loading={LoadingImage} />
      </DisplayBox>
    </>
  );
};

const DisplayBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  padding: 2% 0%;
  background-color: white;
  opacity: 0.5;
  z-index: 999;
`;

const ImageBox = styled.div`
  position: fixed;
  background-image: url(${LoadingImage.src});
  margin: 0 auto;
  left: 40%;
  top: 30%;
  width: 300px;
  height: 300px;
  @media all and (min-width: 480px) and (max-width: 767px) {
    left: 30%;
    top: 20%;
  }
  @media all and (max-width: 479px) {
    left: 17%;
    top: 20%;
  }
`;
export default Loading;
