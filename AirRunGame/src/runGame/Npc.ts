class Npc extends Laya.Sprite {
    private body: Laya.Animation;
    public static cached: boolean = false;
    public static BIRD: string = "bird";
    constructor() {
        super();
        this.init();
    }
    init(): void {
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
    }
    onLoop():void{
        if(RunGame.ISOVER)return;
		this.body.x -= 5 * 1.5;
		if(this.body.x < -100){
            this.removeSelf();
			//回收
			Laya.Pool.recover("npc",this);
            Laya.timer.clear(this, this.onLoop);
		}
    }
}