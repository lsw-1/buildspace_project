const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log("balance is", hre.ethers.utils.formatEther(contractBalance));

  let waveTxn = await waveContract.wave("Hej");
  waveTxn.wait();
  waveTxn = await waveContract.wave("Hej 2");
  waveTxn.wait();

  contractBalance = await await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log("balance is 2", hre.ethers.utils.formatEther(contractBalance));

  const waves = await waveContract.getAllWaves();
  console.log(waves);
};

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
