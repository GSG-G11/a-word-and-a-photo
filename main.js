const photoContainer = selector(".photo-container");
const textContainer = selector(".text-container");
const searchInput = selector("#search-input");
const searchBtn = selector(".search-btn");

searchBtn.addEventListener("click", () => search(searchInput.value.trim()));

let timer;

function search(str) {
  searchForPhoto(str);
  searchForWord(str);
}

function searchForPhoto(str) {
  const url = `https://api.unsplash.com/search/photos?client_id=adFB5v3yr2sVh10Opi7MNM31JEXTzgszYwirmf9S8lY&query=${str}`;
  getData(url, handlePhotoResponse);
  function handlePhotoResponse(response) {
    const resultsArr = response.results;
    clearInterval(timer);
    photoContainer.innerHTML = "";
    if(resultsArr.length===0){
      const img = document.createElement("img");
      img.classList.add("word-photo");
      img.src = './no-image.jpg';
      img.width="400"
      photoContainer.appendChild(img);
      return
    }
    const imgsArr = [];
    let i = 0;
    resultsArr.forEach((photoObj) => {
      const img = document.createElement("img");
      img.classList.add("word-photo");
      img.src = photoObj.urls.small;
      imgsArr.push(img);
    });
    photoContainer.appendChild(imgsArr[i]);
    timer = setInterval(() => {
      photoContainer.innerHTML = "";
      if (imgsArr[i + 1]) {
        photoContainer.appendChild(imgsArr[i + 1]);
      } else {
        i = 0;
        photoContainer.appendChild(imgsArr[i]);
      }
      i++;
    }, 3000);
  }
}

function searchForWord(str) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${str}`;
  getData(url, handleWordResponse,handleError);
  function handleWordResponse(response) {
    textContainer.innerHTML = "";
    const mean = response[0].meanings[0].definitions;
     let list = "";
    mean.forEach(
      (def) => (list += `<li class="content-li">${def.definition}</li>`)
    );
    textContainer.innerHTML = `            
    <div class="card">
      <h3 class="title">${response[0].word} (${response[0].meanings[0].partOfSpeech})</h3>
      <div class="definisions">
              <ul class="content-list">
                 ${list}
              </ul>
      </div>
  </div>`;
  }
  function handleError(errorName){
    textContainer.innerHTML = `            
    <div class="card">
    <h1>Searched Word Not In Our Dictionary</h1>  
    </div>
  </div>`
  }
}
