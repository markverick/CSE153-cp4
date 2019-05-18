<?php
/*
    Name: Mark Theeranantachai
    Date: May 18, 2019
    Section: CSE 154 AF
    A PHP APIs for index.html, assignment for CP4.
*/
    if (isset($_GET["type"])) {
        $type = $_GET["type"];
        list_heroes($type);
    } else if (isset($_GET["roles"])) {
        $roles = $_GET["roles"];
        filter_heroes($roles);
    } else {
        header("HTTP/1.1 400 Invalid Request");
        header("Content-type: text/plain");
        echo "API not supported for this query";
    }
    
    /**
     * List hero by type and respod as plain text.
     * @param {String} $type - a primary attribute of a hero
     */
    function list_heroes($type) {
        header("Content-type: text/plain");
        $json = file_get_contents("heroes.json");
        $heroes = json_decode($json, true);
        $output = array();
        foreach ($heroes as $hero) {
            if ($hero["primary_attr"] === $type) {
                $output[] = $hero["name"] . ":" . $hero["localized_name"];
            }
        }
        if (!$output) {
            header("HTTP/1.1 400 Invalid Request");
            echo "No heroes found, there are only three valid types: \"str\", \"agi\", \"int\"";
        }
        sort($output);
        foreach ($output as $hero) {
            echo substr($hero, 14) . "\n";
        }
        
    }
    
    /**
     * Filter heroes and respond as JSON by hero roles
     * @param {String} $filter - A string filter
     */
    function filter_heroes($filter) {
        header('Content-type: application/json');
        $roles = explode("|", $filter);
        $json = file_get_contents("heroes.json");
        $heroes = json_decode($json, true);
        $output = array();
        foreach ($heroes as $hero) {
            $pass = TRUE;
            foreach ($roles as $role) {
                if (!in_array($role, $hero["roles"])) {
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