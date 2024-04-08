import { _decorator, Component, Node, Prefab,resources,Asset,instantiate,Label,sys} from 'cc';
import { Eenmy } from './Eenmy';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property(Prefab)
    enemyPre:Prefab = null;

    @property(Node)
    Score:Node = null;

    @property
    scoreLable:number = 0;

    onEnemyDead(){
        this.scoreLable++;
        this.Score.getComponent(Label).string = `${this.scoreLable}`;
    }

    start() {
        this.scoreLable = 0;
        // this.schedule(()=>{
        //     resources.load('enemy',(err:Error ,data:Asset)=>{
        //         if(err){
        //             console.log(err);
        //         }
        //         let EnemyNode = instantiate(data as Prefab)
        //         this.node.parent.addChild(EnemyNode);
        //         EnemyNode.setPosition(Math.random()*400-200,Math.random()*100+300);
        //         // console.log(Math.random()*400);
        //         // console.log(this.node.position.y);
        //      });
        // },1);


            resources.load('enemy',(err:Error ,data:Asset)=>{
                if(err){
                    console.log(err);
                }

                this.enemyPre = data as Prefab;
             });
        
             this.schedule(()=>{
                if(sys.localStorage.getItem('playerState') == 0){

            
                    let EnemyNode = instantiate(this.enemyPre);
                    this.node.parent.addChild(EnemyNode);
                    // this.getComponentInChildren("LableScore").getComponentInChildren("Score").call;
                    EnemyNode.getComponent(Eenmy).onDeadCallback(this.onEnemyDead,this);
                    EnemyNode.on

                    EnemyNode.setPosition(Math.random()*400-200,Math.random()*100+300);
            }
            },1);


        
    }

    update(deltaTime: number) {
    
    }
}


