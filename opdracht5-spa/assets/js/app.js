( function(global) {
    "use strict";

    // Generates html content for Page class
    let helpers = {
        createSection: function(props){
            // Where everything will be appended to
            let mainContainer = document.querySelector('main');
            // get properties from the parameter, less typing
            let { element, childrenArray } = props;
            // create a HTML element based on given properties
            let parent = document.createElement(element);
            // loops through all the properties, skips all but objects
            for (let x in props) {
                if (typeof props[x] !== "object") {
                    parent[x] = props[x];
                }
            }
            // Builds children if there is a childrenArray and appends it to a parent
            if (childrenArray) {
                childrenArray.forEach((item)=>{
                    let child = document.createElement(item.element);
                    for (let x in item) {
                            child[x] = item[x];
                    }
                    parent.appendChild(child)
                })
            }
            // Appends parent to the main element
            mainContainer.appendChild(parent);
            // Adds this item as a link in the navigation
            this.createNavElement(parent.id, parent.className);
            return parent;
        },
        createNavElement: function(id, className){
            // Selects the nav element
            let nav = document.querySelector('nav ul');
            // Appends a new li to the nav
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.innerText = id;
            a.href= `#${id}`;

            li.appendChild(a);
            nav.appendChild(li);
        },
        showSelectedRoute: function(route) {
            // Gets the array that is stored in global window object
            let { sections } = global;
            // I replaced the for loop with a nice clean forEach Function - Dave Bitter
            sections.forEach(function (section) {
                // Hide all sections
                section.classList.add("hidden");
            });
            // Show the selected route
            route.classList.remove("hidden");
        },
        checkExistingRoute: function(hash) {
            // Gets the array that is stored in global window object
            let { sections } = global
            // Turns an id into a #-less string
            let replacedHash = hash.replace("#","");
            let route, initRoute = "#home";
            // Loop through all sections and checks if current hash exists
            sections.forEach((section)=>{
                if (section.id == replacedHash) {
                    route = location.hash
                }
            })
            // The user sees initRoute if the hash doesn't exist
            route == null || route == "" ? route = initRoute : route;

            return document.querySelector(route);
        }
    };

    // Page class
    let Pages = function(pagename, pageContent){
        let htmlElement = helpers.createSection({
            element:"section",
            id:pagename,
            childrenArray:[
                {element:"h1", innerHTML: pageContent}
            ]
        });

    };

    let options = (function(){
        // TODO: make pageContent better
        var newPage = new Pages("Page1", "Newly generated page");
        self.sections = document.querySelectorAll('section');
        return {
            page1: newPage ,
            sections: self.sections,
            initRoute: helpers.checkExistingRoute(location.hash)
        }
    })();

    // Function to setup the app
    let app = {
        init: function(){
            routes.init();
        }
    };

    // Function to setup the routes
    let routes = {
        init: function(){
            helpers.showSelectedRoute(options.initRoute)
            this.hashChange();
        },
        // change the route
        hashChange: window.onhashchange = function() {
            let  currentSection = helpers.checkExistingRoute(location.hash)
            sections.toggle(currentSection);
        },
    };

    // handles the sections
    let sections = {
        toggle: function(route){
            helpers.showSelectedRoute(route)
            this.loadContent();
        },
        loadContent: function(){
            console.log("Content");
        }
    };

    // Start the app
    app.init();

})(this);
