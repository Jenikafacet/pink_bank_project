//котировки - бегущая строка
const optionsMarqueeItem = document.querySelector(
    ".options__marquee_item"
);
const optionsMarquee = document.querySelector(
    ".options__marquee"
);
const optionsMarqueeDouble = document.getElementById(
    "options__marquee_double"
);
function getOptionValue(ticker) {
    const optionUrl = `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker}.json?iss.meta=off`;
    fetch(optionUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let optionsMarqueeContainer =
                document.createElement("div");
            optionsMarqueeContainer.classList.add(
                "options__marquee_item"
            );
            optionsMarquee.appendChild(
                optionsMarqueeContainer
            );
            optionsMarqueeContainer.textContent =
                ticker +
                ": " +
                data.marketdata.data[1][12].toFixed(2);
            const clone =
                optionsMarqueeContainer.cloneNode(true);
            optionsMarqueeDouble.appendChild(clone);
        })
        .catch((error) => {
            console.error(
                "Ошибка при загрузке данных:",
                error
            );
            optionsMarquee.textContent =
                "Произошла ошибка при загрузке данных";
        });
}
function getOptionValue2(ticker2) {
    const optionUrl2 = `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker2}.json?iss.meta=off`;
    fetch(optionUrl2)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let optionsMarqueeContainer =
                document.createElement("div");
            optionsMarqueeContainer.classList.add(
                "options__marquee_item"
            );
            optionsMarquee.appendChild(
                optionsMarqueeContainer
            );
            optionsMarqueeContainer.textContent =
                ticker2 +
                ": " +
                data.marketdata.data[2][12].toFixed(2);
            const clone =
                optionsMarqueeContainer.cloneNode(true);
            optionsMarqueeDouble.appendChild(clone);
        })
        .catch((error) => {
            console.error(
                "Ошибка при загрузке данных:",
                error
            );
            optionsMarquee.textContent =
                "Произошла ошибка при загрузке данных";
        });
}
const tickers = ["TATN", "CHMF", "PLZL", "LKOH", "YDEX"];
for (let ticker of tickers) {
    //console.log(ticker);
    getOptionValue(ticker);
}
const tickers2 = ["SNGSP", "MTSS", "GMKN", "SBER", "GAZP"];
for (let ticker2 of tickers2) {
    //console.log(ticker2);
    getOptionValue2(ticker2);
}

//котировки - графики
const tickersBest = [
    "SBER",
    "GAZP",
    "LKOH",
    "YDEX",
    "GMKN",
    "ROSN",
    "NVTK",
    "PLZL",
    "TATN",
    "MTSS",
];
const optionsChart = document.querySelector(
    ".options__chart"
);
const currentDate = new Date();
let currentDateString = currentDate
    .toISOString()
    .split("T")[0];
function getOptionHistory(tickerBest, currentDateString) {
    const optionHistoryUrl = `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/securities/${tickerBest}.json?from=2024-11-25&till=${currentDateString}}`;
    fetch(optionHistoryUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const arrayOptionHistoryDates = [];
            const arrayOptionHistoryPrices = [];
            let i = 0;
            while (i < data.history.data.length) {
                let historyDate = data.history.data[i++][1];
                arrayOptionHistoryDates.push(historyDate);
            }
            let k = 0;
            while (k < data.history.data.length) {
                let historyPrice =
                    data.history.data[k++][13];
                arrayOptionHistoryPrices.push(historyPrice);
            }

            let optionsCarouselItem =
                document.createElement("div");
            optionsCarouselItem.classList.add(
                "options__carousel_item"
            );
            optionsCarouselItem.classList.add("item");

            let optionCanvas =
                document.createElement("canvas");
            optionCanvas.classList.add(
                "options__chart_item"
            );

            optionsCarouselItem.append(optionCanvas);
            optionsChart.prepend(optionsCarouselItem);

            const dateData = {
                labels: arrayOptionHistoryDates,
                datasets: [
                    {
                        label: `${tickerBest} (RUB)`,
                        data: arrayOptionHistoryPrices,
                        lineTension: 0,
                        fill: false,
                        borderColor: "#fa2e99",
                        backgroundColor: "transparent",
                        borderDash: [1, 0],
                        pointBorderColor: "#fa2e99",
                        pointBackgroundColor: "#fa2e99",
                        pointRadius: 2,
                        pointHoverRadius: 5,
                        pointHitRadius: 30,
                        pointBorderWidth: 2,
                        pointStyle: "rectRounded",
                    },
                ],
            };

            const chartOptions = {
                legend: {
                    display: true,
                    position: "top",
                    labels: {
                        boxWidth: 80,
                        fontColor: "black",
                    },
                },
            };
            new Chart(optionCanvas, {
                type: "line",
                data: dateData,
                options: chartOptions,
            });
            let optionCanvasArray = [];
            optionCanvasArray.push(optionCanvas);
            console.log(optionCanvasArray);
        })
        .catch((error) => {
            console.error(
                "Ошибка при загрузке данных:",
                error
            );
            optionsChart.textContent =
                "Произошла ошибка при загрузке данных";
        });
}

for (let tickerBest of tickersBest) {
    getOptionHistory(tickerBest);
}

$(document).ready(function () {
    setTimeout(function () {
        $(".options__chart.owl-carousel").owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1,
                },
                767: {
                    items: 2,
                },
                991: {
                    items: 2,
                },
            },
        });
    }, 1000);
});
