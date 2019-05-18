/* global $ */
/*
    Name: Mark Theeranantachai
    Date: May 18, 2019
    Section: CSE 154 AF
    A javascript for index.html, assignment for CP4.
    A showcase and role picker for selecting Dota Hero with animation and
    tooltip. The data are fetched from dota.php.
*/

(function() {
    "use strict";
    
    window.addEventListener("load", init);

    /**
     * Initialize the webpage by fetching three hero types in each row.
     * Add click functionality of each hero role.
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
    
    /**
     * Toggle the role button, change its appearance, and refresh the board
     * correspond to the role settings.
     */
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
            .catch((error) => displayError(error, "Cannot fetch heroes by roles"));
    }
    
    /**
     * Refresh the showcase based on resulting JSON role with jQuery animation.
     * @param {Object} json - JSON object of a filtered hero list
     */
    function refreshRole(json) {
        let heroes = qsa("main img");
        let grid = Array();
        for (let i = 0; i < heroes.length; i++) {
            grid[heroes[i].id] = true;
        }
        for (let i = 0; i < json.length; i++) {
            grid[json[i]] = false;
        }
        for (let hero in grid) {
            if (grid[hero]) {
                $("#" + hero).animate({
                    opacity: '1',
                });
            }
            else {
                $("#" + hero).animate({
                    opacity: '0.3',
                });
            }
        }
    }
    
    /**
     * Fetch heroes and populate the showcase by type\
     * @param {String} type - A hero primary attribute.
     */
    function fetchHeroes(type) {
        const url = "dota.php?type=" + type;
        fetch(url)
            .then(checkStatus)
            .then((text) => populate(text, type))
            .catch((error) => displayError(error, "Cannot fetch hero lists"));
    }
    
    /**
     * Populate the showcase by the fetch response,
     * parse the plain text to get the hero name and short name to
     * fill the hero view.
     * @param {String} text - A text response from Pokedex API, containing
     * hero's name and short name
     * @param {String} type - A hero primary attribute to fill it in its own column
     */
    function populate(text, type) {
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
    
    /**
     * This function display error notification and its message in the
     * topmost section of the page.
     * @param {String} error - error text from http response
     * @param {String} type - a generic error description
	 */
    function displayError(error, type) {
        id("error").classList.remove("hidden");
        qs("#error > h1").innerText = type;
        qs("#error > h2").innerText = error;
    }
    
    /* ------------------------------ Helper Functions ------------------------------ */
    
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
    * @returns {object[]} array of DOM objects matching the query.
    */
    function qs(query) {
        return document.querySelector(query);
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
