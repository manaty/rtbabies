<?php
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
?>