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