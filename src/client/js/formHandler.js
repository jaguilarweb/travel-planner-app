function handleSubmit(event){
    event.preventDefault()

    // Check what text was put into the form field
    const text = document.getElementById('location').value
    const formDate = document.getElementById('date').value
    let mainContainer = document.getElementById('main-container');

    //Replace all white spaces whatever kind
    //https://es.stackoverflow.com/questions/307780/cambiar-caracteres-por-espacio-en-replace-javascript
    const formText = text.toLowerCase().trim().replace(/\s+/g, "+");

    //UpperCase first letter
    const parseText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const parseDate = (day) => {
        let newDate = (day.getMonth() + 1) + '/'+ day.getUTCDate()+'/'+ day.getFullYear();
        return newDate;
    }

    // Reference https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Numbers_and_dates
    // Reference https://es.stackoverflow.com/questions/219147/new-date-en-javascript-me-resta-un-dia/219159
    const dayTrip = new Date(`${formDate}T00:00:00`);
    
    // To change hours at T00:00:00
    const today = new Date();
    const todayParse = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const msPerDay = 24 * 60 * 60 * 1000;
    const countdown = Math.round((dayTrip.getTime() - todayParse.getTime()) / msPerDay);

    fetch('http://localhost:8081/dataAnalyze',
    {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({formText, formDate})
    })
    .then(response => response.json())
    .then((response) => {
        const country = response.country;

        const section = document.createElement('section');
        section.className = "main-section-bottom";
        mainContainer.appendChild(section);

        const divImage = document.createElement('div');
        divImage.className = 'section-image section-width';
        section.appendChild(divImage);

        const divContent = document.createElement('div');
        divContent.className = 'section-content section-width';
        section.appendChild(divContent);

        const divResult = document.createElement('div');
        divResult.setAttribute('id', 'results');
        divContent.appendChild(divResult);

        const image = document.createElement('img');
        image.setAttribute('src', response.urlImage);
        divImage.appendChild(image);

        const paragraph = document.createElement('p');
        divResult.appendChild(paragraph);
        paragraph.innerHTML = `<h2>My trip to: ${parseText(text.trim())}, ${country}</h2>
        <h3>Departing: ${parseDate(dayTrip)}</h3>
        <br>
        <p>${parseText(text.trim())}, ${country} is <span>${countdown}</span> days away</p>
        <br>
        <p>Typycal weather for then is: </p>
        <br>
        <p>High <span>${response.high} </span>, Low <span>${response.low}</span> </p>
        <p>Mostly ${response.description} throughout the day.</p>
        `;

        const icon = document.createElement('img');
        icon.setAttribute('src', response.icon);
        icon.className="icon";
        divResult.appendChild(icon);

    })
    .catch((error) => {
        alert('Have error')
    });
    }
export { handleSubmit }

/* 
//Done
- Incorporate icons into forecast.(possible)
- Allow user to Print their trip and/or export to PDF.(possible)
- Allow the user to remove the trip.(possible)
 */