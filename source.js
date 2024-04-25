
function getWeather(element){
    const search = document.getElementById('search').value;
    fetch(`https://api.weatherapi.com/v1/current.json?key=f7b033dfe0ff4f6e9b5135623242304&q=${search}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            const weatherValues = response.current;
            const headers = Object.getOwnPropertyNames(weatherValues);
            const values = Object.values(weatherValues);
            
            for(let i = 0; i<headers.length; i++){
                const text = document.createElement('p');
                text.textContent = `${headers[i]}: ${values[i]}`;
                //console.log(`${headers[i]}: ${values[i]}`);
                element.appendChild(text);
            }
        });
}

function makeWeatherBox() {
    const element = document.getElementById('bottom');
    element.style.width = '540px';
    element.style.padding = '4px';
    element.style.margin='8px';
    element.style.borderWidth = '1px';
    element.style.borderStyle = 'solid';
    element.style.borderColor = 'black';
    return element;
}

const button = document.querySelector('button');
button.addEventListener('click',() => {
    const element = makeWeatherBox()
    getWeather(element);
});