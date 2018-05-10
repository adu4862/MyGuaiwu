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

        scoreLabel:{
            default:null,
            type:cc.Label,

        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.scoreLabel.string = 'Score:' + com.score;
        var touchReceiver = cc.Canvas.instance.node;
        touchReceiver.on(cc.Node.EventType.TOUCH_START, this.touchstart, this);
    },
    touchstart: function (event) {
        cc.director.loadScene("MainScene");
    },


    // update (dt) {},
});
