const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const message = document.querySelector(".message");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
    console.log(newSrc);
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amtValue = amount.value;

    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }

    const fromCurr = document.querySelector(".from select").value.toLowerCase();
    const toCurr = document.querySelector(".to select").value.toLowerCase();

    async function currencyConversion() {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        const convertToEuro = data.eur[fromCurr];
        const convertFromEuro = data.eur[toCurr];

        const currRate = (amtValue/convertToEuro)*convertFromEuro;

        const fromCurrUC = document.querySelector(".from select").value;
        const toCurrUC = document.querySelector(".to select").value;
        const lastUpdate = data.date;

        message.innerText=`${amtValue} ${fromCurrUC} = ${currRate} ${toCurrUC}\nas of ${lastUpdate}`;
    }
    currencyConversion();
});