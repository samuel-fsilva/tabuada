let button = document.getElementById("calculate");
let pdfbutton = document.getElementById("pdf-generator");
let refreshButton = document.getElementById("clean");
let output = document.getElementById("result-output");

pdfbutton.disabled = true;
button.addEventListener("click", () => {
  calcular();
});

function calcular() {
  let multiTableNumber = document.getElementById(
    "number-multiplication-table",
  ).value;
  let maxOfTableNumber = document.getElementById(
    "max-multiplication-table",
  ).value;
  let results = "";
  if (
    multiTableNumber != "" &&
    maxOfTableNumber != "" &&
    maxOfTableNumber < 500
  ) {
    pdfbutton.disabled = false;
    for (let i = 1; i <= maxOfTableNumber; i++) {
      let result = `<p>${multiTableNumber} x ${i} = ${
        multiTableNumber * i
      } </p>`;
      results = results + result;
    }
    output.style.color = "transparent";
    output.innerHTML = `<h3>Resultados</h3> ${results}`;
    setTimeout(() => {
      output.style.color = "black";
    }, 300);
  } else if (maxOfTableNumber > 499) {
    output.innerHTML = '<p id="bad-alert">Limite da tabuada muito alto</p>';
    setTimeout(() => {
      output.innerHTML = "";
    }, 3000);
  } else {
    output.innerHTML =
      '<p id="bad-alert">Preencha os campos acima corretamente!</p>';
    setTimeout(() => {
      output.innerHTML = "";
    }, 3000);
  }
}

pdfbutton.addEventListener("click", () => {
  gerarPDF();
});

function gerarPDF() {
  let content = output;
  console.log(content);
  const options = {
    margin: [10, 10, 10, 10],
    filename: "Tabuada.pdf",
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    html2canvas: { scale: 2 },
  };
  html2pdf().set(options).from(content).save();
  PDFbuttonAnimation();

  function PDFbuttonAnimation() {
    pdfbutton.innerHTML = `<img src="images/loading.svg" class="spinning" id="loadImage">`;

    setTimeout(() => {
      pdfbutton.innerHTML = `<img src="images/CheckIcon.svg" id="loadImage">`;

      setTimeout(() => {
        pdfbutton.innerHTML = "Gerar PDF";
      }, 1500);
    }, 1000);
  }
}

refreshButton.addEventListener("click", () => {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
  output.innerHTML = ``;
});
