const modelSelect = document.getElementById("modelSelect")
const areaRange = document.getElementById("areaRange")
const areaValue = document.getElementById("areaValue")
const priceEl = document.getElementById("price")
const houseImage = document.getElementById("houseImage")

models.forEach((m,i)=>{

let option = document.createElement("option")
option.value = i
option.textContent = m.name + " — " + m.price + " грн/м²"

modelSelect.appendChild(option)

})

function calculate(){

let model = models[modelSelect.value]

let area = areaRange.value
let facade = Number(document.getElementById("facade").value)
let terrace = Number(document.getElementById("terrace").value)

let price = model.price * area + facade + terrace

priceEl.innerText = price.toLocaleString()

houseImage.src = model.image

areaValue.innerText = area + " м²"

}

modelSelect.onchange = calculate
areaRange.oninput = calculate
document.getElementById("facade").onchange = calculate
document.getElementById("terrace").onchange = calculate

calculate()

document.getElementById("orderBtn").onclick = function(){

let data = {

model: models[modelSelect.value].name,
area: areaRange.value,
price: priceEl.innerText

}

fetch("https://your-bot-api/order",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

})

.then(()=>alert("Заявка отправлена"))

}
