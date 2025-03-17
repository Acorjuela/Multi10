// Seleccionar el botón correctamente
const openModalButton = document.querySelector(".apceta");

// Temporizador
const countdown = () => {
    const launchDate = new Date("2025-03-21T23:30:00Z").getTime();
    const now = new Date().getTime();
    const timeLeft = launchDate - now;

    if (timeLeft < 0) {
        clearInterval(timer);
        document.querySelector(".countdown").style.display = "none";
        disableButton(); // Deshabilita el botón y muestra la alerta
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
};

const disableButton = () => {
    if (openModalButton) {
        openModalButton.disabled = true;
        openModalButton.innerText = "Registro cerrado";
        openModalButton.classList.add("disabled");

        // Mostrar mensaje
        document.getElementById("message").style.display = "block";

        // Mostrar alerta de SweetAlert2
        Swal.fire({
            icon: "error",
            title: "Registro encerrado!",
            text: "O tempo de inscrição terminou.",
            confirmButtonText: "Entendido",
            customClass: {
                popup: "custom-swal"
              }
        });
    }
};
// Iniciar temporizador
const timer = setInterval(countdown, 1000);

