
class DataController {

    constructor() {
    }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
    }

    getCookie(name) {
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        for (const cookie of cookies) {
            const [key, ...rest] = cookie.split('=');
            const value = rest.join('=');
            if (key === name) return decodeURIComponent(value);
        }
        return null;
    }

    setDatalStorage(name, value) {
        localStorage.setItem(name, value);
    }

    getDataLStorage(name) {
        const lstorage = localStorage.getItem(name);
        if (!lstorage) return null;
        try {
            return JSON.parse(lstorage);
        } catch (err) {
            return lstorage;
        }
    }

    clearAllCookies() {
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        for (let c = 0; c < cookies.length; c++) {
            let d = window.location.hostname.split('.');
            while (d.length > 0) {
                const cookieBase =
                    encodeURIComponent(cookies[c].split(';')[0].split('=')[0]) +
                    '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' +
                    d.join('.') +
                    ' ;path=';
                let p = location.pathname.split('/');
                document.cookie = cookieBase + '/';
                while (p.length > 0) {
                    document.cookie = cookieBase + p.join('/');
                    p.pop();
                }
                d.shift();
            }
        }
    }

}

function signup() {
    const signupForm = document.querySelector('#signup-form');
    const toLoginLink = document.querySelector('#to-login');
    const spanError = document.getElementById('wrong-pass');

    const display = new DisplayOrder();
    const dataCtrl = new DataController();

    if (signupForm) {
        signupForm.addEventListener('submit', (ev) => {
            ev.preventDefault();

            const form = ev.currentTarget || ev.target;
            const formData = new FormData(form);
            const dataObj = Object.fromEntries(formData.entries());

            // Simple password match validation
            if (dataObj?.user_pass1 === dataObj?.user_pass2) {
                if (spanError) spanError.style.display = 'none';
                dataObj.stats = {};
                dataCtrl.setCookie(dataObj?.user_name, JSON.stringify(dataObj), 1);
                console.log('New user saved:', dataObj);
                display.changePage(3);
            } else {
                if (spanError) spanError.style.display = 'block';
            }
        });
    } else {
        console.warn('Signup form with selector "#signup-form" not found.');
    }

    if (toLoginLink) {
        toLoginLink.addEventListener('click', (ev) => {
            if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
            display.changePage(2);
        });
    } else {
        console.warn('Login link with selector "#to-login" not found.');
    }
}

function login() {
    const loginForm = document.querySelector('#login-form');
    const spanError = document.getElementById('no-user');
    const signupLink = document.querySelector('#to-signup');

    const display = new DisplayOrder();
    const dataCtrl = new DataController();

    if (!loginForm) {
        console.warn('Login form with selector "#login-form" not found.');
        return;
    }

    loginForm.addEventListener('submit', (ev) => {
        ev.preventDefault();

        const form = ev.currentTarget || ev.target;
        const formData = new FormData(form);
        const dataObj = Object.fromEntries(formData.entries());

        const userServerSide = dataCtrl.getCookie(dataObj?.user_name);
        if (userServerSide != null) {
            const userServer = JSON.parse(userServerSide);
            console.log('Found user:', userServer);
            if (spanError) spanError.style.display = 'none';
            if (userServer.user_pass1 === dataObj.user_pass) {
                display.changePage(3, dataObj?.user_name);
            } else {
                if (spanError) {
                    spanError.style.display = 'block';
                    spanError.innerHTML = 'Incorrect password';
                }
                throw new Error('Incorrect password');
            }
        } else {
            if (spanError) {
                spanError.style.display = 'block';
                spanError.innerHTML = "User don't exist";
            }
            throw new Error("User don't exist");
        }
    });

    if (signupLink) {
        signupLink.addEventListener('click', (ev) => {
            if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
            display.changePage(1);
        });
    } else {
        console.warn('Sign-up link with selector "#to-signup" not found.');
    }
}

class DisplayOrder {

    constructor() {
    }

    changePage(page, user = "No-user") {

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
                gamePage.style.display = "block";
                login();
                game("jason")
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
                break;
        }
    }

}

function game(user) {

    const display = new DisplayOrder()
    const dataCtrl = new DataController()

    validCharacters = "&,',+,-,0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,²,³,·,À,Á,Å,Æ,Ç,È,É,Í,Ñ,Ò,Ó,Ö,Ø,Ú,à,á,â,ã,ä,å,ç,è,é,ê,ë,ì,í,î,ï,ñ,ò,ó,ô,ö,ø,ù,ú,û,ü,ý,Ā,ā,ă,ć,Č,č,Ē,ē,ė,ę,ī,ı,ķ,Ł,ł,ń,ň,Ō,ō,ŏ,ő,œ,ř,Ś,ś,Ş,ş,Š,š,ţ,ū,ŭ,ů,ź,ż,Ž,ž,ǎ,ǒ,Ǧ,ǧ,ḍ,ḗ,Ḥ,ḥ,ḫ,ṇ,ṛ,ṣ,Ṭ,ṭ,₂"
    const exitBtn = document.querySelector("#exit-btn");
    const playBtn = document.querySelector("#play-btn");
    const statsBtn = document.querySelector("#stats-btn");
    const checkBtn = document.querySelector("#user-choose");
    const mainSection = document.getElementById("main-section");


    exitBtn.addEventListener('click', (ev) => {
        if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
        console.log('Exit btn pressed');
        display.changePage(2);
    });



    playBtn.addEventListener('click', (ev) => {
        if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
        console.log('Play btn pressed');
        if (mainSection) mainSection.style.display = 'block';
    });



    statsBtn.addEventListener('click', (ev) => {
        if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
        console.log('Stats btn pressed');
        const data = dataCtrl.getCookie(user);
        console.log(data?.stats);
    });



    checkBtn.addEventListener('submit', (ev) => {
        if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
        console.log('Check btn pressed');
    });

}

function main() {
    const display = new DisplayOrder();

    try {
        display.changePage(2);
    } catch (error) {
        throw new Error(error);
    }
}

window.onload = () => {

    console.log("Page is fully loaded");

    try {
        main();
    } catch (error) {
        console.error("An error occurred:", error);
    }

}