// REQUEST API UNTUK PERTAMA KALI
document.addEventListener("DOMContentLoaded", () => {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let btnSave = document.getElementById("save");
    let btnDelete = document.getElementById("delete");
    if (isFromSaved) {
      // Hide fab jika dimuat dari indexed db
      btnSave.style.display = 'none';
      btnDelete.style.display = 'inline-block';
      
      // ambil detail lalu tampilkan
      var fileDelete = getFavoritesById();
    } else {
      var item = getDetailById();
      btnDelete.style.display = 'none';
    }
    btnSave.onclick = () => {
      console.log(`Tombol suka di klik.`);
      alert(`Club tersimpan di daftar favorites`);
      item.then(favorite => {
        saveForLater(favorite);
      });
    };
    btnDelete.onclick = () => {
      console.log(`Tombol hapus di klik.`);
      alert(`Club Favorite sudah terhapus`);
      fileDelete.then(favorite => {
        console.log(favorite.id);
        deleteById(favorite.id);
      });
    };
  });