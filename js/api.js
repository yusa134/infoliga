let league_id = 2021;
let token = 'b340636b1ae74e318c91b6c858972956';
let base_url = "https://api.football-data.org/v4/";
let standing_url = `${base_url}competitions/${league_id}/standings`;
let team_url = `${base_url}competitions/${league_id}/teams/`;

const fetchApi = url => {
  return fetch(url, 
    { 
      mode : 'cors',
      headers: {'X-Auth-Token': token }

    });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
// Halaman Teams
function getTeams() {
  showLoader(false);      
  if ("caches" in window) {
    caches.match(team_url).then(response => {
      if (response) {
        response.json().then(data => {

          let teamsHTML = `
          <div class="container-main">
              <h5 class="center text-color fbold">All Teams</h5>
              <div class="row"">
                `;
              data.teams.forEach(item => {
                teamsHTML += `
                      <div class="col s12 l4">
                          <div class="teams-box center">
                              <div class="teams-box-row">
                                  <img src="${item.crestUrl}">
                                  <p>${item.name}</p>
                                  <a href="./detail.html?id=${item.id}">
                                    <button class="btn-more">Detail</button>
                                  </a>
                              </div>
                          </div>
                      </div>
                `;
            });
            teamsHTML += `
              </div>
            </div>`;
          // Sisipkan komponen teams ke dalam elemen dengan id #team
          document.getElementById("teams").innerHTML = teamsHTML;
          showLoader(false);     
        });
      }
    });
  }
  showLoader(true);
  fetchApi(team_url)
    .then(status)
    .then(json)
    .then(data => {
      console.log(data);
      let teamsHTML = `
    <div class="container-main">
        <h5 class="center text-color fbold">All Teams</h5>
        <div class="row"">
          `;
        data.teams.forEach(item => {
          teamsHTML += `
                <div class="col s12 l4">
                    <div class="teams-box center">
                        <div class="teams-box-row">
                            <img src="${item.crestUrl}">
                            <p>${item.name}</p>
                            <a href="./detail.html?id=${item.id}">
                              <button class="btn-more">Detail</button>
                            </a>
                        </div>
                    </div>
                </div>
          `;
      });
      teamsHTML += `
        </div>
      </div>`;
      document.getElementById("teams").innerHTML = teamsHTML;
      showLoader(false);
    })
}
// Halaman Standing
function getStandings() {
  showLoader(false);   
  if ("caches" in window) {
    caches.match(standing_url).then(response => {
      if (response) {
        response.json().then(data => {
          console.log(data);
          let standingsHTML = `
      <div class="container-main">
        <div class="standing-tables">
          <table>
            <thead>
              <tr>
                  <th>No</th>
                  <th colspan="2">Club</th>
                  <th>GP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>Pts</th>
              </tr>
            </thead>
    
            <tbody>`;
            data.standings["0"].table.forEach(item => {
              standingsHTML += `
              <a href="./detail.html?id=${item.team.id}">
                <tr>
                  <td><a href="./detail.html?id=${item.team.id}">${item.position}</a></td>
                  <td colspan="2"><a href="./detail.html?id=${item.team.id}">${item.team.name}</a></td>
                  <td>${item.playedGames}</td>
                  <td>${item.won}</td>
                  <td>${item.draw}</td>
                  <td>${item.lost}</td>
                  <td>${item.points}</td>
                </tr>
              </a>
          `;
      });
      standingsHTML += `
            </tbody>
          </table>
        </div>
      </div>`;

          document.getElementById("standings").innerHTML = standingsHTML;
          showLoader(false);   
        });
      }
    });
  }
  showLoader(true);   
  fetchApi(standing_url)
    .then(status)
    .then(json)
    .then(data => {
      console.log(data);
      let standingsHTML = `
      <div class="container-main">
        <div class="standing-tables">
          <table>
            <thead>
              <tr>
                  <th>No</th>
                  <th colspan="2">Club</th>
                  <th>GP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>Pts</th>
              </tr>
            </thead>
    
            <tbody>`;
            data.standings["0"].table.forEach(item => {
              standingsHTML += `
                <tr>
                  <td><a href="./detail.html?id=${item.team.id}">${item.position}</a></td>
                  <td colspan="2"><a href="./detail.html?id=${item.team.id}">${item.team.name}</a></td>
                  <td>${item.playedGames}</td>
                  <td>${item.won}</td>
                  <td>${item.draw}</td>
                  <td>${item.lost}</td>
                  <td>${item.points}</td>
                </tr>
          `;
      });
      standingsHTML += `
            </tbody>
          </table>
        </div>
      </div>`;
      document.getElementById("standings").innerHTML = standingsHTML;
      showLoader(false);   
    })
    .catch(error);
}

// Halaman Detail
function getDetailById() {
  showLoader(false);   
  return new Promise((resolve, reject) => {
  // Ambil nilai query parameter (?id=)
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  let team_id_url = `${base_url}teams/${idParam}`;
  
  if ("caches" in window) {
    caches.match(team_id_url).then(response => {
      if (response) {
        response.json().then(data => {

          let detailHTML = `
      <div class="container-main">
        <div class="row">
          <div class="col s12 l6 img-detail">
            <img src="${data.crestUrl}" alt="">
          </div>
        <div class="col s12 l6 info-detail">
            <h5 class="fbold text-color">${data.name}</h5>
            <p><span class="lahir">${data.founded}</span></p>
            <p><img src="img/stadium.png" alt="">${data.venue}</p>
            <p><img src="img/clothes.png" alt="">${data.clubColors}</p>
        </div>
        </div>
        <div class="squad">
          <div class="row">
            <div class="col s12 center">
              <h5 class="tittle-squad">Squad</h5>
              <div class="container-main">
              <div class="standing-tables">
                <table>
                  <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Posisi</th>
                        <th>Negara</th>
                    </tr>
                  </thead>
          
                  <tbody>`;
                  data.squad.forEach(item => {
                    detailHTML += `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.position}</td>
                      <td>${item.nationality}</td>
                    </tr>
                  `;
          });
          detailHTML += `
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
          document.getElementById("body-content").innerHTML = detailHTML;
          // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
        showLoader(false);   
        });
      }
    });
  }
  showLoader(true);   
  fetchApi(team_id_url)
    .then(status)
    .then(json)
    .then(data => {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen detail secara dinamis
      let detailHTML = `
      <div class="container-main">
        <div class="row">
          <div class="col s12 l6 img-detail">
            <img src="${data.crestUrl}" alt="">
          </div>
        <div class="col s12 l6 info-detail">
            <h5 class="fbold text-color">${data.name}</h5>
            <p><span class="lahir">${data.founded}</span></p>
            <p><img src="img/stadium.png" alt="">${data.venue}</p>
            <p><img src="img/clothes.png" alt="">${data.clubColors}</p>
        </div>
        </div>
        <div class="squad">
          <div class="row">
            <div class="col s12 center">
              <h5 class="tittle-squad">Squad</h5>
              <div class="container-main">
              <div class="standing-tables">
                <table>
                  <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Posisi</th>
                        <th>Negara</th>
                    </tr>
                  </thead>
          
                  <tbody>`;
                  data.squad.forEach(item => {
                    detailHTML += `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.position}</td>
                      <td>${item.nationality}</td>
                    </tr>
          `;
          });
          detailHTML += `
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
      document.getElementById("body-content").innerHTML = detailHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(data);
      showLoader(false);   
      console.log(data);
    });
  });
}

// halamaan favorites
function getFavorites() {
  showLoader(true);
  getAll().then(data => {
    console.log(data);
    // Menyusun komponen card artikel secara dinamis
      let favoritesHTML = `
              <div class="row"">
                `;
              data.forEach(item => {
                favoritesHTML += `
                      <div class="col s12 l4">
                          <div class="teams-box center">
                              <div class="teams-box-row">
                                  <img src="${item.crestUrl}">
                                  <p>${item.name}</p>
                                  <a href="./detail.html?id=${item.id}&saved=true">
                                    <button class="btn-more">Detail</button>
                                  </a>
                              </div>
                          </div>
                      </div>
                `;
            });
            favoritesHTML += `
            </div>`;
    // Sisipkan komponen favorites ke dalam elemen dengan id #body-content
    document.getElementById("favorites").innerHTML = favoritesHTML;
    showLoader(false);   
  });
}
// Halaman detail jika di klik lewat halaman favorite
function getFavoritesById() {
  showLoader();
  return new Promise((resolve, reject) => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  
  getById(idParam).then(data => {
    console.log(data);
    let detailFavoritesHTML = `
      <div class="container-main">
      <div class="row">
        <div class="col s12 l6 img-detail">
          <img src="${data.crestUrl}" alt="">
        </div>
      <div class="col s12 l6 info-detail">
          <h5 class="fbold text-color">${data.name}</h5>
          <p><span class="lahir">${data.founded}</span></p>
          <p><img src="img/stadium.png" alt="">${data.venue}</p>
          <p><img src="img/clothes.png" alt="">${data.clubColors}</p>
      </div>
      </div>
      <div class="squad">
        <div class="row">
          <div class="col s12 center">
            <h5 class="tittle-squad">Squad</h5>
            <div class="container-main">
            <div class="standing-tables">
              <table>
                <thead>
                  <tr>
                      <th>Nama</th>
                      <th>Posisi</th>
                      <th>Negara</th>
                  </tr>
                </thead>
        
                <tbody>`;
                data.squad.forEach(item => {
                  detailFavoritesHTML += `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.position}</td>
                    <td>${item.nationality}</td>
                  </tr>
        `;
        });
        detailFavoritesHTML += `
            </tbody>
          </table>
        </div>
      </div>
      </div>`;
    // Sisipkan komponen favorites ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = detailFavoritesHTML;
    resolve(data);
    showLoader(false);   
  });
});
}

function showLoader(active) {
  if(active == true){
    var html = `
  <div class="preloader-body">
  <div class="preloader-wrapper active">
  <div class="spinner-layer spinner-green-only">
    <div class="circle-clipper left">
      <div class="circle"></div>
    </div><div class="gap-patch">
      <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
  </div>
  </div>
  </div>`
    document.getElementById("loader").innerHTML = html;
  }else{
    document.getElementById("loader").innerHTML = ``;
  }
    
}
