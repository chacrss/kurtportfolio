// ✅ Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ✅ Load Dynamic Sections and Refresh AOS
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("[data-file]");

  sections.forEach((section) => {
    const file = section.getAttribute("data-file");

    fetch(file)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${file}`);
        }
        return response.text();
      })
      .then((data) => {
        section.innerHTML = data;

        // Refresh AOS after content is injected
        if (typeof AOS !== "undefined") {
          AOS.refresh();
        }
      })
      .catch((error) => {
        console.error(error);
        section.innerHTML = `<p>Error loading section: ${file}</p>`;
      });
  });
});

// ✅ Bouncing / Draggable Tennis Ball Animation
const ball = document.getElementById("bouncing-ball");
let posX = 100;
let posY = 100;
let velocityX = 2;
let velocityY = 2;
const ballSize = 60;
const friction = 0.995;

let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let prevMouseX = 0;
let prevMouseY = 0;
let throwVX = 0;
let throwVY = 0;

function animateBall() {
  if (!isDragging) {
    posX += velocityX;
    posY += velocityY;

    if (posX <= 0 || posX + ballSize >= window.innerWidth) {
      velocityX *= -1;
      posX = Math.max(0, Math.min(posX, window.innerWidth - ballSize));
    }
    if (posY <= 0 || posY + ballSize >= window.innerHeight) {
      velocityY *= -1;
      posY = Math.max(0, Math.min(posY, window.innerHeight - ballSize));
    }

    velocityX *= friction;
    velocityY *= friction;

    ball.style.left = `${posX}px`;
    ball.style.top = `${posY}px`;
  }

  requestAnimationFrame(animateBall);
}

animateBall();

// Mouse Events
ball.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - posX;
  offsetY = e.clientY - posY;
  prevMouseX = e.clientX;
  prevMouseY = e.clientY;
  ball.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const dx = e.clientX - prevMouseX;
    const dy = e.clientY - prevMouseY;

    throwVX = dx;
    throwVY = dy;

    posX = e.clientX - offsetX;
    posY = e.clientY - offsetY;

    ball.style.left = `${posX}px`;
    ball.style.top = `${posY}px`;

    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    velocityX = throwVX;
    velocityY = throwVY;
  }
  isDragging = false;
  ball.style.cursor = "grab";
});

// Touch Events
ball.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  isDragging = true;
  offsetX = touch.clientX - posX;
  offsetY = touch.clientY - posY;
  prevMouseX = touch.clientX;
  prevMouseY = touch.clientY;
});

document.addEventListener("touchmove", (e) => {
  if (isDragging) {
    const touch = e.touches[0];
    const dx = touch.clientX - prevMouseX;
    const dy = touch.clientY - prevMouseY;

    throwVX = dx;
    throwVY = dy;

    posX = touch.clientX - offsetX;
    posY = touch.clientY - offsetY;

    ball.style.left = `${posX}px`;
    ball.style.top = `${posY}px`;

    prevMouseX = touch.clientX;
    prevMouseY = touch.clientY;
  }
});

document.addEventListener("touchend", () => {
  if (isDragging) {
    velocityX = throwVX;
    velocityY = throwVY;
  }
  isDragging = false;
});
function animateOnScroll(selector, animationClass = "animate-bounce") {
  const elements = document.querySelectorAll(selector);

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          obs.unobserve(entry.target); // Animate only once
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// Wait for dynamic content to load
document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-file]");

  includes.forEach((section) => {
    const file = section.getAttribute("data-file");

    fetch(file)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return response.text();
      })
      .then((data) => {
        section.innerHTML = data;

        // Apply animation to target classes inside this section
        animateOnScroll(`#${section.id} .animate-on-scroll`);
      })
      .catch((error) => {
        console.error(error);
        section.innerHTML = `<p>Error loading section: ${file}</p>`;
      });
  });
});
