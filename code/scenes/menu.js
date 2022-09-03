import k from '../kaboom';
import {addBackground} from "../add/background";
import {addCity} from "../add/city";
import {hex} from "../helpers";

export default () => {
    window.currentScene = 'menu';

    if (!window.music) {
        window.music = k.play('music', {seek: 3, volume: 1, loop: true});
    }
    window.music?.volume(1);

    k.get('restart-info')?.[0]?.destroy();
    k.destroyAll('block');

    document.getElementById('kaboom').focus();
    addBackground();
    addCity();

    k.add([
        k.sprite('logo'),
        k.pos(k.width() / 2, 0),
        k.origin('center'),
        k.scale(0.5),
        k.z(10),
        {
            update() {
                this.pos.y = k.lerp(this.pos.y, k.height() / 4, 0.1);
            }
        }
    ]);

    k.add([
        k.text('ẤN VÀO ĐÂY ĐỂ CHƠI NHÓ :>🐰', {size: 60}),
        k.pos(k.width() / 2, k.height() / 2),
        k.origin('center'),
        k.color(hex('C7AD62')),
        k.z(10),
        {
            update() {
                const time = new Date().getTime();
                this.opacity = time % 2000 < 1500 ? 1 : 0.0001;
            }
        }
    ]);

    k.onKeyPress('space', () => k.play('click', {volume: 0.3}) && k.go('game'));
    k.onMousePress('left', () => k.play('click', {volume: 0.3}) && k.go('game'));
}