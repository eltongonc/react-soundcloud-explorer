(function(global){
    'use strict';

    // global variables
    let general = {
        dialog: document.querySelector('dialog'),
        main: document.querySelector('main'),
        pages: document.querySelectorAll('main > section')
    }

    //SOUNDCLOUD_API
    const SOUNDCLOUD_API = {
        clientId: '',
        search: 'afro',
        limit: '60',
        url: function(songId){
            // More info: https://developers.soundcloud.com/docs/api/reference#tracks
            // return `https://api.soundcloud.com/resolve?url=http://soundcloud.com/search/sounds?q=trending&client_id=${this.clientId}`
            if (songId) {
                return `https://api.soundcloud.com/tracks${songId}?client_id=${this.clientId}`;
            }else{
                return `https://api.soundcloud.com/tracks?client_id=${this.clientId}&limit=${this.limit}&q=${this.search}`;
            }
        },
        call: function(url, htmlInput, htmlOutput){
            // source: https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest && Joost
            let req = new XMLHttpRequest();
            req.open("GET", url, true);
            req.onreadystatechange = function(){
                if (req.readyState === XMLHttpRequest.DONE && (req.status >= 200 && req.status < 400)){
                    // turns de response in a object
                    let data = JSON.parse(req.responseText);
                    // pass the data to a handler
                    appOptions.dataHandler(data);
                    // create html
                    sections.createContent(data, htmlInput, htmlOutput);
                    // Adds a spinner everytime a call is made
                    appOptions.removeLoader();
                }
            };
            // Show the error if there is no connection
            req.onerror = function(err) {
                console.log(err);
            };
            req.send();
        },
    };



    let appOptions = {
        dataHandler: function(data) {
            // set the searched data to the global object
            localStorage.setItem("data", JSON.stringify(data));
            return data;
        },
        addLoader: function() {
        	general.dialog.setAttribute('open', '');
        	general.main.classList.add('de-emphasized');
        },
        removeLoader: function() {
        	if (general.dialog.close) {
        		general.dialog.close();
         	}
         	else {
         		general.dialog.removeAttribute('open');
        	}
         	general.main.classList.remove('de-emphasized');
        },
        fancyLables: (function(){
            let inputs = document.querySelectorAll('form input:not([type="checkbox"])');
            // Code for fancy labels
            inputs.forEach((input)=>{
                input.addEventListener("change", function(){
                    if(this.value !== ""){
                        document.querySelector(`label[for=${this.id}]`).classList.add("up");
                    }else {
                        document.querySelector(`label[for=${this.id}]`).classList.remove("up");
                    }
                });
            });
        }())
    };

    // Function to general the app
    let app = {
        initRoute: "#login",
        sections: general.pages,
        init: function(){
            // code for the chat
            let chat = document.querySelector('aside span');
            chat.addEventListener("click", function(){
                this.parentNode.classList.toggle("offscreen");
            });

            // generate routes
            routes.init();
        }
    };

    // Function to general the routes
    let routes = {
        init: function(){
            // function that checks if the route changes
            // this.hashChange();
            sections.toggle();
            // Do an api call only if it is not saved in local storage;
            if (localStorage.data) {
                sections.createContent(JSON.parse(localStorage.data), "#entry-template",'#content');
            }else {
                // sets spinner
                appOptions.addLoader();
                // gets a list of data
                SOUNDCLOUD_API.call(SOUNDCLOUD_API.url(), "#entry-template",'#content');
            }
        },
        // change the route
        hashChange: window.addEventListener("hashchange", function(){
            sections.toggle()
        }),
        checkExistingRoute: function(hash) {
            // this method return a object with a rout+info
            let simpleHash = hash.split("/")
            let replacedHash = simpleHash[0].replace("#","");
            let routeArray = [];
            let response = {};

            general.pages.forEach((section)=>{
                section.id == replacedHash ? routeArray.push(simpleHash[0]) : null
            });

            if (routeArray.length > 0) {
                response.message = "Route exist";
                response.route = routeArray[0];
                response.routeExist = true;
                response.correspondingPage = this[replacedHash];
                response.path = simpleHash[1];
                simpleHash[1] ? localStorage.setItem("path", simpleHash[1]) : null
            }else {
                response.message = `Route ${replacedHash} does not exist. You will be redirected to login`;
                response.route = "#login";
                response.routeExist = false;
            }

            return response;
        },
        hideAllPages: function(){
            // I replaced the for loop with a nice clean forEach Function - Dave Bitter
            general.pages.forEach(function (section) {
                // Hide all sections
                section.classList.add("hidden");

            });
        },
        showSelectedRoute: function(route) {
            // Show the selected route
            document.querySelector(route).classList.remove("hidden");
        },
        login: function(){
            let form = document.querySelector('form[action="#home"]');
            form.addEventListener("submit", function(e){
                e.preventDefault();

                // TODO link to database
                let username = document.querySelector('#field-email').value;
                let password = document.querySelector('#field-password').value;
                if(username && password){
                    localStorage.setItem("user", username);
                    location.replace("#home");
                }
            });
        },
        // Routes for home
        home: function(){
            let form = document.querySelector('form[action="#search"]');
            // search input
            form.addEventListener("submit", function(e){
                // Stops the form from loading a page
                e.preventDefault();
                // Adds a loadings spinner
                appOptions.addLoader();
                // Uses userinput as querie
                SOUNDCLOUD_API.search = this.children[0].value;
                // Makes ajax call
                SOUNDCLOUD_API.call(SOUNDCLOUD_API.url(), "#entry-template",'#content');
            });

            let homeData = localStorage.getItem("user");
            // sections.createContent(homeData)
        },
        // Routes for searched content
        player: function(name){
            let data = JSON.parse(localStorage.getItem('data'));
            // console.log(data);
            let filteredData = data.filter(function(item){
                return item.permalink == (name || localStorage.getItem("path"));
            });
            sections.createContent(filteredData, "#player-template", "#player");
        }
    };

    // handles the sections
    let sections = {
        toggle: function(response){
            let initRoute = new Promise(function(resolve, reject) {
                // check current route if it exists and hides all general.pages
                resolve( routes.checkExistingRoute(location.hash), routes.hideAllPages() );
            })
            .then(function(result) {
                console.log(result);
                // uses the response that is returned from checkExistingRoute
                if (result.routeExist) {
                    result.correspondingPage(result.path);
                    routes.showSelectedRoute(result.route);
                }else {
                    alert(result.message);
                    location.hash = result.route;
                }

                return result.route;
            });

        },
        createContent: function(data, htmlInput, htmlOutput){
            // Handlebars selection
            self.source = document.querySelector(htmlInput).innerHTML;
            let template = Handlebars.compile(self.source);
            let context = data.map((item)=>{
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
                    likes: item.likes_count ? `<i class="fa fa-heart"></i> ${item.likes_count}` : "",
                    userImg: item.user.avatar_url || "../img/user.svg",
                    userLink: item.user.permalink_url,
                    userName: item.user.username,

                };
            });
            document.querySelector(htmlOutput).innerHTML = template(context);
        }
    };

    // Start the app
    app.init();

})(this);
