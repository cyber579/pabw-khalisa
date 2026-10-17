import { fetchNews } from './api.js';

const profil = {
  nama: "Khalisa Zahra Yulismar",
  peran: "Mahasiswa Informatika",
  minat: "Membaca dan mengoleksi buku",
  keahlian: ["Menulis", "Sketch", "Average Coding"],
  koleksiBuku: [
    "Novel Fantasy",
    "Novel Mystery",
    "Novel Slice of LIfe"
  ]
};

const jumlahKoleksi = profil.koleksiBuku.length;

let kategoriAktif = "semua";

console.log(profil);
console.log("Jumlah kategori koleksi:", jumlahKoleksi);
console.log("Kategori aktif:", kategoriAktif);

const kalimatPerkenalan =
  `Nama saya ${profil.nama}, saya seorang ${profil.peran}.`;

console.log(kalimatPerkenalan);

const alamat = null;
const alamatTampil = alamat ?? "Alamat belum diisi";

console.log(alamatTampil);
console.log(profil.alamat?.kota);

console.log(4 == "4");
console.log(4 === "4");

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));


export const daftarProyek = [
  {
    Judul: "Halaman Profil",
    Tahun: 2026,
    Status: true,
    category: "web"
  },
  {
    Judul: "Katalog Buku",
    Tahun: 2026,
    Status: false,
    category: "web"
  },
  {
    Judul: "Mindora",
    Tahun: 2026,
    Status: false,
    category: "aplikasi"
  }
];

console.table(daftarProyek);

const judulProyek = daftarProyek.map(
  (proyek) => proyek.Judul
);

console.log("Semua judul proyek:");
console.table(judulProyek);

const proyekSelesai = daftarProyek.filter(
  (proyek) => proyek.Status
);

console.log("Proyek yang selesai:");
console.table(proyekSelesai);

const proyekProfil = daftarProyek.find(
  (proyek) => proyek.Judul === "Halaman Profil"
);

console.log("Proyek profil:");
console.log(proyekProfil);

const proyekTerurut = [...daftarProyek].sort(
  (a, b) => a.Judul.localeCompare(b.Judul)
);

console.log("Array asli:");
console.table(daftarProyek);

console.log("Array setelah diurutkan:");
console.table(proyekTerurut);


const container = document.querySelector(".katalog");
const emptyElement = document.querySelector("#empty");
const statusElement = document.querySelector("#api-status");


function render(list) {
  container.textContent = "";
  emptyElement.hidden = true;

  if (list.length === 0) {
    emptyElement.hidden = false;
    return;
  }

  list.forEach(function (n) {
    const card = document.createElement("article");
    const heading = document.createElement("h3");

    heading.textContent = n.title;

    card.appendChild(heading);
    container.appendChild(card);
  });
}


async function mulaiMuatData() {
  statusElement.textContent = "Memuat data...";
  container.textContent = "";
  emptyElement.hidden = true;

  try {
    const data = await fetchNews();

    render(data);

    if (data.length === 0) {
      statusElement.textContent =
        "Data berhasil dimuat, tetapi belum ada postingan.";
    } else {
      statusElement.textContent =
        `Data berhasil dimuat: ${data.length} postingan.`;
    }

    console.log("Data API berhasil dimuat:", data);

  } catch (error) {
    container.textContent = "";
    emptyElement.hidden = true;

    statusElement.textContent =
      `Gagal memuat data: ${error.message}`;

    console.error("Error tertangani:", error.message);
  }
}

mulaiMuatData();
