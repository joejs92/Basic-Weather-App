const tempF = [[]];
const tempC = [[]];

let currentTemp = false;

function getWeather(){
    const location = document.getElementById('search').value;
    return new Promise(function(resolve){
    fetch(`https://api.weatherapi.com/v1/current.json?key=f7b033dfe0ff4f6e9b5135623242304&q=${location}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            const currentTempF = [location, `${response.current.feelslike_f}° F`];
            const currentTempC = [location, `${response.current.feelslike_c}° C`];
            tempF.push(currentTempF);
            tempC.push(currentTempC);
            resolve(); 
        });
    }) 
}

function makeWeatherBox() {
    const element = document.getElementById('bottom');
    const newElement = document.createElement('div');
    newElement.setAttribute('id','weatherBox');
    element.appendChild(newElement);
    return newElement;
}

function deleteDomElement() {
    const doomedElement = document.getElementById('weatherBox');
    doomedElement.remove();
}

function deleteWeatherInfo() {
    tempF.splice(0,1);
    tempC.splice(0,1);
}

function addElements() {
    if(currentTemp == false){
        const element = document.getElementById('weatherBox');
        const city = document.createElement('h3');
        city.textContent = tempF[0][0];
        element.appendChild(city);

        const temp = document.createElement('p');
        temp.textContent = `Current temperature: ${tempF[0][1]}.`;
        element.appendChild(temp);

        const tempButton = document.createElement('button');
        tempButton.innerText = 'Celsius';
        element.appendChild(tempButton);

        currentTemp = true;
    }
    else {
        const element = document.getElementById('weatherBox');
        const city = document.createElement('h3');
        city.textContent = tempC[0][0];
        element.appendChild(city);

        const temp = document.createElement('p');
        temp.textContent = `Current temperature: ${tempC[0][1]}.`;
        element.appendChild(temp);

        const tempButton = document.createElement('button');
        tempButton.innerText = 'Farenheit';
        element.appendChild(tempButton);

        currentTemp = false;
    }
}

makeWeatherBox();

const div = document.querySelector('div');
div.addEventListener('click', event => {
    const target = event.target;
    if(target.tagName == 'BUTTON') {
        if(target.innerText == 'Search'){
            // See https://www.youtube.com/watch?v=TnhCX0KkPqs
            //for more info on how promises work.
            currentTemp = false;
            deleteDomElement();
            deleteWeatherInfo();
            getWeather()
                .then(makeWeatherBox)
                .then(addElements)
        }
        else if(target.innerText == 'Celsius'){
            deleteDomElement();
            makeWeatherBox();
            addElements()
        }
        else if(target.innerText == 'Farenheit'){
            deleteDomElement();
            makeWeatherBox();
            addElements()
        }
    };
});

/*
This is the project in its most basic form. All it does is
get the weather from the API, displays the name of the
city and its current temperature, and allows the toggling
between Celsius and Farenheit. The most important part of
the project is to get the information from the API and 
display it. That was done here. Anything else would be 
just sugar on top. In the future the code should be 
refactored to better reflect a good CRUM framework, and
add additional features. Lucky for me, anything else that
may be added can just be added to the end of one of the 
functions. I consider this project finished for now.
*/