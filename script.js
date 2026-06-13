const DEFAULT_RATE = 0.7146;
const converter = document.querySelector("[data-converter]");
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function input(name) {
  return converter.querySelector(`[data-input="${name}"]`);
}

function output(name) {
  return converter.querySelector(`[data-output="${name}"]`);
}

function valueFor(name, fallback = 0) {
  const value = Number(input(name)?.value);
  return Number.isFinite(value) ? value : fallback;
}

function update() {
  const cad = Math.max(0, valueFor("cad"));
  const rate = Math.max(0, valueFor("rate", DEFAULT_RATE));
  const tipPercent = Math.max(0, valueFor("tip"));
  const people = Math.max(1, Math.round(valueFor("people", 1)));
  const subtotal = cad * rate;
  const tip = subtotal * (tipPercent / 100);
  const total = subtotal + tip;

  input("people").value = String(people);
  output("subtotal").textContent = money.format(subtotal);
  output("tip").textContent = money.format(tip);
  output("total").textContent = money.format(total);
  output("each").textContent = money.format(total / people);
}

converter.querySelectorAll("[data-input]").forEach((field) => {
  field.addEventListener("input", update);
  field.addEventListener("change", update);
});

converter.querySelectorAll("[data-tip]").forEach((button) => {
  button.addEventListener("click", () => {
    input("tip").value = button.dataset.tip;
    update();
  });
});

update();
