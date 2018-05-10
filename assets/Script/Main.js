// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var com = require('Common');
cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        dici:{
            default :null,
            type:cc.Prefab
        },
        dici_duration :240,
        diciCount:0,

        jumpDuration: 0,
        ittleJumpDuration: 0,
        wallWidth: 0,
        littleJumpHeight: 0,
        pressed :false,
        score:0,
        scoreLabel:{
            default:null,
            type:cc.Label,

        },

    },

    moveToRight: function () {
        var goRight  = cc.moveTo(this.jumpDuration, cc.p(this.node.width / 2 - this.wallWidth, this.player.getPositionY()));
        var goR1  = cc.moveTo(this.jumpDuration/2, cc.p(this.node.width / 2 - this.wallWidth-this.littleJumpHeight, this.player.getPositionY()));
        var goR2  = cc.moveTo(this.jumpDuration/2, cc.p(this.node.width / 2 - this.wallWidth, this.player.getPositionY()));
        var sequence = cc.sequence(goR1,goR2);
        if ( this.player.rotationY === 180) {
            //朝向右边
            this.player.runAction(sequence);
        }else{
            this.player.runAction(goRight);
        }


        this.player.rotationY = 180;

    },
    moveToLeft: function () {

        var goLeft  = cc.moveTo(this.jumpDuration, cc.p(-this.node.width / 2 + this.wallWidth, this.player.getPositionY()));
        var goL1  = cc.moveTo(this.jumpDuration/2, cc.p(-this.node.width / 2 + this.wallWidth+this.littleJumpHeight, this.player.getPositionY()));
        var goL2  = cc.moveTo(this.jumpDuration/2, cc.p(-this.node.width / 2 + this.wallWidth, this.player.getPositionY()));
        var sequence = cc.sequence(goL1,goL2);

        if ( this.player.rotationY === 0) {
            //朝向右边
            this.player.runAction(sequence);
        }else{
            this.player.runAction(goLeft);
        }

        this.player.rotationY = 0;

    },
    touchstart: function (event) {
        // // cc.log(this.pressed);
        // var playerP = this.player.convertToWorldSpaceAR(this.player.getPosition());
        // if ( this.player.rotationY === 0) {
        //     //朝向右边
        //     var playerX =  playerP.x- this.wallWidth;
        // }else{
        //     var playerX =  playerP.x- this.wallWidth;
        // }
        if (!com.pressed) {
            com.pressed = true;
            cc.log(com.pressed );
            this.scheduleOnce(function (dt) {
                com.pressed  = false;
                cc.log("time: " + dt+",pressed:"+com.pressed );
            }, 0.2);
            var touchLoc = event.getLocation();
            if (touchLoc.x >= cc.winSize.width / 2) {
                cc.log('right');
                this.moveToRight();
            } else {
                cc.log('left');
                this.moveToLeft();
            }
        }
      
    //    var leftX = -this.node.width / 2 + this.wallWidth;
    //    var rightX =this.node.width / 2 - this.wallWidth;
    //     if(playerX===leftX||playerX===rightX){
           
    //     }

       

    },
    touchend: function (event) {
    },
    setInputControl: function () {
        var touchReceiver = cc.Canvas.instance.node;
        touchReceiver.on(cc.Node.EventType.TOUCH_START, this.touchstart, this);
        touchReceiver.on(cc.Node.EventType.TOUCH_END, this.touchend, this);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setInputControl();
        this.schedule(function(){
            this.newDici();
            this.score +=1;
            this.scoreLabel.string = 'Score : ' + this.score;
        },0.3);
       
    },
    newDici: function(){
        this.diciCount+=1;
        var diciNew = cc.instantiate(this.dici);
        this.node.addChild(diciNew);
        //把main组件的示例传入星星组件
        diciNew.getComponent('Dici').main = this;
        // newStar.getComponent('Star').game = this;
        //设置位置 随机生成到左边或者右边
        var random =   cc.random0To1();
        if (random>0.5) {
            //右边
            diciNew.rotationY = 0;
        }else{
            //左边
            diciNew.rotationY = 180;
        }
        diciNew.setPosition(this.diciPosition(random));
    },
    diciPosition:function (random) {
        var randX=0;
        var randY=0;
        if(random>=0.5){
           randX=this.node.width/2- this.wallWidth;
        }else{
           randX =-this.node.width/2+this.wallWidth;
        }
        randY=(-this.node.height/2);
        // if(this.diciCount<=15){
        //     randY=(this.node.height/2)-(this.dici_duration*this.diciCount)-this.dici_duration*1;
        // }else{
        //     randY=(this.node.height/2)-(this.dici_duration*15)-this.dici_duration*1;
        // }
        
        return cc.p(randX,randY);
    },

    start() {

    },

    update (dt) {


    },
});
