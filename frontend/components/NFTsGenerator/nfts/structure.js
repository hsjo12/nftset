import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import Banner from "../../banner/banner";
import SubBanner from "../../banner/subBanner";
import CreateNFTsBtn from "./createNFTsBtn";
import ShowNfts from "./showNfts";
import { SetUpContract } from "../../utils/functions";
import BlankNFT_ERC721 from "../../../contracts/BlankNFT_ERC721.json";
const Structure = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [web3, setWeb3] = useState(null);
  const [user, setUser] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);

  useEffect(() => {
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    if (!pid) {
      return;
    }
    setUP(pid);
  }, [BlankNFT_ERC721, pid]);

  const setUP = useCallback(
    async (pid) => {
      const { web3, user, contractInstance } = await SetUpContract(
        BlankNFT_ERC721,
        pid
      );

      setWeb3(web3);
      setUser(user);
      setContractInstance(contractInstance);
    },
    [BlankNFT_ERC721]
  );

  return (
    <Outer>
      <Banner title={"NFT"} />
      <SubBanner title={pid} />
      <CreateNFTsBtn web3={web3} user={user} blankNFTs={contractInstance} />
      <ShowNfts
        contractAddress={pid}
        web3={web3}
        user={user}
        blankNFTs={contractInstance}
      />
    </Outer>
  );
};

export default Structure;
const Outer = styled.div`
  display: flex;
  flex-direction: column;
`;
