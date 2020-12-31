async function getData() {
  try {
    await fetch(`https://api.coingecko.com/api/v3/exchange_rates`)
      .then(response => response.json())
      .then(data => mainData = data.rates);
  }
  catch (error) {
    console.log(error);

  }
  let tBody = document.getElementById('tableBody');

  for (const key in mainData) {
    tBody.innerHTML += '<tr></tr>'
    let lastTrBody = tBody.lastChild;
    lastTrBody.innerHTML += `<td>${mainData[key].name}</td><td>${mainData[key].unit}</td>`

    if (mainData[key].type == 'crypto') {
      lastTrBody.innerHTML += `<td>${(mainData.btc.value / mainData[key].value) * mainData.usd.value}</td>`
    } else {
      lastTrBody.innerHTML += `<td>${mainData[key].value / mainData.usd.value}</td>`
    }
    lastTrBody.innerHTML += `<td>${mainData[key].type}</td>`;
    if (mainData[key].type == 'crypto') {
      document.getElementById("fromCrypto").innerHTML += `<option value="${key}">${mainData[key].name}</option>`
      document.getElementById("toCrypto").innerHTML += `<option value="${key}">${mainData[key].name}</option>`;
    } else {
      document.getElementById("fromCash").innerHTML += `<option value="${key}">${mainData[key].name}</option>`
      document.getElementById("toCash").innerHTML += `<option value="${key}">${mainData[key].name}</option>`;
    }

  }
  document.getElementById("fromCash").children[0].selected = true;
  document.getElementById("toCash").children[19].selected = true;
  document.getElementById("toCrypto").children[1].selected = true;
}

function convertor (type) {
  let amount;
  let fromValue;
  let toValue;
  if (type) {
    amount = numberCash.value;
    fromValue = mainData[fromCash.value].value;
    toValue = mainData[toCash.value].value;
  } else {
    amount = numberCrypto.value;
    fromValue = mainData[fromCrypto.value].value;
    toValue = mainData[toCrypto.value].value;
  }
  let resultValue = ((toValue / fromValue) * amount);
  
  let tempFloat = "" + (resultValue % 1);
  tempFloat = +(tempFloat.substr(1, 9))
  resultValue = addPsik(parseInt(resultValue)) + ("" + tempFloat).substr(1);
  if (type) {
    convertResultCash.innerHTML = `${addPsik(amount)}  <span class="spanHeartbeat">${mainData[fromCash.value].unit} </span> =  ${resultValue} <span class="spanHeartbeat">${mainData[toCash.value].unit} </span>`;
  } else {
    convertResultCrypto.innerHTML = `${addPsik(amount)} <span class="spanHeartbeat">${mainData[fromCrypto.value].unit}</span> = ${resultValue} <span class="spanHeartbeat">${mainData[toCrypto.value].unit}</span>`;
  }
}

function swapTheCoins(type) {
  if (type) {
    let temp = fromCash.value;
    fromCash.value = toCash.value;
    toCash.value = temp;
  } else {
    let temp = fromCrypto.value;
    fromCrypto.value = toCrypto.value;
    toCrypto.value = temp;
  }
}
function addPsik(number) {
  if (number == 0) {
    return number
  }
  let stringNumber = "" + number;
  let newString = "";
  for (let i = stringNumber.length; i > 0; i--) {
    newString += stringNumber[stringNumber.length - i];
    if ((i - 3) % 3 == 1) {
      newString += ','
    }
  }
  return newString;
}
function turnThisButton(buttonId) {
  if (buttonId.style.transform == "rotateY(180deg)") {
    buttonId.style.transform = "rotatey(0deg)";
  } else {
    buttonId.style.transform = "rotateY(180deg)";
  }
}
function switchMoneyType(type) {
  if (type) {
    document.getElementById("cash").style.display = "block";
    document.getElementById("crypto").style.display = "none";
    document.getElementById("cashButton").style = "";
    document.getElementById("cryptoButton").style = "background: #8e8f9b; color :white";
  } else {
    document.getElementById("crypto").style.display = "block";
    document.getElementById("cash").style.display = "none";
    document.getElementById("cashButton").style = "background: #8e8f9b; color :white";
    document.getElementById("cryptoButton").style = "";
  }
}
window.onload = () => {
  getData();
}
let mainData;

