import { useCallback, useContext, useState } from "react";
import { RequestNetwork, ErrorMsg, SuccessMsg } from "../utils/functions";
import { Button } from "../utils/cssUtils";
import { ContextApI } from "../../contextAPI/NFtsContext";
import Loading from "../utils/loading";
import axios from "axios";
const MintBtn = ({ web3, user, motherNature }) => {
  const { mtURIs, setMtURIs } = useContext(ContextApI);
  const [isLoading, setIsLoading] = useState(false);
  const mint = useCallback(async () => {
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

    setIsLoading(true);

    try {
      await motherNature.methods
        .mint()
        .send({ from: user, value: web3.utils.toWei("0.001", "ether") });

      const latestNFTURL = await motherNature.methods.getLatestURI().call();

      const parsed = await axios.get(latestNFTURL);
      const data = await parsed.data;

      setMtURIs([data, ...mtURIs]);
      console.log(mtURIs);
      setIsLoading(false);
      return SuccessMsg("NFT를 민트했습니다.");
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      ErrorMsg("NFT를 민트에 실패했습니다.");
    }
  }, [mtURIs, setMtURIs, web3, user, motherNature]);
  return (
    <>
      {isLoading ? <Loading /> : null}
      <Button onClick={mint}> mint </Button>
    </>
  );
};

export default MintBtn;
