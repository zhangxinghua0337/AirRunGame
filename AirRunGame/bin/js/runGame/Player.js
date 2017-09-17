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
 * 玩家类
 */
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        // 跳的次数
        _this.jumpCount = 0;
        // 最大连跳
        _this.jumpCountMax = 2;
        // 玩家下落值
        _this.vy = 0;
        // 玩家下路速度
        _this.downSpeed = 3;
        // 玩家最大下落加速度
        _this.maxVy = 32;
        // 隐藏特效
        _this.hideEffect = function () {
            this.bodyEffect1.visible = false;
            this.bodyEffect2.visible = false;
            //Config.speed = Config.SPEED_SLOW;
        };
        _this.width = 96;
        _this.height = 96;
        return _this;
    }
    Player.prototype.init = function (flyEnergy, speedEnergy) {
        this.flyEnergy = flyEnergy;
        this.speedEnergy = speedEnergy;
        // 让动画缓存起来
        if (!Player.cached) {
            Player.cached = true;
            Laya.Animation.createFrames(["player/chara_01.png", "player/chara_02.png", "player/chara_03.png", "player/chara_04.png"], Player.RUN);
            Laya.Animation.createFrames(["player/chara_05.png", "player/chara_06.png", "player/chara_07.png", "player/chara_08.png"], Player.FLY);
            Laya.Animation.createFrames(["player/chara_13.png", "player/chara_14.png", "player/chara_15.png", "player/chara_16.png"], Player.JUMP);
        }
        if (!this.body) {
            this.body = new Laya.Animation();
            this.body.pivot(48, 60);
            this.body.interval = 100;
            this.addChild(this.body);
        }
        if (!this.bodyEffect1) {
            this.bodyEffect1 = new Laya.Animation();
            this.bodyEffect1.alpha = 0.6;
            this.bodyEffect1.pivot(80, 60);
            this.bodyEffect1.interval = 100;
            this.bodyEffect1.visible = false;
            this.addChild(this.bodyEffect1);
        }
        if (!this.bodyEffect2) {
            this.bodyEffect2 = new Laya.Animation;
            this.bodyEffect2.alpha = 0.3;
            this.bodyEffect2.pivot(110, 60);
            this.bodyEffect2.interval = 100;
            this.bodyEffect2.visible = false;
            this.addChild(this.bodyEffect2);
        }
        var texture = Laya.loader.getRes("res/spiritEffect.png");
        this.spritEffect = new Laya.Sprite();
        this.spritEffect.pivot(154 * 0.5, 190 * 0.5);
        this.spritEffect.visible = false;
        this.spritEffect.scale(5, 5);
        this.spritEffect.graphics.drawTexture(texture, 0, 0, 154, 190);
        this.addChild(this.spritEffect);
        // 初始化的时候播放跑的动作
        this.playAction(Player.RUN);
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Player.prototype.onLoop = function () {
        // 玩家开始下落
        this.y += this.vy;
        this.vy += this.downSpeed;
        //判断玩家当前是否在特效中
        if (this.isEffect()) {
            //如果在特效中的话 我们就慢慢的消耗能量 知道为1的时候 就变回原来的默认状态
            this.speedEnergy.changeValue(-0.2);
            if (this.speedEnergy.value <= 1) {
                this.hideEffect();
                this.gotoRun();
            }
        }
        // 控制最大值
        if (this.vy > this.maxVy) {
            this.vy = this.maxVy;
        }
        // 如果玩家y轴调出屏幕以外100像素,游戏结束
        if (this.y > (480 + 100)) {
            //console.log("Game Over!");
            this.event(Player.DIE, this);
            return;
        }
        switch (this.action) {
            case Player.FLY:
                //如果当前是飞行状态 将玩家Y轴慢慢往上提 并且不超过最大值
                //没有加速特效的情况才会扣除能量值
                if (!this.isEffect())
                    this.flyEnergy.changeValue(-0.5);
                if (this.flyEnergy.value <= 1) {
                    this.gotoJump();
                }
                else {
                    this.vy = 0;
                    this.y -= 4;
                    if (this.y < 110)
                        this.y = 110;
                }
                break;
            default:
                //悬空能量条 在非悬空状态下面会慢慢的增加
                //this.flyEnergy.changeValue(0.05);
                break;
        }
    };
    Player.prototype.playAction = function (action) {
        // 如果是重复动作 不执行
        if (this.action == action)
            return;
        this.action = action;
        // 动画播放
        this.body.play(0, true, this.action);
        this.bodyEffect1.play(0, true, this.action);
        this.bodyEffect2.play(0, true, this.action);
    };
    // 开始跳
    Player.prototype.gotoJump = function () {
        this.playAction(Player.JUMP);
    };
    // 开始跑
    Player.prototype.gotoRun = function () {
        this.playAction(Player.RUN);
    };
    // 开始飞
    Player.prototype.gotoFly = function () {
        this.playAction(Player.FLY);
    };
    // 二连跳
    Player.prototype.jump = function () {
        if (this.jumpCount < this.jumpCountMax) {
            this.vy = -30;
            this.jumpCount++;
            this.gotoJump();
        }
        else {
            this.gotoFly();
        }
    };
    // 跳结束重置
    Player.prototype.jumpReset = function () {
        this.vy = 0;
        this.jumpCount = 0;
        this.gotoRun();
    };
    // 是否处于特效中
    Player.prototype.isEffect = function () {
        return this.bodyEffect1.visible;
    };
    // 开始显示特效
    Player.prototype.showEffect = function () {
        RunGame.ISPAUSE = true;
        this.spritEffect.visible = true;
        Laya.Tween.to(this.spritEffect, { scaleX: 0.1, scaleY: 0.1, rotation: 360 }, 1000, null, Laya.Handler.create(this, this.spiritEffectTweenComplete));
    };
    Player.prototype.spiritEffectTweenComplete = function () {
        RunGame.ISPAUSE = false;
        this.spritEffect.visible = false;
        this.spritEffect.scale(5, 5);
        this.bodyEffect1.visible = true;
        this.bodyEffect2.visible = true;
    };
    // 玩家动作
    Player.RUN = "player_run";
    Player.FLY = "player_fly";
    Player.JUMP = "player_jump";
    Player.DIE = "player_die";
    Player.HERT = "player_hert";
    // 是否缓存
    Player.cached = false;
    return Player;
}(Laya.Sprite));
//# sourceMappingURL=Player.js.map