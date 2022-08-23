import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import CreateCollectionBtn from "./createCollectionBtn";
import ShowCollection from "./showCollection";
import Banner from "../banner/banner";
import { SetUpContract } from "../utils/functions";
import UserCollection from "../../contracts/UserCollection.json";
const Structure = () => {
  const [web3, setWeb3] = useState(null);
  const [user, setUser] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const contractAddress =
    UserCollection.networks[process.env.NEXT_PUBLIC_MAINNET] &&
    UserCollection.networks[process.env.NEXT_PUBLIC_MAINNET].address;
  useEffect(() => {
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    setup();
  }, [UserCollection]);
  const setup = useCallback(async () => {
    const { web3, user, contractInstance } = await SetUpContract(
      UserCollection
    );
    setWeb3(web3);
    setUser(user);
    setContractInstance(contractInstance);
  }, [UserCollection]);
  return (
    <Outer>
      <Banner title={"NFTs Creator"} />
      <CreateCollectionBtn
        web3={web3}
        user={user}
        userCollectionAddress={contractAddress}
      />
      <ShowCollection
        web3={web3}
        user={user}
        userCollection={contractInstance}
      />
    </Outer>
  );
};
const Outer = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Structure;
