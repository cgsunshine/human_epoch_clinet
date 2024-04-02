import { _decorator, Collider2D, Component, Contact2DType, ImageAsset, resources,Asset,instantiate, Sprite, SpriteFrame} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Eenmy')
export class Eenmy extends Component {
    @property
    speed:number = 500;
    isMove:boolean = true;

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
        
        if(this.isMove){
            this.node.setPosition(this.node.position.x,this.node.position.y-deltaTime*this.speed);
    
            if(this.node.position.y  < -410){
                this.node.destroy();
            }
        }
        
    }

    private onBeginContact(selfCollider:Collider2D,otherCollider:Collider2D){
        let bulletGrounp = 1 << 1;
        if(otherCollider.group == bulletGrounp){
            // otherCollider.node.destroy();
            this.isMove = false;
            resources.load('enemy0_die', ImageAsset, (err: any, spriteFrame) => {
                if(!err){
                    const sprite = this.node.getComponent(Sprite);
                    sprite.spriteFrame = SpriteFrame.createWithImage(spriteFrame);
                }
              });


              this.scheduleOnce(() => {
                this.node.destroy();
            }, 0.3); // 延迟0秒，确保在下一帧执行销毁

        }
    }
}


