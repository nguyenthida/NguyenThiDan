import k from "./kaboom";
import gameOver from "./scenes/gameOver";
import game from "./scenes/game";
import menu from "./scenes/menu";

k.scene('menu', menu);
k.scene('game', game);
k.scene('gameOver', gameOver);

1 ? k.go('menu') : k.go('game');