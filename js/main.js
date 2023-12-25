// const url = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=24.12.2023'
// const request = fetch(url)
// console.log(request);

let checkNow

const tabPageClickToTarget = () => {
   const click = document.querySelectorAll('[class*="click-"]')
   let thisClickGroup = []
   let item
   if(click !== null){
      click.forEach(itemClick => {
         itemClick.addEventListener('click', () => {
            item = itemClick
            thisClickGroup = []
            const perentGroupName = itemClick.parentElement.className
            click.forEach(clearItem => clearItem.parentElement.className 
            === perentGroupName ? thisClickGroup.push(clearItem) : 0)
            const itemName = item.className.match(/\bclick-\w+\b/g).join(' ')
            const itemIndex = itemName.split('click-').join('')
            const itemTarget = document.querySelectorAll(`.targetOf-${itemIndex}`)
            const targetGroup = document.querySelectorAll('[class*="targetOf-"]')
            
            const eventClickName = item.className.match(/\baddClass-\w+\b/g).join(' ')
            const eventClickIndex = eventClickName.split('addClass-').join('')
            console.log(itemTarget);
            targetGroup.forEach(targetItem => targetItem.style.display = 'none')
            click.forEach(clearItem => clearItem.classList.remove(eventClickIndex))
            itemTarget.forEach(item => item.style.display = 'flex')
            item.classList.add(eventClickIndex)
            
         })
      })
   }
}
//function of tab page
tabPageClickToTarget()


let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth() + 1; 
let day = currentDate.getDate();
let formattedDate = `${day}.${month}.${year}`;
document.querySelector('.todayDate').textContent = formattedDate

let time = 60
const clockDisplay = document.querySelector('.timer')
const timer = () => setInterval(()=>{
   if(time === 60){
      privatbank()
      console.log('dow');
   }
   if(time > 1){
      time--
   }else{
      time = 60
   }
   clockDisplay.textContent = time
},1000)
timer()



const url2 = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
async function privatbank(){
   try{
      const fillCars = await fetch(url2)
      const dataCours = await fillCars.json()
      console.log(dataCours);
      document.querySelector('.usdBayH').innerHTML = Math.floor(dataCours[1].buy * 10) / 10
      document.querySelector('.usdSaleH').innerHTML = Math.floor(dataCours[1].sale * 10) / 10
      document.querySelector('.eurBayH').innerHTML = Math.floor(dataCours[0].buy * 10) / 10
      document.querySelector('.eurSaleH').innerHTML = Math.floor(dataCours[0].sale * 10) / 10
   }catch(error){
      document.querySelector('.container').textContent = 'REQUEST ERROR'
      document.querySelector('.container').style.fontSize = '36px'
   }
}



const newsUrl = 'https://newsapi.org/v2/everything?q=tesla&from=2023-11-25&sortBy=publishedAt&apiKey=fa2e43ea7f044f138981926ddc9a94d7'
async function geNews(){
   try{
      const request = await fetch(newsUrl)
      const data = await request.json()
      
      const card = document.querySelector('.card')
      const img = document.createElement('img')
      const title = document.createElement('h3')
      const p = document.createElement('p')

      console.log(data.articles);

      img.setAttribute('src',data.articles[1].urlToImage)
      title.textContent = data.articles[1].title
      p.textContent = data.articles[1].description

      card.insertAdjacentElement('afterbegin', img)
      card.insertAdjacentElement('beforeend', title)
      card.insertAdjacentElement('beforeend', p)

   }catch(error){
      document.querySelector('.container').textContent = 'REQUEST ERROR'
      document.querySelector('.container').style.fontSize = '36px'
   }
}

geNews()

let data1 = [0, 20, 15, 25, 30, 15, 30];
let data2 = [-25, 15, 30, 10, 20, 25, 20];
let data3 = [-15, 30, 10, 20, 25, 20, 30];

let chartContainer = document.getElementById('chart');
let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');

