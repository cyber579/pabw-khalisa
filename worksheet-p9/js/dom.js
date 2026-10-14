import { daftarProyek } from "./app.js";

// Sheet A
const container = document.querySelector(".katalog");
const filterRow = document.querySelector("#filter");
const empty = document.querySelector("#empty");

const form = document.querySelector("#tambah form");
const judulInput = document.querySelector("#judul");
const penulisInput = document.querySelector("#penulis");
const tahunInput = document.querySelector("#tahun");
const halamanInput = document.querySelector("#halaman");
const genreInput = document.querySelector("#genre");
const statusInput = document.querySelector("#status");

// Sheet B
function buildCard(proyek) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const judul = document.createElement("h3");
  judul.textContent = proyek.Judul;

  const tahun = document.createElement("p");
  tahun.textContent = `Tahun: ${proyek.Tahun}`;

  const status = document.createElement("p");
  status.textContent = proyek.Status
    ? "Status: Selesai"
    : "Status: Belum selesai";

  kartu.append(judul, tahun, status);

  return kartu;
}

function render(daftar) {
  container.textContent = "";

  if (daftar.length === 0) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  daftar.forEach((proyek) => {
    container.append(buildCard(proyek));
  });
}

// Sheet C
function markActiveButton(activeButton) {
  document.querySelectorAll("#filter button").forEach((button) => {
    button.classList.toggle("active", button === activeButton);
  });
}

filterRow.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button || !filterRow.contains(button)) return;

  const category = button.dataset.category;

  const selected = daftarProyek.filter(
    (proyek) =>
      category === "all" || proyek.category === category
  );

  markActiveButton(button);
  render(selected);
});

render(daftarProyek);
