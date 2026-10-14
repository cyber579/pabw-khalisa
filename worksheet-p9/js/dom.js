
import { daftarProyek } from "./app.js";

// Sheet A
const container = document.querySelector(".katalog");
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

// Menggambar ulang daftar proyek
function render(daftar) {
  container.textContent = "";

  daftar.forEach((proyek) => {
    container.append(buildCard(proyek));
  });
}

render(daftarProyek);
