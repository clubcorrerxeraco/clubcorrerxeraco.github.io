document.addEventListener("DOMContentLoaded", function() {
  const countdownElement = document.getElementById("countdown");
  const circle = document.querySelector('.progress-ring__circle');
  const perimeter = circle.getTotalLength();
  circle.style.strokeDasharray = perimeter;

  let count = 10;

  const countdown = setInterval(() => {
    count--;
    countdownElement.textContent = count;
    circle.style.strokeDashoffset = perimeter - (count / 10) * perimeter;
    if (count === 0) {
      clearInterval(countdown);
      displayWinners();
    }
  }, 1000);

  function displayWinners() {
    const winners = getWinners();
    const winner1 = winners[0];
    const winner2 = winners[1];

    // Mostrar confeti
    const duration = 15 * 1000; // Duración del efecto de confeti (en milisegundos)
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    function runAnimation() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: 0.5, y: 0.5 } }));

      requestAnimationFrame(runAnimation);
    }

    runAnimation();

    // Mostrar a los ganadores en el centro de la pantalla
    const winnersDiv = document.createElement("div");
    winnersDiv.classList.add("centered-winners");
    winnersDiv.innerHTML = `<h2>Ganadores:</h2><p>${winner1}</p><p>${winner2}</p>`;
    document.body.appendChild(winnersDiv);
  }

  function getWinners() {
    // Aquí obtendrías los nombres de los ganadores, coloca la lógica adecuada
    const winnersArray = ["Ganador1", "Ganador2"]; // Reemplaza con los nombres reales
    return winnersArray;
  }
});
