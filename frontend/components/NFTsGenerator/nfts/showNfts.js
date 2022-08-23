import { useEffect, useContext, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import Loading from "../../utils/loading";
import axios from "axios";
import { ContextApI } from "../../../contextAPI/NFtsContext";
import { Button } from "../../utils/cssUtils";
import { ErrorMsg } from "../../utils/functions";
import Link from "next/link";
const ShowNfts = ({ contractAddress, web3, user, blankNFTs }) => {
  const { blankNFTURIs, setBlankNFTURIs } = useContext(ContextApI);
  const offset = useRef(0);
  const limit = 3;
  const [moreLoad, setMoreLoad] = useState(true);
  const [isLoading, SetIsLoading] = useState(false);

  useEffect(() => {
    if (!blankNFTs) {
      return;
    }
    setUpOrder();

    return () => {
      setBlankNFTURIs([]);
      offsetSetup();
      setMoreLoad(true);
    };
  }, [blankNFTs]);

  const setUpOrder = useCallback(async () => {
    if (!blankNFTs) {
      return;
    }
    await offsetSetup();
    await getURIs();
  }, [blankNFTs, user]);

  const offsetSetup = useCallback(async () => {
    offset.current = await blankNFTs.methods.balanceOf(user).call();
  }, [blankNFTs, user]);
  const getURIs = useCallback(async () => {
    try {
      SetIsLoading(true);
      console.log(offset.current);
      console.log(user);
      console.log(blankNFTs);
      const uris = await blankNFTs.methods
        .getOwnersNftsURIs(user, limit, offset.current)
        .call();
      console.log(uris);
      const data = await Promise.all(
        uris.map(async (uri) => {
          const parsed = await axios.get(uri);
          return await parsed.data;
        })
      );
      offset.current = offset.current - limit;

      const datainOrder = data.reverse();
      setBlankNFTURIs([...datainOrder, ...blankNFTURIs]);
      setMoreLoad(data.length === 3 ? true : false);
      SetIsLoading(false);
    } catch (e) {
      SetIsLoading(false);
      console.error(e);
      return ErrorMsg("오류가 발생했습니다.");
    }
  }, [blankNFTs, user, blankNFTURIs]);

  const loadmoreBtn = useCallback(async () => {
    if (offset.current <= 0) {
      ErrorMsg("더 이상 없습니다");
      return setMoreLoad(false);
    }
    await getNftUrls();
  }, [blankNFTs, user, blankNFTURIs]);

  if (blankNFTURIs.length > 0) {
    return (
      <>
        {isLoading ? <Loading /> : null}
        <TextBox>내 NFTs</TextBox>
        <UrisBox len={blankNFTURIs.length}>
          {blankNFTURIs.map((v, index) => {
            return (
              <Link
                key={index}
                href={`https://testnets.opensea.io/assets/rinkeby/${contractAddress}/${v.name.slice(
                  1
                )}`}
              >
                <Card>
                  <ImageBox uri={v.image} />
                  <NameBox>{v.name.slice(-2)}</NameBox>
                </Card>
              </Link>
            );
          })}
        </UrisBox>
        <Button
          style={{
            display: moreLoad || blankNFTURIs.length > 0 ? "block" : "none",
          }}
          onClick={loadmoreBtn}
        >
          더 보기
        </Button>
      </>
    );
  } else {
    return (
      <>
        {isLoading ? <Loading /> : null}
        <TextBox>내 NFTs</TextBox>
        <EmptyBox>Empty</EmptyBox>
      </>
    );
  }
};

export default ShowNfts;

const TextBox = styled.div`
  width: 100%;
  font-size: ${(props) => props.theme.fontSizes.large};
  font-family: ${(props) => props.theme.fonts.krText};
  text-align: left;
  font-weight: 700;
  @media all and (max-width: 1300px) {
    padding: 1rem 0;
    margin-top: 2rem;
  }
  @media all and (max-width: 767px) {
    font-size: ${(props) => props.theme.fontSizes.medium};
    letter-spacing: ${(props) => props.theme.fontSizes.medium};
  }
`;
const UrisBox = styled.div`
  display: ${(props) => (props.len === 0 ? "none" : "flex")};
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 1rem;
  @media all and (max-width: 767px) {
    flex-direction: column;
    padding: 0rem;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin: 0.5rem;
  width: 25%;
  box-shadow: ${(props) => props.theme.shadow.darkShadow};
  background-color: #e0e0e00a;

  &:hover {
    background-color: #e0e0e0;
    color: black;
    cursor: pointer;
  }
  @media all and (max-width: 767px) {
    width: 100%;
    margin: 0.5rem auto;
    padding: 0rem;
  }
`;

const ImageBox = styled.div`
  height: 300px;
  background: url(${(props) => props.uri});
  background-size: cover;
  background-position: center;
`;

const NameBox = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};
  text-align: center;
`;
const EmptyBox = styled.div`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-family: ${(props) => props.theme.fonts.enText};
  text-align: center;
  background-color: ${(props) => props.theme.colors.darkGreyColor};
  padding: 5rem;
  margin: 2rem 0;
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSizes.large};
  letter-spacing: ${(props) => props.theme.fontSizes.large};
  text-align: center;
  text-transform: uppercase;
  @media all and (max-width: 1300px) {
    padding: 1rem 0;
    margin-top: 2rem;
  }
  @media all and (max-width: 767px) {
    font-size: ${(props) => props.theme.fontSizes.medium};
    letter-spacing: ${(props) => props.theme.fontSizes.medium};
  }
`;
