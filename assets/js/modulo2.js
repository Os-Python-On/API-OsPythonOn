var acc = document.getElementsByClassName("accordion-2");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    // Adicionar a classe de transição
    this.classList.add("expanding");

    // Remover a classe de transição após 300ms (mesmo tempo da transição CSS)
    setTimeout(() => {
      this.classList.remove("expanding");
    }, 300);

    // Alternar a exibição do painel
    this.classList.toggle("active");
    this.parentElement.classList.toggle("active");

    var pannel = this.nextElementSibling;

    if (pannel.style.display === "block") {
      pannel.style.display = "none";
    } else {
      pannel.style.display = "block";
    }
  });
}
