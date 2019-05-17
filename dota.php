<?php
    if (isset($_GET["type"])) {
        $type = $_GET["type"];
        list_heroes($type);
    }
    if (isset($_GET["roles"])) {
        $roles = $_GET["roles"];
        filter_heroes($roles);
    }
    
    function list_heroes($type) {
        $json = file_get_contents("heroes.json");
        $heroes = json_decode($json, true);
        $output = array();
        foreach ($heroes as $hero) {
            if ($hero["primary_attr"] == $type) {
                $output[] = $hero["name"] . ":" . $hero["localized_name"];
            }
        }
        sort($output);
        foreach ($output as $hero) {
           echo substr($hero, 14) . "\n";
        }
        
    }
    
    function filter_heroes($filter) {
        $roles = explode("|", $filter);
        $json = file_get_contents("heroes.json");
        $heroes = json_decode($json, true);
        $output = array();
        foreach ($heroes as $hero) {
            $pass = TRUE;
            foreach ($roles as $role) {
                if(!in_array($role, $hero["roles"])) {
                    $pass = FALSE;
                }
            }
            if ($pass) {
                $output[] = substr($hero["name"], 14);
            }
        }
        echo json_encode($output);
    }
    

?>