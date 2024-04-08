import { _decorator, Component, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletControl')
export class BulletControl extends Component {

    velocity: Vec2 = new Vec2(0,25);
    isMoving:boolean = true;

    start() {

    }

    update(deltaTime: number) {
        if(!this.isMoving){
            return;
        }

        this.node.setPosition(
            this.node.position.x + this.velocity.x,
            this.node.position.y + this.velocity.y
        );

        if(this.node.position.y > 800){
            this.node.destroy();
        }
    }
}


