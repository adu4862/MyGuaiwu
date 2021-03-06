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
        main:{
            default: null,
            serializable: false
        },
        minRadius :50,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    getPlayerPos: function () {
        var position = this.main.player.getPosition();
        return cc.pDistance(this.node.getPosition(), position);
    },
    // onLoad () {},

    start () {


    },

    update (dt) {
        var goAction = cc.moveBy(0.8, cc.p(0, 20));
        this.node.runAction(goAction);
        if (this.getPlayerPos()<this.minRadius) {
            //触碰到地刺
            cc.log('游戏结束');
            cc.director.loadScene("EndScene");

            com.score = this.main.score;
            return;
        }

    },
});
