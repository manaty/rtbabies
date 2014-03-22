<?php

function createAvatar($imageNames,$avatarFilename){
  error_log("createAvatar");
  $avatar=null;
  $width=0;
  $height=0;
  foreach ($imageNames as $key => $value) {
  	$filename="img/".$value.".png";
  	if(!file_exists($filename)){
		throw new Exception("Unknown image file $filename");
    }
	if($avatar==null){
		$doll=imagecreatefrompng($filename);
		$width = imagesx($doll);
    	$height = imagesy($doll);
		$avatar=imagecreatetruecolor($width, $height);
		imagealphablending($avatar, false);
		imagecopy($avatar, $doll, 0, 0, 0, 0, $width, $height);
		imagealphablending($avatar, true);
		imagesavealpha($avatar, true);
	} else {
		imagecopy($avatar, imagecreatefrompng($filename), 0, 0, 0, 0, $width, $height);
	}
  }
  //we add the overlays
   foreach ($imageNames as $key => $value) {
   	$vals=preg_split("/\//", $value);
	$directory=$vals[0];
	$file=$vals[1];
  	$filename="img/".$directory."/over/".$file.".png";
  	if(file_exists($filename)){
		imagecopy($avatar, imagecreatefrompng($filename), 0, 0, 0, 0, $width, $height);
	}
  }
  imagepng($avatar,$avatarFilename);
}

try{
if(isset($_POST['objects'])){
  $objects=	$_POST['objects'];
  error_log("objects=".$objects);
  $imageNames=preg_split("/\|/", $objects);
  $md5=md5($objects);
  $avatarName=substr($md5, strlen($md5)-8).".png";
  error_log("avatarName=".$avatarName);
  if(!file_exists("avatar/".$avatarName)){
  	createAvatar($imageNames,"avatar/".$avatarName);
  }
}
echo "avatar/".$avatarName;
} catch (Exception $e){
	error_log($e->getMessage());
	header('HTTP/1.1 500 Internal Server Error');
}
?>