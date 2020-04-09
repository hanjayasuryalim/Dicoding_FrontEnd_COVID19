let selectBar = document.getElementById('selectBar');
let searchButton = document.getElementById('searchButton');
let tbody = document.getElementById('report');
let historyData = {
  negara:"",
  time:""
}

searchButton.addEventListener('click',function(){
  let negara = selectBar.value;
  let txt=""
  let variables = document.getElementsByClassName('reportData');
  for(let i =0 ; i < variables.length ; i++){
    if(variables[i].cells[0].innerText === negara){
      txt+="Laporan COVID-19 negara "+negara+"\n"+
           "Total konfirmasi kasus : "+variables[i].cells[1].innerText+"\n"+
           "Total Kematian :"+variables[i].cells[2].innerText+"\n"+
           "Total Sembuh :"+variables[i].cells[3].innerText;
      break;
    }
  }
  alert(txt);

  //insert into session storage
  let today = new Date();
  let time = today.getHours()+" : "+today.getMinutes()+" : "+today.getSeconds();
  historyData.negara=negara;
  historyData.time=time;
  
  putHistory(historyData);

  renderHistory();

})

// get API <-- copas dari internet bagian get API saja
var request = new XMLHttpRequest()
request.open('GET', 'https://api.covid19api.com/summary', true);
request.onload = function() {
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.Countries.forEach(element => {  
        let newElement = document.createElement('option');
        newElement.innerText=element.Country;
        selectBar.appendChild(newElement);

        let tr = document.createElement('tr');
        tr.className="reportData"
        let td1 = document.createElement('td');
        td1.innerText = element.Country;
        td1.style.fontWeight="bolder";
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerText = element.TotalConfirmed;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.innerText = element.TotalDeaths;
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.innerText = element.TotalRecovered;
        tr.appendChild(td4);

        let td5 = document.createElement("td");
        td5.innerText = element.Date;
        tr.appendChild(td5);

        tbody.appendChild(tr);
    });
  } else {
    console.log('error')
  }
}

request.send();
