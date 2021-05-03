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
    '\n': '.-.-'
};

const codePattern = /[\d\w\*\+\?_,"'!=;:\(\)@$&~`#%^<>\{\}|\[\]\\]/;
const textPattern = /[\*~`#%^<>\{\}|\[\]\\]/;

const text = document.querySelector("#language");
const code = document.querySelector("#code");
const clear = document.querySelector("#clear");
const translate = document.querySelector("#translate");
const go = document.querySelector("#go");


text.addEventListener('focus', textFocus);

text.addEventListener('blur', textBlur);

code.addEventListener('focus', codeFocus);

code.addEventListener('blur', codeBlur);

clear.addEventListener('click', clearFields);

translate.addEventListener('click', doTranslation);

function textFocus(e) {
    text.disabled = false;
    code.disabled = true;
    go.classList = "fas fa-chevron-down";

    e.preventDefault();
}

function textBlur(e) {
    if(text.value.length !== 0) {
        code.disabled = true;
        go.classList = "fas fa-chevron-down";
    } else {
        code.disabled = false;
    }

    e.preventDefault();
}

function codeFocus(e) {
    code.disabled = false;
    text.disabled = true;
    go.classList = "fas fa-chevron-up";

    e.preventDefault();
}

function codeBlur(e) {
    if(code.value.length !== 0) {
        text.disabled = true;
        go.classList = "fas fa-chevron-up";
    } else {
        text.disabled = false;
    }

    e.preventDefault();
}

function clearFields(e) {
    text.value = '';
    code.value = '';
    text.disabled = false;
    code.disabled = false;
    go.classList = "fas fa-chevron-down";

    e.preventDefault();
}

function doTranslation(e) {
    if(go.classList == "fas fa-chevron-down") {
        if(text.value.length === 0) {
            code.value = '';
        } else {
            let textVal = text.value.toLowerCase();
            if(textPattern.test(textVal)) {
                text.value = "'*', '~', '`', '#', '%', '^', '<', '>', '{', '}', '|', '[', ']' and '\\' cannot be converted to morse code";
            } else {
                code.value = toCode(textVal);
                storeInLocalStorage(text.value, code.value);
            }
        }
    } else {
        if(code.value.length === 0) {
            text.value = '';
        } else {
            let codeVal = code.value;
            if(codePattern.test(codeVal)) {
                code.value = "'-', '.' and '/' are the only allowed characters";
            } else {
                text.value = toText(codeVal);
                storeInLocalStorage(text.value, code.value);
            }
        }
    }

    e.preventDefault();
}

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

const storeInLocalStorage = (text, code) => {
	let history;
	if(localStorage.getItem('history') === null) {
		history = [];
	} else {
		history = JSON.parse(localStorage.getItem('history'));
	}

	history.push([text, code]);

	localStorage.setItem('history', JSON.stringify(history));
}

const getFromLocalStorage = () => {
	let history;
	if(localStorage.getItem('history') === null) {
		history = [];
	} else {
		history = JSON.parse(localStorage.getItem('history'));
	}

	return history;
}