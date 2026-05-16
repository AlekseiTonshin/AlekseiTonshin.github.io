const weddingDate = new Date("2026-07-10T17:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;

    if (distance < 0) {

        document.getElementById("countdown").innerHTML =
            "<h2>Сегодня тот самый день ❤️</h2>";
    }
}

updateCountdown();

setInterval(updateCountdown, 60000);

const form = document.getElementById("wedding-form");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const status = document.getElementById("form-status");

    const formData = new FormData(form);

    const drinks = [];

    form
        .querySelectorAll('input[name="drinks"]:checked')
        .forEach((el) => drinks.push(el.value));

    status.innerHTML = "Отправка...";

    try {

        const sendData = new FormData();

        sendData.append(
            "name",
            formData.get("name") || ""
        );

        sendData.append(
            "attendance",
            formData.get("attendance") || ""
        );

        sendData.append(
            "guests",
            formData.get("guests") || ""
        );

        sendData.append(
            "phone",
            formData.get("phone") || ""
        );

        sendData.append(
            "drinks",
            drinks.join(", ")
        );

        sendData.append(
            "allergies",
            formData.get("allergies") || ""
        );

        sendData.append(
            "song",
            formData.get("song") || ""
        );

        sendData.append(
            "message",
            formData.get("message") || ""
        );

        await fetch(
            "https://script.google.com/macros/s/AKfycbwygmpbG3HhmTNKBGUa-6LOJ16VNjUVZZvS-xmlTFZtdFb59gbjH9IH0DD3J8rghTJj/exec",
            {

                method: "POST",

                mode: "no-cors",

                body: sendData
            }
        );

        status.innerHTML =
            "Спасибо! Анкета успешно отправлена ❤️";

        form.reset();

    } catch (error) {

        console.log(error);

        status.innerHTML =
            "Ошибка соединения";
    }
});