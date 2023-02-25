import { getAccelerometer } from '../js/accelerometer.js'


let btn =  document.getElementById("btn");


getAccelerometer().then(({x , y ,z}) => {
    console.log(x,y,z);
    btn.innerHTML = x;

}).catch((error) => {
    console.log(error);
});

console.log("hii main data")