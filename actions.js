function getData(url, callback,handleError) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      switch (xhr.status) {
        case 200:
          try{
            const response = JSON.parse(xhr.responseText);
            callback(response);
          }catch(e){
            console.log(e);
          }
          break;
        case 404:
          handleError(404);
          break;
        default:
          alert(`Sorry, our service at ${url} not a available at the momen. we will back soon`)
      }
    }
  };
  xhr.open("GET", url);
  xhr.send();
}
function selector(selector) {
  return document.querySelector(selector)
}