document.querySelector("#getCoord").addEventListener("click", getFetch);

function getFetch(name, s, e) {
  const choice = document.querySelector("input").value;

  const tzApiKey = "N0G3VV396RFK";

  const url = `https://geocode.xyz/${choice}?json=1`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      document.querySelector("h2").innerText =
        data.standard.city + ", " + data.standard.countryname;

      const newUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${tzApiKey}&format=json&by=position&lat=${data.latt}&lng=${data.longt}`;
      fetch(newUrl)
        .then((res) => res.json()) // parse response as JSON
        .then((data) => {
          console.log(data);
          let time = data.formatted.split(" ");
          time = time.pop();
          document.querySelector("h3").innerText =
            time + " " + data.abbreviation;
        })
        .catch((err) => {
          console.log(`error ${err}`);
        });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
