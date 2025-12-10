window.addEventListener("message", (ev) => {

    console.log("Mensaje recibido en popup.js");
    console.log(ev.data.counter);

    const img = document.querySelector("img");
    if (ev.origin !== "http://localhost:5500" && ev.origin !== "http://127.0.0.1:5500") return;

    if (img && ev.data.counter !== undefined) {
        if (ev.data.counter >= 8) {
            img.setAttribute('src', `./assets/images/image8.webp`);
        } else{
            img.setAttribute('src', `./assets/images/image${ev.data.counter}.jpg`);
        }
    }

});
