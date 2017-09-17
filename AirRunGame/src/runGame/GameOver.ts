class GameOver extends Laya.Sprite {
    private bg: Laya.Sprite;
    private txt: Laya.Text;
    constructor() {
        super();
        this.init();
    }
    init(): void {
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
    }
    setScore(score: number): void {
        let _score = Laya.LocalStorage.getItem('runGameScore');
        if (_score && parseInt(_score) > score) {
            score = parseInt(_score);
        }
        Laya.LocalStorage.setItem('runGameScore', score.toString());
        this.txt.text = "GameOver\n\n Click Again\n\n Best Score : " + score;
        this.txt.y = (480 - this.txt.height) * 0.5;
    }
}