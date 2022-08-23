import styled from "styled-components";
import Banner from "../banner/banner";
import EvolveEeveeFrame from "./evolveEeveeFrame";
import FetchAllTheTokensBalance from "./fetchAllTheTokensBalance";
import FinalEvoluationFrame from "./finalEvolutionFrame";
import PokemonBalls from "./pokemonBalls";
import SylbeonFrame from "./sylbeonFrame";
import { SetUpContract } from "../utils/functions";
import { useCallback, useEffect, useState } from "react";
import Eevee from "../../contracts/Eevee.json";
const Structure = () => {
  const [web3, setWeb3] = useState(null);
  const [user, setUser] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const contractAddress =
    Eevee.networks[process.env.NEXT_PUBLIC_MAINNET] &&
    Eevee.networks[process.env.NEXT_PUBLIC_MAINNET].address;

  useEffect(() => {
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    setUp();
  }, [Eevee]);

  const setUp = useCallback(async () => {
    const { web3, user, contractInstance } = await SetUpContract(Eevee);

    setWeb3(web3);
    setUser(user);
    setContractInstance(contractInstance);
  }, [Eevee]);

  return (
    <Outer>
      <FetchAllTheTokensBalance
        web3={web3}
        user={user}
        eevee={contractInstance}
      />
      <Banner title={"Eevee"} />
      <Info>포켓몬 볼 1개 = 0.0001 eth</Info>
      <PokemonBalls
        web3={web3}
        user={user}
        eevee={contractInstance}
        eeveeAddress={contractAddress}
      />
      <Info>진화 1번 = 0.0001 eth</Info>
      <EvolveEeveeFrame
        web3={web3}
        user={user}
        eeveeInstance={contractInstance}
        eeveeAddress={contractAddress}
      />
      <Info>최종 진화 = 0.0001 eth</Info>
      <FinalEvoluationFrame
        web3={web3}
        user={user}
        eeveeInstance={contractInstance}
        eeveeAddress={contractAddress}
      />
      <Info>최종 진화</Info>
      <SylbeonFrame eeveeAddress={contractAddress} />
    </Outer>
  );
};
const Outer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Info = styled.div`
  margin-top: 5rem;
  text-align: center;
  padding: 3rem 0;
  font-family: ${(props) => props.theme.fonts.krText2};
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  @media all and (max-width: 767px) {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
  @media all and (max-width: 1300px) {
    padding: 1rem 0;
    margin-top: 2rem;
  }
  @media all and (max-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
`;
export default Structure;
