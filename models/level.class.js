class Level {
    enemies;
    backgrounds;
    elements;
    level_end_x = 2200;
    level_end_y = 480;

    constructor(enemies, elements, backgrounds) {
        this.enemies = enemies;
        this.elements = elements;
        this.backgrounds = backgrounds;
    }
}