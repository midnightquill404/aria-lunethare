# Website OC — Aria Lunetharë

Website profil Original Character dengan HTML, CSS, dan JavaScript biasa. Tidak membutuhkan instalasi framework atau biaya hosting untuk dijalankan di komputer sendiri.

## Isi paket

- `index.html` — struktur dan konten halaman.
- `style.css` — palet Royal Gothic, layout responsif, tipografi, ornamen, dan animasi.
- `script.js` — dropdown navigasi, penanda menu aktif, dan dialog galeri.
- `README.txt` — petunjuk penggunaan.
- `images/README.txt` — daftar nama dan format file gambar yang perlu kamu masukkan.

## Cara menjalankan

1. Unduh dan ekstrak ZIP.
2. Buka folder `aria_lunethare_website`.
3. Klik dua kali `index.html`, atau buka file tersebut menggunakan browser seperti Chrome, Firefox, Edge, atau Safari.
4. Untuk mengedit website, buka file HTML/CSS/JS dengan editor teks atau editor kode seperti Visual Studio Code.

Website ini tidak memerlukan server lokal untuk fitur dasar. Koneksi internet hanya diperlukan untuk memuat font Google Fonts. Jika offline, browser memakai font pengganti yang sudah disediakan.

## Memasukkan gambar final

Folder `images/` sudah disiapkan. Masukkan gambar yang telah kamu setujui dengan nama berikut agar langsung terbaca website:

- `images/aria-portrait.png` — potret utama Aria dan kartu galeri potret (PNG, potret/vertikal, resolusi tinggi).
- `images/lore-atmosphere.jpg` — ilustrasi suasana di bagian Lore (JPG, lanskap atau persegi).
- `images/heritage-details.jpg` — visual referensi warisan yang sudah disepakati (JPG).
- `images/abergavenny.jpg` — referensi suasana Abergavenny, Wales (JPG, lanskap).
- `images/archive-fragment.jpg` — objek/dokumen arsip cerita yang sudah disetujui (JPG).

Folder yang harus diisi: `aria_lunethare_website/images/`. Rincian tambahan ada di `images/README.txt`.

Jika file belum ada, website tetap menampilkan panel dekoratif dan layout tidak rusak. Saat gambar tersedia, gambar akan muncul otomatis di slotnya dan kartu galeri dapat membukanya dalam dialog.

**Catatan:** gambar yang saat ini tersedia dari percakapan adalah papan konsep desain website, bukan gambar resmi Aria, sehingga tidak dipasang sebagai karya karakter. Detail wajah dan desain karakter tidak diubah.

## Mengubah warna

Di bagian paling atas `style.css`, cari `:root`. Variabel warna utama:
- `--maroon`
- `--gold`
- `--obsidian`
- `--ivory`
- `--wine`

Pertahankan kontras teks agar tetap mudah dibaca.

## Mengubah informasi karakter

Konten yang terlihat ditulis langsung di `index.html`. Cari judul bagian seperti `Profile`, `Lore`, `Relationships`, `Timeline`, dan `Magic`. Detail yang belum diberikan sengaja ditandai sebagai placeholder atau tidak ditambahkan.

## Batasan versi awal

- Belum ada CMS atau formulir untuk mengedit data dari halaman website.
- Slot galeri siap menampilkan gambar jika file dengan nama yang ditentukan tersedia. Gambar karakter final belum disertakan karena file gambar karakter belum tersedia.
- Efek kursor tidak mengganti kursor sistem; efek visual utama adalah hover, fade-in, dan partikel CSS.
- Struktur HTML dan sintaks JavaScript diperiksa secara statis; tampilan runtime lintas browser/perangkat tetap perlu diuji langsung sebelum dipublikasikan.
- Google Fonts membutuhkan koneksi internet; font fallback tersedia jika font eksternal gagal dimuat.
