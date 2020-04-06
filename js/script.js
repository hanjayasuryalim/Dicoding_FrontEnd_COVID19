// get API <-- copas dari internet bagian ini saja 
var request = new XMLHttpRequest()

request.open('GET', 'https://api.covid19api.com/summary', true);
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    //console.log(data.Countries);
    data.Countries.forEach(element => {
        console.log('Country :'+element.Country);
        console.log('Total Confirmed :'+element.TotalConfirmed);
        console.log('Total Death :'+element.TotalDeaths);
        console.log('Total Recovered :'+element.TotalRecovered);
        console.log('Last Update :'+element.Date);
    });
  } else {
    console.log('error')
  }
}

request.send()