class GameInfo extends Laya.Sprite {
    private bg: Laya.Sprite;
    private txt: Laya.Text;
    constructor() {
        super();
        this.init();
    }
    init():void{
        this.width = 852;
        this.height = 480;
        //黑色背景
        this.bg = new Laya.Sprite();
        this.bg.alpha = 0.8;
        this.bg.graphics.drawRect(0,0,852,480,"#000000");
        this.addChild(this.bg);
         
        //loading文本
        this.txt = new Laya.Text();
        this.txt.color = "#ffffff";
        this.txt.fontSize = 20;
        this.txt.text = "游戏介绍\n\n点击可控制人物跳跃\n\n（小提示 点两次可触发人物连跳 再连跳后 再次点击可出发人物飞行哦！）\n\n左上角紫色条代表当前飞行的精力 黄色条 代表加速状态\n\n\n好了 点击屏幕开始狂奔之旅吧~~";
        this.txt.width = 852;
        this.txt.align = "center";
        this.txt.y = (480 - this.txt.height) * 0.5;
        this.addChild(this.txt);
    }
}