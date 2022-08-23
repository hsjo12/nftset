import { useEffect, useContext, useCallback, useState } from "react";
import { ContextApI } from "../../contextAPI/NFtsContext";
import Loading from "../utils/loading";
const FetchAllTheTokensBalance = ({ user, eevee }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    setPokemonBall,
    setFireStone,
    setDarkStone,
    setWaterStone,
    setLeafStone,
    setEevee,
    setFlareon,
    setUmbreaon,
    setVaporeon,
    setLeafeon,
    setSylbeon,
    setTotalSylbeon,
  } = useContext(ContextApI);

  useEffect(() => {
    if (!eevee) {
      return;
    }
    getTokenBalance();
  }, [eevee]);

  const getTokenBalance = useCallback(async () => {
    try {
      setIsLoading(true);
      const finalNftTotal = await eevee.methods.finalNftNum().call();

      setTotalSylbeon(finalNftTotal);

      let users = new Array(11);
      users = users.fill(user);
      const balls = await eevee.methods
        .balanceOfBatch(users, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .call();

      setPokemonBall(balls[0]);
      setFireStone(balls[1]);
      setDarkStone(balls[2]);
      setWaterStone(balls[3]);
      setLeafStone(balls[4]);
      setEevee(balls[5]);
      setFlareon(balls[6]);
      setUmbreaon(balls[7]);
      setVaporeon(balls[8]);
      setLeafeon(balls[9]);
      setSylbeon(balls[10]);
      return setIsLoading(false);
    } catch (e) {
      console.error(e);
      return setIsLoading(false);
    }
  }, [user, eevee]);
  return <> {isLoading ? <Loading /> : null}</>;
};

export default FetchAllTheTokensBalance;
