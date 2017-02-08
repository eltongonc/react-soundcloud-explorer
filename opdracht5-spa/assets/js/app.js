( function() {
    "use strict";

    // Generates html content for Page class
    var helpers = {
        createSection: function(options){
            var mainContainer = document.querySelector('main');

        	let { element, id, childrenArray } = options;

        	var parent = document.createElement(element);
        	var children;

        	for (var x in options) {
        		if (typeof options[x] !== "object") {
        			parent[x] = options[x];
        		}
        	}

        	//
        	if (childrenArray) {
        		children = childrenArray.map((item)=>{
        			var child;
        			child = document.createElement(item.element);

        			if (item.innerHMTL) {
        				child.innerHTML = item.innerHMTL;
        			}
        			if (item.className) {
        				child.className = item.className;
        			}
        			if (item.id) {
        				child.id = item.id;
        			}
        			if (item.event) {
        				child.addEventListener("click", item.event);
        			}
        			return child;
        		});


        		for (var i = 0; i < children.length; i++) {
        			parent.appendChild(children[i]);
        		}
        	}
            mainContainer.appendChild(parent);
            // add this item to the nav
            this.createNavElement(parent.id, parent.className);
        	return parent;
        },
        createNavElement: function(id, className){
            var nav = document.querySelector('nav ul');

            var li = document.createElement("li");
            var a = document.createElement("a");
            a.innerText = id;
            a.href= `#${id}`;

            li.appendChild(a);

            console.dir(a);
            nav.appendChild(li);


        }
    };

    // Page class
    var Pages = function(pagename){
        var pageContent = "Newly generated page";
        var htmlElement = helpers.createSection({
            element:"section",
            id:pagename,
            childrenArray:[
                {element:"h1", innerHMTL: pageContent}
            ]
        });

    };


    var options = {
        page1: new Pages("Page1"),
        initRoute: document.querySelector("#home"),
        sections: document.querySelectorAll('section'),
    };


    // start app
    var app = {
        init: function(){


            routes.init();
        }
    };


    // create routes
    var routes = {
        init: function(){

            console.log("Router initialized");
            let { sections, initRoute } = options;

            for (var i = 0; i < sections.length; i++) {
                sections[i].classList.add("hidden");
            }

            initRoute.classList.remove("hidden");

            this.hashChange();

        },
        // change the route
        hashChange: function(){
            // source: https://developer.mozilla.org/nl/docs/Web/API/WindowEventHandlers/onhashchange
            window.addEventListener("hashchange", function() {

                var hash = location.hash;
                    sections.toggle(hash);

            },false);
        },
    };

    // handles the sections
    var sections = {
        toggle: function(route){
            let  section = options.sections;

            var selectedRoute = document.querySelector(route);
            console.log(route);

            for (var i = 0; i < section.length; i++) {
                section[i].classList.add("hidden");
            }

            selectedRoute.classList.remove("hidden");
            this.loadContent();
        },

        loadContent: function(){
            console.log("Content");
        }
    };


    app.init();


})();
