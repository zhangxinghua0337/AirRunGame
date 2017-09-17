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
 * 游戏能量类
 */
var Hp = /** @class */ (function (_super) {
    __extends(Hp, _super);
    function Hp() {
        var _this = _super.call(this) || this;
        _this.MIN_VALUE = 0;
        _this.MAX_VALUE = 100;
        _this.value = 100;
        return _this;
    }
    /**
     *
     * @param type 能量条类型
     */
    Hp.prototype.init = function (type) {
        // 设置能量条的宽高
        this.width = 180;
        this.height = 21;
        var texture1 = Laya.loader.getRes("res/hp_bg.png");
        var texture2;
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
    };
    // 修改当前状态
    Hp.prototype.changeValue = function (value) {
        this.value += value;
        if (this.value < this.MIN_VALUE) {
            this.value = this.MIN_VALUE;
        }
        else if (this.value > this.MAX_VALUE) {
            this.value = this.MAX_VALUE;
        }
        this.bar.scale(this.value / this.MAX_VALUE, 1);
    };
    // 能力类型
    Hp.HP_TYPE_ENERGY = "hp_type_energy";
    Hp.HP_TYPE_SPEED = "hp_type_speed";
    return Hp;
}(Laya.Sprite));
//# sourceMappingURL=Hp.js.map