//форма

const inputName = document.getElementById('inputName')
const inputEmail = document.getElementById('inputEmail')
const inputNumber = document.getElementById('inputNumber')
const button = document.getElementById('submitButton')
const form = document.querySelector('.formWrapper')

const userNameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const numberError = document.getElementById('numberError')

userNameError.style.display = "none";
emailError.style.display = "none";
numberError.style.display = "none";

let emailInputError = true;
let userInputError = true;
let numberInputError = true;

const checkError = () => {
    console.log(emailInputError && userInputError && numberInputError);

    if (!emailInputError && !userInputError && !numberInputError) {
        button.removeAttribute("disabled");
        userNameError.style.display = "none";
        emailError.style.display = "none";
        numberError.style.display = "none";
    }
};


inputName.addEventListener('change', function() {
    if (inputName.value === '') {
    userNameError.textContent = 'Введите имя пользователя.';
    userNameError.style.display = 'block';
    userInputError = true;
    } else {
    userInputError = false;
    }
    checkError();
})
inputEmail.addEventListener("change", function () {
    if (inputEmail.value === "" || !isEmailValid(inputEmail.value)) {
        emailError.textContent = "Введите корректный email.";
        emailError.style.display = "block";
        emailInputError = true;
    } else {
    emailInputError = false;
    }
    checkError();
});
inputNumber.addEventListener("change", function () {
    if (inputNumber.value === "") {
        numberError.textContent = "Введите корректный email.";
        numberError.style.display = "block";
        numberInputError = true;
    } else {
    numberInputError = false;
    }
    checkError();
});
async function fetchPost(data) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });
    return response;
}

button.addEventListener("click", function (event) {
    event.preventDefault();
    checkError()
    if (emailInputError === false && userInputError ===false && numberInputError ===false) {
        const putData = {
        name: inputName.value,
        email: inputEmail.value,
        number: inputNumber.value
    };

fetchPost(putData)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let result = document.createElement("p");
        result.classList.add("result");
        result.innerText = 'Заявка отправлена'
        form.append(result)
        form.reset()
    }) 
    .catch((error) => (numberError.textContent = `${error}`));
    }  
});

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

function isEmailValid(value) {
return EMAIL_REGEXP.test(value)}
