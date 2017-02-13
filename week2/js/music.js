(function(global){

    // Handlebars selection
    self.source = document.querySelector("#entry-template").innerHTML
    template = Handlebars.compile(self.source);

    //SOUNDCLOUD_API
    const SOUNDCLOUD_API = {
        clientId: `GET_YOUR_OWN`,
        search: '',
        url: function(){
            return `https://api.soundcloud.com/tracks?genre=hiphoprap&client_id=${this.clientId}&limit=5&${this.search}`
        }
    }

    let helpers = {
        apiCall: function(url){
            // source: https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest && Joost
            var req = new XMLHttpRequest();
            req.open("GET", url, true)
            req.onreadystatechange = function(){
                if (req.readyState === XMLHttpRequest.DONE && (req.status >= 200 && req.status < 400)){
                    // turns de response in a object
                    var data = JSON.parse(req.responseText);
                    helpers.dataHandler(data)
                }
            }
            // you can have errors before
            req.onerror = function(err) {
                console.log(err)
            }
            req.send()
        },
        dataHandler: function(data) {
            console.log("data Loaded");
            helpers.createDomElement(data)

        },
        createDomElement: function(arr){
            var context = arr.map((item)=>{
                console.log(item);
                return {
                    stream_url: item.stream_url,
                    genre: item.genre,
                    id: item.id,
                    stream_url: item.stream_url,
                    uri: item.uri.replace("https://", ""),
                    title: item.title,
                    img: item.waveform_url
                }
            })
            var html = template(context);

            document.querySelector('#content').innerHTML = html;
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
    }

    let options = (function(){
        self.sections = document.querySelectorAll('main section');
        return {
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
            if(routes[currentSection.id]){
                routes[currentSection.id]()
            }
        },
        // Routes for home
        home: function(){
            // console.log("home");
            var homeData = "home"
            sections.loadContent(homeData)
        },
        // Routes for searched content
        content: function(){
            var contentData = location.search.replace("?", "")
            SOUNDCLOUD_API.search = contentData;
            helpers.apiCall(SOUNDCLOUD_API.url())
            sections.loadContent(contentData)
        },

    };

    // handles the sections
    let sections = {
        toggle: function(route){
            helpers.showSelectedRoute(route)

            // this.loadContent();
        },
        loadContent: function(data){

            console.log(data);


        }
    };

    // Start the app
    app.init();

})(this)
