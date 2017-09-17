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
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    GameOver.prototype.init = function () {
        this.width = 852;
        this.height = 480;
        //黑色背景
        this.bg = new Laya.Sprite();
        this.bg.alpha = 0.8;
        this.bg.graphics.drawRect(0, 0, 852, 480, "#000000");
        this.addChild(this.bg);
        //loading文本
        this.txt = new Laya.Text();
        this.txt.color = "#ffffff";
        this.txt.fontSize = 30;
        this.txt.text = "GameOver\n\nClick Again";
        this.txt.width = 852;
        this.txt.align = "center";
        this.addChild(this.txt);
    };
    GameOver.prototype.setScore = function (score) {
        var _score = Laya.LocalStorage.getItem('runGameScore');
        if (_score && parseInt(_score) > score) {
            score = parseInt(_score);
        }
        Laya.LocalStorage.setItem('runGameScore', score.toString());
        this.txt.text = "GameOver\n\n Click Again\n\n Best Score : " + score;
        this.txt.y = (480 - this.txt.height) * 0.5;
    };
    return GameOver;
}(Laya.Sprite));
//# sourceMappingURL=GameOver.js.map