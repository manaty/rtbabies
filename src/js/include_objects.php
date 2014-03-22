<?php
error_reporting(E_ERROR | E_PARSE); 

$objectsDirName=parse_ini_file("../img/configuration.txt");

function getImagesArray($dirName){
	$result = "["; 
    $sepFlag=false;
	$files = @scandir("../img/".$dirName);
    foreach ($files as $key => $value) {
    	if(substr($value,-4) === ".png"){
    		if($sepFlag){
    			$result.=",";
    		} else {
    			$sepFlag=true;
    		}
			$result.="'".$dirName."/".basename($value,".png")."'";
    	}
	}
	$result.="]";
	return $result;
}

header('Content-type: application/javascript');
?>
// Copyright (c) 2014. Manaty SARL.
// Licensed GPL V3
//
// 1.0.0.002


window.RTBGame = window.RTBGame || {};
(function(c,d){
	
	var objects = {}
	<?php
$zIndex=9;
foreach ($objectsDirName as $dirName => $color) {
	$propertyName=strtolower($dirName);
	$zIndex++;
?>	
	objects.<?=$propertyName?>={}
	objects.<?=$propertyName?>.names =  <?=getImagesArray($dirName);?>;
	objects.<?=$propertyName?>.images = [];
	objects.<?=$propertyName?>.nbLoaded = 0;
	objects.<?=$propertyName?>.selectedIndex = -1;
	objects.<?=$propertyName?>.color = '<?=$color?>';
	objects.<?=$propertyName?>.div = document.createElement('div');
	objects.<?=$propertyName?>.div.style.zIndex=<?=$zIndex?>;
	objects.<?=$propertyName?>.chooserDiv = document.createElement('div');
	objects.<?=$propertyName?>.over={};
	objects.<?=$propertyName?>.over.names =  <?=getImagesArray($dirName."/over");?>;
	objects.<?=$propertyName?>.over.images = {};
	objects.<?=$propertyName?>.over.div = document.createElement('div');
	objects.<?=$propertyName?>.over.div.style.zIndex=<?=100+$zIndex?>;
<?php
}
?>
   d.objects=objects;
})(jQuery,RTBGame)