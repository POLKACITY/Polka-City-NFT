var web3Provider= null
var contracts= {}
var gAccount = ""
var web3 = null

var tokenAddress = "0xdBc3f5F6275Effd0129E88B5f3E865C18dd861e5"
var nftAddress = "0x4A0abDB76C368273cb3B8C554e12FFf24d620B84"
var sellerAddress = "0xfE5A231cf788AEE14fE65A3851E9729FB9B3A5e1"
var assetTypes = [
  {
    id: 1,
    name: "Compact taxi",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Compact%20Taxi.png",
    price: 1500,
    count: 0
  },
  {
    id: 2,
    name: "Sedan taxi",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Sedan%20taxi.png",
    price: 3000,
    count: 0
  },
  {
    id: 3,
    name: "Compact SUV",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Compact%20SUV%20taxi.png",
    price: 7500,
    count: 0
  },
  {
    id: 4,
    name: "Van taxi",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Van%20taxi.png",
    price: 45,
    count: 0
  },
  {
    id: 5,
    name: "Limo",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Limo.png",
    price: 20,
    count: 0
  },
  {
    id: 6,
    name: "Gas station",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Petro%20Station.png",
    price: 35,
    count: 0
  },
  {
    id: 7,
    name: "Electric Car Station",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Electric%20Station.png",
    price: 85,
    count: 0
  },
  {
    id: 8,
    name: "CAR Wash",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Carwash.png",
    price: 40,
    count: 0
  },
  {
    id: 9,
    name: "Hotel",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Hotel.png",
    price: 90000,
    count: 0
  },
  {
    id: 10,
    name: "Restaurant",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Restaurant.png",
    price: 55000,
    count: 0
  },
  {
    id: 11,
    name: "Shopping Center",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Shop.png",
    price: 105000,
    count: 0
  },
  {
    id: 12,
    name: "Disco",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Disco.png",
    price: 50000,
    count: 0
  },
  {
    id: 13,
    name: "Hotdog Stand",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Hotdog.png",
    price: 22500,
    count: 0
  },
  {
    id: 14,
    name: "Car rental",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Car%20Rental.png",
    price: 30000,
    count: 0
  },
  {
    id: 15,
    name: "Car repair",
    image: "https://raw.githubusercontent.com/POLKACITY/Polka-City-NFT/main/Car%20Repair.png",
    price: 45000,
    count: 0
  },
]

const tokenAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CROWDSALE_END","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CROWDSALE_START","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CSALE_HARDCAP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CSALE_WEI_FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"remaining","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bytes","name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"burnUnsold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"buy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"contractsWhiteList","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disableTXLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableTXLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"getLockedBalance","outputs":[{"internalType":"uint256","name":"lockedBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_contractAddress","type":"address"}],"name":"includeWhiteList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastTXBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"limitTransactions","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"releaseTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_contractAddress","type":"address"}],"name":"removeWhiteList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"salesWallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"soldOnCSale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"timeLocks","outputs":[{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"uint256","name":"lockedBalance","type":"uint256"},{"internalType":"uint128","name":"baseDate","type":"uint128"},{"internalType":"uint64","name":"step","type":"uint64"},{"internalType":"uint64","name":"tokensStep","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"supply","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
const nftAbi = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"assetsPerType","outputs":[{"internalType":"uint32","name":"maxAmount","type":"uint32"},{"internalType":"uint32","name":"minedAmount","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getTokenDetails","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"mineableTypes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint32","name":"_assetType","type":"uint32"}],"name":"mint","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_scaddress","type":"address"}],"name":"setSellingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const sellerAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerSet","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"assetPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"address","name":"_token","type":"address"},{"internalType":"bytes","name":"_extraData","type":"bytes"}],"name":"receiveApproval","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellingWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

accountPermission = async () => {
  try {
    window.accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log((window.accounts))
    $("#submitorder").prop("disabled", false)
    return true
  } catch (e) {
    console.log("User rejected the request")
    alert("User rejected the request")
    $("#submitorder").prop("disabled", true)
  }
}

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
  gMetamaskInstalled = true
  //accountPermission()
  //ethereum.on('accountsChanged', function (accounts) {
  //console.log("Account changed")
  //gAccount = accounts[0]
  //});
} else {
  gMetamaskInstalled = false
}

checkMetamask = function() {
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    $("#submitorder").prop("disabled", false)
  } else {
    $("#submitorder").prop("disabled", true)
  }
}



