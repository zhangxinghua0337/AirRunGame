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
var Floor = /** @class */ (function (_super) {
    __extends(Floor, _super);
    function Floor() {
        var _this = _super.call(this) || this;
        // 最大右边剩余距离
        _this.maxRight = 0;
        _this.isOutComplete = false;
        // 当前地板的物品集合
        _this.itemList = [];
        _this.needItem = true;
        return _this;
    }
    /**
     * type number  1->地板默认宽度 other->随机宽度
     */
    Floor.prototype.init = function (type) {
        this.autoSize = true;
        this.maxRight = 0;
        this.x = 852;
        // 每次地板出现的高度位置都是随机的
        this.y = 32 * 6 + 32 * parseInt((8 * Math.random()).toString());
        if (!this.bg) {
            this.bgTexture = Laya.loader.getRes("res/floor.png");
            this.bg = new Laya.Sprite();
            this.bg.graphics.clear();
            //this.bg.y = -32;
            this.addChild(this.bg);
            // 修补地板右边图片显示
            this.rightBg = new Laya.Sprite();
            this.rightBg.graphics.drawTexture(laya.resource.Texture.createFromTexture(this.bgTexture, 32 * 29, 0, 32, 96), 0, 0, 32, 96);
            this.rightBg.width = 32;
            //this.rightBg.y = -32;
            this.addChild(this.rightBg);
        }
        switch (type) {
            case 1:
                this.rightBg.visible = false;
                this.bg.graphics.drawTexture(this.bgTexture, 0, 0, 960, 96);
                // 初始地板不需要道具
                this.needItem = false;
                break;
            default:
                var _w = 32 * (3 + parseInt((19 * Math.random()).toString()));
                this.bg.graphics.clear();
                this.bg.graphics.drawTexture(laya.resource.Texture.createFromTexture(this.bgTexture, 0, 0, _w, 96), 0, 0, _w, 96);
                this.rightBg.visible = true;
                break;
        }
        this.rightBg.x = _w;
        //计算一下右边还剩下多少 用来判断什么时候生成新的floor 
        //这里是通过游戏宽度 减去 固定 2个 32的宽度 再随机一个长度 这样 可以让地板时间点的出现 更加随机性
        this.maxRight = 852 - 32 * 2 - 32 * parseInt((10 * Math.random()).toString());
        if (this.needItem) {
            this.addItems();
        }
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Floor.prototype.onLoop = function () {
        if (RunGame.ISOVER || RunGame.ISPAUSE)
            return;
        this.x -= 5 * 1.2;
        // 如果地板在屏幕里面的距离小于屏幕右边的剩余距离 就通知地板管理类添加地板
        //判断是否除了边界 如果出了 就通知生成新的floor 这里增加一个变量来判断当前是否已经通知外部了
        if (!this.isOutComplete && (this.x + this.width) < this.maxRight) {
            this.isOutComplete = true;
            this.event(Floor.OUT_COMPLETE, this);
        }
        else if ((this.x + this.width) < 0) {
            Laya.timer.clear(this, this.onLoop);
            // 如果有物品需要先隐藏
            for (var i = 0; i < this.itemList.length; i++) {
                this.itemList[i].visible = false;
            }
            this.visible = false;
            this.removeSelf();
        }
    };
    // 在地板上添加物品
    Floor.prototype.addItems = function () {
        // 创建一个随机函数
        var m = parseInt((Math.random() * 10).toString());
        // 如果随机数小于5，我们就不添加道具了
        if (m < 5)
            return;
        // 添加的数量
        var addNum = 0;
        //计算一下道具最大数量 我们强制道具的宽度都是32
        var maxNum = parseInt((this.width / 32).toString());
        if (maxNum > 5) {
            addNum = 5 + parseInt(((maxNum - 5) * Math.random()).toString());
        }
        else {
            addNum = maxNum;
        }
        // 计算道具居中的点
        var sx = (this.width - addNum * 32) * 0.5;
        var randNum;
        var arr = [];
        var specialItem = false;
        for (var i = 0; i < addNum; i++) {
            if (i % 2 === 0)
                continue;
            randNum = Math.random();
            //查询一下当前物品列表里面是否有 有的话 就从里面拿
            if (this.itemList.length > 0) {
                item = this.itemList.shift();
                item.visible = true;
            }
            else {
                var item = Laya.Pool.getItemByClass("item", Item);
            }
            //是否有特殊物品 如果有 我们就生成特殊物品
            if (randNum > 0.95 && !specialItem) {
                specialItem = true;
                item.init(Item.ITEM_TYPE_SPEED);
            }
            else if (randNum > 0.9 && !specialItem) {
                specialItem = true;
                item.init(Item.ITEM_TYPE_FLY);
            }
            else {
                item.init(Item.ITEM_TYPE_STAR);
            }
            item.x = sx + i * 32;
            item.y = -30;
            this.addChild(item);
            arr.push(item);
        }
        this.itemList = this.itemList.concat(arr);
    };
    // 获取当前地板上的所有物品
    Floor.prototype.getItems = function () {
        return this.itemList;
    };
    // 地板和角色的碰撞检测
    /*
    * @param x 角色的 x 坐标值
    * @param y 角色的y坐标值
    */
    Floor.prototype.checkHit = function (x, y) {
        if (x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height)) {
            return true;
        }
        return false;
    };
    Floor.OUT_COMPLETE = "floor_out_complete";
    Floor.OUT_DIE = "floor_out_die";
    return Floor;
}(Laya.Sprite));
//# sourceMappingURL=Floor.js.map