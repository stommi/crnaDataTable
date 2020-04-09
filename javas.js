document.getElementById("nappi").onclick = () => {
    move();

    const lista = document.getElementById("lista");
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            const haettu = JSON.parse(xhr.responseText);
            document.getElementById("count").innerHTML = "\n \n" + "Count: " + haettu.confirmed.length + " Recovered: " + haettu.recovered.length + " D: " + haettu.deaths.length;
            circle();
            lisaaAlkiot(haettu.confirmed);
            arrayF();
            document.getElementById("inputArea").style.display = "none";

        }
    };

    xhr.open("GET", 'https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData', true);
    xhr.send();

    function lisaaAlkiot(taulu) {
        taulu.forEach(confirmed => {
            lista.innerHTML += `<tr>${"<td>" + confirmed.id + "</td> <td>" + new Date(confirmed.date).toLocaleDateString("fi-FI") + "</td> <td>" + confirmed.healthCareDistrict
            + "</td> <td>" + confirmed.infectionSourceCountry + "</td> <td>" + confirmed.infectionSource}</tr>`;

        })
    }
};

var i = 0;

function move() {
    var progress = document.getElementById("progress");
    progress.style.backgroundColor = "#383838";

    if (i === 0) {
        i = 1;
        var loadingBar = document.getElementById("loadingBar");
        var width = 1;
        var id = setInterval(frame, 10);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                loadingBar.style.backgroundColor = "#111111"
            } else {
                width += 1.1;
                loadingBar.style.width = width + "%";
            }
        }
    }
}

function circle() {
    var count = document.getElementById("count");

    count.style.marginLeft = "auto";
    count.style.marginRight = "auto";
    count.style.borderRadius = "50%";
    count.style.width = "130px";
    count.style.height = "130px";
    count.style.padding = "45px 15px 0 20px";
    count.style.color = "#111111";
    count.style.textAlign = "center";
    count.style.backgroundColor = "ghostwhite";
    count.style.border = "4px solid white";
    count.style.fontSize = "140%";
}

function arrayF() {
    var lista = document.getElementById("lista");

    lista.style.backgroundColor = "ghostwhite";
    lista.style.border = "1px";
    lista.style.borderColor = "#111111";
}