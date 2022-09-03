import k from '../kaboom';
import {hex} from "../helpers";

export default ({camPosY}) => {
    k.camPos(k.vec2(k.width() / 2, camPosY));

    window.currentScene = 'gameOver';
    window.music?.volume(0);

    k.play('gameover');

    k.add([
        k.text('Game Over', {size: 80}),
        k.pos(k.width() / 2, k.height() / 3),
        k.origin('center'),
        k.fixed(),
        k.z(10),
    ]);

    k.wait(0.5, function () {
        k.add([
            k.text('Your Score:', {size: 40}),
            k.pos(k.width() / 2, k.height() / 2),
            k.color(hex('cccccc')),
            k.origin('center'),
            k.fixed(),
            k.z(10),
            k.opacity(0),
            {
                update() {
                    this.opacity = k.lerp(this.opacity, 1, 0.1);
                }
            }
        ]);
    });

    k.onKeyPress('r', () => k.go('game'));
    k.onKeyPress('space', () => k.go('game'));
    k.onMousePress('left', () => k.go('game'));
    k.onKeyPress('escape', () => k.go('menu'));
}