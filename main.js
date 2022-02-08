const photoContainer=selector('.photo-container');
const textContainer=selector('.text-container');
const searchInput=selector('#search-input');
const searchBtn=selector('.search-btn');

searchBtn.addEventListener('click',()=>search(searchInput.value.trim()));

let timer;

function search(str){
alert(str)
searchForPhoto(str)
}

function searchForPhoto(str){
    const url=`https://api.unsplash.com/search/photos?client_id=adFB5v3yr2sVh10Opi7MNM31JEXTzgszYwirmf9S8lY&query=${str}`;
    getData(url,handlePhotoResponse)
    function handlePhotoResponse(response){
        clearInterval(timer);
        photoContainer.innerHTML="";
        const imgsArr=[];
        let i=0;
        const resultsArr=response.results;
        resultsArr.forEach(photoObj=>{
            const img=document.createElement('img');
            img.classList.add('word-photo');
            img.src=photoObj.urls.small;
            imgsArr.push(img);
        })
        photoContainer.appendChild(imgsArr[i]);
        timer=setInterval(()=>{
            photoContainer.innerHTML="";
            if(imgsArr[i+1]){
                photoContainer.appendChild(imgsArr[i+1]);
            }else{
                i=0;
                photoContainer.appendChild(imgsArr[i]); 
            }
            i++;
        },3000)
    }
}