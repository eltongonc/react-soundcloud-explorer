( function() {
    "use strict";

    var section = document.querySelectorAll('section');

    var app = {
        init: function(){
            routes.init()
        }
    }

    var routes = {
        init: function(){
            var newURL = location.href,
                newHash = location.hash;
            if (!newHash) {
                var defaultHash = "#home";
                newHash = defaultHash;
                sections.toggle(newHash);
            }
            // if the hash has changed and a handler has been bound...
            if ( newHash != oldHash && typeof window.onhashchange === "function" ) {

            // execute the handler
            onhashchange({
               type: "hashchange",
               oldURL: oldURL,
               newURL: newURL
            });
        },

        hashChange: function(hash){
            sections.toggle(hash)
        }

    };



    var sections = (function(route){
                var selectedRoute = document.querySelector(route);

                for (var i = 0; i < section.length; i++) {
                    section[i].classList.add("hidden")
                }

                selectedRoute.classList.remove("hidden")

        return {
            ...toggle
        }
    })




    app.init();


})()
