import k from "./kaboom";

export default function () {
    k.onUpdate(() => {
        let targetCamPos = {
            x: k.camPos().x,
            y: k.lerp(
                k.camPos().y,
                window.lastFloor.pos.y - (k.height() / 2) + 300,
                0.1
            ),
        };

        k.camPos(k.vec2(targetCamPos.x, targetCamPos.y));
    });
}