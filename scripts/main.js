// Variables.
var contract;
var address = "0x1d8d7994Eae6eEee2814B6862474eDc12EB7f58A";

const ethereumButton = document.querySelector(".enableEthereumButton");
const showAccount = document.querySelector(".showAccount");
const connected = document.querySelector(".connected");
const test = document.querySelector(".test");

// Connects to Metamask.
ethereumButton.addEventListener("click", () => {
  // Checks if the Metamask is installed.
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    window.alert("Mcetamask isn't installed.");
  }
  walletInfo();
});

async function walletInfo() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const account = accounts[0];
  const web3 = new Web3(window.ethereum);
  contract = new web3.eth.Contract(abi, address);
  const result = contract.methods.checkMintReady(account).call();
  showAccount.innerHTML = "Connected to " + account;
  connected.innerHTML = "<p>Ready to go!</p>";
  test.innerHTML = result;
  console.log(result);
}
