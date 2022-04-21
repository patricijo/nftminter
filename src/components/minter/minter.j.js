const startMint = async () => {
  ///reset states and errors
  setStatus({});
  setError();

  handleAddStatus({
    id: "cyw",
    text: "Connecting Your Wallet...",
    state: "loading",
  });

  handleRemoveStatus({ id: "wcnfaw" });

  try {
    await requestAccount();
  } catch (error) {
    console.log(error.code);

    handleAddStatus({
      id: "pcya",
      text: "Please connect your Account",
      state: "error",
    });
    return;
  }

  handleRemoveStatus({ id: "pcya" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  let network;
  try {
    network = await provider.getNetwork();
  } catch (error) {
    setError({ code: error.code, text: error.message, id: 3 });
    return;
  }

  if (network.chainId !== 80001) {
    setError({ code: "error.code", text: "Please select the right network" });
    //set network to polygon chain
    try {
      await selectNetwork();
    } catch (error) {
      setError({ code: error.code, text: error.message, id: 4 });
      return;
    }
  }

  handleAddStatus({
    id: "uyi",
    text: "Uploading your Image...",
    state: "loading",
  });

  if (!uploadedFile) {
    let img_ipfs_address;

    try {
      img_ipfs_address = await client.put([NFTData.file], {});
    } catch (error) {
      setError({ code: error.code, text: error.message, id: 5 });
      return;
    }

    setUploadedFile(img_ipfs_address);
  }

  handleChangeStatus({ id: "uyi", state: "checked" });

  //sign the transaction
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, NFTMINTER.abi, signer);

  let transaction;
  try {
    transaction = await contract.mint(
      NFTData.title,
      NFTData.description,
      "ipfs://" + uploadedFile + "/" + NFTData.file.name
    );
  } catch (error) {
    setError({ code: error.code, text: error.message, id: 6 });
    return;
  }

  try {
    await transaction.wait();
  } catch (error) {
    setError({ code: error.code, text: error.message, id: 7 });
    return;
  }
};
