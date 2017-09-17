var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 游戏道具
 */
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super.call(this) || this;
        // 类型
        _this.type = "";
        return _this;
    }
    /**
     *
     * @param type  icon 类型
     */
    Item.prototype.init = function (type) {
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
    };
    // 星星分类
    Item.ITEM_TYPE_STAR = "item_type_star";
    Item.ITEM_TYPE_SPEED = "item_type_speed";
    Item.ITEM_TYPE_FLY = "item_type_fly";
    return Item;
}(Laya.Sprite));
//# sourceMappingURL=Item.js.map