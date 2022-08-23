import Web3 from "web3";
import { toast } from "react-toastify";
export const RequestNetwork = async () => {
  try {
    ErrorMsg("네트워크 Rinkeby를 사용하세요");
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x4" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x4",
              chainName: "Rinkeby",
              rpcUrls: ["https://rpc-mumbai.matic.today"],
            },
          ],
        });
      } catch (addError) {}
    }
  }
};

export const ErrorMsg = (text) => {
  toast.error(text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const SuccessMsg = (text) => {
  toast.success(text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const SetUpContract = async (contract, customAddress = null) => {
  if (typeof window.ethereum === "undefined") {
    ErrorMsg("메타마스크를 설치 하세요.");
    return { web3: null, user: null, contractInstance: null };
  }
  const web3 = new Web3(window.ethereum);

  const addresses = await web3.eth.getAccounts();
  const user = addresses[0];

  if (!user) {
    ErrorMsg("메타마스크를 로그인하세요.");
    return { web3: null, user: null, contractInstance: null };
  }

  const netID = await web3.eth.net.getId();
  if (netID.toString() !== "4") {
    RequestNetwork();
    return { web3: null, user: null, contractInstance: null };
  }

  console.log(customAddress);
  const contractAddress =
    customAddress === null
      ? contract.networks[netID] && contract.networks[netID].address
      : customAddress;

  const contractInstance = await new web3.eth.Contract(
    contract.abi,
    contractAddress
  );
  return {
    web3,
    user,
    contractInstance,
  };
};
