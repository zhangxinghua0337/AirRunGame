/**
 * 游戏入口类
 */
class RunGame extends Laya.Sprite {
    private bg: Background;
    private mapFloor: mapFloor;
    private player: Player;
    private floor;
    private flyEnergy: Hp;
    private speedEnergy: Hp;
    private itemPoint: Laya.Point = new Laya.Point();
    private score: number = 0;
    private scoreTxt: Laya.Text;
    public static ISPAUSE: boolean = false;
    public static ISOVER: boolean = false;
    private gameOver: GameOver;
    private NpcTime: number;
    constructor() {
        super();
        this.init();
    }
    init(): void {
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
    }
    onLoop(): void {
        // 检测人物是否踩在地板上了
        for (let i: number = this.mapFloor.numChildren - 1; i > -1; i--) {
            let floor: Floor = this.mapFloor.getChildAt(i);
            if (floor.checkHit(this.player.x, this.player.y)) {
                let itemList = floor.getItems();
                for (let j: number = 0; j < itemList.length; j++) {
                    let item: Item = itemList[j];
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
                            } else if (item.type === Item.ITEM_TYPE_FLY) {
                                item.visible = false;
                                //如果碰到悬空道具能量直接加满
                                this.flyEnergy.changeValue(100);
                            } else {
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
    }
    onMouseDown(): void {
        this.player.jump();
    }
    onMouseUp(): void {
        this.player.gotoJump();
    }
    // 更新分数
    updateScore(): void {
        this.score++;
        this.scoreTxt.text = `${this.score}`;
    }
    itemTweenComplete(item: Item): void {
        item.visible = false;
        item.y = 0;
        item.alpha = 1;
        item.scale(1, 1);
    }
    //游戏重新开始 这里简单点 就刷新页面吧
    gameReset(): void {
        location.reload();
    }
    // 玩家死亡了
    playerDie = function () {
        RunGame.ISOVER = true;
        this.gameOver.setScore(this.score);
        this.gameOver.visible = true;
    }
}