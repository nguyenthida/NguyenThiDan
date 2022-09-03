import k from "../kaboom";
import {hex} from "../helpers";

export const addBlock = ({
                             pos = {
                                 x: 0,
                                 y: k.toWorld(k.camPos()).y - k.camPos().y
                             },
                             state = 'hMove',
                             width = 320,
                             speedY = 2000,
                         } = {}) => {
    return k.add([
        'block',
        k.rect(width, 122),
        k.pos(pos.x, pos.y),
        k.origin('center'),
        k.state(state, ['hMove', 'vMove', 'placed', 'scrap']),
        k.z(10),
        k.area(),
        k.solid(),
        k.stay(),
        k.outview({hidden: true}),
        {
            movementX: 800,
            speedY: speedY,
            lastPos: {},
            add(){
                this.lastPos = {...this.pos};
            },
            draw() {
                if (this.state === 'scrap') {
                    return;
                }

                k.drawMasked(() => {
                    if (this.state === 'placed') {
                        k.drawSprite({
                            sprite: 'floor',
                            origin: 'center',
                            width: 320,
                            height: this.height,
                            pos: k.vec2(window.firstFloor.pos.x - this.pos.x, 0),
                        });
                    } else {
                        k.drawSprite({
                            sprite: 'floor',
                            origin: 'center',
                            width: 320,
                            height: this.height,
                        });
                    }
                }, () => {
                    k.drawRect({
                        width: this.width,
                        height: this.height,
                        origin: 'center',
                    });
                });

                if(this.state === 'hMove') {
                    k.drawRect({
                        width: this.width,
                        height: k.height(),
                        opacity: 0.05,
                        pos: k.vec2(0 - this.width / 2, 0),
                    });
                }
            },
            update() {
                if (window.currentScene !== 'gameOver' && this.isOutOfView() && this._id !== window.newFloor._id) {
                    this.destroy();
                    return;
                }

                if (window.currentScene !== 'game' || this.state === 'placed') {
                    return;
                }

                if (this._id === window.newFloor._id
                    && this.pos.y >= window.lastFloor.pos.y
                    && this.state === 'vMove') {
                    this.destroy();

                    k.go('gameOver', {
                        camPosY: k.camPos().y,
                    });

                    return;
                }

                if (this.state === 'hMove') {
                    if (this.pos.x > k.width() - this.width / 2 && this.movementX > 0) {
                        this.movementX *= -1;
                    } else if (this.pos.x < this.width / 2 && this.movementX < 0) {
                        this.movementX *= -1;
                    }
                    this.move(this.movementX, 0);

                    if (k.isKeyPressed('space')
                        || k.isKeyPressed('enter')
                        || k.isKeyPressed('down')
                        || k.isMousePressed('left')) {
                        this.enterState('vMove');
                    }
                } else if (this.state === 'vMove') {
                    // this.move(0, this.speedY);
                    this.moveBy(0, this.speedY * k.dt());

                    if (this.pos.y === this.lastPos.y
                        || this.isTouching(window.lastFloor) || this.isColliding(window.lastFloor)) {
                        k.get('score')[0].score++;

                        k.play('poof');
                        //k.shake(5);

                        let side = this.pos.x < window.lastFloor.pos.x ? 'left' : 'right';
                        let offset = Math.abs(window.lastFloor.pos.x - this.pos.x);

                        window.lastFloor = addBlock({
                            pos: {...this.pos},
                            state: 'placed',
                        });
                        window.lastFloor.width = this.width - offset;
                        window.lastFloor.pos.x += (offset / 2) * (side === 'left' ? 1 : -1);

                        this.enterState('scrap');
                        this.width = offset;
                        this.pos.x -= window.lastFloor.width / 2 * (side === 'left' ? 1 : -1);
                        this.speedY = 1000;
                        this.color = k.rgb(hex('3f626b'));
                        this.unuse('sprite');
                        this.unuse('solid');

                        window.newFloor = addBlock({
                            width: window.lastFloor.width,
                        });
                    }
                } else if (this.state === 'scrap') {
                    this.move(0, this.speedY);
                }

                this.lastPos = {...this.pos};
            }
        }
    ]);
}