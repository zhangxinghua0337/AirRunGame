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
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Loading.prototype.init = function () {
        this.bg = new Laya.Sprite();
        this.bg.graphics.drawRect(0, 0, 852, 480, "#000000");
        this.addChild(this.bg);
        this.txt = new Laya.Text();
        this.txt.color = "#ffffff";
        this.txt.fontSize = 30;
        this.txt.text = "Loading";
        this.txt.width = 852;
        this.txt.align = "center";
        this.txt.y = (480 - this.txt.height) * 0.5;
        this.addChild(this.txt);
    };
    Loading.prototype.progress = function (value) {
        this.txt.text = "Loading " + parseInt((value * 100).toString()) + "%";
    };
    return Loading;
}(Laya.Sprite));
//# sourceMappingURL=Loading.js.map