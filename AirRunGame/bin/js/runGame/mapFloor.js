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
 * 地板管理类
 */
var mapFloor = /** @class */ (function (_super) {
    __extends(mapFloor, _super);
    function mapFloor() {
        var _this = _super.call(this) || this;
        // 地板离开了屏幕手机到该数组集合
        _this.dieFloorList = [];
        _this.init();
        return _this;
    }
    mapFloor.prototype.init = function () {
        var floor = this.addFloor(1);
        floor.x = 0;
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    mapFloor.prototype.onLoop = function () {
        // 如果地板离开了屏幕 每次从该集合中取一个出来 从该地板管理容器中移除自己
        while (this.dieFloorList.length > 0) {
            var floor = this.dieFloorList.shift();
            floor.removeSelf();
            // 回收
            Laya.Pool.recover("floor", floor);
        }
    };
    // 添加地板
    mapFloor.prototype.addFloor = function (type) {
        //let floor = new Floor();
        var floor = Laya.Pool.getItemByClass("floor", Floor);
        floor.init(type);
        floor.once(Floor.OUT_COMPLETE, this, this.getFloor);
        floor.once(Floor.OUT_DIE, this, this.delFloor);
        this.addChild(floor);
        return floor;
    };
    // 获取地板
    mapFloor.prototype.getFloor = function (floor) {
        this.addFloor(2);
    };
    // 删除地板
    mapFloor.prototype.delFloor = function (floor) {
        this.dieFloorList.push(floor);
    };
    return mapFloor;
}(Laya.Sprite));
//# sourceMappingURL=mapFloor.js.map