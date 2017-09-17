/**
 * 游戏道具
 */
class Item extends Laya.Sprite {
    // 图标
    private icon: Laya.Sprite;
    // 星星贴图
    private starTexture: Laya.Texture;
    // 加速贴图
    private speedTexture: Laya.Texture;
    // 悬空贴图
    private flyTexture: Laya.Texture;   
    // 类型
    public type: string = "";
    constructor() {
        super();
    }
    // 星星分类
    public static ITEM_TYPE_STAR: string = "item_type_star";
    public static ITEM_TYPE_SPEED: string = "item_type_speed";
    public static ITEM_TYPE_FLY: string = "item_type_fly";
    /**
     * 
     * @param type  icon 类型
     */
    init(type: string): void {
        this.type = type;
        if (!this.icon) {
            this.starTexture = Laya.loader.getRes("res/item_1.png");
            this.speedTexture = Laya.loader.getRes("res/item_3.png");
            this.flyTexture = Laya.loader.getRes("res/item_4.png");
            this.icon = new Laya.Sprite();
            this.addChild(this.icon);
        }
        this.icon.graphics.clear();
        switch (type) {
            case Item.ITEM_TYPE_STAR:
                this.icon.graphics.drawTexture(this.starTexture, 0, 0, 32, 32);
                break;
            case Item.ITEM_TYPE_SPEED:
                this.icon.graphics.drawTexture(this.speedTexture, 0, 0, 40, 53);
                break;
            case Item.ITEM_TYPE_FLY:
                this.icon.graphics.drawTexture(this.flyTexture, 0, 0, 40, 48);
                break;
            default:
                break;
        }
    }
}