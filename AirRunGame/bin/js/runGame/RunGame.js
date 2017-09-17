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
 * 游戏入口类
 */
var RunGame = /** @class */ (function (_super) {
    __extends(RunGame, _super);
    function RunGame() {
        var _this = _super.call(this) || this;
        _this.itemPoint = new Laya.Point();
        _this.score = 0;
        // 玩家死亡了
        _this.playerDie = function () {
            RunGame.ISOVER = true;
            this.gameOver.setScore(this.score);
            this.gameOver.visible = true;
        };
        _this.init();
        return _this;
    }
    RunGame.prototype.init = function () {
        console.log("RunGame init");
        // 添加背景到场景
        this.bg = new Background();
        this.addChild(this.bg);
        // 添加地板到场景
        this.mapFloor = new mapFloor();
        this.addChild(this.mapFloor);
        // 添加飞行能量条
        this.flyEnergy = new Hp();
        this.flyEnergy.init(Hp.HP_TYPE_ENERGY);
        this.flyEnergy.y = 7;
        this.addChild(this.flyEnergy);
        // 添加速度能量条
        this.speedEnergy = new Hp();
        this.speedEnergy.init(Hp.HP_TYPE_SPEED);
        this.speedEnergy.y = 7;
        this.speedEnergy.x = this.flyEnergy.width + 10;
        this.addChild(this.speedEnergy);
        // 添加分数统计
        this.scoreTxt = new Laya.Text();
        this.scoreTxt.color = "#ffffff";
        this.scoreTxt.fontSize = 30;
        this.scoreTxt.text = "0";
        this.scoreTxt.width = 852;
        this.scoreTxt.align = "right";
        this.scoreTxt.x = -10;
        this.scoreTxt.y = 10;
        this.addChild(this.scoreTxt);
        // 添加玩家到场景
        this.player = new Player();
        this.player.init(this.flyEnergy, this.speedEnergy);
        this.player.x = 32 * 8;
        this.player.y = 32 * 4;
        this.player.on(Player.DIE, this, this.playerDie);
        this.addChild(this.player);
        // 游戏结束
        this.gameOver = new GameOver();
        this.gameOver.visible = false;
        this.addChild(this.gameOver);
        Laya.timer.frameLoop(1, this, this.onLoop);
        // 监听事件 
        Laya.stage.on(laya.events.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(laya.events.Event.MOUSE_UP, this, this.onMouseUp);
        this.gameOver.once(laya.events.Event.MOUSE_DOWN, this, this.gameReset);
        this.NpcTime = new Date().getTime();
    };
    RunGame.prototype.onLoop = function () {
        // 检测人物是否踩在地板上了
        for (var i = this.mapFloor.numChildren - 1; i > -1; i--) {
            var floor = this.mapFloor.getChildAt(i);
            if (floor.checkHit(this.player.x, this.player.y)) {
                var itemList = floor.getItems();
                for (var j = 0; j < itemList.length; j++) {
                    var item = itemList[j];
                    // 只有显示的物品才做碰撞检测
                    if (item.visible) {
                        // 拿到物品的坐标
                        this.itemPoint.x = item.x + floor.x + this.player.width;
                        this.itemPoint.y = item.y + floor.y + this.player.height;
                        // 物品碰到人物了
                        if (this.player.hitTestPoint(this.itemPoint.x, this.itemPoint.y)) {
                            // 物品有多个类型，分类型判断
                            if (item.type === Item.ITEM_TYPE_SPEED) {
                                item.visible = false;
                                this.player.showEffect();
                            }
                            else if (item.type === Item.ITEM_TYPE_FLY) {
                                item.visible = false;
                                //如果碰到悬空道具能量直接加满
                                this.flyEnergy.changeValue(100);
                            }
                            else {
                                // 星星物品播放动画
                                Laya.Tween.to(item, { y: -10, scaleX: 0.1, alpha: 0 }, 300, null, Laya.Handler.create(this, this.itemTweenComplete, [item]));
                                this.updateScore();
                            }
                        }
                    }
                }
                this.player.y = floor.y;
                this.player.jumpReset();
            }
        }
        //1500毫秒生成一个NPC
        var leftTime = new Date().getTime() - this.NpcTime;
        if (leftTime > 1500) {
            this.NpcTime = new Date().getTime();
            var npc = Laya.Pool.getItemByClass("npc", Npc);
            this.addChild(npc);
        }
    };
    RunGame.prototype.onMouseDown = function () {
        this.player.jump();
    };
    RunGame.prototype.onMouseUp = function () {
        this.player.gotoJump();
    };
    // 更新分数
    RunGame.prototype.updateScore = function () {
        this.score++;
        this.scoreTxt.text = "" + this.score;
    };
    RunGame.prototype.itemTweenComplete = function (item) {
        item.visible = false;
        item.y = 0;
        item.alpha = 1;
        item.scale(1, 1);
    };
    //游戏重新开始 这里简单点 就刷新页面吧
    RunGame.prototype.gameReset = function () {
        location.reload();
    };
    RunGame.ISPAUSE = false;
    RunGame.ISOVER = false;
    return RunGame;
}(Laya.Sprite));
//# sourceMappingURL=RunGame.js.map