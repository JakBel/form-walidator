const qs = (e) => document.querySelector(e);
const qsa = (e) => document.querySelectorAll(e);

const username = qs("#username");
const password = qs("#password");
const password2 = qs("#password2");
const mail = qs("#mail");
const clearBtn = qs(".clear");
const sendBtn = qs(".send");
const closeBtn = qs(".close");
const popup = qs(".popup");

//function
const showError = (input, msg) => {
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector(".error-text");

    formBox.classList.add("error");
    errorMsg.textContent = msg;
};

const clearError = (input) => {
    const formBox = input.parentElement;
    formBox.classList.remove("error");
};

const checkForm = (input) => {
    input.forEach((e) => {
        if (e.value === "") {
            showError(e, e.placeholder);
        } else {
            clearError(e);
        }
    });
};

const checkLength = (input, min) => {
    if (input.value.length < min) {
        showError(
            input,
            `${input.previousElementSibling.innerText.slice(
                0,
                -1
            )} składa się z min. ${min} znaków`
        );
    }
};

const checkPassword = (pass1, pass2) => {
    if (pass1.value !== pass2.value) {
        showError(pass2, "Hasła do siebie nie pasują");
        password2.value = "";
    }
};

const checkMail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(re.test(email.value)) {
            clearError(email)
        } else {
            showError(email, 'E-mail jest niepoprawny')
        }
};

const checkErrors = () => {
    const allInputs = qsa('.form-box');
    let errorCount = 0;

    allInputs.forEach(e => {
        if(e.classList.contains('error')) {
            errorCount++;
        }
    })

    if(errorCount === 0) {
        popup.classList.add('show-popup');
    }
}

//eventListener
sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkForm([username, password, password2, mail]);
    checkLength(username, 3);
    checkLength(password, 8);
    checkPassword(password, password2);
    checkMail(mail);
    checkErrors();
});

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();

    [username, password, password2, mail].forEach((e) => {
        e.value = "";
        clearError(e);
    });
});
