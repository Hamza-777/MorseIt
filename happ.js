const historyContainer = document.querySelector("#history");
const clearAll = document.querySelector("#remove");

function loadEventListeners() {
	document.addEventListener("DOMContentLoaded", getHistory);

    clearAll.addEventListener('click', clearHistory);
}

function getHistory() {
	let history;

    if(localStorage.getItem('history') === null) {
		history = [];
	} else {
		history = JSON.parse(localStorage.getItem('history'));
	}

	history.forEach(conversion => {
	    const div = document.createElement('div');
	    div.className = 'card';
        const p = document.createElement('p');
        p.className = 'data';
        p.innerHTML = `Text: <br><br> ${conversion[0]} <br><br> Code: <br><br> ${conversion[1]}`;
	    div.appendChild(p);

	    historyContainer.appendChild(div);
	});
}

function clearHistory(e) {
  while(historyContainer.firstChild) {
      historyContainer.removeChild(historyContainer.firstChild);
  }

localStorage.clear();
}

loadEventListeners();