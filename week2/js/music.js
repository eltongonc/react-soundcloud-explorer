(function(global){
    // Code for the spinner
    var dialog = document.querySelector('dialog');
    var main = document.querySelector('main');
    var inputs = document.querySelectorAll('form input:not([type="checkbox"])');

    // Code for fancy labels
    inputs.forEach((input)=>{
        input.addEventListener("change", function(){
            if(this.value != ""){
                document.querySelector(`label[for=${this.id}]`).classList.add("up")
            }else {
                document.querySelector(`label[for=${this.id}]`).classList.remove("up")
            }
        });
    });

    //SOUNDCLOUD_API presets
    const SOUNDCLOUD_API = {
        clientId: ``,
        search: 'afro',
        limit: '60',
        url: function(songId){
            // More info: https://developers.soundcloud.com/docs/api/reference#tracks
            return `https://api.soundcloud.com/tracks?client_id=${this.clientId}&limit=${this.limit}&q=${this.search}`
        }
    }

    let helpers = {
        apiCall: function(url, htmlInput, htmlOutput){
            // source: https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest && Joost
            var req = new XMLHttpRequest();
            req.open("GET", url, true)
            req.onreadystatechange = function(){
                if (req.readyState === XMLHttpRequest.DONE && (req.status >= 200 && req.status < 400)){
                    // turns de response in a object
                    var data = JSON.parse(req.responseText);
                    // pass the data to a handler
                    helpers.dataHandler(data)
                    // create html
                    sections.createContent(data, htmlInput, htmlOutput)
                    // Adds a spinner everytime a call is made
                    helpers.removeLoader()
                }
            }
            // you can have errors before
            req.onerror = function(err) {
                console.log(err)
            }
            req.send()
        },
        dataHandler: function(data) {
            // set the searched data to the global object
            localStorage.setItem("data", JSON.stringify(data))
            return data
        },
        checkExistingRoute: function(hash) {
            // Gets the array of sections that is stored in global window object
            let { sections } = global
            // Turns an id into a #-less string
            let replacedHash = hash.replace("#","");
            let route, initRoute = "#login";
            // Loop through all sections and checks if current hash exists
            sections.forEach((section)=>{
                if (section.id == replacedHash) {
                    route = hash
                }
            })
            // The user sees initRoute if the hash doesn't exist
            route == null || route == "" ?
                // If an user is stored in the localStorage you won't go to login
                localStorage.getItem("user")? route = "#home": route = initRoute :
                route;

            return document.querySelector(route);
        },
        showSelectedRoute: function(route) {
            // Gets the array that is stored in global window object
            let { sections } = global;
            // Hide all sections
            sections.forEach(function (section) {
                section.classList.add("hidden");
            });
            // Show the selected route
            route.classList.remove("hidden");
        },
        // loading spinner
        addLoader: function() {
        	dialog.setAttribute('open', '');
        	main.classList.add('de-emphasized');
        },
        removeLoader: function() {
            // src: http://dabblet.com/gist/1326eb460b0dff91d638
        	if (dialog.close) {
        		dialog.close();
         	}
         	else {
         		dialog.removeAttribute('open');
        	}
         	main.classList.remove('de-emphasized');
        },
    }

    let appOptions = (function(){
        // sets the sections to the global window options so they available throughouth the app
        self.sections = document.querySelectorAll('main > section');
        return {
            sections: self.sections,
            initRoute: helpers.checkExistingRoute(location.hash)
        }
    })();
    // Function to initialize the app
    let app = {
        init: function(){
            routes.init();
        }
    };

    // Function to setup the routes
    let routes = {
        init: function(){
            // sets spinner
            helpers.addLoader()
            // gets a list of data and store it in the dom
            helpers.apiCall(SOUNDCLOUD_API.url(), "#entry-template",'#content')
            // shows the current initialroute
            helpers.showSelectedRoute(appOptions.initRoute)
            // function that checks if the route changes
            this.routeChange();
        },
        // change the route
        routeChange: window.onhashchange = function() {
            // splits the hash into an array of [hash, "whatever is after tge /"]
            var hash = location.hash.toString().split("/");
            // checks if the hash exists
            let  currentSection = helpers.checkExistingRoute(hash[0])
            // Uses the hash to toggle the sections
            sections.toggle(currentSection);
            // Use the id as route if it exist int routes
            if(routes[currentSection.id]){
                routes[currentSection.id](hash[1])
            }
        },
        login: function(){
            // select the login form and stop it from updating the page
            var form = document.querySelector('form[action="#home"]');
            form.addEventListener("submit", function(e){
                e.preventDefault()
                // TODO link to database
                var username = this.children['field-email'].value;
                var password = this.children['field-password'].value;
                if(username && password){
                    localStorage.setItem("user", username)
                    location.replace("#home")
                }else {
                    console.log("input not correct")
                }
            })
        },
        // Routes for home
        home: function(){
            // select the home search form and stop it from updating the page
            var form = document.querySelector('form[action="#search"]')
            form.addEventListener("submit", function(e){
                e.preventDefault()
                // Adds a loadings spinner
                helpers.addLoader()
                // Uses userinput as query
                SOUNDCLOUD_API.search = this.children[0].value
                // gets a list of data and store it in the dom
                helpers.apiCall(SOUNDCLOUD_API.url(), "#entry-template",'#content')
            })
        },
        // Routes for searched content
        player: function(name){
            // Get the data from localStorage and filter the results and append it to the dom
            var data = JSON.parse(localStorage.getItem('data'));
            var filteredData = data.filter(function(item){
                return item.permalink == name
            })
            sections.createContent(filteredData, "#player-template", "#player")
        }

    };

    // handles the sections
    let sections = {
        toggle: function(route){
            helpers.showSelectedRoute(route);
        },
        createContent: function(data, htmlInput, htmlOutput){
            // Handlebars selection and Templating
            var source = document.querySelector(htmlInput).innerHTML
            template = Handlebars.compile(source);
            // TODO cleanup this context var
            var context = data.map((item)=>{
                return {
                    pageTitle: "Title",
                    id: item.id,
                    title: item.title,
                    genre: item.genre || "No genre",
                    description: item.description,
                    stream_url: item.stream_url,
                    created_at: item.created_at,
                    path: item.permalink,
                    soundcloudURL: item.permalink_url,
                    uri: item.uri.replace("https://", ""),
                    img: item.artwork_url || "http://levivisser.nl/img/Icons/CD.png",
                    likes: item.likes_count ? `<i class="fa fa-heart"></i> `+item.likes_count : "",
                    userImg: item.user.avatar_url || "../img/user.svg",
                    userLink: item.user.permalink_url,
                    userName: item.user.username,
                }
            })
            var html = template(context);
            document.querySelector(htmlOutput).innerHTML = html;
        }
    };
    // Start the app
    app.init();

})(this)
