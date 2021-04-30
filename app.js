const letters = {
    'a': '.-',
    'b': '-...',
    'c': '-.-.',
    'd': '-..',
    'e': '.',
    'f': '..-.',
    'g': '--.',
    'h': '....',
    'i': '..',
    'j': '.---',
    'k': '-.-',
    'l': '.-..',
    'm': '--',
    'n': '-.',
    'o': '---',
    'p': '.--.',
    'q': '--.-',
    'r': '.-.',
    's': '...',
    't': '-',
    'u': '..-',
    'v': '...-',
    'w': '.--',
    'x': '-..-',
    'y': '-.--',
    'z': '--..',
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '&': '.-...',
    "'": '.----.',
    '@': '.--.-.',
    '$': '···−··−',
    ')': '-.--.-',
    '(': '-.--.',
    ':': '---...',
    ',': '--..--',
    ';': '−·−·−·',
    '=': '-...-',
    '!': '-.-.--',
    '.': '.-.-.-',
    '-': '-....-',
    '_': '··−−·−',
    '+': '.-.-.',
    '"': '.-..-.',
    '?': '..--..',
    '/': '-..-.',
    ' ': '/',
    '\n': '.-.-',
  }

const text = document.querySelector("#language");
const code = document.querySelector("#code");
const clear = document.querySelector("#clear");
const translate = document.querySelector("#translate");
const go = document.querySelector("#go");

text.addEventListener('focus', (e) => {
    text.disabled = false;
    code.disabled = true;
    go.classList = "fas fa-chevron-down";

    e.preventDefault();
});

text.addEventListener('blur', (e) => {
    if(text.value.length !== 0) {
        code.disabled = true;
        go.classList = "fas fa-chevron-down";
    } else {
        code.disabled = false;
    }

    e.preventDefault();
});

code.addEventListener('focus', (e) => {
    code.disabled = false;
    text.disabled = true;
    go.classList = "fas fa-chevron-up";

    e.preventDefault();
});

code.addEventListener('blur', (e) => {
    if(code.value.length !== 0) {
        text.disabled = true;
        go.classList = "fas fa-chevron-up";
    } else {
        text.disabled = false;
    }

    e.preventDefault();
});

clear.addEventListener('click', (e) => {
    text.value = '';
    code.value = '';
    text.disabled = false;
    code.disabled = false;
    go.classList = "fas fa-chevron-down";

    e.preventDefault();
});

translate.addEventListener('click', (e) => {
    if(go.classList == "fas fa-chevron-down") {
        if(text.value.length === 0) {
            code.value = '';
        } else {
            let textVal = text.value.toLowerCase();
            code.value = toCode(textVal);
            console.log(text.value);
        }
    } else {
        if(code.value.length === 0) {
            text.value = '';
        } else {
            let codeVal = code.value;
            text.value = toText(codeVal);
        }
    }

    e.preventDefault();
});

const toCode = text => {
    let result = letters[text[0]];
    for(let i = 1; i < text.length; i++) {
        result += '   ' + letters[text[i]];
    }
    return result;
}

const toText = code => {
    let result = '';

    code = code.split("   ");

    for(let i = 0; i < code.length; i++) {

        result += Object.keys(letters).find(key => letters[key] === code[i]);
        
    }

    return result;
}