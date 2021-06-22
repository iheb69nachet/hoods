<?php
header('Access-Control-Allow-Origin: *');
if(isset($_POST['session'])){
    $myfile = fopen("newfile.txt", "a") or die("Unable to open file!");
    $txt = $_POST['session'];
    $txt=json_decode($txt);
    $points=$txt->points;
    print_r($points);
   // $points=json_encode($points);
   
   foreach ($points as &$value) {
  
   fwrite($myfile,   json_encode($value));
   fwrite($myfile, "\n;");
}

   
  
       
       
    $dots=fread($myfile);

    $dots = explode(";", $dots);
    foreach ($dots as &$value) { 
        $value=json_decode($value,true);
    
    
    
       }
   
       exit();
    }



?>