import { useCallback, useEffect, useRef, useState, useContext } from "react";
import { ContextApI } from "../../contextAPI/NFtsContext";
import { ErrorMsg } from "../utils/functions";
import Loading from "../utils/loading";
import styled from "styled-components";
import axios from "axios";
import { Button } from "../utils/cssUtils";
import Link from "next/link";
const ShowOwnedNftUrls = ({
  web3,
  user,
  motherNature,
  motherNatureAddress,
}) => {
  const { mtURIs, setMtURIs } = useContext(ContextApI);

  const offset = useRef(0);
  const [isLoading, SetIsLoading] = useState(false);
  const [moreLoad, setMoreLoad] = useState(null);
  const limit = 3;
  useEffect(() => {
    console.log(web3);
    console.log(user);
    console.log(motherNature);
    if (!web3 || !user || !motherNature) {
      return;
    }
    console.log("S");
    setUpOrder();
  }, [web3, user, motherNature]);

  const setUpOrder = useCallback(async () => {
    if (!motherNature) {
      return;
    }
    await offsetSetup();
    await getNftUrls();
  }, [web3, user, motherNature]);

  const offsetSetup = useCallback(async () => {
    offset.current = await motherNature.methods.balanceOf(user).call();
  }, [user, motherNature]);

  const getNftUrls = useCallback(async () => {
    SetIsLoading(true);
    const uris = await motherNature.methods
      .getOwnersNftsURIs(user, limit, offset.current)
      .call();

    const data = await Promise.all(
      uris.map(async (uri) => {
        const parsed = await axios.get(uri);
        return await parsed.data;
      })
    );
    offset.current = offset.current - limit;
    const datainOrder = data.reverse();
    setMtURIs([...datainOrder, ...mtURIs]);
    setMoreLoad(data.length === 3 ? true : false);
    SetIsLoading(false);
  }, [motherNature, user, mtURIs]);

  const loadmoreBtn = useCallback(async () => {
    if (offset.current <= 0) {
      ErrorMsg("더 이상 없습니다");
      return setMoreLoad(false);
    }
    await getNftUrls();
  }, [motherNature, user, mtURIs]);

  if (mtURIs.length > 0) {
    return (
      <>
        <TextBox>소유 Nfts</TextBox>
        {isLoading ? <Loading /> : null}
        <>
          <UrisBox>
            {mtURIs.map((v, index) => {
              return (
                <Link
                  key={index}
                  href={`https://testnets.opensea.io/assets/rinkeby/${motherNatureAddress}/${v.name.slice(
                    -1
                  )}`}
                >
                  <Card key={index}>
                    <ImageBox key={index + v.image.slice(0)} uri={v.image} />
                    <NameBox key={index + v.name.slice(0)}>
                      {v.name.slice(-2)}
                    </NameBox>
                  </Card>
                </Link>
              );
            })}
          </UrisBox>
          <Button
            style={{ display: moreLoad ? "block" : "none" }}
            onClick={loadmoreBtn}
          >
            더 보기
          </Button>
        </>
      </>
    );
  } else {
    return (
      <>
        {isLoading ? <Loading /> : null}
        <TextBox>소유 Nfts</TextBox>
        <EmptyBox>Empty</EmptyBox>
      </>
    );
  }
};

const TextBox = styled.div`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-family: ${(props) => props.theme.fonts.enText};
  text-align: left;

  @media all and (max-width: 1300px) {
    padding: 1rem 0;
    margin-top: 2rem;
  }
  @media all and (max-width: 767px) {
    font-size: ${(props) => props.theme.fontSizes.medium};
    letter-spacing: ${(props) => props.theme.fontSizes.medium};
  }
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
const UrisBox = styled.div`
  display: flex;
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

export default ShowOwnedNftUrls;
