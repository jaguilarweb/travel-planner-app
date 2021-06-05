import { validate } from "./formValidate";

function handleSubmit(event){
    event.preventDefault()

    const text = document.getElementById('location').value
    const formDate = document.getElementById('date').value

    if(validate(text, formDate)){

        let mainContainer = document.querySelector('.main-section-bottom');
        //Delete after and before spaces. Replace all white spaces whatever kind
        const formText = text.toLowerCase().trim().replace(/\s+/g, "+");

        //UpperCase first letter
        const parseText = (text) => {
            return text.charAt(0).toUpperCase() + text.slice(1);
        }

        const parseDate = (day) => {
            let newDate = (day.getMonth() + 1) + '/'+ day.getUTCDate()+'/'+ day.getFullYear();
            return newDate;
        }

        // To change hours at T00:00:00
        const dayTrip = new Date(`${formDate}T00:00:00`);
        const today = new Date();
        const todayParse = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        const msPerDay = 24 * 60 * 60 * 1000;
        const week = today.getTime() + (msPerDay * 7);
        const countdown = Math.round((dayTrip.getTime() - todayParse.getTime()) / msPerDay);

        fetch('http://localhost:8081/dataAnalyze',
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({formText, dayTrip})
        })
        .then(response => response.json())
        .then((response) => {
            const country = response.country;

            const article = document.createElement('article');
            article.className = "article";
            mainContainer.appendChild(article);

            const divImage = document.createElement('div');
            divImage.className = 'article-image';
            article.appendChild(divImage);

            const divContent = document.createElement('div');
            divContent.className = 'article-content';
            article.appendChild(divContent);

            const image = document.createElement('img');
            image.setAttribute('src', response.urlImage);
            divImage.appendChild(image);

            let divResult = document.createElement('div');
            divContent.appendChild(divResult);

            const tempStr = () => {
                if(dayTrip.getTime() > week){
                    //The trip is in the future => predicted forecast
                    return `High <span>${response.high}ºC </span>, Low <span>${response.low}ºC</span>`;
                }else{
                    //The trip is within a week => current weather forecast
                    return `Temperature <span>${response.temp}ºC</span>`;
                }
            }

            const str = `<h2>My trip to: ${parseText(text.trim())}, ${country}</h2>
            <h3>Departing: ${parseDate(dayTrip)}</h3>
            <p>${parseText(text.trim())}, ${country} is <span>${countdown}</span> days away</p>
            <p>Typycal weather for then is: </p>
            <p>${tempStr()}</p>
            <p>Mostly ${response.description} throughout the day.</p>
            `;

            divResult.innerHTML = str;

            const icon = document.createElement('img');
            icon.setAttribute('src', response.icon);
            icon.className="icon";
            divContent.appendChild(icon);
        })
        .catch((error) => {
            alert('Something is wrong... please, try again.')
        });
    }else{
        alert("Sorry, location and date inputs are required.")
    }
}

export { handleSubmit }
