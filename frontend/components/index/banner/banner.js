import styled, { keyframes } from "styled-components";
import { Button } from "../../utils/cssUtils";
import Link from "next/link";
const Banner = () => {
  return (
    <BannerBox>
      <Title>NFTs</Title>
      <Buttonbox>
        <Link href="/mathernature">
          <Button>Mother Nature</Button>
        </Link>
        <Link href="/eevee">
          <Button>Eevee</Button>
        </Link>
        <Link href="/nftsGenerator/createMyCollection">
          <Button>NFTs creator</Button>
        </Link>
      </Buttonbox>
    </BannerBox>
  );
};

const appear = keyframes`
0% {
  opacity: 0;
}
50% {
  opacity: 0.5;
}
100% {
  opacity: 1;
}
`;
const BannerBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 3rem 0;
  animation: ${appear} 5s ease-in-out 1;
  @media all and (max-width: 1300px) {
    padding: 1rem 0;
  }
`;

const Title = styled.div`
  width: 100%;
  font-size: 15rem;
  font-family: ${(props) => props.theme.fonts.banner};
  letter-spacing: ${(props) => props.theme.fontSizes.large};

  margin-top: 5rem;
  text-align: center;
  padding: 3rem 0;
  @media all and (max-width: 1300px) {
    padding: 1rem 0;
    margin-top: 2rem;
    font-size: 10rem;
    letter-spacing: ${(props) => props.theme.fontSizes.small};
  }
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 8rem;
    letter-spacing: ${(props) => props.theme.fontSizes.small};
  }
  @media all and (max-width: 479px) {
    font-size: 5rem;
  }
`;

const Buttonbox = styled.div`
  width: 100%;
  display: flex;

  justify-content: space-around;
  @media all and (max-width: 1300px) {
    flex-direction: column;
  }
`;

export default Banner;
