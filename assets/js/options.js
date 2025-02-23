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
    getOptionValue(ticker);
}
const tickers2 = ["SNGSP", "MTSS", "GMKN", "SBER", "GAZP"];
for (let ticker2 of tickers2) {
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

            let optionCanvas =
                document.createElement("canvas");
            optionCanvas.classList.add(
                "options__chart_item"
            );
            optionsChart.prepend(optionCanvas);

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

const optionsPrevBtn = document.querySelector(
    ".options__prev_btn"
);
const optionsNextBtn = document.querySelector(
    ".options__next_btn"
);
function createChartsCarusel() {
    setTimeout(function () {
        const optionsChartItems = document.querySelectorAll(
            ".options__chart_item"
        );
        let index = 0;
        function showChart() {
            if (index >= optionsChartItems.length)
                index = 0;
            if (index < 0)
                index = optionsChartItems.length - 1;
            optionsChart.style.transform = `translateX(-${
                index * 50
            }%)`;
        }
        //добавление слушателей на кнопки
        optionsNextBtn.addEventListener("click", () => {
            index++;
            showChart();
        });
        optionsPrevBtn.addEventListener("click", () => {
            index--;
            showChart();
        });
    }, 3000);
}
createChartsCarusel();
