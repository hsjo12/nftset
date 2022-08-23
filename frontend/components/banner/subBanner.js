import styled from "styled-components";
const SubBanner = ({ title }) => {
  return (
    <>
      <Title>{title}</Title>
    </>
  );
};
const Title = styled.div`
  font-size: 2rem;
  font-family: ${(props) => props.theme.fonts.enText};

  margin-top: 1rem;
  text-align: center;
  padding: 1rem 0;
  @media all and (max-width: 1300px) {
    padding: 1rem 0;
    margin-top: 2rem;
  }
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: ${(props) => props.theme.fontSizes.xlarge};
  }
  @media all and (max-width: 479px) {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

export default SubBanner;
