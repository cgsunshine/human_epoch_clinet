import { _decorator, Component, Node ,v3,EventTouch, Prefab, ImageAsset, Collider2D,Contact2DType, resources, Sprite,SpriteFrame,instantiate,Asset,sys} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property(Prefab)
    bulletPre: Prefab = null;
    isBullet:boolean = true;
    isDie:false = false;
    @property(Node)
    homeBack:Node = null;
    @property(Node)
    maskNode:Node = null;

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
        // console.log(winSize)
       
        console.log("窗口大小",window.innerHeight,window.innerWidth)
         
        sys.localStorage.setItem('playerState', 0);
        this.node.on(Node.EventType.TOUCH_MOVE,(event:EventTouch)=>{
            
            //   this.node.setWorldPosition(v3(event.getLocation().x,event.getLocation().y,0));
                  this.node.setPosition(v3(this.node.getPosition().x+event.getDelta().x,this.node.getPosition().y+event.getDelta().y));

                
                // console.log('触摸事件滑动坐标 event.getLocation()=',event.getLocation());
                // console.log('节点相对坐标 this.node.getPosition()=',this.node.getPosition());
                // console.log('节点世界坐标 this.node.getWorldPosition()=',this.node.getWorldPosition());
                // console.log('event.getLocationInView()=',event.getLocationInView());
                // console.log('距离上次移动的位置:event.getDelta()=',event.getDelta());
            
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
          
            
            
        },0.1);

    }

    private onBeginContact(selfCollider:Collider2D,otherCollider:Collider2D){
        let bulletGrounp = 2 << 1;
        if(otherCollider.group == bulletGrounp){
            let collider = this.node.getComponent(Collider2D);
            if(collider){
                collider?.off(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
            }
            // console.log('敌机和玩家碰了');
            sys.localStorage.setItem('playerState', 1);
            this.homeBack.active = true;
            this.maskNode.active = true;
            this.isBullet = false;
            resources.load('hero1_die', ImageAsset, (err: any, spriteFrame) => {
                if(!err){
                    const sprite = this.node.getComponent(Sprite);
                    sprite.spriteFrame = SpriteFrame.createWithImage(spriteFrame);
                }
              });
              this.scheduleOnce(() => {
                this.node.destroy();
            }, 0.5); // 延迟0秒，确保在下一帧执行销毁
        }

        
        // console.log('otherCollider.group=',otherCollider.group);
        // console.log('selfCollider.group=',selfCollider.group);
        // console.log('1<<2=',1<<2);
        // console.log('2<<1=',2<<1);
    }


    update(deltaTime: number) {
        
    }


}


