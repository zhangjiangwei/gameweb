var AnimationLayer = cc.Layer.extend({
	process:0,
	sprite:null,
	size:cc.winSize,
	allPlisArr : [],
	ctor:function () {
		this._super();
		this.init();
	},
	init: function () {

		cc.spriteFrameCache.addSpriteFrames(res.guard1_plist);

		// var sp=new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("guard1_01.png"));
		// this.addChild(sp);
		// sp.setPosition(250,210);
		var frames = [];
		for(var n =1;n<5;n++){
			var sf = cc.spriteFrameCache.getSpriteFrame("guard1_0"+n+".png");
			frames.push(sf);
		}
		var animation = new cc.Animation(frames,0.2);
		var animate=new cc.animate(animation);

		var spBatch = new cc.SpriteBatchNode(res.guard1_png);
		this.addChild(spBatch,1);
		var sp1 = new cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame("guard1_01.png"));
		sp1.setPosition(50,500);
		spBatch.addChild(sp1,3);
		sp1.runAction(animate.repeatForever());
		this.loadAllPic();
	},
	animatPic: function(obj){
		var url = (obj.url) ? ( obj.url ) : ( null );
		var picName =  (obj.picName) ? (obj.picName) : ( null );
		var picPlist =  (obj.picPlist) ? (obj.picPlist) : ( null );
		var s = obj.s; 
		var l = obj.l;
		var self = this;
		cc.textureCache.addImage(url,function(){
			//创建精灵帧缓冲
			cc.spriteFrameCache.addSpriteFrames(picPlist);
			spriteFrames = [];
			for(var n=s;n<l;n++){
				var png = obj.picName+"_0"+n+".png";
		    	var frames = cc.spriteFrameCache.getSpriteFrame(png);
		    	if(frames) {
		    		spriteFrames.push(frames);
		    	}
			}
			animation = new cc.Animation(spriteFrames,0.2);
			// var animation2 = new cc.Animation(spriteFrames, 0.2, 2);
			action = cc.animate(animation);
			sp = new cc.Sprite.create(frames);
			self.addChild(sp,4);
			var _x = Math.random()*300+150;
			var _y = Math.random()*300+250;
			sp.setPosition(_x,_y);
			sp.runAction(action.repeatForever());
		});
	},
	loadAllPic: function () {
		var LOADINGBARPRONUM = 1;
		var LOADINGBAR_TAG = 99912;

		var allpic = {
			mobs1_pic : "res/image/pic/guard/mobs1.png",
			// mobs1_plist: "res/image/pic/guard/mobs1.png",
			// mobs2_plist: "res/image/pic/guard/mobs2.png",
			// mobs3_plist: "res/image/pic/guard/mobs3.png",
			// mobs4_plist: "res/image/pic/guard/mobs4.png",
			// mobs5_plist: "res/image/pic/guard/mobs5.png",
			// mobs6_plist: "res/image/pic/guard/mobs6.png",
		};
		var allPlis = {
			mobs1_plist : "res/image/pic/guard/mobs1.plist",
		};
		var self = this;
		var val = {
			url : allpic.mobs1_pic,
			picName : "mobs1",
			picPlist : res.mobs1_plist,
			s : 0,
			l : 5,
		};
		this.animatPic(val);	
		//var _color = new cc.color(255,255,255,255);
		//picFrameCache.setAllCache();
		//for(var i=0;i<1;i++){
		//this.drawProgress('tp'+i,50,500,100,10,_color,_color,_color);
		
	},
	initloadingbar : function(sp_loading){

	},
	callback: function () {i
		this.process++;

		var val={
			"x":50,
			"y":500,
			"width":100,
			"height":10,
			"borderColor":cc.color(225,0,0,255),
			"border":5,
			"fillColor":cc.color(255,0,0,0)
		}

		//this.drawProgress(1,width,100,width,50,cc.color(225,0,0,255),5,cc.color(255,0,0,0));

		var np = this.process*100/7;

		//this.drawProgress(2,width,100,100*(np/100),50,cc.color(255,0,0,255),5,cc.color(255,0,0,25));

		if(np==100){
			//this.removeChild(100,true);
			// cc.spriteFrameCache.addSpriteFrames("../res/image/plist/guard1.plist");
			// var sp = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("../res/image/guard/guard1.png"));
			sp.setPosition(cc.winSize/2,cc.winSize.height/2);
			//var sp = new cc.Sprite("../res/image/guard/guard1.png");
			this.addChild(sp);
			/* var frames=[];
			 for(var n=1;n<10;n++)
			 {
			 var sf=cc.spriteFrameCache.getSpriteFrame("kick0"+n+".png");
			 frames.push(sf);
			 }
			 var animation=new cc.Animation(frames,0.2);
			 var animate1=new cc.animate(animation);*/
		}
	},
	drawProgress:function(val){
		val.tag = val.tag || "";
		val.x = val.x || 0;
		val.y = val.y || 0;
		val.width = val.width || 100;
		val.height = val.height || 10;
		val.borderColor = val.borderColor || cc.color(255,0,0,255);
		val.border = val.border || cc.color(255,0,0,255);
		val.fillColor = val.fillColor || cc.color(255,0,0,255);
		if(this.getChildByTag(tag)!=null){
			this.removeChildByTag(tag);
		}
		var rect = new cc.DrawNode();
		this.setTag(rect);
		rect.setTag(tag);
		var points = [
			cc.p(x,y),
			cc.p(x+width,y),
			cc.p(x+width,y+height),
			cc.p(x,y+height)
		];
		rect.drawPoly(points,fillColor,border,borderColor);
		this.addChild(rect);
	},

});