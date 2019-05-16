<?php
    if (isset($_GET["type"])) {
        $type = $_GET["type"];
        list_heroes($type);
    }
    if (isset($_GET["roles"])) {
        $roles = $_GET["roles"];
        // list_heroes($type);
    }
    
    function list_heroes($type) {
        $json = file_get_contents("heroes.json");
        $heroes = json_decode($json, true);
        $output = Array();
        foreach ($heroes as $key => $hero) {
            if ($hero["primary_attr"] == $type) {
                $output[] = $hero["name"] . ":" . $hero["localized_name"];
            }
        }
        sort($output);
        foreach ($output as $hero) {
           echo substr($hero, 14) . "\n";
        }
        
    }
    

?>