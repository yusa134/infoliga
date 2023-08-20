// Periksa service worker untuk index.html
function checkSw(){
    if (!('serviceWorker' in navigator)) {
        console.log(`Service worker tidak didukung browser ini.`);
      } else {
        registerServiceWorker();
        requestPermission();
      }
      // Register service worker
      function registerServiceWorker() {
        return navigator.serviceWorker.register('../service-worker.js')
          .then(registration => {
            console.log(`Registrasi service worker berhasil.`);
            return registration;
          })
          .catch(err => {
            console.error(`Registrasi service worker gagal.`, err);
          });
      }
}

function checkSwDetail(){
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => console.log(`Pendaftaran ServiceWorker berhasil`))
            .catch(() => console.log(`Pendaftaran ServiceWorker gagal`));
  
        });
      } else {
        console.log(`ServiceWorker belum didukung browser ini.`);
      }  
}