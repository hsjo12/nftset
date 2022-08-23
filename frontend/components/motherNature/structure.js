import styled from "styled-components";
import Banner from "../banner/banner";
import MintBtn from "./mintBtn";
import ShowOwnedNftUrls from "./showOwnedNftUrls";
import MotherNature from "../../contracts/MotherNature.json";
import { SetUpContract } from "../utils/functions";
import { useCallback, useEffect, useState } from "react";

const Structure = () => {
  const [web3, setWeb3] = useState(null);
  const [user, setUser] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const contractAddress =
    MotherNature.networks[process.env.NEXT_PUBLIC_MAINNET] &&
    MotherNature.networks[process.env.NEXT_PUBLIC_MAINNET].address;
  useEffect(() => {
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    setUp();
  }, [MotherNature]);

  const setUp = useCallback(async () => {
    const { web3, user, contractInstance } = await SetUpContract(MotherNature);
    console.log(web3, user, contractInstance);
    setWeb3(web3);
    setUser(user);
    setContractInstance(contractInstance);
  }, [MotherNature]);
  return (
    <Outer>
      <Banner title={"Mother Nature"} />
      <Info>1 mint = 0.001 eth</Info>
      <MintBtn web3={web3} user={user} motherNature={contractInstance} />
      <ShowOwnedNftUrls
        web3={web3}
        user={user}
        motherNature={contractInstance}
        motherNatureAddress={contractAddress}
      />
    </Outer>
  );
};
const Outer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Info = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-family: ${(props) => props.theme.fonts.krText};
  letter-spacing: ${(props) => props.theme.fontSizes.small};

  margin-top: 5rem;
  text-align: center;
  padding: 3rem 0;
  @media all and (max-width: 1300px) {
    padding: 1rem 0;
    margin-top: 2rem;
  }
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: ${(props) => props.theme.fontSizes.medium};
    letter-spacing: ${(props) => props.theme.fontSizes.medium};
  }
  @media all and (max-width: 479px) {
    font-size: ${(props) => props.theme.fontSizes.small};
    letter-spacing: ${(props) => props.theme.fontSizes.medium};
  }
`;
export default Structure;
