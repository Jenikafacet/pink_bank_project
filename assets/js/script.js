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
fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
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
