import kaboom from "kaboom";
import {hex} from "./helpers";

const baseWidth = 1920;
let scale = window.innerWidth / baseWidth // 2;
console.log(window.innerWidth,  window.outerWidth, scale)
const k = kaboom({
    background: hex('1c4154'),
    canvas: document.getElementById('kaboom'),
    texFilter: 'linear',
    scale: scale,
    font: 'default_',
    global: false,
});

k.loadFont('default_', 'fonts/Kenney_Mini_Square.ttf');

k.loadSprite('logo', 'sprites/logo.png');
k.loadSprite('city', 'sprites/city.png');
k.loadSprite('floor', 'sprites/floor.png');

k.loadSound('music', 'sounds/music.mp3');
k.loadSound('click', 'sounds/click.wav');
k.loadSound('poof', 'sounds/poof.wav');
k.loadSound('gameover', 'sounds/gameover.wav');

k.onLoad(() => {
    document.getElementById('kaboom').focus();
});

export default k;