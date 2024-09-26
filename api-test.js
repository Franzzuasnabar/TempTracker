const claveApi = '400c8ee64b584d24b0815858242509';
const idioma = 'es';
const ciudad = 'Huancayo';

const apiClimaActual = `http://api.weatherapi.com/v1/current.json?q=${ciudad}&lang=${idioma}&key=${claveApi}`;

const response = await fetch(apiClimaActual);
const data = await response.json();

console.log(data);
console.log(data.location);
console.log(data.location.localtime);
