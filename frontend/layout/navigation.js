import styled, { keyframes } from "styled-components";
import Link from "next/link";
import WalletBtn from "../components/walletbtn";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenNow = useCallback((value) => {
    setIsOpen(value);
  }, []);
  return (
    <NavBox>
      <WalletBtnBox>
        <WalletBtn>Connect</WalletBtn>
      </WalletBtnBox>
      <NavMenuBox>
        <Link href="/">
          <Logo>NFTs</Logo>
        </Link>
        <Link href="/mathernature">
          <NavItem>Mother Nature</NavItem>
        </Link>

        <Link href="/eevee">
          <NavItem>Eevee</NavItem>
        </Link>
        <Link href="/nftsGenerator/createMyCollection">
          <NavItem>Creator</NavItem>
        </Link>
      </NavMenuBox>

      <NavMenuBox2>
        <NaveSlideBox isOpen={isOpen}>
          <CloseBox onClick={() => isOpenNow(false)}>
            <FontAwesomeIcon icon={faTimes} className="icon-faTimes" />
          </CloseBox>
          <NavSlideItemBox>
            <Link href="/mathernature">
              <NaveSlideItem onClick={() => isOpenNow(false)}>
                MotherNature
              </NaveSlideItem>
            </Link>
            <Link href="/eevee">
              <NaveSlideItem onClick={() => isOpenNow(false)}>
                Eevee
              </NaveSlideItem>
            </Link>
            <Link href="/nftsGenerator/createMyCollection">
              <NaveSlideItem onClick={() => isOpenNow(false)}>
                NFTs creator
              </NaveSlideItem>
            </Link>
          </NavSlideItemBox>
        </NaveSlideBox>
        <Link href="/">
          <Logo>NFTs</Logo>
        </Link>

        <NavItem2 onClick={() => isOpenNow(true)}>
          <FontAwesomeIcon icon={faBars} className="icon-bars" />
        </NavItem2>
      </NavMenuBox2>
    </NavBox>
  );
};

const NavBox = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0rem;
  flex-direction: column;
`;
const WalletBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NavMenuBox = styled.div`
  display: flex;
  justify-content: space-around;
  @media all and (max-width: 767px) {
    display: none;
  }
`;

const Logo = styled.div`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  letter-spacing: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-transform: uppercase;
  &:hover {
    text-shadow: ${(props) => props.theme.shadow.textShadow};
  }
  @media all and (max-width: 767px) {
    width: 80%;
    text-align: center;
  }
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  text-transform: capitalize;
  font-size: ${(props) => props.theme.fontSizes.medium};
  &:hover {
    text-shadow: ${(props) => props.theme.shadow.textShadow};
  }
  @media all and (max-width: 767px) {
    display: none;
  }
`;
const NavMenuBox2 = styled.div`
  display: none;
  @media all and (max-width: 767px) {
    display: flex;
    justify-content: space-around;
  }
`;

const bounce = keyframes`
0% {
  transform: scale(1);
}

50% {
  transform: scale(1.5);
}

100% {
  transform: scale(1);
}
`;
const NavItem2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.large};
  width: 20%;
  cursor: pointer;
  animation: ${bounce} 2s 1s infinite linear alternate;
`;
const NaveSlideBox = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: ${(props) => (props.isOpen ? "0.8" : "0")};
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
`;
const CloseBox = styled.div`
  display: flex;
  justify-content: end;
  font-size: ${(props) => props.theme.fontSizes.large};
  margin: 1rem 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const NavSlideItemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.large};
  text-transform: capitalize;
  margin-top: 50%;
`;

const NaveSlideItem = styled.div`
  width: 100%;
  text-align: center;
  &:hover {
    cursor: pointer;
    text-shadow: ${(props) => props.theme.shadow.textShadow};
  }
`;
export default Navigation;
