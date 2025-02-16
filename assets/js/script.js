const newsList = document.getElementById("newsList");

fetch(
    "https://newsapi.org/v2/everything?q=stocks&sortBy=publishedAt&apiKey=b0ec2303fe7040c0834c0a32db70e9a3"
)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        for (let i = 0; i < 10; i++) {
            let newsItem = document.createElement("li");
            newsList.appendChild(newsItem);
            let newsItemLink = document.createElement("a");
            newsItemLink.classList.add("newsLink");
            newsItemLink.textContent =
                data.articles[i].title;
            newsItemLink.target = "_blank";
            newsItemLink.href = data.articles[i].url;
            newsItem.appendChild(newsItemLink);
            let newsItemInfo =
                document.createElement("div");
            newsItemInfo.classList.add("newsInfo");
            newsItemInfo.textContent =
                data.articles[i].publishedAt
                    .split("T")[1]
                    .slice(0, -4) +
                ", " +
                data.articles[i].source.name;
            newsItem.appendChild(newsItemInfo);
        }
    })
    .catch((err) => {
        console.log(err);
        let newsErr = document.createElement("li");
        newsErr.textContent = "Новости не найдены";
        newsList.appendChild(newsErr);
    });

    /* JS для календаря */

    let Cal = function(divId) {
        this.divId = divId;
        this.DaysOfWeek = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс'
        ];
        this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        let d = new Date();
        this.currMonth = d.getMonth();
        this.currYear = d.getFullYear();
        this.currDay = d.getDate();
    };
    Cal.prototype.nextMonth = function() {
        if ( this.currMonth == 11 ) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
        }
        else {
            this.currMonth = this.currMonth + 1;
        }
        this.showcurr();
    };
    Cal.prototype.previousMonth = function() {
        if ( this.currMonth == 0 ) {
            this.currMonth = 11;
            this.currYear = this.currYear - 1;
        }
        else {
            this.currMonth = this.currMonth - 1;
        }
        this.showcurr();
    };
    Cal.prototype.showcurr = function() {
        this.showMonth(this.currYear, this.currMonth);
    };
    Cal.prototype.showMonth = function(y, m) {
        let d = new Date()
        , firstDayOfMonth = new Date(y, m, 7).getDay()
        , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
        , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
        let html = '<table>';
        html += '<thead><tr>';
        html += '<td class="monthAndYear" colspan="7">' + this.Months[m] + ' ' + y + '</td>';
        html += '</tr></thead>';
        html += '<tr class="days">';
        for(let i=0; i < 5;i++) {
            html += '<td>' + this.DaysOfWeek[i] + '</td>';
        }
        for(let i=5; i < this.DaysOfWeek.length;i++) {
            html += '<td class = "weekend">' + this.DaysOfWeek[i] + '</td>';
        }
        html += '</tr>';
        let i=1;
        do {
            let dow = new Date(y, m, i).getDay();
        if ( dow == 1 ) {
            html += '<tr>';
        }
        else if ( i == 1 ) {
            html += '<tr>';
            let k = lastDayOfLastMonth - firstDayOfMonth+1;
            for(let j=0; j < firstDayOfMonth; j++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }
        let chk = new Date();
        let chkY = chk.getFullYear();
        let chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += '<td class="today">' + i + '</td>';
        } else {
            html += '<td class="normal">' + i + '</td>';
        }
        if ( dow == 0 ) {
            html += '</tr>';
        }
        else if ( i == lastDateOfMonth ) {
            let k=1;
            for(dow; dow < 7; dow++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }
        i++;
        }while(i <= lastDateOfMonth);
        html += '</table>';
        document.getElementById(this.divId).innerHTML = html;
        };
        window.onload = function() {
        let c = new Cal("divCal");			
        c.showcurr();
        getId('btnNext').onclick = function() {
        c.nextMonth();
        };
        getId('btnPrev').onclick = function() {
        c.previousMonth();
        };
    }
    function getId(id) {
        return document.getElementById(id);
    }

//блок с курсами валют
const exchangeRatesItem1Value = document.querySelector(
    ".exchange-rates__item1_value"
);
const exchangeRatesItem2Value = document.querySelector(
    ".exchange-rates__item2_value"
);
const exchangeRatesItem3Value = document.querySelector(
    ".exchange-rates__item3_value"
);
const exchangeRatesItem1Trend = document.querySelector(
    ".exchange-rates__item1_trend"
);
const exchangeRatesItem2Trend = document.querySelector(
    ".exchange-rates__item2_trend"
);
const exchangeRatesItem3Trend = document.querySelector(
    ".exchange-rates__item3_trend"
);
const exchangeRatesErrorMessage = document.querySelector(
    ".exchange-rates__error"
);
const exchangeRatesDate = document.querySelector(
    ".exchange-rates__date"
);
fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        exchangeRatesDate.textContent =
            "Обновлено: " + data.Date.slice(0, -15);
        exchangeRatesItem1Value.textContent =
            data.Valute.USD.Value.toFixed(2) + " RUB";
        exchangeRatesItem2Value.textContent =
            data.Valute.EUR.Value.toFixed(2) + " RUB";
        exchangeRatesItem3Value.textContent =
            data.Valute.GBP.Value.toFixed(2) + " RUB";
        const exchangeRatesItem1Margin =
            data.Valute.USD.Value -
            data.Valute.USD.Previous;
        const exchangeRatesItem2Margin =
            data.Valute.EUR.Value -
            data.Valute.EUR.Previous;
        const exchangeRatesItem3Margin =
            data.Valute.GBP.Value -
            data.Valute.GBP.Previous;
        if (
            data.Valute.USD.Value > data.Valute.USD.Previous
        ) {
            exchangeRatesItem1Trend.innerHTML =
                "🠕 " +
                "+" +
                exchangeRatesItem1Margin.toFixed(4);
        } else {
            exchangeRatesItem1Trend.style = "color: red";
            exchangeRatesItem1Trend.innerHTML =
                "🠗 " + exchangeRatesItem1Margin.toFixed(4);
        }
        if (
            data.Valute.EUR.Value > data.Valute.EUR.Previous
        ) {
            exchangeRatesItem2Trend.innerHTML =
                "🠕 " +
                "+" +
                exchangeRatesItem2Margin.toFixed(4);
        } else {
            exchangeRatesItem2Trend.style = "color: red";
            exchangeRatesItem2Trend.innerHTML =
                "🠗 " + exchangeRatesItem2Margin.toFixed(4);
        }
        if (
            data.Valute.GBP.Value > data.Valute.GBP.Previous
        ) {
            exchangeRatesItem3Trend.innerHTML =
                "🠕 " +
                "+" +
                exchangeRatesItem3Margin.toFixed(4);
        } else {
            exchangeRatesItem3Trend.style = "color: red";
            exchangeRatesItem3Trend.innerHTML =
                "🠗 " + exchangeRatesItem3Margin.toFixed(4);
        }
    })
    .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        exchangeRatesErrorMessage.textContent =
            "Произошла ошибка при загрузке данных";
    });
