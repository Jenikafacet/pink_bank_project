const newsList = document.getElementById("newsList");

fetch(
  "https://newsapi.org/v2/everything?q=stocks&sortBy=publishedAt&apiKey=b0ec2303fe7040c0834c0a32db70e9a3"
)
<<<<<<< Updated upstream
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
            let date = new Date();
            let newsDate = new Date(
                data.articles[i].publishedAt.split("T")[0]
            );
            if (date.getDate() === newsDate.getDate()) {
                newsItemInfo.textContent =
                    data.articles[i].publishedAt
                        .split("T")[1]
                        .slice(0, -4) +
                    ", " +
                    data.articles[i].source.name;
            } else {
                newsItemInfo.textContent =
                    data.articles[i].publishedAt.split(
                        "T"
                    )[0] +
                    " " +
                    data.articles[i].publishedAt
                        .split("T")[1]
                        .slice(0, -4) +
                    ", " +
                    data.articles[i].source.name;
            }
            newsItem.appendChild(newsItemInfo);
        }
    })
    .catch((err) => {
        console.log(err);
        let newsErr = document.createElement("li");
        newsErr.textContent = "Новости не найдены";
        newsList.appendChild(newsErr);
    });
=======
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
      newsItemLink.textContent = data.articles[i].title;
      newsItemLink.target = "_blank";
      newsItemLink.href = data.articles[i].url;
      newsItem.appendChild(newsItemLink);
      let newsItemInfo = document.createElement("div");
      newsItemInfo.classList.add("newsInfo");
      newsItemInfo.textContent =
        data.articles[i].publishedAt.split("T")[1].slice(0, -4) +
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
>>>>>>> Stashed changes

/* JS для календаря */

let Cal = function (divId) {
<<<<<<< Updated upstream
    this.divId = divId;
    this.DaysOfWeek = [
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
        "Вс",
    ];
    this.Months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];
    let d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
};
Cal.prototype.nextMonth = function () {
    if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    } else {
        this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
};
Cal.prototype.previousMonth = function () {
    if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    } else {
        this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
};
Cal.prototype.showcurr = function () {
    this.showMonth(this.currYear, this.currMonth);
};
Cal.prototype.showMonth = function (y, m) {
    let d = new Date(),
        firstDayOfMonth = new Date(y, m, 7).getDay(),
        lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
        lastDayOfLastMonth =
            m == 0
                ? new Date(y - 1, 11, 0).getDate()
                : new Date(y, m, 0).getDate();
    let html = "<table>";
    html += "<thead><tr>";
    html +=
        '<td class="monthAndYear" colspan="7">' +
        this.Months[m] +
        " " +
        y +
        "</td>";
    html += "</tr></thead>";
    html += '<tr class="days">';
    for (let i = 0; i < 5; i++) {
        html += "<td>" + this.DaysOfWeek[i] + "</td>";
    }
    for (let i = 5; i < this.DaysOfWeek.length; i++) {
        html +=
            '<td class = "weekend">' +
            this.DaysOfWeek[i] +
            "</td>";
    }
    html += "</tr>";
    let i = 1;
    do {
        let dow = new Date(y, m, i).getDay();
        if (dow == 1) {
            html += "<tr>";
        } else if (i == 1) {
            html += "<tr>";
            let k =
                lastDayOfLastMonth - firstDayOfMonth + 1;
            for (let j = 0; j < firstDayOfMonth; j++) {
                html +=
                    '<td class="not-current">' +
                    k +
                    "</td>";
                k++;
            }
        }
        let chk = new Date();
        let chkY = chk.getFullYear();
        let chkM = chk.getMonth();
        if (
            chkY == this.currYear &&
            chkM == this.currMonth &&
            i == this.currDay
        ) {
            html += '<td class="today">' + i + "</td>";
        } else {
            html += '<td class="normal">' + i + "</td>";
        }
        if (dow == 0) {
            html += "</tr>";
        } else if (i == lastDateOfMonth) {
            let k = 1;
            for (dow; dow < 7; dow++) {
                html +=
                    '<td class="not-current">' +
                    k +
                    "</td>";
                k++;
            }
        }
        i++;
    } while (i <= lastDateOfMonth);
    html += "</table>";
    document.getElementById(this.divId).innerHTML = html;
};
window.onload = function () {
    let c = new Cal("divCal");
    c.showcurr();
    getId("btnNext").onclick = function () {
        c.nextMonth();
    };
    getId("btnPrev").onclick = function () {
        c.previousMonth();
    };
};
function getId(id) {
    return document.getElementById(id);
=======
  this.divId = divId;
  this.DaysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  this.Months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  let d = new Date();
  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();
};
Cal.prototype.nextMonth = function () {
  if (this.currMonth == 11) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  } else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};
