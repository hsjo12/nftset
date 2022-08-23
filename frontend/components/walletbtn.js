import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { RequestNetwork, ErrorMsg } from "./utils/functions";

const WalletBtn = () => {
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      detectMetamask();
    }
  }, [userAddress]);
  useEffect(() => {
    window.ethereum.on("chainChanged", (chainId) => {
      if (chainId.toString() !== "4") {
        return RequestNetwork();
      }
    });

    window.ethereum.on("accountsChanged", (accounts) => {
      setUserAddress(
        `${accounts.toString().slice(0, 4)}...${accounts.toString().slice(-3)}`
      );
    });
  }, []);

  const detectMetamask = useCallback(async () => {
    const web3 = await new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    if (account) {
      setUserAddress(`${account.slice(0, 4)}...${account.slice(-3)}`);
    } else {
      setUserAddress(null);
    }
  }, []);

  const connect = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];
      setUserAddress(`${account.slice(0, 4)}...${account.slice(-3)}`);
      const web3 = new Web3(window.ethereum);
      const netID = await web3.eth.net.getId();

      if (netID.toString() !== "4") {
        RequestNetwork();
      }
    } else {
      return ErrorMsg("메타마스크를 설치하세요.");
    }
  }, []);

  return (
    <>
      {userAddress ? (
        <Addres>{userAddress} </Addres>
      ) : (
        <Wallet onClick={connect}>Connect</Wallet>
      )}
    </>
  );
};

const Wallet = styled.div`
  border-radius: 2rem;
  cursor: pointer;
  background-color: #22333b;
  padding: 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.medium};
  &:hover {
    text-shadow: ${(props) => props.theme.shadow.textShadow};
  }

  @media all and (max-width: 767px) {
    width: 100%;
    text-align: center;
    border-radius: 0rem;
    background-color: transparent;
  }
`;

const Addres = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};

  @media all and (max-width: 767px) {
    width: 100%;
    text-align: center;
  }
`;
export default WalletBtn;
