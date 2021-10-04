/* eslint-disable react/no-unescaped-entities */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import WavePortal from "../artifacts/contracts/WavePortal.sol/WavePortal.json";
import { contractAddress } from "../constants";
import { Cta } from "../components/Cta";
import { WaveItem } from "../components/WaveItem";

export default function Home() {
  const [waves, setWaves] = useState([]);
  const [currAcc, setCurrAcc] = useState("");
  const [status, setStatus] = useState("connect-wallet");

  useEffect(() => {
    hasWallet();
  }, []);

  const hasWallet = () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure to use Metamask");
      return;
    }

    ethereum.request({ method: "eth_accounts" }).then((acc) => {
      if (acc.length !== 0) {
        setCurrAcc(acc[0]);
        setStatus("init");
        getAllWaves();
      }
    });
  };

  const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("get MetaMask");
    }

    try {
      const acc = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrAcc(acc[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async (message) => {
    const waveportalContract = makeContract();
    const waveTxn = await waveportalContract.wave(message);
    setStatus("loading");
    await waveTxn.wait();
    setStatus("init");
  };

  // const getTotal = async () => {
  //   const waveportalContract = makeContract();
  //   const total = await waveportalContract.getTotalWaves();
  //   setWavesCount(total.toString());
  // };

  const getAllWaves = async () => {
    const waveportalContract = makeContract();
    const waves = await waveportalContract.getAllWaves();

    const mappedWaves = waves.map((wave) => ({
      address: wave.waver.slice(0, 6),
      timestamp: new Date(wave.timestamp * 1000),
      message: wave.message,
    }));
    setWaves(mappedWaves);
    waveportalContract.on("NewWave", (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      setWaves((oldArray) => [
        ...oldArray,
        {
          address: from.slice(0, 6),
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    });
  };

  return (
    <div className=" bg-black h-screen grid-cols-2 grid-flow-row grid">
      <Hero {...{ status, wave, setStatus, connectWallet }} />
      <MessageList {...{ waves, status }} />
    </div>
  );
}

const Hero = ({ wave, status, setStatus, connectWallet }) => (
  <div className="self-center" style={{ width: 660 }}>
    <h1
      style={{ fontSize: 136 }}
      className="text-9xl font-extrabold text-white"
    >
      What's up
    </h1>
    <h2 className="text-8xl font-extrabold" style={{ color: "#C549D7" }}>
      _buildspace🦄
    </h2>
    <div className="flex mt-12" style={{ alignItems: "center" }}>
      <Cta onSend={wave} {...{ setStatus, status, connectWallet }} />
    </div>
  </div>
);

const MessageList = ({ waves, status }) => {
  return (
    <div
      style={{ alignItems: "start", alignContent: "baseline" }}
      className="h-full grid gap-y-4 overflow-hidden overflow-y-auto justify-end"
    >
      {status === "loading" && (
        <div
          className="flex p-4 items-center"
          style={{
            width: 588,
            height: 118,
            backgroundColor: "#D9D9D9",
            borderRadius: 20,
          }}
        >
          <p style={{ fontSize: 37 }}>🧐</p>
          <div className="flex flex-col ml-2">
            <div
              className="mb-2"
              style={{ width: 490, height: 31, backgroundColor: "#ebecf0" }}
            />
            <div
              style={{ width: 350, height: 31, backgroundColor: "#ebecf0" }}
            />
          </div>
        </div>
      )}
      {waves
        .map((wave) => <WaveItem key={wave.timestamp} {...{ wave }} />)
        .reverse()}
    </div>
  );
};

function makeContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const waveportalContract = new ethers.Contract(
    contractAddress,
    WavePortal.abi,
    signer
  );
  return waveportalContract;
}
