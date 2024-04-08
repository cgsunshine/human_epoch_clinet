import { _decorator, Component, Collider2D,Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('kkq')
export class kkq extends Component {
    protected onEnable(): void {
        let collider = this.node.getComponent(Collider2D);
        if(collider){
            collider?.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        }
    }

    protected onDisable(): void {
        let collider = this.node.getComponent(Collider2D);
        if(collider){
            collider?.off(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        }
    }
    start() {

    }

    update(deltaTime: number) {
        
    }

    private onBeginContact(selfCollider:Collider2D,otherCollider:Collider2D){
        
    }
}


