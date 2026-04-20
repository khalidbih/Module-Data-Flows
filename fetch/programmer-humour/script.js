function getComic() {
  fetch("https://xkcd.now.sh/?comic=latest")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("comic-container").innerHTML =
        `<img src="${data.img}">`;
    })
    .catch(() => {
      document.getElementById("error-message").textContent =
        "Error loading comic";
    });
}
getComic();
