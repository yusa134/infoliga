let dbPromised = idb.open("infoliga", 1, function(upgradeDb) {
    let favoriteObjectStore = upgradeDb.createObjectStore("favorite", {
      keyPath: "id"
    });
    favoriteObjectStore.createIndex("name", "name", { unique: false });
});

  function saveForLater(favorite) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("favorite", "readwrite");
        let store = tx.objectStore("favorite");
        console.log(favorite);
        store.put(favorite);
        return tx.complete;
      })
      .then(function() {
        console.log("Club berhasil di simpan.");
      });
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("favorite", "readonly");
          let store = tx.objectStore("favorite");
          return store.getAll();
        })
        .then(function(favorite) {
          resolve(favorite);
        });
    });
  }

  function getById(id) {
    id = parseInt(id);
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("favorite", "readonly");
          let store = tx.objectStore("favorite");
          return store.get(id);
        })
        .then(function(favorite) {
          resolve(favorite);
        });
    });
  }

  function deleteById(id) {
    id = parseInt(id);
    return new Promise(function(resolve, reject) {
      dbPromised
      .then(function(db) {
        let tx = db.transaction('favorite', 'readwrite');
        let favorite = tx.objectStore('favorite');
        favorite.delete(id);
        return tx.complete;
      }).then(function() {
        console.log(id);
        console.log('Team favorite berhasil dihapus');
      });
    });
  }