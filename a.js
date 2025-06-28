let selectedOperation = "";  

function firstreplace(){
     document.getElementById("anime").style.display = "none";
    document.getElementById("first1").style.display = "block";
   document.getElementById('calculator').style.backgroundImage =
  "linear-gradient(to top, rgba(12, 52, 131,1) 0%, rgba(162, 182, 223, 1) 100%, rgba(107, 140, 206, 1) 100%, rgba(162, 182, 223, 1) 100%)";

}
function homepage() {
  
  document.getElementById("anime").style.display = "flex";
  document.getElementById("first1").style.display = "none";
  document.getElementById("calculator").style.backgroundImage = "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(30, 30, 30, 0.7))";

  gsap.set("#one", {
    x: 0,
    y: 0,
    rotate: 0,
    left: "-400px",
    borderRadius: "0%",
    backgroundColor: "lightblue",
    opacity: 0
  });

  gsap.set("#two", {
    x: 0,
    y: 0,
    rotate: 0,
    right: "-400px",
    borderRadius: "0%",
    backgroundColor: "pink",
    opacity: 0
  });

  gsap.set("#three", {
    x: 0,
    y: 0,
    rotate: 0,
    left: "-400px",
    borderRadius: "0%",
    backgroundColor: "yellow",
    opacity: 0
  });

  gsap.set("#four", {
    x: 0,
    y: 0,
    rotate: 0,
    right: "-400px",
    borderRadius: "0%",
    backgroundColor: "lightgreen",
    opacity: 0
  });

  gsap.set("#calc span", {
    y: 20,
    opacity: 0
  });
}


function replace(opId) {
    selectedOperation = opId;
    document.getElementById("menu").style.display = "none";
    document.getElementById("num_calc").style.display = "block";
}

function appendValue(val) {
    document.getElementById('displayResult').value += val;
}

function clearDisplay() {
    document.getElementById('displayResult').value = '';
}

function back() {
     document.getElementById('displayResult').value = '';
    document.getElementById("num_calc").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

function operation(id, ...args) {
    if (args.length === 0) return 0;

    switch (id) {
        case "add":
            return args.reduce((acc, num) => acc + num);
        case "subtract":
            return args.reduce((acc, num) => acc - num);
        case "multiply":
            return args.reduce((acc, num) => acc * num);
        case "divide":
            return args.reduce((acc, num) => acc / num);
        case "log":
            return Math.log10(args[0]);
        case "sqrt":
            return Math.sqrt(args[0]);
        case "square":
            return args[0] ** 2;
        case "cube":
            return args[0] ** 3;
        case "cbrt":
            return Math.cbrt(args[0]);
        default:
            return "Invalid operation";
    }
}

function calculate() {
    const input = document.getElementById('displayResult').value.trim();
    const numArray = input.split(' ').map(Number);

    if (numArray.some(isNaN)) {
        alert("Please enter valid numbers separated by spaces.");
        return;
    }

    const result = operation(selectedOperation, ...numArray);

    if (isNaN(result)) {
        alert("Math error: result is not a number");
        return;
    }

    document.getElementById('displayResult').value = result;
}
function toggle() {
  const toggleBtn = document.getElementById('toggle');
  const isDark = toggleBtn.textContent === '🌜';
  const calc = document.getElementById('calculator');
  const isAnimeHidden = document.getElementById("anime").style.display === 'none';

  if (isAnimeHidden) {
    if (isDark) {
      document.body.classList.add('dark');
      document.body.style.background = "linear-gradient(135deg, #071952 10%, #088395 100%)";

      // 💡 Semi-transparent dark mode background for calculator
      calc.style.backgroundImage = "linear-gradient(to top, rgba(12, 52, 131, 0.7), rgba(107, 140, 206, 0.7), rgba(162, 182, 223, 0.7))";

      toggleBtn.textContent = '🌞';
      animateLanterns();
    } else {
      document.body.classList.remove('dark');
      document.body.style.background = "linear-gradient(-290deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)";

      // 💡 Lighter background for light mode
     calc.style.backgroundImage = "linear-gradient(to top, rgba(12, 52, 131, 1), rgba(107, 140, 206, 1), rgba(162, 182, 223, 1))";

      toggleBtn.textContent = '🌜';
      gsap.killTweensOf(".lantern");
    }
  }
}

function animateLanterns() {
  gsap.utils.toArray(".lantern").forEach(lantern => {
    gsap.to(lantern, {
      y: -1200,
      duration: () => gsap.utils.random(10, 20),
      delay: () => gsap.utils.random(0, 5),
      ease: "sine.inOut",
      repeat: -1,
      repeatRefresh: true,
      yoyo:true
      
    });
  });
}
function spanifyCalc() {
  const calc = document.getElementById("calc");

  // Get the button and remove it temporarily
  const button = calc.querySelector("button");
  const buttonText = button ? button.textContent.trim() : "";
  const buttonHTML = button ? `<span><button onclick="firstreplace()">${buttonText}</button></span>` : "";

  // Remove button from innerHTML to get text only
  const textOnly = calc.textContent.replace(buttonText, "").trim();

  // Split text into words and wrap each word in a span
  const spannedText = textOnly
    .split(/\s+/)
    .map(word => `<span>${word}</span>`)
    .join(" ");

  // Set new HTML with word spans + button span
  calc.innerHTML = spannedText + "<br>" + buttonHTML;
}

spanifyCalc();
function animatecalc() {
  const a = document.querySelector("#one");
  const b = document.querySelector("#two");
  const c = document.querySelector("#three");
  const d = document.querySelector("#four");
  const spans = document.querySelectorAll("#calc span");

   gsap.set([a, b, c, d], { clearProps: "all", opacity: 0 });
  gsap.set(spans, { y: 20, opacity: 0 });


  const tl = gsap.timeline();

  // Step 1: Animate circles
  tl.to(a, {
    x: 780,
    duration: 1.5,
    delay: 0.1,
    rotate: 360,
    borderRadius: "50%",
    backgroundColor: "pink",
    opacity: 1
  })
  .to(b, {
    y: 530,
    duration: 1.5,
    delay: 0.1,
    rotate: 360,
    borderRadius: "50%",
    backgroundColor: "lightgreen",
    opacity: 1
  })
  .to(d, {
    x: -780,
    duration: 1.5,
    delay: 0.1,
    rotate: 360,
    borderRadius: "50%",
    backgroundColor: "yellow",
    opacity: 1
  })
  .to(c, {
    y: -530,
    duration: 1.5,
    delay: 0.1,
    rotate: 360,
    borderRadius: "50%",
    backgroundColor: "lightblue",
    opacity: 1
  })

  // Step 2: After all circles, animate span words upward
  .to(spans, {
    y: -20,
    opacity: 1,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out"
  });
}


const animeSection = document.getElementById("trigger");
animeSection.addEventListener("click", animatecalc);
