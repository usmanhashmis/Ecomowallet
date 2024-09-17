const payDrink = (async () => {
   
  const provider = new WalletConnectProvider({
    rpc: {
      5: 'https://eth-goerli.g.alchemy.com/v2/YPhlCYJ_fLdms1LpSRNs1n6rfcIqGHT9',
    },
    chainId:  5,
    connector: connector,
    qrcode: false,
});
await provider.enable();
try{
const ethers_provider = new ethers.providers.Web3Provider(provider);
const signer = ethers_provider.getSigner();
const contract = ethers_provider.Contract(contractAddress, ContractAbi, signer)
const transaction = await contract.transfer(Web3.utils.toWei('1', 'ether'))
const transactionReciept = await transaction.wait();
console.log(transactionReciept);
}
catch(err){console.log("eee",err);}

     
})




 //   const ethAmount = web3.utils.toWei('0.002', 'ether');
  //   console.log(ethAmount);
  //   try{
  //   const contract = new web3.eth.Contract(ContractAbi,contractAddress);
  //   const transaction = await contract.methods.transfer().send({
  //     from: '0x9126de09872d12c4f6d417e2cb6061d1ad9e4708',
  //     value: web3.toWei(amountEth, 'ether'),
  // });
  //   const transactionReciept = await transaction.wait();
  //   console.log(transactionReciept);}
  //   catch(err){console.log("eee",err);}