function getData(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      switch (xhr.status) {
        case 200:
          const response = JSON.parse(xhr.responseText);
          callback(response);
          break;
        case 404:
          break;

        default:
      }
    }
  };
  xhr.open("GET", url);
  xhr.send();
}
function selector(selector){
  return document.querySelector(selector)
}