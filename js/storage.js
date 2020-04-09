const CACHE_KEY ="search_history";

function checkForStorage(){
    return typeof(Storage) !=="undefined"
}

function putHistory(data){
    if(checkForStorage()){
        let historyData = null;
        
        if(sessionStorage.getItem(CACHE_KEY)===null){
            historyData = [];
        }else{
            historyData = JSON.parse(sessionStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if (historyData.length > 10){
            historyData.pop();
        }

        sessionStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

function showHistory(){
    if (checkForStorage()) {
        return JSON.parse(sessionStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory(){
    const historyData = showHistory();

    let historyList = document.querySelector('#historyBody');
    historyList.innerHTML="";

    for(let history of historyData){
        let row = document.createElement('tr');
        row.innerHTML ="<td>"+history.negara+"</td>";
        row.innerHTML += "<td>"+history.time+"</td>";

        historyList.appendChild(row);
        console.log(row);
    }

}

renderHistory();