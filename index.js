

// Clave de la API que me dan en la pagina openweathermap 
const API_KEY = "a941f8106af1d1a62bfb404bcf99a662"

// En esta función flecha estoy tomado la latitud y longitud para establecer las coordenadas en la API
const log = Position => {

    // creamos una costante a la cual le pasamos la latitud y longitud 
    const { latitude, longitude } = Position.coords;
    // en este fetch tenemos que en el enlace de la API pasamos las coordenadas y la API_KEY
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        // entonces cuando se tenga las coordenadas organizamos la info en un json para visualizarla mejor
        .then(response => response.json())
        // le pasamos la data a setWeather
        .then(data => setWheatherData(data))


}


const setWheatherData = data => {

    console.log(data)
    // en esta constante tomamos la informacion y la organizamos segun  las id en el html adicional
    // debemos escribir bien la ruta donde esta la informacion en el json y asignalar a la ID que corresponde
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }

    // esta linea hacemos un recorrido para que a cada ID en el html se le pase la informacion
    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });


    if (weatherData.description === "Clouds") {
        let fondo = document.getElementById('clima');
        fondo.style.backgroundImage = "url('svg/nubes.svg')";
    }
    if (weatherData.description === "Rain") {
        let fondo = document.getElementById('clima');
        fondo.style.backgroundImage = "url('svg/nubes.svg')";
    }
    if (weatherData.description === "Sun") {
        let fondo = document.getElementById('clima');
        fondo.style.backgroundImage = "url('svg/sol.svg')";
    }

    carga();
}


const carga = (weatherData) =>{

    let contenerdor = document.getElementById('contenedor');
    let spinner = document.getElementById('loader');
    let fondo = document.getElementById('sol');

    spinner.style.display = "none";
    contenerdor.style.display = "flex";

}

// esta funcion nos permite acomodar la fecha en getDate
const getDate = () => {

    let date = new Date();
    // cada llave es para tomar valores de dia, mes y año, en mes se suma +1 debido a que sino se pone
    // estariamos un mes atrasados debido a que el mes 1 lo interpreta como cero.
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

}


//cree una constante para enlazarlo con el body del html tomar sus coordenadas
const onLoad = () => {

    // esta linea nos ayuda para pedirle a usuario que nos permita acceder a sus coordenadas
    navigator.geolocation.getCurrentPosition(log);

}