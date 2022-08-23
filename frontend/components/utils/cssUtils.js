import styled from "styled-components";

export const EmptySpace = styled.div`
  margin: ${(props) => props.marH} 0;
`;

export const Divider = styled.div`
  height: 0.5rem;
  background: linear-gradient(to left, white, green);
  width: 100vw;
`;

export const Button = styled.button`
  width: 100%;
  outline: thick double white;
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSizes.large};
  letter-spacing: ${(props) => props.theme.fontSizes.Xsmall};
  text-align: center;
  text-transform: uppercase;
  background-color: transparent;
  color: white;
  margin: 2rem 0 2rem 0;
  cursor: pointer;
  transform: scale(0.8);
  &:hover {
    background-color: "#1f2635";
    color: white;
    text-shadow: 0 0 12px ${(props) => props.theme.shadow.lighShadow};
    box-shadow: ${(props) => props.theme.shadow.lightShadow};
  }

  @media all and (max-width: 767px) {
    font-size: ${(props) => props.theme.fontSizes.medium};
    letter-spacing: 0;
  }
`;