function createLine(data, color) {
  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let pathData = 'M 0 ' + (100 - data[0]);
  for (let i = 1; i < data.length; i++) {
    pathData += ' L ' + (i * 100) + ' ' + (100 - data[i]);
  }
  path.setAttribute('d', pathData);
  path.setAttribute('stroke', color);
  path.setAttribute('fill', 'none');
  return path;
}

let line1 = createLine(data1, 'blue');
let line2 = createLine(data2, 'red');
let line3 = createLine(data3, 'green');

svg.appendChild(line1);
svg.appendChild(line2);
svg.appendChild(line3);

chartContainer.appendChild(svg);

console.log(formattedDate);


const urlAll = `https://api.privatbank.ua/p24api/exchange_rates?json&date=${formattedDate}`
async function getAllCours(url){
   try{
      const fillCars = await fetch(url)
      const dataCours = await fillCars.json()
      console.log(dataCours.exchangeRate);
      document.querySelector('.usdBay').innerHTML = Math.floor(dataCours.exchangeRate[23].saleRateNB * 10) / 10
      document.querySelector('.usdSale').innerHTML = Math.floor(dataCours.exchangeRate[23].purchaseRateNB * 10) / 10

      document.querySelector('.eurBay').innerHTML = Math.floor(dataCours.exchangeRate[8].saleRateNB * 10) / 10
      document.querySelector('.eurSale').innerHTML = Math.floor(dataCours.exchangeRate[8].purchaseRateNB * 10) / 10

      document.querySelector('.chfBay').innerHTML = Math.floor(dataCours.exchangeRate[4].saleRateNB * 10) / 10
      document.querySelector('.chfSale').innerHTML = Math.floor(dataCours.exchangeRate[4].purchaseRateNB * 10) / 10

      document.querySelector('.gbrBay').innerHTML = Math.floor(dataCours.exchangeRate[9].saleRateNB * 10) / 10
      document.querySelector('.gbrSale').innerHTML = Math.floor(dataCours.exchangeRate[9].purchaseRateNB * 10) / 10

      document.querySelector('.plzBay').innerHTML = Math.floor(dataCours.exchangeRate[17].saleRateNB * 10) / 10
      document.querySelector('.plzSale').innerHTML = Math.floor(dataCours.exchangeRate[17].purchaseRateNB * 10) / 10
      
      document.querySelector('.sekBay').innerHTML = Math.floor(dataCours.exchangeRate[18].saleRateNB * 10) / 10
      document.querySelector('.sekSale').innerHTML = Math.floor(dataCours.exchangeRate[18].purchaseRateNB * 10) / 10
      
      document.querySelector('.xauBay').innerHTML = Math.floor(dataCours.exchangeRate[25].saleRateNB * 10) / 10
      document.querySelector('.xauSale').innerHTML = Math.floor(dataCours.exchangeRate[25].purchaseRateNB * 10) / 10
      
      document.querySelector('.cadBay').innerHTML = Math.floor(dataCours.exchangeRate[3].saleRateNB * 10) / 10
      document.querySelector('.cadSale').innerHTML = Math.floor(dataCours.exchangeRate[3].purchaseRateNB * 10) / 10
   }catch(error){
      document.querySelector('.container').textContent = 'REQUEST ERROR'
      document.querySelector('.container').style.fontSize = '36px'
   }
}

getAllCours(urlAll)


const checkedData = document.querySelector('.checkedData')
checkedData.addEventListener('change', () => {
   let formattedDateS = formatDateString(checkedData.value);
   const urlAll = `https://api.privatbank.ua/p24api/exchange_rates?json&date=${formattedDateS}`
   getAllCours(urlAll)
})


function formatDateString(inputDate) {
   let parts = inputDate.split('-');
   if (parts.length === 3) {
     let year = parts[0];
     let month = parts[1];
     let day = parts[2];
     
     return day + '.' + month + '.' + year;
   } else {
     return inputDate;
   }
 }
 
