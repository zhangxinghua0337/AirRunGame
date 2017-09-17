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
 * 游戏背景类
 */
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.BG_WIDTH = 1600;
        _this.moveX = 0;
        _this.init();
        return _this;
    }
    Background.prototype.init = function () {
        var texture1 = Laya.loader.getRes("res/background.png");
        var texture2 = Laya.loader.getRes("res/m_background.png");
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
    };
    Background.prototype.onLoop = function () {
        if (RunGame.ISOVER || RunGame.ISPAUSE)
            return;
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
    };
    return Background;
}(Laya.Sprite));
//# sourceMappingURL=Background.js.map