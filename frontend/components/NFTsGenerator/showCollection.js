import { useEffect, useContext, useCallback, useRef, useState } from "react";
import { ContextApI } from "../../contextAPI/NFtsContext";
import styled from "styled-components";
import { ErrorMsg } from "../utils/functions";

import Loading from "../utils/loading";
import { Button } from "../utils/cssUtils";
import Link from "next/link";
const ShowCollection = ({ web3, user, userCollection }) => {
  const { collectionList, setCollectionList } = useContext(ContextApI);
  const limit = 3;
  const offset = useRef(0);
  const [moreLoad, setMoreLoad] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  useEffect(() => {
    if (!userCollection) {
      return;
    }
    setUpOrder();
    return () => {
      setCollectionList([]);
      offsetSetup();
      setMoreLoad(true);
    };
  }, [userCollection]);

  const setUpOrder = useCallback(async () => {
    if (!userCollection) {
      return;
    }
    await offsetSetup();
    await getCollection();
  }, [userCollection]);

  const offsetSetup = async () => {
    offset.current = await userCollection.methods
      .totalCollectionOf(user)
      .call();
  };

  const getCollection = useCallback(async () => {
    SetIsLoading(true);
    const list = await userCollection.methods
      .getUserCollection(user, limit, offset.current)
      .call();

    setCollectionList([...list, ...collectionList]);

    setMoreLoad(list.length === 3);
    offset.current = offset.current - limit;
    SetIsLoading(false);
  }, [userCollection, collectionList]);

  const loadmoreBtn = useCallback(async () => {
    if (offset.current <= 0) {
      ErrorMsg("더 이상 없습니다");
      return setMoreLoad(false);
    }
    await getCollection();
  }, [userCollection, collectionList]);
  if (collectionList.length > 0) {
    return (
      <Outer>
        {isLoading ? <Loading /> : null}
        <TextBox>내 컬렉션</TextBox>
        <UrisBox>
          {collectionList.map((v, index) => {
            return (
              <Link key={index} href={`/nftsGenerator/nfts/${v[0]}`}>
                <Card key={index}>
                  <ImageBox key={index + v[2].slice(0)} uri={v[2]} />
                  <ItemBox key={index + v[4].slice(0)}>
                    {v[4].slice(-2)}
                  </ItemBox>
                  <ItemBox key={index + v[0].slice(0)}>{`${v[0].slice(
                    0,
                    4
                  )}...${v[0].slice(-2)}`}</ItemBox>
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
      </Outer>
    );
  } else {
    return (
      <>
        {isLoading ? <Loading /> : null}
        <TextBox>내 컬렉션</TextBox>
        <EmptyBox>Empty</EmptyBox>
      </>
    );
  }
};

export default ShowCollection;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
`;

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
  cursor: pointer;
  &:hover {
    color: white;
    text-shadow: 0 0 12px ${(props) => props.theme.shadow.lighShadow};
    box-shadow: ${(props) => props.theme.shadow.lightShadow};
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

const ItemBox = styled.div`
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
