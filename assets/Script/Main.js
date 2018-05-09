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

        jumpDuration: 0,
        ittleJumpDuration: 0,
        wallWidth: 0,
        littleJumpHeight: 0,
        pressed :false,

    },

    moveToRight: function () {
        var goRight  = cc.moveTo(this.jumpDuration, cc.p(this.node.width / 2 - this.wallWidth, this.player.getPositionY()));
        var goR1  = cc.moveTo(this.jumpDuration, cc.p(this.node.width / 2 - this.wallWidth-this.littleJumpHeight, this.player.getPositionY()));
        var goR2  = cc.moveTo(this.jumpDuration, cc.p(this.node.width / 2 - this.wallWidth, this.player.getPositionY()));
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
        var goL1  = cc.moveTo(this.jumpDuration, cc.p(-this.node.width / 2 + this.wallWidth+this.littleJumpHeight, this.player.getPositionY()));
        var goL2  = cc.moveTo(this.jumpDuration, cc.p(-this.node.width / 2 + this.wallWidth, this.player.getPositionY()));
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
        // cc.log(this.pressed);

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
    },

    start() {

    },

    // update (dt) {},
});
