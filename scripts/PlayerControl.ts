import { _decorator, Component, Node ,v3,EventTouch, Prefab, ImageAsset, Collider2D,Contact2DType, resources, Sprite,SpriteFrame,instantiate,Asset} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property(Prefab)
    bulletPre: Prefab = null;
    isBullet:boolean = true;

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
        console.log("start")
        this.node.on(Node.EventType.TOUCH_MOVE,(event:EventTouch)=>{
            this.node.setWorldPosition(v3(event.getLocation().x,event.getLocation().y));
        });

        this.schedule(()=>{
            if(this.isBullet){
            //发射子弹
                resources.load('bullet',(err:Error ,data:Asset)=>{
                    if(err){
                        console.log(err);
                    }
                    let bullNode = instantiate(data as Prefab)
                    // this.node.addChild(bullNode);
                    this.node.parent.addChild(bullNode);
                    bullNode.setPosition(this.node.position.x,this.node.position.y+60);
             });
            }
          
            
            
        },0.2);

    }

    private onBeginContact(selfCollider:Collider2D,otherCollider:Collider2D){
        let bulletGrounp = 2 << 1;
        if(otherCollider.group == bulletGrounp){
            console.log('敌机和玩家碰了');
            this.isBullet = false;
            resources.load('hero1_die', ImageAsset, (err: any, spriteFrame) => {
                if(!err){
                    const sprite = this.node.getComponent(Sprite);
                    sprite.spriteFrame = SpriteFrame.createWithImage(spriteFrame);
                }
              });
        }
        // console.log('otherCollider.group=',otherCollider.group);
        // console.log('selfCollider.group=',selfCollider.group);
        // console.log('1<<2=',1<<2);
        // console.log('2<<1=',2<<1);
    }


    update(deltaTime: number) {
        
    }
}


