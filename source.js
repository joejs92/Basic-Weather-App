const tempF = [[]];
const tempC = [[]];

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
    const element = document.getElementById('weatherBox');
    const city = document.createElement('h3');
    city.textContent = tempF[0][0];
    element.appendChild(city);

    const temp = document.createElement('p');
    temp.textContent = `Current temperature: ${tempF[0][1]} / ${tempC[0][1]}.`;
    element.appendChild(temp);
}

makeWeatherBox();

const div = document.querySelector('div');
div.addEventListener('click', event => {
    const target = event.target;
    if(target.tagName == 'BUTTON') {
        if(target.innerText == 'Search'){
            // See https://www.youtube.com/watch?v=TnhCX0KkPqs
            //for more info on how promises work.
            deleteDomElement();
            deleteWeatherInfo();
            getWeather()
                .then(makeWeatherBox)
                .then(addElements)
        };
    };
});

/*
Next steps. 
1. Add a unique ID to the search button.
2. Modify addElements to display only F as default.
3. Modify the addElements function to add a button that
converts to C when F is displayed, and to F when C is 
displayed.
*/