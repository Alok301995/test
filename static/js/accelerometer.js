// export function getAccelerometer() {
//     console.log("hii accelerometer")
//   return new Promise((resolve, reject) => {
//     if (window.DeviceMotionEvent) {
//       window.addEventListener('devicemotion', (event) => {
//         const { x, y, z } = event.accelerationIncludingGravity;
//         resolve({ x, y, z });
//       });
//     } else {
//       reject('DeviceMotionEvent is not supported');
//     }
//   });
// }

// export function getOrientation() {
//     return new Promise((resolve, reject) => {
//         if (window.DeviceOrientationEvent) {
//         window.addEventListener('deviceorientation', (event) => {
//             const { alpha, beta, gamma } = event;
//             resolve({ alpha, beta, gamma });
//         });
//         } else {
//         reject('DeviceOrientationEvent is not supported');
//         }
//     });
// }

// // Path: static/js/gyroscope.js
// export function getGyroscope() {
//     return new Promise((resolve, reject) => {
//         if (window.DeviceMotionEvent) {
//         window.addEventListener('devicemotion', (event) => {
//             const { x, y, z } = event.rotationRate;
//             resolve({ x, y, z });
//         });
//         } else {
//         reject('DeviceMotionEvent is not supported');
//         }
//     });
// }

// // Path: static/js/magnetometer.js
// export function getMagnetometer() {
//     return new Promise((resolve, reject) => {
//         if (window.DeviceMotionEvent) {
//         window.addEventListener('devicemotion', (event) => {
//             const { x, y, z } = event.rotationRate;
//             resolve({ x, y, z });
//         });
//         } else {
//         reject('DeviceMotionEvent is not supported');
//         }
//     });
// }

// // Path: static/js/compass.js
// export function getCompass() {
//     return new Promise((resolve, reject) => {
//         if (window.DeviceOrientationEvent) {
//         window.addEventListener('deviceorientation', (event) => {
//             const { alpha, beta, gamma } = event;
//             resolve({ alpha, beta, gamma });
//         });
//         } else {
//         reject('DeviceOrientationEvent is not supported');
//         }
//     });
// }

// // Path: static/js/location.js
// export function getLocation() {
//     return new Promise((resolve, reject) => {
//         if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             resolve({ latitude, longitude });
//         });
//         } else {
//         reject('Geolocation is not supported');
//         }
//     });
// }

import { get_attributes } from "./static/js/main.js";

// Fetch attributes from main.js
let attributes = {};
attributes = get_attributes();

// extrach accelerometer data
let data_point = [];
let data_display = document.getElementById("data");

function handleOrientation(event) {
  incrementEventCount();
}

function handleMotion(event) {
  data_point.push([
    event.acceleration.x,
    event.acceleration.y,
    event.acceleration.z,
  ]);
}

let is_running = false;
let demo_button = document.getElementById("start_demo");

demo_button.onclick = function (e) {
  e.preventDefault();

  // Request permission for iOS 13+ devices
  if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission();
  }

  if (is_running) {
    window.removeEventListener("devicemotion", handleMotion);
    window.removeEventListener("deviceorientation", handleOrientation);
    demo_button.innerHTML = "Start demo";
    attributes["accelerometer"] = data_point;
    data_display.innerHTML = JSON.stringify(attributes);
    is_running = false;
  } else {
    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("deviceorientation", handleOrientation);
    document.getElementById("start_demo").innerHTML = "Stop";
    is_running = true;
    data_point.length = 0;
    data_display.innerHTML = "";
  }
};
