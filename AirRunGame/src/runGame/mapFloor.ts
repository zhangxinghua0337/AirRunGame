/**
 * 地板管理类
 */
class mapFloor extends Laya.Sprite {
    // 地板离开了屏幕手机到该数组集合
    private dieFloorList: Array<Floor> = [];
    constructor() {
        super();
        this.init();
    }
    init(): void {
        let floor = this.addFloor(1);
        floor.x = 0;
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    onLoop(): void {
        // 如果地板离开了屏幕 每次从该集合中取一个出来 从该地板管理容器中移除自己
        while (this.dieFloorList.length > 0) {
            let floor = this.dieFloorList.shift();
            floor.removeSelf();
            // 回收
            Laya.Pool.recover("floor", floor);
        }
    }
    // 添加地板
    addFloor(type: number): Floor {
        //let floor = new Floor();
        let floor: Floor = Laya.Pool.getItemByClass("floor", Floor);
        floor.init(type);
        floor.once(Floor.OUT_COMPLETE, this, this.getFloor);
        floor.once(Floor.OUT_DIE, this, this.delFloor);
        this.addChild(floor);
        return floor;
    }
    // 获取地板
    getFloor(floor: Floor) {
        this.addFloor(2);
    }
    // 删除地板
    delFloor(floor: Floor) {
        this.dieFloorList.push(floor);
    }
}
