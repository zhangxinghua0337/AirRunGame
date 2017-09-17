/**
 * 游戏能量类
 */
class Hp extends Laya.Sprite {
    private bg: Laya.Sprite;
    // 进度条
    private bar: Laya.Sprite;
    private MIN_VALUE: number = 0;
    private MAX_VALUE: number = 100;
    public value: number = 100;

    constructor() {
        super();
    }
    // 能力类型
    public static HP_TYPE_ENERGY = "hp_type_energy";
    public static HP_TYPE_SPEED = "hp_type_speed";
    /**
     * 
     * @param type 能量条类型
     */
    init(type:string): void {
        // 设置能量条的宽高
        this.width = 180;
        this.height = 21;
        let texture1 = Laya.loader.getRes("res/hp_bg.png");
        let texture2;
        switch (type) {
            case Hp.HP_TYPE_ENERGY:
                texture2 = Laya.loader.getRes("res/en_bar.png");
                break;
            case Hp.HP_TYPE_SPEED:
                texture2 = Laya.loader.getRes("res/hp_bar.png");
        }
        this.bg = new Laya.Sprite();
        this.bar = new Laya.Sprite();
        this.bar.x = 15;
        this.bar.y = -2;
        this.bg.graphics.drawTexture(texture1, 0, 0, 180, 21);
        this.bar.graphics.drawTexture(texture2, 0, 0, 155, 21);
        this.addChild(this.bg);
        this.addChild(this.bar);
    }
    // 修改当前状态
    changeValue(value: number): void {
        this.value += value;
        if (this.value < this.MIN_VALUE) {
            this.value = this.MIN_VALUE;
        } else if (this.value > this.MAX_VALUE) {
            this.value = this.MAX_VALUE;
        }
        this.bar.scale(this.value / this.MAX_VALUE, 1);
    }
}