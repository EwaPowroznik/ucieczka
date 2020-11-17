const Swal = require('sweetalert2');
import { codes, elements, backImages } from './data';
let popupTitle = 'Podaj swój kod:';
window.addEventListener('load', initGame);
elements.clearButton.addEventListener('click', clearStorage);
elements.gnome.addEventListener('click', showHint);
let isFound;
const storage = {};

// function preloadImages(url) {
//     console.log('tutaj');
//     url.forEach((el) => {
//         const img = (new Image().src = el);
//         console.log(img);
//     });
// }

function initGame(msg, icon) {
    storage.img = JSON.parse(localStorage.getItem('img'));
    storage.player = JSON.parse(localStorage.getItem('player'));
    storage.gnome = JSON.parse(localStorage.getItem('gnome'));
    storage.hint = JSON.parse(localStorage.getItem('hint'));
    if (storage.img) {
        //let img = storage;
        setImage(storage.img);
        setGnome(storage.gnome);
        setHints(storage.player);
        renderHints(storage.hint);
        return;
    }

    if (window.location.search) {
        let noque = window.location.search.split('?')[1];
        findCode(noque);
        return;
    } else {
        console.log('ver 1');
        askCode();
    }
}

//preloadImages(backImages);
async function askCode() {
    const { value: playerCode } = await Swal.fire({
        title: popupTitle,
        icon: '',
        input: 'text',
        inputPlaceholder: 'Podaj swój kod w tym polu',
        inputValidator: (value) => {
            // let isFound;
            for (let el of codes) {
                console.log(el.code);
                if (el.code === value.toLowerCase()) {
                    foundCodeHandler(el);
                    // let img = el.img;
                    // setImage(img);
                    // setHints(el.player);
                    // setGnome(el.gnome);
                    // localStorage.setItem('img', JSON.stringify(img));
                    // localStorage.setItem('player', JSON.stringify(el.player));
                    // localStorage.setItem('gnome', JSON.stringify(el.gnome));

                    // isFound = true;
                    break;
                }
            }
            return !isFound && 'Niepoprawny kod, spróbuj jeszcze raz';
            /*if (!isFound) {
        popupTitle = 'Niepoprawny kod, spróbuj jeszcze raz';
        icon = 'error';
        initGame();
    } */
        },
    });
}

function findCode(value) {
    // console.log('parse ' + value);
    for (let el of codes) {
        // console.log(el.code);
        if (el.code === value.toLowerCase()) {
            foundCodeHandler(el);
            // let img = el.img;
            // setImage(img);
            // setHints(el.player);
            // setGnome(el.gnome);
            // localStorage.setItem('img', JSON.stringify(img));
            // localStorage.setItem('player', JSON.stringify(el.player));
            // localStorage.setItem('gnome', JSON.stringify(el.gnome));
            // isFound = true;
            // isFound = true;
            break;
        }
    }
    if (!isFound) {
        // console.log('ver 2');
        askCode();
    }
}

function foundCodeHandler(el) {
    let img = el.img;
    setImage(img);
    setHints(el.player);
    setGnome(el.gnome);
    localStorage.setItem('img', JSON.stringify(img));
    localStorage.setItem('player', JSON.stringify(el.player));
    localStorage.setItem('gnome', JSON.stringify(el.gnome));
    isFound = true;
}

function setImage(img) {
    // console.log(`image/${img}.png`);
    document.getElementById('dane').src = `image/${img}.png`;
}

function setHints(player) {
    // console.log(player);
    let counter = 1;
    elements.hints.forEach((el) => {
        // console.log(el);
        el.src = `image/p${player}${counter}.jpg`;
        // console.log(`image/p${player}${counter}.jpg`);
        counter++;
    });
}

function showHint() {
    if (storage.hint === 3) {
        Swal.fire(
            'Słyszysz tylko złośliwy chichot i wiesz już, że więcej od Gnoma się dziś nie dowiesz'
        );
        return;
    }
    if (!storage.hint) {
        elements.hints[0].style.display = 'inline';
        storage.hint = 1;
    } else {
        elements.hints[storage.hint].style.display = 'inline';
        storage.hint++;
    }
    localStorage.setItem('hint', storage.hint);
    document.body.style.backgroundImage = `url("image/background${storage.hint}.gif")`;
}

function setGnome(gnome) {
    elements.gnome.textContent = gnome;
}

function renderHints(hint) {
    for (let i = 0; i < hint; i++) {
        elements.hints[i].style.display = 'inline';
    }
    if (!hint) hint = '';
    document.body.style.backgroundImage = `url("image/background${hint}.gif")`;
}

function clearStorage() {
    //console.log('tutja!!!');
    localStorage.removeItem('img');
    localStorage.removeItem('player');
    localStorage.removeItem('gnome');
    localStorage.removeItem('hint');
}
