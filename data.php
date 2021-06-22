<?php

$dots=file_get_contents("newfile.txt");

    
    $dots = explode(";", $dots);
    
   foreach ($dots as &$value) { 
    $value=json_decode($value,true);



   }

           
?>