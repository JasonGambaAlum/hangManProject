window.addEventListener("message", (ev) => {
    if (ev.origin === "http://127.0.0.1:5500/") {
        console.log(ev.data)
    }
})