Cal.prototype.previousMonth = function () {
  if (this.currMonth == 0) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  } else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};
Cal.prototype.showcurr = function () {
  this.showMonth(this.currYear, this.currMonth);
};
Cal.prototype.showMonth = function (y, m) {
  let d = new Date(),
    firstDayOfMonth = new Date(y, m, 7).getDay(),
    lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
    lastDayOfLastMonth =
      m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  let html = "<table>";
  html += "<thead><tr>";
  html +=
    '<td class="monthAndYear" colspan="7">' +
    this.Months[m] +
    " " +
    y +
    "</td>";
  html += "</tr></thead>";
  html += '<tr class="days">';
  for (let i = 0; i < 5; i++) {
    html += "<td>" + this.DaysOfWeek[i] + "</td>";
  }
  for (let i = 5; i < this.DaysOfWeek.length; i++) {
    html += '<td class = "weekend">' + this.DaysOfWeek[i] + "</td>";
  }
  html += "</tr>";
  let i = 1;
  do {
    let dow = new Date(y, m, i).getDay();
    if (dow == 1) {
      html += "<tr>";
    } else if (i == 1) {
      html += "<tr>";
      let k = lastDayOfLastMonth - firstDayOfMonth + 1;
      for (let j = 0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + "</td>";
        k++;
      }
    }
    let chk = new Date();
    let chkY = chk.getFullYear();
    let chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html += '<td class="today">' + i + "</td>";
    } else {
      html += '<td class="normal">' + i + "</td>";
    }
    if (dow == 0) {
      html += "</tr>";
    } else if (i == lastDateOfMonth) {
      let k = 1;
      for (dow; dow < 7; dow++) {
        html += '<td class="not-current">' + k + "</td>";
        k++;
      }
    }
    i++;
  } while (i <= lastDateOfMonth);
  html += "</table>";
  document.getElementById(this.divId).innerHTML = html;
};
window.onload = function () {
  let c = new Cal("divCal");
  c.showcurr();
  getId("btnNext").onclick = function () {
    c.nextMonth();
  };
  getId("btnPrev").onclick = function () {
    c.previousMonth();
  };
};
function getId(id) {
  return document.getElementById(id);
>>>>>>> Stashed changes
}

//блок с курсами валют
async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (!amount || amount <= 0) {
    alert("Пожалуйста, введите корректную сумму");
    return;
  }

  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    document.getElementById(
      "currency-result"
    ).innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    alert("Ошибка при получении курса валют. Попробуйте позже.");
  }
}

