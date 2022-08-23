import styled from "styled-components";
import CatWithFire from "../../../images/catWithFire.png";
import Sylbeon from "../../../images/eevee/10.png";
import NFTsCreator from "../../../images/NFTsCreator.png";

import Image from "next/image";
import { EmptySpace, Button } from "../../utils/cssUtils";

const Intro = () => {
  return (
    <Outer>
      <IntroBox>
        <Image
          src={CatWithFire}
          width="500px"
          height="500px"
          alt="Picture of the author"
        />
        <TextBox>
          <TextTitle>Mother Nature</TextTitle>
          <TextInfo>Mother Nature는 자연과 동물이 만난 NFT 입니다.</TextInfo>
          <TextInfo>
            이 컬렉션은 극히 작은량인 100개의 NFT 밖에 없어 희소성이 돋보입니다.
          </TextInfo>
          <TextInfo></TextInfo>
          <TextInfo>
            <Button>보러가기</Button>
          </TextInfo>
        </TextBox>
      </IntroBox>

      <EmptySpace marH={"3rem"} />

      <IntroBox>
        <Image
          src={Sylbeon}
          width="500px"
          height="500px"
          alt="Picture of the author"
        />
        <TextBox>
          <TextTitle>Eevee</TextTitle>
          <TextInfo>
            Eevee(이브이)는 속성 NFT를 통해 진화시킬 수 있습니다.
          </TextInfo>
          <TextInfo>
            여러 차례 진화를 통해 이브의 최종형 님피아를 얻을 수 있습니다.
          </TextInfo>
          <TextInfo>
            님피아는 단 3개 뿐이며, 선착순으로 민트할 수 있습니다.
          </TextInfo>
          <TextInfo>
            <Button>보러가기</Button>
          </TextInfo>
        </TextBox>
      </IntroBox>
      <EmptySpace marH={"3rem"} />
      <IntroBox>
        <Image
          src={NFTsCreator}
          width="500px"
          height="500px"
          alt="Picture of the author"
        />
        <TextBox>
          <TextTitle>NFTs creator</TextTitle>
          <TextInfo>자신이 원하는 NFT를 만들수 있습니다.</TextInfo>
          <TextInfo>지금 당장 원하시는 이미지를 NFT로 만들어 보세요.</TextInfo>
          <TextInfo>
            <Button>보러가기</Button>
          </TextInfo>
        </TextBox>
      </IntroBox>
    </Outer>
  );
};
const Outer = styled.div`
  display: flex;
  flex-direction: column;
`;
const IntroBox = styled.div`
  display: flex;
  width: 100%;

  @media all and (max-width: 1300px) {
    flex-direction: column;
  }
`;
const TextBox = styled.div`
  text-align: center;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.x1large};
  font-family: ${(props) => props.theme.fonts.banner};
  letter-spacing: 0.5rem;
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: ${(props) => props.theme.fontSizes.large};
  }
  @media all and (max-width: 479px) {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
`;
const TextInfo = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-family: ${(props) => props.theme.fonts.krText};
  text-align: center;
  width: 100%;

  @media all and (max-width: 767px) {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

export default Intro;
