// Опрос
const notSelected = document.getElementById("notSelected");
const quizButton = document.getElementById("quiz_button");
const fieldset = document.querySelector("fieldset");
const quizDescription = document.querySelector(".quiz__description");
let qNum = 0;
let startValue = [1, 1, 1, 1, 1];
let resultList = [{
    tag: "bonds",
    value: 0,
}, {
    tag: "stocks",
    value: 0,
}, {
    tag: "funds",
    value: 0,
}, {
    tag: "crypto",
    value: 0,
}, {
    tag: "else",
    value: 0,
}];
const qList= ["Есть ли у вас опыт инвестирования?", "Как долго вы готовы держать инвестиции?", "Какая у вас финансовая цель?", "Какой уровень риска вы готовы принять?", "Какие типы финансовых инструментов вам интересны (можно выбрать несколько вариантов)?"];
const optionList = [[{
    tag: "Да",
    value: "stocks",
}, {
    tag: "Нет",
    value: "bonds",
}], [{
    tag: "Менее 1 года",
    value: "bonds",
}, {
    tag: "1-3 года",
    value: "stocks",
}, {
    tag: "3-5 лет",
    value: "funds",
}, {
    tag: "Более 5 лет",
    value: "else",
}], [{
    tag: "Сохранить капитал",
    value: "bonds",
}, {
    tag: "Получать пассивный доход",
    value: "funds",
}, {
    tag: "Увеличить капитал",
    value: "stocks",
}, {
    tag: "Высокий риск ради высокой прибыли",
    value: "crypto",
}], [{
    tag: "Минимальный",
    value: "bonds",
}, {
    tag: "Низкий",
    value: "funds",
}, {
    tag: "Средний",
    value: "stocks",
}, {
    tag: "Высокий",
    value: "crypto",
}], [{
    tag: "Облигации",
    value: "bonds",
}, {
    tag: "Фонды (ETF, ПИФы)",
    value: "funds",
}, {
    tag: "Акции",
    value: "stocks",
}, {
    tag: "Криптовалюты",
    value: "crypto",
}, {
    tag: "Другие активы",
    value: "else",
}]];


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
    quizDescription.textContent = "Пройдите тест, который поможет определить, какие активы рассмотреть для вложения денег и составит ваш персонализированный инвестиционный портфель."
    qNum = 0;
    i = 0;
    for (elem of resultList) {
        elem.value = startValue[i];
        i += 1;
    };
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
    createLegend()
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
    elem.addEventListener("change", function() {
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
    let dataList = []
    resultList.forEach((elem) => {
        dataList.push(elem.value)
    })
    return dataList
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
        data.push(Math.round(elem / count * 100));
    }
    console.log(data);
    
    // Корректируем структуру, чтобы сумма была 100
    let dataSum = data.reduce(function(a, b) {
        return a + b;
    }, 0);
    console.log(dataSum);

    if (dataSum < 100) {
        for (let i = 0; i < data.length; i++) {
            if (data[i] === Math.max(...data)) {
                data[i] += 100 - dataSum;
                console.log(data)
            }
        }
    } else if (dataSum > 100) {
        for (let i = 0; i < data.length; i++) {
            if (data[i] === Math.min(...data)) {
                data[i] -= dataSum - 100;
                console.log(data)
            }
        }
    }

    let ctx = canvas.getContext("2d");

    // Создаем график
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Облигации", "Акции", "Фонды", "Криптовалюта", "Другие активы"],
            datasets: [{
                data: [data[0], data[1], data[2], data[3], data[4]], // Данные в процентах
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return ` ${tooltipItem.raw}%`;
                        }
                    }
                },
                datalabels: { // Настройки отображения процентов внутри круга
                    color: 'black', // Цвет текста
                    font: {
                        weight: 'bold',
                        size: 16
                    },
                    formatter: (value) => `${value}%` // Формат подписей
                }
            }
        },
        plugins: [ChartDataLabels] // Подключаем плагин
    });
}