fetch("https://www.cbr-xml-daily.ru/daily_json.js")
  .then((response) => response.json())
  .then((data) => {
    document.querySelector(".exchange-rates__date").textContent =
      "Обновлено: " + data.Date.slice(0, -15);
    document.querySelector(".exchange-rates__item1_value").textContent =
      data.Valute.USD.Value.toFixed(2) + " RUB";
    document.querySelector(".exchange-rates__item2_value").textContent =
      data.Valute.EUR.Value.toFixed(2) + " RUB";
    document.querySelector(".exchange-rates__item3_value").textContent =
      data.Valute.GBP.Value.toFixed(2) + " RUB";

    function updateTrend(element, margin) {
      element.innerHTML =
        margin >= 0 ? "🠕 +" + margin.toFixed(4) : "🠗 " + margin.toFixed(4);
      element.style.color = margin >= 0 ? "green" : "red";
    }
    updateTrend(
      document.querySelector(".exchange-rates__item1_trend"),
      data.Valute.USD.Value - data.Valute.USD.Previous
    );
    updateTrend(
      document.querySelector(".exchange-rates__item2_trend"),
      data.Valute.EUR.Value - data.Valute.EUR.Previous
    );
    updateTrend(
      document.querySelector(".exchange-rates__item3_trend"),
      data.Valute.GBP.Value - data.Valute.GBP.Previous
    );
  })
  .catch((error) => {
    console.error("Ошибка при загрузке данных:", error);
    document.querySelector(".exchange-rates__error").textContent =
      "Ошибка при загрузке данных";
  });
// Показать результат
const resultCard = document.getElementById("currency-result-card");

//Инвестиционный калькулятор

