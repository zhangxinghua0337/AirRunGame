/**
 * 游戏背景类
 */
class Background extends Laya.Sprite {
    private BG_WIDTH: number = 1600;
    private moveX: number = 0;
    private bg1: Laya.Sprite;
    private bg2: Laya.Sprite;
    private grass: Laya.Sprite;
    constructor() {
        super();
        this.init();
    }
    init(): void {
        let texture1 = Laya.loader.getRes("res/background.png");
        let texture2 = Laya.loader.getRes("res/m_background.png");
        this.bg1 = new Laya.Sprite();
        this.bg2 = new Laya.Sprite();
        this.bg1.graphics.drawTexture(texture1, 0, 0);
        this.addChild(this.bg1);
        this.bg2.graphics.drawTexture(texture1, 0, 0);
        this.addChild(this.bg2);
        this.bg2.pos(this.BG_WIDTH, 0);

        this.grass = new Laya.Sprite();
        this.grass.graphics.drawTexture(texture2, 0, 0);
        this.addChild(this.grass);

        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    onLoop(): void {
        if(RunGame.ISOVER|| RunGame.ISPAUSE) return;
        this.x -= 5;
        this.moveX = Math.abs(this.x);
        // console.log(this.x, this.bg1.x);
        if (this.moveX - this.bg1.x >= this.BG_WIDTH) {
            this.bg1.x += this.BG_WIDTH * 2;
        }
        if (this.moveX - this.bg2.x >= this.BG_WIDTH) {
            this.bg2.x += this.BG_WIDTH * 2;
        }

        this.grass.x -= 5 * 0.5;
        if (this.grass.x + 960 < 0) {
            this.grass.x = this.moveX + 852;
        }
    }
}