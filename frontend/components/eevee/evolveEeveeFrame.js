import { useCallback, useState, useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import { ErrorMsg, SuccessMsg } from "../utils/functions";
import { Button } from "../utils/cssUtils";
import { ContextApI } from "../../contextAPI/NFtsContext";
import FireStonePic from "../../images/eevee/1.png";
import DarkStonePic from "../../images/eevee/2.png";
import WaterStonePic from "../../images/eevee/3.png";
import LeafStonePic from "../../images/eevee/4.png";
import EeveePic from "../../images/eevee/5.png";
import Loading from "../utils/loading";
import Link from "next/link";
const EvolveEeveeFrame = ({ web3, user, eeveeInstance, eeveeAddress }) => {
  const {
    fireStone,
    setFireStone,
    darkStone,
    setDarkStone,
    waterStone,
    setWaterStone,
    leafStone,
    setLeafStone,
    eevee,
    setEevee,
    flareon,
    setFlareon,
    umbreaon,
    setUmbreaon,
    vaporeon,
    setVaporeon,
    leafeon,
    setLeafeon,
  } = useContext(ContextApI);
  const [selectedStone, setSelectedStone] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const changeSelectedStone = useCallback((event) => {
    setSelectedStone(event.target.value);
  }, []);

  const evolveEevee = useCallback(async () => {
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
    if (!selectedStone) {
      return ErrorMsg("진화의 돌을 선택하세요.");
    }
    if (eevee <= 0) {
      return ErrorMsg("이브이가 없습니다.");
    }
    const totalStone = await eeveeInstance.methods
      .balanceOf(user, selectedStone)
      .call();
    if (totalStone <= 0) {
      return ErrorMsg("선택한 진화의 돌이 없습니다.");
    }

    try {
      setIsLoading(true);
      await eeveeInstance.methods
        .evolveEevee(selectedStone)
        .send({ from: user, value: web3.utils.toWei("0.0001", "ether") });

      let users = new Array(9);
      users = users.fill(user);
      const balls = await eeveeInstance.methods
        .balanceOfBatch(users, [1, 2, 3, 4, 5, 6, 7, 8, 9])
        .call();
      setFireStone(balls[0]);
      setDarkStone(balls[1]);
      setWaterStone(balls[2]);
      setLeafStone(balls[3]);
      setEevee(balls[4]);
      setFlareon(balls[5]);
      setUmbreaon(balls[6]);
      setVaporeon(balls[7]);
      setLeafeon(balls[8]);
      setIsLoading(false);
      return SuccessMsg("이브이가 진화했습니다.");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return ErrorMsg("이브이가 진화하지 못 했습니다.");
    }
  }, [
    selectedStone,
    fireStone,
    darkStone,
    waterStone,
    leafStone,
    eevee,
    eeveeInstance,
    user,
    web3,
  ]);

  return (
    <>
      <Outer>
        {isLoading ? <Loading /> : null}
        <OuterRowBox>
          <Link
            href={`https://testnets.opensea.io/assets/rinkeby/${eeveeAddress}/1`}
          >
            <ItemBox>
              <Image
                src={FireStonePic}
                width="200px"
                height="200px"
                alt="Fire Stone"
              />
              <Text>불의 돌</Text>
              <Text>{fireStone}</Text>
            </ItemBox>
          </Link>

          <Link
            href={`https://testnets.opensea.io/assets/rinkeby/${eeveeAddress}/2`}
          >
            <ItemBox>
              <Image
                src={DarkStonePic}
                width="200px"
                height="200px"
                alt="Dark Stone"
              />
              <Text>어둠의 돌</Text>
              <Text>{darkStone}</Text>
            </ItemBox>
          </Link>

          <Link
            href={`https://testnets.opensea.io/assets/rinkeby/${eeveeAddress}/3`}
          >
            <ItemBox>
              <Image
                src={WaterStonePic}
                width="200px"
                height="200px"
                alt="Water Stone"
              />
              <Text>물의 돌</Text>
              <Text>{waterStone}</Text>
            </ItemBox>
          </Link>

          <Link
            href={`https://testnets.opensea.io/assets/rinkeby/${eeveeAddress}/4`}
          >
            <ItemBox>
              <Image
                src={LeafStonePic}
                width="200px"
                height="200px"
                alt="Leaf Stone"
              />
              <Text>풀의 돌</Text>
              <Text>{leafStone}</Text>
            </ItemBox>
          </Link>

          <Link
            href={`https://testnets.opensea.io/assets/rinkeby/${eeveeAddress}/5`}
          >
            <ItemBox>
              <Image src={EeveePic} width="200px" height="200px" alt="Eevee" />
              <Text>이브이</Text>
              <Text>{eevee}</Text>
            </ItemBox>
          </Link>
        </OuterRowBox>

        <SelectBox>
          <Label> 진화의 돌</Label>
          <Select value={selectedStone} onChange={changeSelectedStone}>
            <option value="1">불의 돌</option>
            <option value="2">어둠의 돌</option>
            <option value="3">물의 돌</option>
            <option value="4">풀의 돌</option>
          </Select>
        </SelectBox>

        <Button onClick={evolveEevee}>MINT</Button>
      </Outer>
    </>
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

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1rem 0;
`;
const Label = styled.label`
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  font-family: ${(props) => props.theme.fonts.krText2};
  padding: 1rem 0;
  @media all and (max-width: 767px) {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
`;
const Select = styled.select`
  width: 80%;
  font-family: ${(props) => props.theme.fonts.krText2};
  font-size: ${(props) => props.theme.fontSizes.large};
`;
export default EvolveEeveeFrame;
