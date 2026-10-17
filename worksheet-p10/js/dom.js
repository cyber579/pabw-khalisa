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

// Sheet D 
const errorElements = {
  judul: document.querySelector("#judul-error"),
  penulis: document.querySelector("#penulis-error"),
  tahun: document.querySelector("#tahun-error"),
  halaman: document.querySelector("#halaman-error"),
  genre: document.querySelector("#genre-error"),
  status: document.querySelector("#status-error"),
};

const fields = {
  judul: judulInput,
  penulis: penulisInput,
  tahun: tahunInput,
  halaman: halamanInput,
  genre: genreInput,
  status: statusInput,
};

function validateField(name) {
  const field = fields[name];
  const error = errorElements[name];
  const value = field.value.trim();

  let message = "";

  if (!value) {
    message = "Field ini wajib diisi.";
  } else if (name === "halaman" &&
             (!Number.isInteger(Number(value)) ||
              Number(value) <= 0)) {
    message = "Halaman harus berupa bilangan bulat positif.";
  } else if (name === "tahun" &&
             (!Number.isInteger(Number(value)) ||
              Number(value) < 1500 ||
              Number(value) > new Date().getFullYear())) {
    message = "Masukkan tahun yang valid.";
  }

  error.textContent = message;

  if (message) {
    field.setAttribute("aria-invalid", "true");
  } else {
    field.removeAttribute("aria-invalid");
  }

  return message === "";
}

function validateForm() {
  return Object.keys(fields).every(validateField);
}

const submitButton = form.querySelector('[type="submit"]');

function updateSubmitButton() {
  submitButton.disabled = !validateForm();
}

Object.keys(fields).forEach((name) => {
  fields[name].addEventListener("input", updateSubmitButton);
  fields[name].addEventListener("change", updateSubmitButton);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    const firstInvalid = Object.keys(fields).find(
      (name) => !validateField(name)
    );

    if (firstInvalid) {
      fields[firstInvalid].focus();
    }

    return;
  }

  alert("Validasi berhasil!");
});

updateSubmitButton();
