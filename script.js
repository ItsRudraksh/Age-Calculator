// Declare a variable to store the age output
let ageOutput;

// Get the birth date input element
const birthDateInput = document.getElementById("birthDate");

// Function to check if a year is a leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Function to get the number of days in a month
function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// Function to calculate the age
function calculateAge() {
  const ageOutputElement = document.getElementById("ageOutput");

  const birthDate = new Date(birthDateInput.value);
  const today = new Date();

  let ageInDays = 0;
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust days and months if the day is less than the birth date
  if (days < 0) {
    const lastMonthDays = getDaysInMonth(
      today.getMonth() - 1,
      today.getFullYear()
    );
    days += lastMonthDays;
    months--;
  }

  // Adjust months and years if the month is less than the birth month
  if (months < 0) {
    months += 12;
    years--;
  }

  // Calculate the age in days
  ageInDays += years * 365;

  // Add extra days for leap years
  for (let i = 0; i < years; i++) {
    const currentYear = birthDate.getFullYear() + i;
    if (isLeapYear(currentYear)) {
      ageInDays++;
    }
  }

  // Add days for the months
  for (let i = 0; i < months; i++) {
    const currentMonth = (birthDate.getMonth() + i) % 12;
    const currentYear =
      birthDate.getFullYear() + Math.floor((birthDate.getMonth() + i) / 12);
    ageInDays += getDaysInMonth(currentMonth, currentYear);
  }

  ageInDays += days;

  // Set the age output based on the calculated age
  if (ageInDays < 0) {
    ageOutput = "Invalid birth date";
  } else if (
    today.getDate() === birthDate.getDate() &&
    today.getMonth() === birthDate.getMonth()
  ) {
    ageOutput = `Happy Birthday! You are ${years} year${
      years > 1 ? "s" : ""
    }, ${months} month${months > 1 ? "s" : ""}, and ${days} day${
      days > 1 ? "s" : ""
    } old.`;
  } else {
    ageOutput = `You are ${years} year${years > 1 ? "s" : ""}, ${months} month${
      months > 1 ? "s" : ""
    }, and ${days} day${days > 1 ? "s" : ""} old.`;
  }
}

// Define icons for different scenarios
const customIcon = `<img src="./assets/gifs/yay.gif" width="80" height="80" class="object-fit-cover rounded-circle border border-0" />`;
const birthdayIcon = `<img src="./assets/gifs/confetti.gif" width="80" height="80" class="object-fit-cover rounded-circle border border-0" />`;
const errorIcon = `<img src="./assets/gifs/error.gif" width="70" height="70" class="object-fit-cover rounded-circle border border-0" />`;

// Add an event listener to the "Calculate Age" button
document.getElementById("calc-btn").addEventListener("click", () => {
  // Check if the birth date input is empty
  if (birthDateInput.value === "") {
    const errorSound = new Audio("./assets/audios/wrong.mp3");
    Swal.fire({
      title: "Please enter a birthdate",
      icon: null,
      iconHtml: errorIcon,
      animation: true,
      confirmButtonText: "OK",
    });
    errorSound.play();
    return;
  }

  // Calculate the age
  calculateAge();

  // Display different messages and effects based on the age output
  if (ageOutput.includes("Happy Birthday")) {
    const birthdaySound = new Audio("./assets/audios/birthday.mp3");

    Swal.fire({
      title: "Calculated Age",
      text: ageOutput,
      icon: null,
      iconHtml: birthdayIcon,
      animation: true,
      confirmButtonText: "OK",
    });

    birthdaySound.play();

    // Code for displaying confetti animation on the page
    const duration = 3 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        birthdaySound.pause();
        birthdaySound.currentTime = 0;
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);

    // Play the confetti sound repeatedly every 50ms
    const soundInterval = setInterval(() => {
      birthdaySound.play();
    }, 10);

    // Stop playing the sound when the animation ends
    setTimeout(() => {
      clearInterval(soundInterval);
    }, duration);
  } else if (ageOutput.includes("Invalid")) {
    const errorSound = new Audio("./assets/audios/wrong.mp3");
    Swal.fire({
      title: "Please enter a valid birthdate",
      icon: null,
      iconHtml: errorIcon,
      animation: true,
      confirmButtonText: "OK",
    });
    errorSound.play();
    return;
  } else {
    const otherSound = new Audio("./assets/audios/age.mp3");

    Swal.fire({
      title: "Calculated Age",
      text: ageOutput,
      icon: null,
      iconHtml: customIcon,
      animation: true,
      confirmButtonText: "OK",
    });
    otherSound.play();
  }
});
document.getElementById("calc-btn").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // Check if the birth date input is empty
    if (birthDateInput.value === "") {
      const errorSound = new Audio("./assets/audios/wrong.mp3");
      Swal.fire({
        title: "Please enter a birthdate",
        icon: null,
        iconHtml: errorIcon,
        animation: true,
        confirmButtonText: "OK",
      });
      errorSound.play();
      return;
    }

    // Calculate the age
    calculateAge();

    // Display different messages and effects based on the age output
    if (ageOutput.includes("Happy Birthday")) {
      const birthdaySound = new Audio("./assets/audios/birthday.mp3");

      Swal.fire({
        title: "Calculated Age",
        text: ageOutput,
        icon: null,
        iconHtml: birthdayIcon,
        animation: true,
        confirmButtonText: "OK",
      });

      birthdaySound.play();

      // Code for displaying confetti animation on the page
      const duration = 3 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          birthdaySound.pause();
          birthdaySound.currentTime = 0;
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);

      // Play the confetti sound repeatedly every 50ms
      const soundInterval = setInterval(() => {
        birthdaySound.play();
      }, 10);

      // Stop playing the sound when the animation ends
      setTimeout(() => {
        clearInterval(soundInterval);
      }, duration);
    } else if (ageOutput.includes("Invalid")) {
      const errorSound = new Audio("./assets/audios/wrong.mp3");
      Swal.fire({
        title: "Please enter a valid birthdate",
        icon: null,
        iconHtml: errorIcon,
        animation: true,
        confirmButtonText: "OK",
      });
      errorSound.play();
      return;
    } else {
      const otherSound = new Audio("./assets/audios/age.mp3");

      Swal.fire({
        title: "Calculated Age",
        text: ageOutput,
        icon: null,
        iconHtml: customIcon,
        animation: true,
        confirmButtonText: "OK",
      });
      otherSound.play();
    }
  }
});
