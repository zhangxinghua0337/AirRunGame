class Loading extends Laya.Sprite {
    private bg: Laya.Sprite;
    private txt: Laya.Text;
    constructor() {
        super();
        this.init();
    }
    init(): void {
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
    }
    progress(value: number): void {
        this.txt.text = "Loading " + parseInt((value * 100).toString()) + "%";
    }
}