let selectedOperation = "";  

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
  const calc=document.getElementById('calculator');

  if (isDark) {
    document.body.classList.add('dark');
    document.body.style.background = "linear-gradient(135deg, #071952 10%, #088395 100%)";
    calc.style.backgroundImage= "linear-gradient(to top, rgba(12, 52, 131, 0.7) 0%,rgba(162, 182, 223, 0.7) 100%, rgba(107, 140, 206, 0.7) 100%, rgba(162, 182, 223, 0.7) 100%)";
   
    toggleBtn.textContent = '🌞';
    animateLanterns(); 
  } else {
    document.body.classList.remove('dark');
    document.body.style.background = "linear-gradient(-290deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)";
    toggleBtn.textContent = '🌜';
    gsap.killTweensOf(".lantern");
  }
}
function animateLanterns() {
  gsap.utils.toArray(".lantern").forEach(lantern => {
    gsap.to(lantern, {
      y: -900,
      duration: () => gsap.utils.random(10, 20),
      delay: () => gsap.utils.random(0, 5),
      ease: "sine.inOut",
      repeat: -1,
      repeatRefresh: true,
      yoyo:true
      
    });
  });
}

