import styled from "styled-components";
const Banner = ({ title }) => {
  return (
    <>
      <Title>{title}</Title>
    </>
  );
};
const Title = styled.div`
  font-size: 5rem;
  font-family: ${(props) => props.theme.fonts.banner};
  letter-spacing: ${(props) => props.theme.fontSizes.large};

  margin-top: 5rem;
  text-align: center;
  padding: 3rem 0;
  @media all and (max-width: 1300px) {
    padding: 1rem 0;
    margin-top: 2rem;
  }
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: ${(props) => props.theme.fontSizes.large};
    letter-spacing: ${(props) => props.theme.fontSizes.small};
  }
  @media all and (max-width: 479px) {
    font-size: ${(props) => props.theme.fontSizes.medium};
    letter-spacing: ${(props) => props.theme.fontSizes.small};
  }
`;

export default Banner;
