import Onboard from "bnc-onboard";
import { ethers } from "ethers";

import { useEffect, useState } from "react";
import config from '../../config';
import Web3Ctx from "./Web3Ctx";

const { DEPLOYED_NTW_NAME, DEPLOYED_CHAIN_ID, RPC_URL, FORTMATIC_KEY } = config;

const sx = {
  root: {
    display: "flex",
    minHeight: "100vh",
    height: "100%",
    weight: "100%",
    background: "#FFF",
  },
  container: {
    textAlign: "center",
    margin: "auto",
  },
};




const Web3Manager = ({ children }) => {
  const [onboard, setOnboard] = useState(null);
  const [address, setAddress] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [ethersProvider, setEthersProvider] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [networkName, setNetworkName] = useState(DEPLOYED_NTW_NAME);
  const [initDone, setInitDone] = useState(false);




  useEffect(() => {
    console.log('web3 manager mounted');
    initApp();
  }, []);


  const initApp = async () => {
  
    try {
      console.log("Initiating onboard");
      const ob = Onboard({
        networkId: DEPLOYED_CHAIN_ID, // [Integer] The Ethereum network ID your Dapp uses.
        darkMode: false,
        blockPollingInterval: 12000,
        walletSelect: {
          wallets: [
            { walletName: "metamask" },
            { walletName: "coinbase" },
            { walletName: "trust", rpcUrl: RPC_URL },
            { walletName: "authereum" },
            { walletName: "wallet.io", rpcUrl: RPC_URL },
            { walletName: "atoken" },
            {
              walletName: "fortmatic",
              apiKey: FORTMATIC_KEY,
            },
            {
              walletName: "walletConnect",
              rpc: {
                1: RPC_URL,
                4: RPC_URL,
              },
            },
            { walletName: "opera" },
            { walletName: "operaTouch" },
            { walletName: "torus" },
            { walletName: "status" },
            { walletName: "walletLink", rpcUrl: RPC_URL },
            {
              walletName: "trezor",
              appUrl: "ether.cards",
              email: "info@ether.cards",
              rpcUrl: RPC_URL,
            },
            {
              walletName: "ledger",
              rpcUrl: RPC_URL,
            },
          ],
        },
        walletCheck: [
          { checkName: "derivationPath" },
          { checkName: "accounts" },
          { checkName: "connect" },
          { checkName: "network" },
        ],
        subscriptions: {
          wallet: (obWallet) => {
            console.log('OB wallet',obWallet);
            if (obWallet.provider) {
              setWallet(obWallet);
                const provider = new ethers.providers.Web3Provider(
                obWallet.provider,
                "any"
              );
              setEthersProvider(provider);
              window.sessionStorage.setItem("selectedWallet", obWallet.name);
            } else {
              console.log("wallet not found, setting default provider");
              const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
              setEthersProvider(provider);
              setWallet(null);
            }
          },
          address: (obAddress) => {
            setAddress(obAddress);
          },
          network: (network) => {
            setChainId(network);
            // console.log(network);
          },
        },
      });

      const savedWallet = sessionStorage.getItem('selectedWallet');
      if(savedWallet){
        await ob.walletSelect(savedWallet);
        const userReady = await ob.walletCheck();
       // console.log('user ready(with saved wallet)',userReady);
      }else{
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
        setEthersProvider(provider);    
      }

      console.log("init onboard done");

      setOnboard(ob);
      setInitDone(true);
    } catch (e) {
      console.log("onboard init error", e);
    }
  };



  useEffect(()=>{
    console.log('WALLET',wallet);
    if(wallet){
      walletCheck();
    }
  },[wallet]);



  useEffect(() => {
    if (ethersProvider) {
      subscribeNetwork(ethersProvider);
    }
  }, [ethersProvider]);

  useEffect(() => {
    if (address && isWalletConnected() == false) {
      console.log("set address null");
      setAddress(null);
    }
  }, [address]);

  const subscribeNetwork = async (provider) => {
    const network = await provider.getNetwork().catch((e) => {
      console.log("error:", e);
    });
    if (network) {
      setNetworkName(network.name);
      setChainId(network.chainId);
    }
  };

  const isWalletConnected = () => {
    console.log("check wallet state");
    if (onboard) {
      const state = onboard.getState();
      return state.wallet.name != null;
    } else return null;
  };

  const handleConnect = async (e) => {
    console.log('initdone',initDone);
    if (!initDone) return;
    if (onboard) {
      if(e){
        e.stopPropagation();
      }
      
      console.log("reset");
      onboard.walletReset();
      console.log("walletSelect");
      const walletSelected = await onboard.walletSelect();
      console.log('walletselected',walletSelected);
      if(walletSelected){
        onboard.walletCheck();
      }
    }
  };

  const handleDisconnect = () => {
    if (onboard) {
      console.log("logout wallet");
      onboard.walletReset();
      if (window.sessionStorage) {
        window.sessionStorage.removeItem("selectedWallet");
      }
    }
  };

  const walletCheck = async() => {
    if (onboard) {
      await onboard.walletCheck();
    }
  };



  const isCorrectNetwork = chainId === DEPLOYED_CHAIN_ID;

  if (!initDone) {
    return (
      <div style={sx.root}>
        <div style={sx.container}>
         loading
         {/*  <Spinner color="#FF692B" /> */}
        </div>
      </div>
    );
  }

  return (
    <Web3Ctx.Provider
      value={{
        onboard,
        wallet,
        address,
        ethersProvider,
        chainId,
        defaultChainId: config.DEPLOYED_CHAIN_ID,
        handleConnect,
        handleDisconnect,
        isCorrectNetwork,
        walletCheck
      }}
    >
      {children}
    </Web3Ctx.Provider>
  );
};
export default Web3Manager;
