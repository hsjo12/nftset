import { useContext, useCallback, useState } from "react";
import styled from "styled-components";
import { ContextApI } from "../../contextAPI/NFtsContext";
import { Button } from "../utils/cssUtils";
import Image from "next/image";
import FlareonPic from "../../images/eevee/6.png";
import UmbreaonPic from "../../images/eevee/7.png";
import VaporeonPic from "../../images/eevee/8.png";
import LeafeonPic from "../../images/eevee/9.png";
import { ErrorMsg, SuccessMsg } from "../utils/functions";
import Loading from "../utils/loading";
import Link from "next/link";
const FinalEvoluationFrame = ({ web3, user, eevee, eeveeAddress }) => {
  const {
    flareon,
    setFlareon,
    umbreaon,
    setUmbreaon,
    vaporeon,
    setVaporeon,
    leafeon,
    setLeafeon,
    setSylbeon,
    totalSylbeon,
    setTotalSylbeon,
  } = useContext(ContextApI);
  const [isLoading, setIsLoading] = useState(false);
  const finalEvoluation = useCallback(async () => {
    if (typeof window.ethereum === "undefined") {
      return ErrorMsg("메타마스크를 설치 하세요.");
    }

    if (!user) {
      return ErrorMsg("메타마스크를 로그인하세요.");
    }

    const netID = await web3.eth.net.getId();
    if (netID.toString() !== "4") {
      ErrorMsg("Rinkeby 네트워크를 사용하세요.");
      RequestNetwork();
      return;
    }
    if (
      Number(flareon) === 0 ||
      Number(umbreaon) === 0 ||
      Number(vaporeon) === 0 ||
      Number(leafeon) === 0
    ) {
      return ErrorMsg("1차 진화된 4개의 이브이가 필요합니다.");
    }
    if (Number(totalSylbeon) >= 3) {
      return ErrorMsg("최종 진화는 더이상 할 수 없습니다.");
    }
    try {
      setIsLoading(true);
      await eevee.methods
        .finalEvoluation()
        .send({ from: user, value: web3.utils.toWei("0.0001", "ether") });

      let users = new Array(5);
      users = users.fill(user);
      const balances = await eevee.methods
        .balanceOfBatch(users, [6, 7, 8, 9, 10])
        .call();
      const finalNftTotal = await eevee.methods.finalNftNum().call();

      setFlareon(balances[0]);
      setUmbreaon(balances[1]);
      setVaporeon(balances[2]);
      setLeafeon(balances[3]);
      setSylbeon(balances[4]);
      setTotalSylbeon(finalNftTotal);
      setIsLoading(false);
      return SuccessMsg("이브이가 최종 진화했습니다.");
    } catch (error) {
      setIsLoading(false);
      return ErrorMsg("이브이가 최종 진화하지 못 했습니다.");
    }
  }, [flareon, umbreaon, vaporeon, leafeon, totalSylbeon, web3, user, eevee]);
  return (
    <Outer>
      {isLoading ? <Loading /> : null}
      <OuterRowBox>
        <Link
          href={`https://testnets.opensea.io/assets/rinkeby/${eeveeAddress}/6`}
        >
          <ItemBox>
            <Image
              src={FlareonPic}
              width="200px"
              height="200px"
              alt="Flareon"
            />
            <Text>부스터</Text>
            <Text>{flareon}</Text>
          </ItemBox>
        </Link>

        <Link
          href={`https://testnets.opensea.io/assets/rinkeby/${eeveeAddress}/7`}
        >
          <ItemBox>
            <Image
              src={UmbreaonPic}
              width="200px"
              height="200px"
              alt="Umbreaon"
            />

            <Text>블래키</Text>
            <Text>{umbreaon}</Text>
          </ItemBox>
        </Link>

        <Link
          href={`https://testnets.opensea.io/assets/rinkeby/${eeveeAddress}/8`}
        >
          <ItemBox>
            <Image
              src={VaporeonPic}
              width="200px"
              height="200px"
              alt="Vaporeon"
            />
            <Text>샤미드</Text>
            <Text>{vaporeon}</Text>
          </ItemBox>
        </Link>

        <Link
          href={`https://testnets.opensea.io/assets/rinkeby/${eeveeAddress}/9`}
        >
          <ItemBox>
            <Image
              src={LeafeonPic}
              width="200px"
              height="200px"
              alt="Leafeon"
            />
            <Text>리피아</Text>
            <Text>{leafeon}</Text>
          </ItemBox>
        </Link>
      </OuterRowBox>
      <Button onClick={finalEvoluation}>조합</Button>
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
const OuterRowBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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

export default FinalEvoluationFrame;
