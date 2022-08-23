import { useContext } from "react";
import { ContextApI } from "../../contextAPI/NFtsContext";
import { SuccessMsg, ErrorMsg } from "../utils/functions";
import { Button } from "../utils/cssUtils";
import styled from "styled-components";
import { useCallback, useState } from "react";
import axios from "axios";
import BlankNFT_ERC721 from "../../contracts/BlankNFT_ERC721.json";
import Loading from "../utils/loading";
import { useDropzone } from "react-dropzone";

const CreateCollectionBtn = ({ web3, user, userCollectionAddress }) => {
  const { collectionList, setCollectionList } = useContext(ContextApI);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [isLoading, SetIsLoading] = useState(false);

  const changeName = useCallback((e) => {
    setName(e.target.value);
  }, []);
  const changeSymbol = useCallback((e) => {
    setSymbol(e.target.value);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    try {
      if (acceptedFiles.length > 1) {
        return ErrorMsg("이미지 하나만 선택하세요.");
      }
      SetIsLoading(true);
      const uploadFile = acceptedFiles[0];

      axios({
        method: "post",
        url: "https://api.nft.storage/upload",
        data: uploadFile,

        headers: {
          "Content-Type": "image/*",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE}`,
        },
      })
        .then((result) => {
          SetIsLoading(false);
          setCoverImg(`https://${result.data.value.cid}.ipfs.nftstorage.link/`);
          return SuccessMsg("이미지를 업로드했습니다.");
        })
        .catch((error) => {
          SetIsLoading(false);
          console.log("Error uploading file: ", error);
        });
    } catch (error) {
      SetIsLoading(false);
      console.log("Error uploading file: ", error);
      console.error(error.response.data);
      return ErrorMsg("이미지 업로드 실패했습니다.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
  });

  const createNFTBtn = useCallback(
    async (e) => {
      e.preventDefault();
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

      if (name === "" || symbol === "") {
        return ErrorMsg("이름 또는 심볼을 입력하세요.");
      }
      if (coverImg === "") {
        return ErrorMsg("컬렉션 커버이미지를 입력하세요");
      }

      try {
        SetIsLoading(true);
        const blankNFT_ERC721 = await new web3.eth.Contract(
          BlankNFT_ERC721.abi
        );
        const nft = await blankNFT_ERC721
          .deploy({
            data: BlankNFT_ERC721.bytecode,
            arguments: [coverImg, name, symbol, userCollectionAddress],
          })
          .send({ from: user });

        setCollectionList([
          [nft._address, user, coverImg, name, symbol],
          ...collectionList,
        ]);
        SetIsLoading(false);

        setName("");
        setSymbol("");
        setCoverImg("");
        return SuccessMsg("컬렉션을 생성했습니다.");
      } catch (error) {
        SetIsLoading(false);
        console.error(error);
        return ErrorMsg("오류가 발생했습니다.");
      }
    },
    [name, symbol, coverImg, web3, user, userCollectionAddress]
  );

  return (
    <>
      {isLoading ? <Loading /> : null}
      <Form onSubmit={createNFTBtn}>
        <Label htmlFor="name">NFT 이름</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={changeName}
          placeholder="NFT 이름"
          required
        />
        <Label htmlFor="name">NFT 심볼</Label>
        <Input
          id="name"
          type="text"
          value={symbol}
          onChange={changeSymbol}
          placeholder="NFT 심볼"
          required
        />
        {coverImg === "" ? null : <ImageBox uri={coverImg} />}
        <Label htmlFor="name">컬렉션 커버 사진</Label>

        <Drop {...getRootProps({ refKey: "innerRef" })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>파일을 드래그 해주세요</p>
          ) : (
            <p>파일을 드래그하거나 여기를 클릭하세요</p>
          )}
        </Drop>

        <Button type="submit">Create</Button>
      </Form>
    </>
  );
};

export default CreateCollectionBtn;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  outline: thick double white;
`;

const Label = styled.label`
  width: 80%;
  margin: 1rem auto;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.large};
`;
const Input = styled.input`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const Drop = styled.div`
  width: 80%;
  margin: 0 auto;
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
