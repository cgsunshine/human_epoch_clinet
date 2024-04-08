import { _decorator, Component, Node,Event, EventHandler, Button,director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bakcHomeButton')
export class bakcHomeButton extends Component {

    // onLoad(){
    //     const clickEventHandler = new EventHandler();
    //     clickEventHandler.target = this.node;
    //     clickEventHandler.component = 'homeButton';
    //     clickEventHandler.handler = 'callBack';
    //     clickEventHandler.customEventData = 'foobar';
    // }

    onLoad () {
        this.node.on(Button.EventType.CLICK, this.callback, this);
    }

    callback (button: Button) {
        // 注意这种方式注册的事件，无法传递 customEventData
        console.log('按钮被点击了');
        director.loadScene("home");
        // director.loadScene('game', function (err, scene) {
        //     director.runScene(scene);
        // });
    }

    callBack(event:Event,customEventData:string){
        const node  = event.target as Node;
        const button = node.getComponent(Button);
        console.log(customEventData);
    }


    start() {
      
    }

    update(deltaTime: number) {
        
    }
}

