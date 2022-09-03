import k from "../kaboom";

export const addCity = () => {
    return k.add([
        'city',
        k.sprite('city'),
        k.pos((k.width() / 2) - 47, k.height() + 100),
        k.origin('bot'),
        k.z(10),
        k.stay(),
    ]);
}