class DataController {
    constructor() { }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
    }

    setStats(name, stats) {
        console.log("User", name, "Stats", stats);
        const coookie = this.getCookie(name);
        console.log(coookie);
        if (!coookie) return;
        const userData = JSON.parse(coookie);
        console.log(userData);
        userData.stats.push(stats);
        this.setCookie(name, JSON.stringify(userData), 7);
    }

    getCookie(name) {
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        for (const cookie of cookies) {
            const [key, ...rest] = cookie.split('=');
            if (key === name) return decodeURIComponent(rest.join('='));
        }
        return null;
    }

    setDataStorage(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    }

    getDataStorage(name) {
        const data = localStorage.getItem(name);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch {
            return data;
        }
    }

    clearAllCookies() {
        document.cookie.split('; ').forEach(c => {
            const cookieName = c.split('=')[0];
            document.cookie = `${cookieName}=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/`;
        });
    }
}

class DisplayOrder {
    constructor() { }

    changePage(page, user) {

        const signupPage = document.getElementById("signup-section");
        const loginPage = document.getElementById("login-section");
        const gamePage = document.getElementById("game-section");

        switch (page) {
            case 1:
                signupPage.style.display = "block";
                loginPage.style.display = "none";
                gamePage.style.display = "none";
                signup();
                break;
            case 2:
                signupPage.style.display = "none";
                loginPage.style.display = "block";
                gamePage.style.display = "none";
                login()
                break;
            case 3:
                signupPage.style.display = "none";
                loginPage.style.display = "none";
                gamePage.style.display = "block";
                game(user);
                break;
            default:
                console.log("[Error 404]");
                alert("[Error 404]");
        }
    }
}


function signup() {
    const signupForm = document.querySelector('#signup-form');
    const toLoginLink = document.querySelector('#to-login');
    const spanError = document.getElementById('wrong-pass');
    const display = new DisplayOrder();
    const dataCtrl = new DataController();

    signupForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.currentTarget);
        const dataObj = Object.fromEntries(formData.entries());

        if (dataObj.user_pass1 === dataObj.user_pass2) {
            spanError.style.display = 'none';
            dataObj.stats = [];
            signupForm.reset();
            dataCtrl.setCookie(dataObj.user_name, JSON.stringify(dataObj), 7);
            display.changePage(3);
        } else {
            spanError.style.display = 'block';
        }
    });

    toLoginLink?.addEventListener('click', (ev) => {
        ev.preventDefault();
        spanError.style.display = 'none';
        display.changePage(2);
        signupForm.reset();
    });
}

function login() {
    const loginForm = document.querySelector('#login-form');
    const spanError = document.getElementById('no-user');
    const signupLink = document.querySelector('#to-signup');
    const display = new DisplayOrder();
    const dataCtrl = new DataController();
    spanError.style.display = 'none';


    loginForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.currentTarget);
        const dataObj = Object.fromEntries(formData.entries());

        const userServerSide = dataCtrl.getCookie(dataObj.user_name);
        if (!userServerSide) {
            spanError.style.display = 'block';
            spanError.innerHTML = "L'usuari no existeix";
            return;
        }

        const userServer = JSON.parse(userServerSide);
        if (userServer.user_pass1 !== dataObj.user_pass) {
            spanError.style.display = 'block';
            spanError.innerHTML = 'Contrasenya incorrecta';
            return;
        }

        display.changePage(3, dataObj.user_name);
        loginForm.reset();
    });

    signupLink?.addEventListener('click', (ev) => {
        ev.preventDefault();
        spanError.style.display = 'none';
        display.changePage(1);
        loginForm.reset();
    });
}


