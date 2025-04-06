const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let input = document.getElementById("sentence").value.trim();
  let error = document.querySelector(".error-message");
  let countSpan = document.getElementById("count");
  let maxSpan = document.getElementById("max");
  let minSpan = document.getElementById("min");
  let averageSpan = document.getElementById("average");

  if (input.length === 0) {
    error.innerHTML = "This field can't be empty!";
    countSpan.innerHTML = null;
    averageSpan.innerHTML = null;
    maxSpan.innerHTML = null;
    minSpan.innerHTML = null;
    
    return;
  }

  let words = input.split(/\s+/).filter((w) => w.length > 0);
  let lengths = words.map((word) => word.length);

  let count = words.length;
  let max = Math.max(...lengths);
  let min = Math.min(...lengths);
  let average = lengths.reduce((a, b) => a + b, 0) / count;

  countSpan.innerHTML = count;
  maxSpan.innerHTML = max;
  minSpan.innerHTML = min;
  averageSpan.innerHTML = average.toFixed(2);
  error.innerHTML = null;
});
