/**
 * 玩家类
 */
class Player extends Laya.Sprite {
    // 玩家
    private body: Laya.Animation;
    private bodyEffect1: Laya.Animation;
    private bodyEffect2: Laya.Animation;
    // 动作
    private action: string;
    // 跳的次数
    private jumpCount: number = 0;
    // 最大连跳
    private jumpCountMax: number = 2;
    // 玩家下落值
    private vy: number = 0;
    // 玩家下路速度
    private downSpeed: number = 3;
    // 玩家最大下落加速度
    private maxVy: number = 32;

    private spritEffect: Laya.Sprite;
    private flyEnergy: Hp;
    private speedEnergy: Hp;

    constructor() {
        super();
        this.width = 96;
        this.height = 96;
    }
    // 玩家动作
    public static RUN: string = "player_run";
    public static FLY: string = "player_fly";
    public static JUMP: string = "player_jump";
    public static DIE: string = "player_die";
    public static HERT: string = "player_hert";
    // 是否缓存
    public static cached: boolean = false;

    init(flyEnergy: Hp, speedEnergy: Hp): void {
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
        let texture = Laya.loader.getRes("res/spiritEffect.png");
        this.spritEffect = new Laya.Sprite();
        this.spritEffect.pivot(154 * 0.5, 190 * 0.5);
        this.spritEffect.visible = false;
        this.spritEffect.scale(5, 5);
        this.spritEffect.graphics.drawTexture(texture, 0, 0, 154, 190);
        this.addChild(this.spritEffect);
        // 初始化的时候播放跑的动作
        this.playAction(Player.RUN);
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    onLoop(): void {
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
                if (!this.isEffect()) this.flyEnergy.changeValue(-0.5);
                if (this.flyEnergy.value <= 1) {
                    this.gotoJump();
                } else {
                    this.vy = 0;
                    this.y -= 4;
                    if (this.y < 110) this.y = 110;
                }
                break;
            default:
                //悬空能量条 在非悬空状态下面会慢慢的增加
                //this.flyEnergy.changeValue(0.05);
                break;
        }

    }
    playAction(action: string): void {
        // 如果是重复动作 不执行
        if (this.action == action) return;
        this.action = action;
        // 动画播放
        this.body.play(0, true, this.action);
        this.bodyEffect1.play(0, true, this.action);
        this.bodyEffect2.play(0, true, this.action);
    }

    // 开始跳
    gotoJump(): void {
        this.playAction(Player.JUMP);
    }
    // 开始跑
    gotoRun(): void {
        this.playAction(Player.RUN);
    }
    // 开始飞
    gotoFly(): void {
        this.playAction(Player.FLY);
    }
    // 二连跳
    jump(): void {
        if (this.jumpCount < this.jumpCountMax) {
            this.vy = -30;
            this.jumpCount++;
            this.gotoJump();
        } else {
            this.gotoFly();
        }
    }
    // 跳结束重置
    jumpReset(): void {
        this.vy = 0;
        this.jumpCount = 0;
        this.gotoRun();
    }
    // 是否处于特效中
    isEffect(): boolean {
        return this.bodyEffect1.visible;
    }
    // 开始显示特效
    showEffect(): void {
        RunGame.ISPAUSE = true;
        this.spritEffect.visible = true;
        Laya.Tween.to(this.spritEffect, { scaleX: 0.1, scaleY: 0.1, rotation: 360 }, 1000, null, Laya.Handler.create(this, this.spiritEffectTweenComplete))
    }
    // 隐藏特效
    hideEffect = function () {
        this.bodyEffect1.visible = false;
        this.bodyEffect2.visible = false;
        //Config.speed = Config.SPEED_SLOW;
    }
    spiritEffectTweenComplete(): void {
        RunGame.ISPAUSE = false;
        this.spritEffect.visible = false;
        this.spritEffect.scale(5, 5);
        this.bodyEffect1.visible = true;
        this.bodyEffect2.visible = true;
    }
}