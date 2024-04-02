import { _decorator, Component, Node, Prefab,resources,Asset,instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property(Prefab)
    enemyPre:Prefab = null;

    start() {
        this.schedule(()=>{
            resources.load('enemy',(err:Error ,data:Asset)=>{
                if(err){
                    console.log(err);
                }
                let EnemyNode = instantiate(data as Prefab)
                this.node.parent.addChild(EnemyNode);
                EnemyNode.setPosition(Math.random()*400-200,Math.random()*100+300);
                // console.log(Math.random()*400);
                // console.log(this.node.position.y);
             });
        },1);
    }

    update(deltaTime: number) {
    
    }
}


