function handleSubmit(event){
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('location').value
    let formDate = document.getElementById('date').value

    const parseDate = (day) => {
        let newDate = (day.getMonth() + 1) + '/'+ day.getUTCDate()+'/'+ day.getFullYear();
        return newDate;
    }

    // Reference https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Numbers_and_dates
    // Reference https://es.stackoverflow.com/questions/219147/new-date-en-javascript-me-resta-un-dia/219159
    const dayTrip = new Date(`${formDate}T00:00:00`);
    
    // To change hours to T00:00:00
    const today = new Date();
    const todayParse = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const msPerDay = 24 * 60 * 60 * 1000;
    let counter = Math.round((dayTrip.getTime() - todayParse.getTime()) / msPerDay);

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
        const country = response.geonames[0].countryName;
        const location = response.geonames[0].name;
        resultContainer.className = "result-api";
        const paragraph = document.createElement('pre');
        resultContainer.appendChild(paragraph);
        paragraph.innerHTML = `<h2>My trip to: ${location}, ${country}</h2>
                                <h3>Departing: ${parseDate(dayTrip)}</h3>
                                <p>${location}, ${country} is ${counter} days away</p>
        `;
    })
    .catch(error => console.log(`Error: ${error}`));
    }
export { handleSubmit }