// Находим кнопку и добавляем слушатель события
document
<<<<<<< Updated upstream
    .getElementById("calculate-button")
    .addEventListener("click", function () {
        const startPrice = parseFloat(
            document.getElementById("start-price").value
        );
        const currentPrice = parseFloat(
            document.getElementById("current-price").value
        );
        const shares = parseFloat(
            document.getElementById("shares").value
        );
        const dividends =
            parseFloat(
                document.getElementById("dividends").value
            ) || 0;

        if (
            isNaN(startPrice) ||
            isNaN(currentPrice) ||
            isNaN(shares)
        ) {
            alert(
                "Пожалуйста, заполните все обязательные поля."
            );
            return;
        }

        const initialInvestment = startPrice * shares;
        const currentInvestment =
            currentPrice * shares + dividends;
        const profitLoss =
            currentInvestment - initialInvestment;
        const profitLossPercent =
            (profitLoss / initialInvestment) * 100;
=======
  .getElementById("calculate-button")
  .addEventListener("click", function () {
    const startPrice = parseFloat(document.getElementById("start-price").value);
    const currentPrice = parseFloat(
      document.getElementById("current-price").value
    );
    const shares = parseFloat(document.getElementById("shares").value);
    const dividends =
      parseFloat(document.getElementById("dividends").value) || 0;

    if (isNaN(startPrice) || isNaN(currentPrice) || isNaN(shares)) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    const initialInvestment = startPrice * shares;
    const currentInvestment = currentPrice * shares + dividends;
    const profitLoss = currentInvestment - initialInvestment;
    const profitLossPercent = (profitLoss / initialInvestment) * 100;
>>>>>>> Stashed changes

    document.getElementById(
      "current-value"
    ).innerHTML = `Текущая стоимость бумаг: <strong>${currentInvestment.toFixed(
      2
    )}</strong>`;
    document.getElementById("profit-loss").innerHTML =
      profitLoss >= 0
        ? `Прибыль: <strong>${profitLoss.toFixed(
            2
<<<<<<< Updated upstream
        )}</strong>`;
        document.getElementById("profit-loss").innerHTML =
            profitLoss >= 0
                ? `Прибыль: <strong>${profitLoss.toFixed(
                      2
                  )}  (${profitLossPercent.toFixed(
                      2
                  )}%)</strong>`
                : `Убыток: <strong>${Math.abs(
                      profitLoss
                  ).toFixed(2)}  (${Math.abs(
                      profitLossPercent
                  ).toFixed(2)}%)</strong>`;

        // Показываем карточку с результатами
        document.getElementById(
            "result-card"
        ).style.display = "block";
    });
=======
          )}  (${profitLossPercent.toFixed(2)}%)</strong>`
        : `Убыток: <strong>${Math.abs(profitLoss).toFixed(2)}  (${Math.abs(
            profitLossPercent
          ).toFixed(2)}%)</strong>`;

    // Показываем карточку с результатами
    document.getElementById("result-card").style.display = "block";
  });
>>>>>>> Stashed changes
//Инвестиционный калькулятор end

//Акция
// Получаем элементы
const openModalBtn =
    document.getElementById("openModalBtn");
const closeModalBtn =
    document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");
const callbackForm =
    document.getElementById("callbackForm");
const phoneInput = document.getElementById("phone");

// Открытие модального окна
openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Закрытие модального окна
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Закрытие модального окна при клике вне его области
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Валидация номера телефона
phoneInput.addEventListener("input", (event) => {
<<<<<<< Updated upstream
    // Удаляем все символы, кроме цифр
    event.target.value = event.target.value.replace(
        /\D/g,
        ""
    );
=======
  // Удаляем все символы, кроме цифр
  event.target.value = event.target.value.replace(/\D/g, "");
>>>>>>> Stashed changes
});

// Обработка отправки формы
callbackForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Предотвращаем перезагрузку страницы

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");

<<<<<<< Updated upstream
    // Проверка на пустые поля
    if (
        nameInput.value.trim() === "" ||
        phoneInput.value.trim() === ""
    ) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    // Проверка на минимальную длину номера телефона
    if (phoneInput.value.length < 10) {
        alert(
            "Номер телефона должен содержать не менее 10 цифр."
        );
        return;
    }

    // Если все проверки пройдены
    alert(
        "Спасибо, " +
            nameInput.value +
            "! Мы скоро с вами свяжемся."
    );
    modal.style.display = "none"; // Закрываем модальное окно после отправки
    callbackForm.reset(); // Очищаем форму
=======
  // Проверка на пустые поля
  if (nameInput.value.trim() === "" || phoneInput.value.trim() === "") {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  // Проверка на минимальную длину номера телефона
  if (phoneInput.value.length < 10) {
    alert("Номер телефона должен содержать не менее 10 цифр.");
    return;
  }

  // Если все проверки пройдены
  alert("Спасибо, " + nameInput.value + "! Мы скоро с вами свяжемся.");
  modal.style.display = "none"; // Закрываем модальное окно после отправки
  callbackForm.reset(); // Очищаем форму
>>>>>>> Stashed changes
});

// Счетчик обратного отсчета
const countdownDate = new Date(
    "2025-03-15T00:00:00"
).getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

<<<<<<< Updated upstream
    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    document.getElementById("days").innerText = String(
        days
    ).padStart(2, "0");
    document.getElementById("hours").innerText = String(
        hours
    ).padStart(2, "0");
    document.getElementById("minutes").innerText = String(
        minutes
    ).padStart(2, "0");
    document.getElementById("seconds").innerText = String(
        seconds
    ).padStart(2, "0");
=======
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").innerText = String(seconds).padStart(
    2,
    "0"
  );
>>>>>>> Stashed changes

  if (distance < 0) {
    clearInterval(interval);
    document.getElementById("countdown").innerHTML = "<p>Акция завершена!</p>";
  }
}

// Обновляем счетчик каждую секунду
const interval = setInterval(updateCountdown, 1000);

// Инициализация счетчика сразу после загрузки страницы
updateCountdown();
// Акция конец

<<<<<<< Updated upstream
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
const optionsChart = document.querySelector(
    ".options__chart"
);
const currentDate = new Date();
let currentDateString = currentDate
    .toISOString()
    .split("T")[0];
function getOptionHistory(ticker, currentDateString) {
    const optionHistoryUrl = `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/securities/${ticker}.json?from=2024-11-25&till=${currentDateString}}`;
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
            optionsChart.appendChild(optionCanvas);
            const dateData = {
                labels: arrayOptionHistoryDates,
                datasets: [
                    {
                        label: `${ticker} (RUB)`,
                        data: arrayOptionHistoryPrices,
                        lineTension: 0,
                        fill: false,
                        borderColor: "coral",
                        backgroundColor: "transparent",
                        borderDash: [1, 0],
                        pointBorderColor: "coral",
                        pointBackgroundColor: "grey",
                        pointRadius: 2,
                        pointHoverRadius: 10,
                        pointHitRadius: 30,
                        pointBorderWidth: 2,
                        pointStyle: "rectRounded",
                    },
                ],
            };
            console.log(dateData[1]);
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
for (let ticker of tickers) {
    getOptionHistory(ticker);
}
=======
// Опрос
const notSelected = document.getElementById("notSelected");
const quizButton = document.getElementById("quiz_button");
const fieldset = document.querySelector("fieldset");
const quizDescription = document.querySelector(".quiz__description");
let qNum = 0;
let startValue = [5, 2, 1, 1, 1];
let resultList = [
  {
    tag: "bonds",
    value: 0,
  },
  {
    tag: "stocks",
    value: 0,
  },
  {
    tag: "funds",
    value: 0,
  },
  {
    tag: "crypto",
    value: 0,
  },
  {
    tag: "else",
    value: 0,
  },
];
const qList = [
  "Есть ли у вас опыт инвестирования?",
  "Как долго вы готовы деражать инвестиции?",
  "Какая у вас финансовая цель?",
  "Какой уровень риска вы готовы принять?",
  "Какие типы финансовых инструментов вам интересны (можно выбрать несколько вариантов)?",
];
const optionList = [
  [
    {
      tag: "Да",
      value: "stocks",
    },
    {
      tag: "Нет",
      value: "bonds",
    },
  ],
  [
    {
      tag: "Менее 1 года",
      value: "bonds",
    },
    {
      tag: "1-3 года",
      value: "funds",
    },
    {
      tag: "3-5 лет",
      value: "stocks",
    },
    {
      tag: "Более 5 лет",
      value: "stocks",
    },
  ],
  [
    {
      tag: "Сохранить капиталл",
      value: "bonds",
    },
    {
      tag: "Получать пассивный доход",
      value: "bonds",
    },
    {
      tag: "Увеличить капиталл",
      value: "stocks",
    },
    {
      tag: "Высокий риск ради высокой прибыли",
      value: "stocks",
    },
  ],
  [
    {
      tag: "Минимальный",
      value: "bonds",
    },
    {
      tag: "Низкий",
      value: "funds",
    },
    {
      tag: "Средний",
      value: "stocks",
    },
    {
      tag: "Высокий",
      value: "stocks",
    },
  ],
  [
    {
      tag: "Облигации",
      value: "bonds",
    },
    {
      tag: "Фонды (ETF, ПИФы)",
      value: "funds",
    },
    {
      tag: "Акции",
      value: "stocks",
    },
    {
      tag: "Криптовалюты",
      value: "crypto",
    },
    {
      tag: "Драгоценные металлы",
      value: "else",
    },
    {
      tag: "Недвижимость",
      value: "else",
    },
  ],
];

function calculateResult() {
  if (qNum === qList.length || quizButton.textContent === "Пройти опрос") {
    createQuiz();
  } else if (!document.querySelector('input[name="invest"]:checked')) {
    notSelected.textContent = "Ответ не выбран";
  } else {
    resultCount();
    qNum += 1;

    if (qNum > qList.length - 1) {
      fieldset.innerHTML = "";
      quizDescription.textContent = "";
      let legend = document.createElement("legend");
      legend.textContent = "Ваш инвестиционный портфель";
      fieldset.appendChild(legend);
      createChart();
      quizButton.textContent = "Пройти опрос заново";
    } else if (qNum > qList.length - 2) {
      buttonStyle();
      console.log(qNum);
      createCheckboxElements();
    } else {
      buttonStyle();
      console.log(qNum);
      createFieldsetElements();
    }
  }
}

function buttonStyle() {
  quizButton.style.backgroundColor = "#ff99cb";
}

function buttonStyleActive() {
  quizButton.style.backgroundColor = "#fa2e99";
}

function createQuiz() {
  buttonStyle();
  quizButton.textContent = "Продолжить";
  quizDescription.textContent =
    "Пройдите тест, который поможет определить, какие активы рассмотреть для вложения денег и составит ваш персонализированный инвестиционный портфель.";
  qNum = 0;
  i = 0;
  for (elem of resultList) {
    elem.value = startValue[i];
    i += 1;
  }
  createFieldsetElements();
  console.log(resultList);
}

function createFieldsetElements() {
  createLegend();
  let optionObj = optionList[qNum];
  optionObj.forEach((elem) => {
    let optionElem = document.createElement("div");
    fieldset.appendChild(optionElem);
    let option = document.createElement("input");
    option.type = "radio";
    option.id = elem.value;
    option.name = "invest";
    option.value = elem.value;
    optionElem.appendChild(option);
    let optionLabel = document.createElement("label");
    optionLabel.setAttribute("for", option.id);
    optionLabel.textContent = elem.tag;
    optionElem.appendChild(optionLabel);
  });
  checkedIsActive();
}

function createLegend() {
  fieldset.innerHTML = "";
  let legend = document.createElement("legend");
  legend.textContent = qList[qNum];
  fieldset.appendChild(legend);
}

function createCheckboxElements() {
  createLegend();
  let optionObj = optionList[qNum];
  optionObj.forEach((elem) => {
    let optionElem = document.createElement("div");
    fieldset.appendChild(optionElem);
    let option = document.createElement("input");
    option.type = "checkbox";
    option.id = elem.value;
    option.name = "invest";
    option.value = elem.value;
    optionElem.appendChild(option);
    let optionLabel = document.createElement("label");
    optionLabel.setAttribute("for", option.id);
    optionLabel.textContent = elem.tag;
    optionElem.appendChild(optionLabel);
  });
  checkedIsActive();
}

function checkedIsActive() {
  let checkedList = document.querySelectorAll('input[name="invest"]');
  for (elem of checkedList) {
    isActive(elem);
  }
}

function isActive(elem) {
  elem.addEventListener("change", function () {
    if (this.checked) {
      console.log(this.value);
      notSelected.textContent = "";
      buttonStyleActive();
    }
  });
}

function resultCount() {
  let checkedList = document.querySelectorAll('input[name="invest"]');
  for (let i of checkedList) {
    if (i.checked) {
      for (j = 0; j < resultList.length; j++) {
        console.log(resultList[j].tag);
        if (resultList[j].tag === i.value) {
          resultList[j].value += 1;
        }
      }
      console.log(resultList);
    }
  }
}

function getData() {
  let dataList = [];
  resultList.forEach((elem) => {
    dataList.push(elem.value);
  });
  return dataList;
}

function createChart() {
  let canvas = document.createElement("canvas");
  canvas.id = "investmentChart";
  fieldset.appendChild(canvas);

  // Считаем данные для графика
  let dataList = [];
  let count = 0;
  resultList.forEach((elem) => {
    count += elem.value;
    dataList.push(elem.value);
  });
  let data = [];
  for (let elem of dataList) {
    data.push(Math.round((elem / count) * 100));
  }
  console.log(data);

  let ctx = canvas.getContext("2d");

  // Создаем график
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Облигации", "Акции", "Фонды", "Криптовалюта", "Другие активы"],
      datasets: [
        {
          data: [data[0], data[1], data[2], data[3], data[4]], // Данные в процентах
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return ` ${tooltipItem.raw}%`;
            },
          },
        },
        datalabels: {
          // Настройки отображения процентов внутри круга
          color: "black", // Цвет текста
          font: {
            weight: "bold",
            size: 16,
          },
          formatter: (value) => `${value}%`, // Формат подписей
        },
      },
    },
    plugins: [ChartDataLabels], // Подключаем плагин
  });
}
// Погода
async function fetchWeather() {
  const apiKey = "b5ffa9621e29ee2e42f640bc8a5fe6ae";
  const city = "Moscow";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById("weather-info").innerHTML = `
      <p>${data.name}: ${data.weather[0].description}</p>
      <p>Температура: ${data.main.temp}°C</p>
      <p>Влажность: ${data.main.humidity}%</p>
    `;
  } catch (error) {
    document.getElementById("weather-info").textContent =
      "Ошибка загрузки погоды";
  }
}
fetchWeather();
>>>>>>> Stashed changes
