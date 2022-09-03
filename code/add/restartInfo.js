import k from "../kaboom";
import {hex} from "../helpers";

export const addRestartInfo = () => {
    if (!k.get('restart-info').length) {
        return k.add([
            'restart-info',
            k.text('ẤN VÀO ĐÂY ĐỂ CHƠI NHÉ 🐰', {size: 30}),
            k.pos(Math.round(k.width()-24), 24),
            k.fixed(),
            k.origin('right'),
            k.area(),
            k.stay(),
            k.z(15),
        ]);
    }
}