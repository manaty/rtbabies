// Copyright (c) 2014. Manaty SARL.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are not permitted 
//
// 1.0.0.001


window.RTBGame = window.RTBGame || {};
(function(c,d){
	d.$_ = c;
	var stageNode = $("#RTB_Stage");
	var stage;
	var originalWidth,originalHeight;
	var imageWidth=0,imageHeight=0,commandHeight=0,commandWidth=0,chooserWidth=0,chooserHeight=0;;
	var displayModeLandscape = true;  
	var fullScreen=false;
	var style = document.createElement('style');
	var images = {};
	var loader= document.createElement('div');
	var commandDiv= document.createElement('div');
	
	var selectedType="dolls";
	var objects = {}
	objects.dolls={}
	objects.dolls.names =  ["Dolls/Doll-Gavin","Dolls/Doll-Geoff","Dolls/Doll-Jack","Dolls/Doll-Lindsay","Dolls/Doll-Michael","Dolls/Doll-Ray","Dolls/Doll-Ryan"];
	objects.dolls.images = [];
	objects.dolls.nbLoaded = 0;
	objects.dolls.selectedIndex = -1;
	objects.dolls.color = "#505050";
	objects.dolls.div = document.createElement('div');
	objects.dolls.div.style.zIndex=10;
	objects.dolls.chooserDiv = document.createElement('div');
	
	objects.shoes={}
	objects.shoes.names = ["Shoes/Gold-Boots","Shoes/Penguin-Boots"];
	objects.shoes.images = [];
	objects.shoes.nbLoaded = 0;
	objects.shoes.selectedIndex = -1;
	objects.shoes.color = "#606060";
	objects.shoes.div = document.createElement('div');
	objects.shoes.div.style.zIndex=11;
	objects.shoes.chooserDiv = document.createElement('div');
	
	
	objects.outfits={}
	objects.outfits.names = ["Outfits/Penguin-Outfit"];
	objects.outfits.images = [];
	objects.outfits.nbLoaded = 0;
	objects.outfits.selectedIndex = -1;
	objects.outfits.color = "#707070";
	objects.outfits.div = document.createElement('div');
	objects.outfits.div.style.zIndex=12;
	objects.outfits.chooserDiv = document.createElement('div');
	
	
	objects.pants={}
	objects.pants.names = ["Pants/Creeper-Shorts"];
	objects.pants.images = [];
	objects.pants.nbLoaded = 0;
	objects.pants.selectedIndex = -1;
	objects.pants.color = "#808080";
	objects.pants.div = document.createElement('div');
	objects.pants.div.style.zIndex=13;
	objects.pants.chooserDiv = document.createElement('div');
	
	
	objects.tops={}
	objects.tops.names = ["Tops/Creeper-Shirt"];
	objects.tops.images = [];
	objects.tops.nbLoaded = 0;
	objects.tops.selectedIndex = -1;
	objects.tops.color = "#909090";
	objects.tops.div = document.createElement('div');
	objects.tops.div.style.zIndex=14;
	objects.tops.chooserDiv = document.createElement('div');
	
	
	objects.others={}
	objects.others.names = ["Others/Creeper-Fingerless-Gloves","Others/Creeper-Scarf","Others/Penguin-Bow","Others/White-Gloves"];
	objects.others.images = [];
	objects.others.nbLoaded = 0;
	objects.others.selectedIndex = -1;
	objects.others.color = "#A0A0A0";
	objects.others.div = document.createElement('div');
	objects.others.div.style.zIndex=15;
	objects.others.chooserDiv = document.createElement('div');
	
	var elapsedCounter=0;
	var isGameLoaded=false;
	
	$(window).resize(function() {
  		d.windowResized();
	});
	
	d.rebuildStyle= function(){
		displayModeLandscape=stageNode.width()>stageNode.height();
		if(displayModeLandscape){
			imageWidth=stageNode.height()/1.2;
			if((stageNode.width()-imageWidth)<120){
				imageWidth=stageNode.width()-120;
				imageHeight=imageWidth*1.2;
			}else {
				imageHeight=stageNode.height();
				imageWidth=imageHeight/1.2;
			}
			commandHeight=stageNode.height();
			commandWidth=Math.min((stageNode.width()-imageWidth),60);
			chooserHeight=(stageNode.height()-10);
			chooserWidth=(stageNode.width()-imageWidth-commandWidth-10);
		} else {
			imageHeight=stageNode.width()*1.2;
			if((0+stageNode.height()-imageHeight)<160){
				imageHeight=stageNode.height()-160;
				imageWidth=imageHeight/1.2;
			}else {
				imageWidth=stageNode.width();
			    imageHeight=imageWidth*1.2;
			}
			commandWidth=stageNode.width();
			commandHeight=Math.min((stageNode.height()-imageHeight),60);
			chooserHeight=(stageNode.height()-imageHeight-commandHeight-10);
			chooserWidth=(stageNode.width()-10);
		}
		//alert("stageNode.width()="+stageNode.width()+", stageNode.height()="+stageNode.height()
		//+", imageWidth="+imageWidth+",imageHeight="+imageHeight+", commandWidth="+commandWidth+",commandHeight="+commandHeight);
		var result='.roundedRect { color: #F00; border-radius: 2%;border:10px solid #C7D8C6}';
		if(fullScreen){
			result+='#RTB_Stage{ background-color:#B7C8B6;color:white;z-index:10000;position:absolute;top:0px;}';
		}  else {
			result+='#RTB_Stage{ background-color:#B7C8B6;color:white;top:0px;}';
		}
		result+=".RTB_container{position:absolute;border:0px solid red;width:"+stageNode.width()+"px;height:"+stageNode.height()+"px}";
		if(displayModeLandscape){
			result+=".RTB_commands{ background-color:#B7C8B6;position:absolute;color:black;right:0px;top:0px;width:"+commandWidth+"px;height:"+commandHeight+"px;z-index:1000;border:0px solid blue}";
			result+=".RTB_image{position:absolute;left:0px;top: 0px;width:"+imageWidth+"px;height:"+imageHeight+"px;border:0px solid white;}";
			result+=".RTB_chooser_selected{position:absolute;left:"+imageWidth+"px;width:"+chooserWidth+"px;height:"+chooserHeight+"px;top:0px;z-index:10;border:0px solid green}";
			} else {
			result+=".RTB_commands{ background-color:#B7C8B6;position:absolute;color:black;bottom:0px;width:"+commandWidth+"px;height:"+commandHeight+"px;z-index:1000;border:0px solid blue}";
			result+=".RTB_image{position:absolute;left:0px;top:0px;width:"+imageWidth+"px;height:"+imageHeight+"px;border:0px solid white;}";
			result+=".RTB_chooser_selected{position:absolute;left:0px;top:"+imageHeight+"px;width:"+chooserWidth+"px;height:"+chooserHeight+"px;z-index:10;border:0px solid green}";
			}
		result+=".RTB_chooser{display:none;}";
		result+=".RTB_icon{float:left;background-repeat: no-repeat;background-size: cover;width:"+Math.min(commandWidth,commandHeight)+"px;height:"+Math.min(commandWidth,commandHeight)+"px;}";
		result+=".RTB_loader{float: left;left: 50%;margin-left: -50px;top: 50%;position: relative;z-index:100;}";
		result+=".RTB_image img{width:"+imageWidth+"px;height:"+imageHeight+"px}";
		result+=".RTB_commands,.RTB_chooser,.RTB_chooser_selected {overflow: scroll;}"
		result+=".RTB_chooser_selected{z-index:20; background-color:#B7C8B6;border:5px solid "+objects[selectedType].color+";border-radius: 2%}";
		result+=".RTB_chooser img{float:left;width:"+imageWidth/5+"px;height:"+imageHeight/5+"px}";
		
		var iconWidth=Math.min(imageWidth/4,chooserWidth);
		var iconHeight = Math.min(imageHeight/4,chooserHeight);
		if(chooserWidth<imageWidth/4){
			iconHeight=iconWidth*1.2;
		}
		if(chooserHeight<imageHeight/4){
			iconWidth=iconHeight/1.2;
		}
		result+=".RTB_chooser_selected img{float:left;width:"+iconWidth+"px;height:"+iconHeight+"px;border:1px solid white;border-radius: 2%}";
		style.innerHTML = result;
	}
	
	d.setLoaderCss=function(){
		elapsedCounter++;
		loader.innerHTML="";
		for(var l ="LOADING",i=0,c=(i+elapsedCounter)%l.length;i<l.length;i++,c=(i+elapsedCounter)%l.length) 
		loader.innerHTML+="<span style='color:rgb("+(c*10+100)+","+(c*10+100)+","+(c*10+150)+")'>"+l.charAt(i)+"</span>";
		if(isGameLoaded){
			loader.parentNode.removeChild(loader);
		} else {
			setTimeout(d.setLoaderCss,100);
		}
	}
	
	d.loadImage=function(imageName){
		var result=new Image();
		result.src='img/'+imageName;
		return result;
	}
	
	
	d.waitForImageLoaded=function(){
		if(objects.dolls.nbLoaded==objects.dolls.names.length){
			d.selectObject("dolls",0);
			isGameLoaded=true;
		} else {
			setTimeout(d.waitForImageLoaded,500);
		}
	}
	
	d.incrementImageDownload=function(objectType){
		objects[objectType].nbLoaded++;
	}
	
	d.loadImages=function(){
		for(var objectType in objects){
			for(var nameIndex in objects[objectType].names){
				var name = objects[objectType].names[nameIndex];
				var image = d.loadImage(name+'.png');
				objects[objectType].images.push(image);
				eval("image.onload=function(){RTBGame.incrementImageDownload('"+objectType+"')}");
				var image2 = d.loadImage(name+'.png');
				eval("image2.onclick=function(){RTBGame.selectObject('"+objectType+"',"+nameIndex+");}");
				objects[objectType].chooserDiv.appendChild(image2);
			}
		}
		d.waitForImageLoaded();
	}
	
	
	d.buildUI= function(){
		if(stageNode.length!=1){
			alert("Error : the page do not contain a the tag.");
		} else {
			stage=stageNode[0];
			originalWidth=stageNode.width();
			originalHeight=stageNode.height();
			setTimeout(d.loadImages,1);
			style.type = 'text/css';
			d.rebuildStyle();
			stage.parentNode.appendChild(style);
			stageNode.addClass('roundedRect');
			
			var container = document.createElement('div');
			container.className='RTB_container';
			stage.appendChild(container);
			loader.className='RTB_loader';
			container.appendChild(loader);
			d.setLoaderCss();
			commandDiv.className="RTB_commands";
			commandDiv.innerHTML="<span onclick='RTBGame.magnify()' class='RTB_icon' style='background-image:url(img\/Buttons/Button-settings.png);'></span>";
			container.appendChild(commandDiv);
			
			for(var objectType in objects){
				objects[objectType].div.className="RTB_image";
				container.appendChild(objects[objectType].div);
			    commandDiv.innerHTML+="<span onclick='RTBGame.selectObjectType(\""+objectType+"\")' class='RTB_icon' style='background-image:url(img\/Buttons/Button-"+objectType+".png);'></span>";
				if(objectType==selectedType){
					objects[objectType].chooserDiv.className="RTB_chooser_selected";
				} else {
					objects[objectType].chooserDiv.className="RTB_chooser";	
				}
				container.appendChild(objects[objectType].chooserDiv);
			}
		}
	};
	
	d.okToLaunchGame = function() {
		d.buildUI();
	};
	
	//------ Game controler
	d.selectObject=function(objectType,objectIndex){
		if(objects[objectType].selectedIndex>=0){
				objects[objectType].div.removeChild(objects[objectType].images[objects[objectType].selectedIndex]);
		}
		if(objectIndex!=objects[objectType].selectedIndex || objectType=="dolls"){
			objects[objectType].div.appendChild(objects[objectType].images[objectIndex]);
			objects[objectType].selectedIndex=objectIndex;
		}else {
			objects[objectType].selectedIndex=-1;
		}
	}
	
	d.selectObjectType=function(objectType){
		selectedType=objectType;
		for(var objectType in objects){
			if(objectType==selectedType){
					objects[objectType].chooserDiv.className="RTB_chooser_selected";
			} else {
					objects[objectType].chooserDiv.className="RTB_chooser";	
			}
		}
		d.rebuildStyle();
	}
	
	
	d.magnify=function(){
		fullScreen=!fullScreen;
		if(fullScreen){
			stageNode.width($(window).width()-25);
			stageNode.height($(window).height()-25);
			d.windowResized();
		}
		else {
			stageNode.width(originalWidth);
			stageNode.height(originalHeight);
			d.rebuildStyle();
		}
	}
	
	d.windowResized=function(){
		if(fullScreen){
			stageNode.width($(window).width()-25);
			stageNode.height($(window).height()-25);
		}
		d.rebuildStyle();
	}
	
})(jQuery,RTBGame)
