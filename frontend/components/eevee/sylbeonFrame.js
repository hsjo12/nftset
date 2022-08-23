import styled from "styled-components";
import Image from "next/image";
import { useContext } from "react";
import { ContextApI } from "../../contextAPI/NFtsContext";
import SylbeonPic from "../../images/eevee/10.png";
import Link from "next/link";
const SylbeonFrame = ({ eeveeAddress }) => {
  const { sylbeon, totalSylbeon } = useContext(ContextApI);
  return (
    <Outer>
      <Link
        href={`https://testnets.opensea.io/assets/rinkeby/${eeveeAddress}/10`}
      >
        <ItemBox>
          <Image src={SylbeonPic} width="200px" height="200px" alt="sylbeon" />
          <Text>님피아 현황</Text>
          <Text>{totalSylbeon}/3</Text>
          <Text>님피아</Text>
          <Text>{sylbeon}</Text>
        </ItemBox>
      </Link>
    </Outer>
  );
};

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5rem;
  text-align: center;
  padding: 3rem 0;
  @media all and (max-width: 1300px) {
    padding: 1rem 0;
    margin-top: 2rem;
  }
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 2rem;
  &:hover {
    background-color: "#1f2635";
    color: white;
    text-shadow: 0 0 12px ${(props) => props.theme.shadow.lighShadow};
    box-shadow: ${(props) => props.theme.shadow.lightShadow};
    cursor: pointer;
  }
`;
const Text = styled.div`
  text-align: center;
  padding-top: 1rem;
  font-family: ${(props) => props.theme.fonts.krText2};
  font-size: ${(props) => props.theme.fontSizes.large};
  @media all and (max-width: 767px) {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
`;
export default SylbeonFrame;
