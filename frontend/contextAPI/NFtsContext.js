import { createContext, useState } from "react";

export const ContextApI = createContext();

export const NFtsContext = ({ children }) => {
  const [mtURIs, setMtURIs] = useState([]);
  const [pokemonBall, setPokemonBall] = useState(0);
  const [fireStone, setFireStone] = useState(0);
  const [darkStone, setDarkStone] = useState(0);
  const [waterStone, setWaterStone] = useState(0);
  const [leafStone, setLeafStone] = useState(0);
  const [eevee, setEevee] = useState(0);
  const [flareon, setFlareon] = useState(0);
  const [umbreaon, setUmbreaon] = useState(0);
  const [vaporeon, setVaporeon] = useState(0);
  const [leafeon, setLeafeon] = useState(0);
  const [sylbeon, setSylbeon] = useState(0);
  const [totalSylbeon, setTotalSylbeon] = useState(0);
  const [collectionList, setCollectionList] = useState([]);

  const [blankNFTURIs, setBlankNFTURIs] = useState([]);
  return (
    <ContextApI.Provider
      value={{
        mtURIs,
        setMtURIs,
        pokemonBall,
        setPokemonBall,
        fireStone,
        setFireStone,
        darkStone,
        setDarkStone,
        waterStone,
        setWaterStone,
        leafStone,
        setLeafStone,
        eevee,
        setEevee,
        flareon,
        setFlareon,
        umbreaon,
        setUmbreaon,
        vaporeon,
        setVaporeon,
        leafeon,
        setLeafeon,
        sylbeon,
        setSylbeon,
        totalSylbeon,
        setTotalSylbeon,
        collectionList,
        setCollectionList,
        blankNFTURIs,
        setBlankNFTURIs,
      }}
    >
      {children}
    </ContextApI.Provider>
  );
};
