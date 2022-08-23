import styled from "styled-components";
import { useCallback, useState, useContext } from "react";

import { useDropzone } from "react-dropzone";
import { ErrorMsg, SuccessMsg } from "../../utils/functions";
import { Button } from "../../utils/cssUtils";
import Loading from "../../utils/loading";
import axios from "axios";
import { ContextApI } from "../../../contextAPI/NFtsContext";
const CreateNFTsBtn = ({ web3, user, blankNFTs }) => {
  const [nftImage, setNFTImage] = useState("");
  const [nftUri, setNftUri] = useState("");
  const [isLoading, SetIsLoading] = useState(false);
  const { blankNFTURIs, setBlankNFTURIs } = useContext(ContextApI);
  const getLatestNFTId = useCallback(async () => {
    const id = await blankNFTs.methods.id().call();
    return `#${id}`;
  }, [blankNFTs]);
  const jsonGenerator = useCallback(
    async (_uri) => {
      const name = await getLatestNFTId();
      return {
        name: name,
        description: "created by NFTs",
        image: _uri,
      };
    },
    [blankNFTs]
  );

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        return ErrorMsg("이미지 하나만 선택하세요.");
      }
      try {
        SetIsLoading(true);
        const uploadFile = acceptedFiles[0];

        const uploadImage = await axios({
          method: "post",
          url: "https://api.nft.storage/upload",
          data: uploadFile,

          headers: {
            "Content-Type": "image/*",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE}`,
          },
        });
        const data = await jsonGenerator(
          `https://${uploadImage.data.value.cid}.ipfs.nftstorage.link/`
        );

        setNFTImage(
          `https://${uploadImage.data.value.cid}.ipfs.nftstorage.link/`
        );
        const uploadJson = await axios({
          method: "post",
          url: "https://api.nft.storage/upload",
          data: data,

          headers: {
            "Content-Type": "json/*",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE}`,
          },
        });

        setNftUri(`https://${uploadJson.data.value.cid}.ipfs.nftstorage.link/`);
        SetIsLoading(false);
        return SuccessMsg("이미지 업로드 했습니다.");
      } catch (error) {
        SetIsLoading(false);
        console.log("Error uploading file: ", error);
        console.error(error);
        return ErrorMsg("이미지 업로드 실패했습니다.");
      }
    },
    [web3, user, blankNFTs]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
  });

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
    if (nftUri === "") {
      return ErrorMsg("이미지를 업로드 하지 않았습니다.");
    }

    try {
      SetIsLoading(true);
      await blankNFTs.methods.mint(nftUri).send({ from: user });
      const data = await jsonGenerator(`${nftImage}`);
      data.name = `#${Number(data.name.slice(1)) - 1}`;

      setBlankNFTURIs([data, ...blankNFTURIs]);
      setNFTImage("");
      SetIsLoading(false);
      return SuccessMsg("민트 했습니다.");
    } catch (error) {}
  }, [blankNFTs, nftUri, user, blankNFTURIs]);
  return (
    <>
      {isLoading ? <Loading /> : null}
      {nftImage === "" ? null : <ImageBox uri={nftImage} />}

      <Drop {...getRootProps({ refKey: "innerRef" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>파일을 드래그 해주세요</p>
        ) : (
          <p>파일을 드래그하거나 여기를 클릭하세요</p>
        )}
      </Drop>
      <Button onClick={mint}>Mint</Button>
    </>
  );
};

export default CreateNFTsBtn;
const Drop = styled.div`
  width: 100%;
  margin: 3rem auto;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.medium};
  background-color: #6e6e6e29;
  &:hover {
    color: white;
    text-shadow: 0 0 12px ${(props) => props.theme.shadow.lighShadow};
    box-shadow: ${(props) => props.theme.shadow.lightShadow};
  }
`;
const ImageBox = styled.div`
  height: 500px;
  background: url(${(props) => props.uri});
  display: ${(props) => (props.uri === "" ? "none" : "block")};
  margin: 1rem;
  background-size: cover;
  background-position: center;
`;
