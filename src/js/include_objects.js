// Copyright (c) 2014. Manaty SARL.
// Licensed GPL V3
//
// 1.0.0.002


window.RTBGame = window.RTBGame || {};
(function(c,d){
	
	var objects = {}
		
	objects.settings={}
	objects.settings.names =  ['Settings/resize'];
	objects.settings.images = [];
	objects.settings.nbLoaded = 0;
	objects.settings.selectedIndex = -1;
	objects.settings.color = '#c30000';
	objects.settings.div = document.createElement('div');
	objects.settings.div.style.zIndex=10;
	objects.settings.chooserDiv = document.createElement('div');
	objects.settings.over={};
	objects.settings.over.names =  [];
	objects.settings.over.images = {};
	objects.settings.over.div = document.createElement('div');
	objects.settings.over.div.style.zIndex=110;
	
	objects.dolls={}
	objects.dolls.names =  ['Dolls/Doll-Caleb','Dolls/Doll-Gavin','Dolls/Doll-Geoff','Dolls/Doll-Jack','Dolls/Doll-Lindsay','Dolls/Doll-Michael','Dolls/Doll-Ray','Dolls/Doll-Ryan'];
	objects.dolls.images = [];
	objects.dolls.nbLoaded = 0;
	objects.dolls.selectedIndex = -1;
	objects.dolls.color = '#c38635';
	objects.dolls.div = document.createElement('div');
	objects.dolls.div.style.zIndex=11;
	objects.dolls.chooserDiv = document.createElement('div');
	objects.dolls.over={};
	objects.dolls.over.names =  ['Dolls/over/Doll-Jack'];
	objects.dolls.over.images = {};
	objects.dolls.over.div = document.createElement('div');
	objects.dolls.over.div.style.zIndex=111;
	
	objects.outfits={}
	objects.outfits.names =  ['Outfits/Master-Chief-Outfit','Outfits/Nurse Outfit','Outfits/Penguin-Outfit','Outfits/Vav-Suit','Outfits/X-Ray-Suit'];
	objects.outfits.images = [];
	objects.outfits.nbLoaded = 0;
	objects.outfits.selectedIndex = -1;
	objects.outfits.color = '#517a2d';
	objects.outfits.div = document.createElement('div');
	objects.outfits.div.style.zIndex=12;
	objects.outfits.chooserDiv = document.createElement('div');
	objects.outfits.over={};
	objects.outfits.over.names =  [];
	objects.outfits.over.images = {};
	objects.outfits.over.div = document.createElement('div');
	objects.outfits.over.div.style.zIndex=112;
	
	objects.shoes={}
	objects.shoes.names =  ['Shoes/Gold-Boots','Shoes/Kilt-Shoes','Shoes/Master-Chief-Shoes','Shoes/Mogar-Boots','Shoes/Penguin-Boots','Shoes/Rain-Boots','Shoes/Trials-Boots','Shoes/Tux-Shoes','Shoes/Vav-Boots','Shoes/X-Ray-Boots'];
	objects.shoes.images = [];
	objects.shoes.nbLoaded = 0;
	objects.shoes.selectedIndex = -1;
	objects.shoes.color = '#5f337a';
	objects.shoes.div = document.createElement('div');
	objects.shoes.div.style.zIndex=13;
	objects.shoes.chooserDiv = document.createElement('div');
	objects.shoes.over={};
	objects.shoes.over.names =  [];
	objects.shoes.over.images = {};
	objects.shoes.over.div = document.createElement('div');
	objects.shoes.over.div.style.zIndex=113;
	
	objects.pants={}
	objects.pants.names =  ['Pants/Baggies','Pants/Black-Jeans','Pants/Blue-Baggies','Pants/Blue-Jeans','Pants/Brown-Shorts','Pants/Creeper-Shorts','Pants/Dark-Blue-Jeans','Pants/Grey-Shorts','Pants/Khaki-Baggies','Pants/Kilt','Pants/Mogar-Pants','Pants/Tartan-Shorts','Pants/Trials-Pants','Pants/Tux-Pants','Pants/White-Pants'];
	objects.pants.images = [];
	objects.pants.nbLoaded = 0;
	objects.pants.selectedIndex = -1;
	objects.pants.color = '#41a39d';
	objects.pants.div = document.createElement('div');
	objects.pants.div.style.zIndex=14;
	objects.pants.chooserDiv = document.createElement('div');
	objects.pants.over={};
	objects.pants.over.names =  [];
	objects.pants.over.images = {};
	objects.pants.over.div = document.createElement('div');
	objects.pants.over.div.style.zIndex=114;
	
	objects.tops={}
	objects.tops.names =  ['Tops/AH-Shirt','Tops/Blue-Army-Shirt','Tops/Creeper-Shirt','Tops/Free-Edgar-Shirt','Tops/Grifball-Shirt','Tops/Kilt-Top','Tops/Mogar-Top','Tops/Ppl-Like-Grapes-Shirt','Tops/RWBY-Shirt','Tops/Rage-Quit-Shirt','Tops/Raincoat','Tops/Red-Army-Shirt','Tops/ToP-Shirt','Tops/Trials-Top','Tops/Tux-Top'];
	objects.tops.images = [];
	objects.tops.nbLoaded = 0;
	objects.tops.selectedIndex = -1;
	objects.tops.color = '#d0647a';
	objects.tops.div = document.createElement('div');
	objects.tops.div.style.zIndex=15;
	objects.tops.chooserDiv = document.createElement('div');
	objects.tops.over={};
	objects.tops.over.names =  [];
	objects.tops.over.images = {};
	objects.tops.over.div = document.createElement('div');
	objects.tops.over.div.style.zIndex=115;
	
	objects.gloves={}
	objects.gloves.names =  ['Gloves/Creeper-Fingerless-Gloves','Gloves/Master-Chief-Gloves','Gloves/Trials-Gloves','Gloves/Vav-Gloves','Gloves/White-Gloves','Gloves/X-Ray-Gloves'];
	objects.gloves.images = [];
	objects.gloves.nbLoaded = 0;
	objects.gloves.selectedIndex = -1;
	objects.gloves.color = '#908916';
	objects.gloves.div = document.createElement('div');
	objects.gloves.div.style.zIndex=16;
	objects.gloves.chooserDiv = document.createElement('div');
	objects.gloves.over={};
	objects.gloves.over.names =  [];
	objects.gloves.over.images = {};
	objects.gloves.over.div = document.createElement('div');
	objects.gloves.over.div.style.zIndex=116;
	
	objects.others={}
	objects.others.names =  ['Others/Creeper-Scarf','Others/Mogar-Ears','Others/Mogar-Wristguards','Others/Nurse-Hat','Others/Penguin-Bow','Others/Rose','Others/X-Ray-Glasses'];
	objects.others.images = [];
	objects.others.nbLoaded = 0;
	objects.others.selectedIndex = -1;
	objects.others.color = '#908916';
	objects.others.div = document.createElement('div');
	objects.others.div.style.zIndex=17;
	objects.others.chooserDiv = document.createElement('div');
	objects.others.over={};
	objects.others.over.names =  [];
	objects.others.over.images = {};
	objects.others.over.div = document.createElement('div');
	objects.others.over.div.style.zIndex=117;
   d.objects=objects;
})(jQuery,RTBGame)