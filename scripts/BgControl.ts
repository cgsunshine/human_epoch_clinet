import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgControl')
export class BgControl extends Component {
    start() {

    }

    update(deltaTime: number) {

        for (let bgNode of this.node.children) {
           bgNode.setPosition(0,bgNode.getPosition().y - 50 *deltaTime);
        //    console.log(bgNode.getPosition().y);
           if(bgNode.getPosition().y <= -850){
                bgNode.setPosition(0,850);
           }
        }

    }
}


