// 程序入口 初始化数据
class GameMain {
    private runGame: RunGame;
    private gameInfo: GameInfo;
    private loading: Loading;
    constructor() {
        Laya.init(852, 480);
        Laya.Stat.show(0, 50);
        Laya.stage.scaleMode = "exactfit";
        Laya.stage.alignH = "center";
        Laya.stage.screenMode = "horizontal";
        //Laya.stage.bgColor = "red";
        this.init();
        // 预加载所需资源
        Laya.loader.load([
            {
                url:
                [
                    "res/background.png",
                    "res/m_background.png",
                    "res/floor.png",
                    "res/bird_1.png",
                    "res/bird_2.png",
                    "res/bird_3.png",
                    "res/bird_4.png",
                    "res/effect.png",
                    "res/en_bar.png",
                    "res/hp_bar.png",
                    "res/hp_bg.png",
                    "res/item_1.png",
                    "res/item_2.png",
                    "res/item_3.png",
                    "res/item_4.png",
                    "res/spiritEffect.png"
                ],
                type: Laya.Loader.IMAGE
            },
            { url: "res/player.json", type: Laya.Loader.ATLAS }
        ], Laya.Handler.create(this, this.onLoaded), Laya.Handler.create(this, this.onLoading, null, false));
    }
    init(): void {
        this.gameInfo = new GameInfo();
        this.loading = new Loading();
        Laya.stage.addChild(this.loading);
        this.gameInfo.once(laya.events.Event.MOUSE_DOWN, this, this.onMouseDown);
        RunGame.ISPAUSE = true;
    }
    onLoaded(): void {
        console.log("image onloaded");
        //加载完毕移除loading 显示游戏提示UI 并且初始化游戏
        Laya.stage.removeChild(this.loading);
        // 加载完成 把图片资源添加到舞台;
        this.runGame = new RunGame();
        Laya.stage.addChild(this.runGame);
        Laya.stage.addChild(this.gameInfo);
    }
    onLoading(progress): void {
        console.log("onLoading:" + progress);
    }
    onMouseDown(): void {
        this.gameInfo.removeSelf();
        RunGame.ISPAUSE = false;
    }
}
new GameMain();