getAccounts = async () => {
  try {
    if (web3 == null) {
      await setweb3()
    }
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    gAccount = accounts[0]
    return true
  } catch (e) {
    console.log("User rejected the request")
    return false
  }
}

setweb3 = async (provider) => {
  await ethereum.enable()
  window.web3 = await new Web3(ethereum);
}

async function gaw3() {
  await ethereum.enable()
  web3.eth.getBalance(web3.utils.toChecksumAddress(accounts[0])).then((balance) => {console.log(balance)})

}

const countAssets = async (caccount) => {
  let nftContract = new web3.eth.Contract(nftAbi, nftAddress)
  ethereum.enable
  return nftContract.methods.balanceOf(caccount).call().then(count=>{
    console.log("1")
    return count
  })
}

const getAssetIndex = async (caccount, ownerIndex) => {
  let nftContract = new web3.eth.Contract(nftAbi, nftAddress)
  ethereum.enable
  return nftContract.methods.tokenOfOwnerByIndex(caccount, ownerIndex).call().then(tIndex=>{
    console.log("3")
    return parseInt(tIndex)
  })
}

const getAssetDetails = async(tokenIndex) =>{
  let nftContract = new web3.eth.Contract(nftAbi, nftAddress)
  ethereum.enable
  return nftContract.methods.getTokenDetails(tokenIndex).call().then(details=>{
    console.log("4")
    return parseInt(details)
  })
}

const loadData = async () => {
  for (i=0;i<assetTypes.length;i++) {
    assetTypes[i].count=0
  }
  gAccount = $("#name").val()
  await setweb3()
  let numassets = await countAssets(gAccount)
  console.log("2")
  for (i=0;i<numassets;i++) {
    let tIndex = await getAssetIndex(gAccount, i)
    let tDetails = await getAssetDetails(tIndex)
    let arrIndex = tDetails/100000000
    console.log(arrIndex)
    assetTypes[arrIndex-1].count = assetTypes[arrIndex-1].count + 1
  }
  console.log("fin")
  fillAssets()
}




async function fillAssets() {
  $("#assets").html("")
  $("#assets").append('<div style="display: grid; grid-template-columns: auto auto; grid-auto-rows: 14em; grid-gap: 10px; padding: 1em; margin-bottom: 2em;" id="assetsgrid"></div>')
  assetTypes.forEach(element=>{
    toinsert = `<div style="height: 10em !important;"><div style="width: 45%; float: left;">
      <img style="max-height: 8em;" src="${element.image}">
      </div>
      <div style="width: 50%; float: right; text-align: center;">
        <h2 style="margin-top:0.2em; margin-bottom:0.2em;">${element.name}</h2>
        <h3 style="margin-top:0.2em; margin-bottom:0.4em;">${element.price} POLC</h3>
        <h4 style="margin-top:0.2em; margin-bottom:0.4em;">Owned: ${element.count}</span></h4>
        <!-- <button style="background-color: #4CAF50; border: none;color: white;padding: 12px 32px;text-align: center; text-decoration: none; display: inline-block; font-size: 16px !important;" 
        onclick="buyAsset(${element.id})">Buy</button> -->
        </div>
      </div>`
      $("#assetsgrid").append(toinsert)
  })
}

async function buyAsset(assetId) {
  if (assetId > 3) {
    alert("we are not selling that asset yet")
    return
  }
  let sellContract = new web3.eth.Contract(tokenAbi, tokenAddress)
  ethereum.enable
  sellContract.methods.approveAndCall(sellerAddress, web3.utils.toWei(assetTypes[assetId-1].price+""), "0x0"+assetId).send({from: gAccount})
  .then(result=>{
    console.log(result)
  }).catch(err=>console.log(err))
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

setInterval(function(){
  if (web3 != null) {
    //loadData()
  }
}, 30000)

$("#wf-form-Email-Form-2").on("submit", function(event) {
  loadData()
  return false
})