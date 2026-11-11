let level1;
function initLevel1() {
     level1 = new Level(
    [
        new Pufferfish('ORANGE'),
        new Jellyfish('PINK'),
        new Jellyfish('PINK'),
        new Jellyfish('LILA'),
        new Jellyfish('YELLOW'),
        new Pufferfish('PINK'),
        new Pufferfish('GREEN'),
        new Jellyfish(),
        new Pufferfish('ORANGE'),
        new Endboss()
    ],

    [
        new Background ('img/3.Background/Layers/5.Water/D2.png', -720),
        new Background('img/3.Background/Layers/4.Fondo2/D2.png', -720),
        new Background('img/3.Background/Layers/3.Fondo1/D2.png', -720),
        new Background('img/3.Background/Layers/2.Floor/D2.png', -720),
        new Background ('img/3.Background/Layers/5.Water/D1.png', 0),
        new Background('img/3.Background/Layers/4.Fondo2/D1.png', 0),
        new Background('img/3.Background/Layers/3.Fondo1/D1.png', 0),
        new Background('img/3.Background/Layers/2.Floor/D1.png', 0),
        new Background ('img/3.Background/Layers/5.Water/D2.png', 720),
        new Background('img/3.Background/Layers/4.Fondo2/D2.png', 720),
        new Background('img/3.Background/Layers/3.Fondo1/D2.png', 720),
        new Background('img/3.Background/Layers/2.Floor/D2.png', 720),
        new Background ('img/3.Background/Layers/5.Water/D1.png', 720*2),
        new Background('img/3.Background/Layers/4.Fondo2/D1.png', 720*2),
        new Background('img/3.Background/Layers/3.Fondo1/D1.png', 720*2),
        new Background('img/3.Background/Layers/2.Floor/D1.png', 720*2),
        new Background ('img/3.Background/Layers/5.Water/D2.png', 720*3),
        new Background('img/3.Background/Layers/4.Fondo2/D2.png', 720*3),
        new Background('img/3.Background/Layers/3.Fondo1/D2.png', 720*3),
        new Background('img/3.Background/Layers/2.Floor/D2.png', 720*3),

    ]

);
}