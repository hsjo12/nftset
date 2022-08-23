import styled from "styled-components";
const Cover = () => {
  return (
    <>
      <MainCoverStyled />
    </>
  );
};

export default Cover;

const MainCoverStyled = styled.header`
  position: absolute;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(https://images.pexels.com/photos/2468056/pexels-photo-2468056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
      center/cover no-repeat fixed;
  z-index: -100;
  top: 0%;
  left: 0%;
`;
