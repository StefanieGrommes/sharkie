class Level {
    enemies;
    backgrounds;
    level_end_x = 2200;
    level_end_y = 480;

    constructor(enemies, backgrounds) {
        this.enemies = enemies;
        this.backgrounds = backgrounds;
    }
}