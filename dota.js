/*
    Name: Mark Theeranantachai
    Date: May 8, 2019
    Section: CSE 154 AF
    A javascript for pokdex.html, assignment for HW3 - Complete.
    A pokedex program game based on Pokemon that uses pokedex API to battle,
    capture, and fill out the pokedex.
*/

(function() {
    "use strict";
    
    window.addEventListener("load", init);

    /**
     * Populate the main pokedex area by fetching pokemon data,
     * add click event and functionality to start the game.
    */
    function init() {
        fetchHeroes("agi");
        fetchHeroes("int");
        fetchHeroes("str");
        let navs = qsa("nav button");
        for (let i = 0; i < navs.length; i++) {
            navs[i].addEventListener("click", toggleRole);
        }
    }
    
    function toggleRole() {
        this.classList.toggle("btn-outline-danger");
        this.classList.toggle("btn-danger");
        let navs = qsa("nav button");
        let query = "dota.php?roles=";
        for (let i = 0; i < navs.length; i++) {
            if (navs[i].classList.contains("btn-danger")) {
                query += navs[i].id + "|";
            }
        }
        
        fetch(query.substring(0, query.length - 1))
            .then(checkStatus)
            .then(JSON.parse)
            .then(refreshRole)
            .catch(console.log);
    }
    
    function refreshRole(json) {
        let heroes = qsa("main img");
        if (json.length) {
            for (let i = 0; i < heroes.length; i++) {
                $(heroes[i]).animate({
                    opacity: '0.3',
                });
                // heroes[i].classList.add("grayed");
            }
            for (let i = 0; i < json.length; i++) {
                $("#" + json[i]).animate({
                    opacity: '1',
                });
                // id(json[i]).classList.remove("grayed");
            }
        } else {
            for (let i = 0; i < heroes.length; i++) {
                $(heroes[i]).animate({
                    opacity: '1',
                });
                // heroes[i].classList.remove("grayed");
            }
        }
    }
    
    /**
     * Fetch pokemon data and populate the pokedex view
     */
    function fetchHeroes(type) {
        const url = "dota.php?type=" + type;
        fetch(url)
            .then(checkStatus)
            .then((text) => populate(text, type))
            .catch(console.log);
    }
    
    /**
     * Populate the view by the fetch response,
     * parse the plain text to get the data for updating the
     * pokedex view, and set three starters as found.
     * @param {String} text - A text response from Pokedex API
     */
    function populate(text, type) {
        let div = id("type");
        let lines = text.split("\n");
        for (let i = 0; i < lines.length - 1; i++) {
            let name = lines[i].split(":");
            let img = document.createElement("img");
            img.id = name[0];
            img.src = "hero-img/" + name[0] + "_full.png";
            img.title = name[1];
            img.alt = name[1];
            $(img).tooltip();
            id(type).appendChild(img);
        }
    }
    
    /* ------------------------------ Helper Functions ------------------------------ */
    
    /**
     * Hide an element by adding "hidden" class
     * @param {Object} object - a DOM element we want to hide.
    */
    function hide(object) {
        object.classList.add("hidden");
    }
    
    /**
     * Show an element by adding "hidden" class
     * @param {Object} object - a DOM element we want to show.
    */
    function show(object) {
        object.classList.remove("hidden");
    }
    
    /**
    * Returns the element that has the ID attribute with the specified value.
    * @param {string} idName - element ID
    * @param {Object} [object=document] - DOM object to be selected
    * @returns {object} DOM object associated with id.
    */
    function id(idName, object = document) {
        return object.getElementById(idName);
    }

    /**
    * Returns the first element that matches the given CSS selector.
    * @param {string} query - CSS query selector.
    * @param {Object} [object=document] - DOM object to be selected.
    * @returns {object[]} array of DOM objects matching the query.
    */
    function qs(query, object = document) {
        return object.querySelector(query);
    }

    /**
    * Returns the array of elements that match the given CSS selector.
    * @param {string} query - CSS query selector
    * @param {Object} [object=document] - DOM object to be selected
    * @returns {object[]} array of DOM objects matching the query.
    */
    function qsa(query, object = document) {
        return object.querySelectorAll(query);
    }
    
    /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} response - response to check for success/error
    * @returns {object} - valid result text if response was successful, otherwise rejected
    *                     Promise result
    */
    function checkStatus(response) {    // boiler plate code given out
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText));
      }
    }
})();
