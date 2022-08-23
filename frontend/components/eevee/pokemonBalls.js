import { useCallback, useContext, useState } from "react";
import Image from "next/image";
import { ErrorMsg, SuccessMsg } from "../utils/functions";
import { Button } from "../utils/cssUtils";
import PokemonBallPic from "../../images/eevee/0.png";
import Loading from "../utils/loading";
import styled from "styled-components";
import { ContextApI } from "../../contextAPI/NFtsContext";
import Link from "next/link";
const PokemonBalls = ({ web3, user, eevee, eeveeAddress }) => {
  const {
    pokemonBall,
    setPokemonBall,
    setFireStone,
    setDarkStone,
    setWaterStone,
    setLeafStone,
    setEevee,
  } = useContext(ContextApI);
  const [isLoading, setIsLoading] = useState(false);
  const mintPokemonBalls = useCallback(async () => {
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
    try {
      setIsLoading(true);
      await eevee.methods
        .mintPokemonBall()
        .send({ from: user, value: web3.utils.toWei("0.0001", "ether") });

      const balls = await eevee.methods.balanceOf(user, 0).call();
      setPokemonBall(balls);
      setIsLoading(false);
      return SuccessMsg("포켓몬볼을 얻었습니다.");
    } catch (error) {
      setIsLoading(false);
      return ErrorMsg("포켓몬볼을 얻지 못 했습니다.");
    }
  }, [user, eevee]);

  const openPokemonBalls = useCallback(async () => {
    if (pokemonBall === 0) {
      return ErrorMsg("포켓몬볼이 없습니다.");
    }

    try {
      setIsLoading(true);
      await eevee.methods
        .openPokemonBall()
        .send({ from: user, value: web3.utils.toWei("0.0001", "ether") });

      let users = new Array(6);
      users = users.fill(user);

      const afterBallOpen = await eevee.methods
        .balanceOfBatch(users, [0, 1, 2, 3, 4, 5])
        .call();
      setPokemonBall(afterBallOpen[0]);
      setFireStone(afterBallOpen[1]);
      setDarkStone(afterBallOpen[2]);
      setWaterStone(afterBallOpen[3]);
      setLeafStone(afterBallOpen[4]);
      setEevee(afterBallOpen[5]);
      setIsLoading(false);
      return SuccessMsg("포켓몬볼을 열었습니다.");
    } catch (error) {
      setIsLoading(false);
      return ErrorMsg("포켓몬볼을 열지 못 했습니다.");
    }
  }, [pokemonBall]);

  return (
    <Outer>
      {isLoading ? <Loading /> : null}
      <Link
        href={`https://testnets.opensea.io/assets/rinkeby/${eeveeAddress}/0`}
      >
        <ItemBox>
          <Image
            src={PokemonBallPic}
            width="200px"
            height="200px"
            alt="PokemonBall"
          />
          <Text>포켓몬 볼</Text>
          <Text>{pokemonBall}</Text>
        </ItemBox>
      </Link>
      <Button onClick={mintPokemonBalls}>MINT</Button>
      <Button style={{ margin: 0 }} onClick={openPokemonBalls}>
        Open
      </Button>
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
export default PokemonBalls;