function game(user) {
    let statsPage;
    let hangmanPage;
    let counter = 0;

    const display = new DisplayOrder();
    const dataCtrl = new DataController();

    let randomWord = '';
    let wordToGuess = '';
    let usedChars = [];

    const validCharacters = "&,',+,-,0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,²,³,·,À,Á,Å,Æ,Ç,È,É,Í,Ñ,Ò,Ó,Ö,Ø,Ú,à,á,â,ã,ä,å,ç,è,é,ê,ë,ì,í,î,ï,ñ,ò,ó,ô,ö,ø,ù,ú,û,ü,ý,Ā,ā,ă,ć,Č,č,Ē,ē,ė,ę,ī,ı,ķ,Ł,ł,ń,ň,Ō,ō,ŏ,ő,œ,ř,Ś,ś,Ş,ş,Š,š,ţ,ū,ŭ,ů,ź,ż,Ž,ž,ǎ,ǒ,Ǧ,ǧ,ḍ,ḗ,Ḥ,ḥ,ḫ,ṇ,ṛ,ṣ,Ṭ,ṭ,₂";

    const elements = {
        exitBtn: document.querySelector("#exit-btn"),
        playBtn: document.querySelector("#play-btn"),
        statsBtn: document.querySelector("#stats-btn"),
        checkBtn: document.querySelector("#user-choose"),
        mainSection: document.getElementById("main-section"),
        wordPlaceholder: document.getElementById("word-placeholder"),
        wordSize: document.getElementById("word-size"),
        checkInput: document.getElementById("check-inpt"),
        usedCharsSpan: document.getElementById("used-chars"),
        errorChar: document.getElementById("error-char"),
        dialog: document.querySelector("dialog"),
        buttonDialog: document.querySelector("dialog button")
    };

    const openWindow = (url, top, left) => {
        return window.open(url, "_blank", `scrollbars=yes,resizable=yes,top=${top},left=${left},height=350,width=650,fullscreen=0,menubar=0,location=0,toolbar=0`)
    };

    elements.exitBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        statsPage?.close();
        hangmanPage?.close();
        display.changePage(2);
    });

    elements.playBtn.addEventListener('click', (ev) => {
        ev.preventDefault();

        const PARAULES = [
            "joc", "teclat", "amor", "java"
        ]

        randomWord = PARAULES[Math.floor(Math.random() * PARAULES.length)];

        wordToGuess = randomWord.replace(/./g, "X");
        usedChars = [];
        counter = 0;
        elements.usedCharsSpan.innerHTML = "";
        elements.wordPlaceholder.innerHTML = wordToGuess;
        elements.wordSize.innerHTML = randomWord.length;

        if (hangmanPage !== undefined) hangmanPage.close();

        elements.mainSection.style.display = 'block';
        hangmanPage = openWindow("popup.html", 0, 1000);
        hangmanPage.focus();

        var timer = setInterval(function () {
            if (hangmanPage.closed) {
                clearInterval(timer);
                elements.mainSection.style.display = 'none';
            }
        }, 200);

    });

    elements.statsBtn?.addEventListener('click', (ev) => {
        ev.preventDefault();
        const userData = dataCtrl.getCookie(user);

        if (statsPage !== undefined) statsPage.close();

        statsPage = openWindow("statistics.html", 500, 1000);
        console.log("Opened statsPage", JSON.stringify(JSON.parse(userData).stats));
        statsPage.focus();
        setTimeout(() => {
            statsPage?.postMessage({ data: JSON.stringify(JSON.parse(userData).stats) }, "*");
        }, 50)

    });

    elements.checkInput?.addEventListener("keydown", (ev) => {
        if (ev.key !== "Backspace" && (elements.checkInput.value.length >= 1 || !validCharacters.includes(ev.key) || ev.key === "Dead")) {
            ev.preventDefault();
            elements.checkInput.value = elements.checkInput.value[0] || "";
        }
    });

    elements.checkBtn?.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const char = elements.checkInput.value.trim();

        if (!char) {
            elements.errorChar.innerHTML = "No has introduït cap lletra.";
            elements.checkInput.value = '';
            return;
        }

        if (usedChars.includes(char)) {
            elements.errorChar.innerHTML = `La lletra [${char}] ja ha estat utilitzada`;
            elements.checkInput.value = '';
            return;
        }

        usedChars.push(char);
        elements.usedCharsSpan.innerHTML = "[ " + usedChars.join(', ') + " ]";

        if (randomWord.includes(char)) {
            elements.errorChar.innerHTML = "";
            wordToGuess = wordToGuess.split('').map((letter, i) => randomWord[i] === char ? char : letter).join('');
            elements.wordPlaceholder.innerHTML = wordToGuess.charAt(0).toUpperCase() + wordToGuess.slice(1);

            if (wordToGuess === randomWord) {
                elements.usedCharsSpan.innerHTML = "[ " + usedChars.join(', ') + " ]";
                confetti({
                    position: { x: window.innerWidth / 2, y: 0 }
                    , count: 1500
                });
                console.log("Has guanyat!");
                dataCtrl.setStats(user, {
                    dateGame: new Date().toLocaleString(),
                    wordToGuess: randomWord,
                    gameDuration: "N/A",
                    wonGames: 1,
                    losses: 0
                });
                elements.dialog.showModal();
                elements.buttonDialog.addEventListener('click', () => {
                    elements.dialog.close();
                    elements.playBtn.click();
                });
            }
        } else {
            counter++;
            hangmanPage?.postMessage({ cntr: counter }, "*");
            if (counter >= 8) {
                dataCtrl.setStats(user, {
                    dateGame: new Date().toLocaleString(),
                    wordToGuess: randomWord,
                    gameDuration: "N/A",
                    wonGames: 0,
                    losses: 1
                });

                elements.playBtn.click();
            }
        }

        elements.checkInput.value = '';
        hangmanPage?.focus();
    });
}

function main() {
    const display = new DisplayOrder();
    display.changePage(2);
}

window.addEventListener('load', () => {

    console.log("Pàgina completament carregada");
    main();
});
