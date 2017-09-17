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
var Npc = /** @class */ (function (_super) {
    __extends(Npc, _super);
    function Npc() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Npc.prototype.init = function () {
        if (!Npc.cached) {
            Npc.cached = true;
            Laya.Animation.createFrames(['res/bird_1.png', 'res/bird_2.png', 'res/bird_3.png', 'res/bird_4.png'], Npc.BIRD);
        }
        if (this.body == null) {
            this.body = new Laya.Animation();
            this.body.interval = 100;
            this.addChild(this.body);
        }
        this.body.x = 852;
        this.body.y = Math.random() * 480;
        this.body.play(0, true, Npc.BIRD);
        //创建一个帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Npc.prototype.onLoop = function () {
        if (RunGame.ISOVER)
            return;
        this.body.x -= 5 * 1.5;
        if (this.body.x < -100) {
            this.removeSelf();
            //回收
            Laya.Pool.recover("npc", this);
            Laya.timer.clear(this, this.onLoop);
        }
    };
    Npc.cached = false;
    Npc.BIRD = "bird";
    return Npc;
}(Laya.Sprite));
//# sourceMappingURL=Npc.js.map