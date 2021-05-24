function handleSubmit(event){
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('location').value
  
  const resultContainer = document.getElementById('results');
      fetch('http://localhost:8081/dataAnalyze',
      {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({formText})
      })
      .then(response => response.json())
      .then(function(response) {
          console.log(response)
        const latitude = response.geonames[0].lat;
        const longitude = response.geonames[0].lng;
        const country = response.geonames[0].countryName;
          resultContainer.className = "result-api";
          const paragraph = document.createElement('pre');
          resultContainer.appendChild(paragraph);
          //paragraph.innerHTML = JSON.stringify(response, null, 4);
          paragraph.innerHTML = `<p> Lat: ${latitude} </p>
                                <p> Lon: ${longitude} </p>
                                <p>Country: ${country} </p>
          `;
      })
      .catch(error => console.log(`Error: ${error}`));


}
export { handleSubmit }