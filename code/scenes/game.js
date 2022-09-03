import k from '../kaboom';
import camera from "../camera";
import {addCity} from "../add/city";
import {addBackground} from "../add/background";
import {addRestartInfo} from "../add/restartInfo";
import {addScore} from "../add/score";
import {addBlock} from "../add/block";
import {hex} from "../helpers";

export default () => {
    document.getElementById('kaboom').focus();

    k.destroyAll('block');

    window.currentScene = 'game';
    window.music?.volume(1);

    addCity();
    addBackground();

    window.lastFloor = window.firstFloor = addBlock({
        pos: {x: k.width() / 2, y: k.height() - 210},
        state: 'placed',
    });
    window.newFloor = addBlock({
        pos: {
            x: 0,
            y: k.toWorld(k.camPos()).y - k.camPos().y + 210
        },
    });

    addScore();
    addRestartInfo();

    k.add([
        k.rect(k.width(), 150),
        k.pos(0, 0),
        k.origin('left'),
        k.color(hex('163646')),
        {
            update(){
                if(window.newFloor) {
                    if (window.newFloor.state === 'hMove') {
                        this.opacity = 1;
                        this.height = window.newFloor.height;
                        this.pos.y = window.newFloor.pos.y;
                    } else if (window.newFloor.state === 'vMove') {
                        this.opacity = 0.5;
                        this.height = window.newFloor.height;
                        this.pos.y = window.newFloor.pos.y;
                    }
                }
            }
        }
    ]);

    k.add([
        k.text('ẤN VÀO ĐÂY ĐỂ CHƠI NHÉ :> 🐰', {size: 60}),
        k.pos(k.width()/2, k.height()/3),
        k.fixed(),
        k.origin('center'),
        k.z(15),
        {
            flag: false,
            update(){
                if(k.get('score')[0].score > 0){
                    this.pos.y = this.pos.y+5;
                    if(!this.flag) {
                        this.flag = true;
                        this.use(k.lifespan(0.5, {fade: 0.5}));
                    }
                }
            }
        }
    ]);

    camera();

    k.onKeyPress('r', () => k.go('game'));
    k.onKeyPress('escape', () => k.go('menu'));
}