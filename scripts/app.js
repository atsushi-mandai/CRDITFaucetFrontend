const address = "0x1d8d7994Eae6eEee2814B6862474eDc12EB7f58A";
const agent = "0x4cc7DA234ECD0F641fA9b6fa160A30688d097C6d";
const message = document.getElementById("message");

//Connect Wallet Button.
buttonConnectWallet.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    startApp();
  } else {
    window.alert("Install Metamask!");
  }
});

window.ethereum.on("accountsChanged", () => {
  startApp();
});

window.ethereum.on("chainChanged", () => {
  startApp();
});

//Start App.
const startApp = async () => {
  await window.ethereum.enable();
  let chainId = await window.ethereum.request({ method: "eth_chainId" });
  if (chainId == 97) {
    const web3 = await new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const contract = await new web3.eth.Contract(abi, address);
    web3.eth.defaultAccount = account;
    document.getElementById("connectDiv").innerHTML = "Connected!";
    message.innerHTML = "! Connected to " + account;
    const status = await contract.methods.checkMintReady(account).call();
    if (status == false) {
      const unixTime = await contract.methods.addressToTime(account).call();
      const date = new Date(unixTime * 1000);
      const strDate =
        date.getMonth() +
        1 +
        "/" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes();
      document.getElementById("mintDiv").innerHTML = "Wait until " + strDate;
    } else {
      document.getElementById("mintDiv").innerHTML =
        '<button id="buttonFixedAmount">Fixed Amount</button> <button id="buttonRandomAmount">Random Amount</button>';
      document
        .getElementById("buttonFixedAmount")
        .addEventListener("click", async () => {
          contract.methods.mintFixedCRDIT(agent).send({ from: account });
        });
      document
        .getElementById("buttonRandomAmount")
        .addEventListener("click", async () => {
          contract.methods.mintRandomCRDIT(agent).send({ from: account });
        });
    }
  } else {
    window.alert("CRDIT Faucet is for BNB Testnet.");
  }
};
