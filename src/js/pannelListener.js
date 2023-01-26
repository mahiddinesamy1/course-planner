window.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector("button#openMain");
    button.addEventListener("click", async () => {
        await chrome.tabs.create({
            url: "src/html/main.html"
        });
    });
});

