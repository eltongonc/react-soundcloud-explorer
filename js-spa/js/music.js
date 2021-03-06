(function(){

    //SOUNDCLOUD_API
    const SOUNDCLOUD_API = {
        clientId: 'E9bvER0kSJUJFDHCllZ3IL5h18C7QICR',
        search: 'random',
        limit: '60',
        url: function(songId){
            // More info: https://developers.soundcloud.com/docs/api/reference#tracks
            if (songId) {
                return `https://api.soundcloud.com/tracks${songId}?client_id=${this.clientId}`;
            }else{
                return `https://api.soundcloud.com/tracks?client_id=${this.clientId}&limit=${this.limit}&q=${this.search}`;
            }
        }
    };

    // data storage object
    const SONGS = {
        getList: function(url, htmlInput, htmlOutput){
            // source: https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest && Joost
            let req = new XMLHttpRequest();
            req.open("GET", url, true);
            req.onreadystatechange = function(){
                if (req.readyState === XMLHttpRequest.DONE && (req.status >= 200 && req.status < 400)){
                    // turns de response in a object
                    let response = JSON.parse(req.responseText);
                    // save the current data in the localStorage
                    SONGS.save(response);
                    // create html
                    sections.createContent(response, htmlInput, htmlOutput);
                    // Adds a spinner everytime a call is made
                    helpers.spinner.remove();
                }
            };
            // Show the error if there is no connection
            req.onerror = function(err) {

                helpers.alert.add("There was an error loading the data")
            };
            req.send();
        },
        save(data){
            // set the searched data to the global object
            localStorage.setItem("data", JSON.stringify(data));
            return data;
        }
    };

    // All options needed for the app
    const helpers = {
        dialog: document.querySelector('dialog'),
        main: document.querySelector('body > div'),
        pages: document.querySelectorAll('main > section'),
        header: document.querySelector('header'),
        spinner: {
            add() {
                helpers.dialog.className = "loader";
                helpers.dialog.innerHTML = "Loading";
                helpers.dialog.setAttribute('open', '');
                helpers.main.classList.add('de-emphasized');
            },
            remove() {
                if (helpers.dialog.close) {
                    helpers.dialog.close();
                }
                else {
                    helpers.dialog.removeAttribute('open');
                }
                helpers.main.classList.remove('de-emphasized');
            }
        },
        alert: {
            add(result) {
                helpers.header.classList.add("hidden")
                helpers.dialog.className = "alert";
                helpers.dialog.innerHTML = (result.message || result) + "<footer><button>OK</button></footer>";

                helpers.dialog.setAttribute('open', '');
                helpers.main.classList.add('de-emphasized');

                document.querySelector('.alert button').addEventListener("click", function(){
                    helpers.alert.remove(result);
                });
            },
            remove(result) {
                if (helpers.dialog.close) {
                    helpers.dialog.close();
                }else {
                    helpers.dialog.removeAttribute('open');
                }
                helpers.main.classList.remove('de-emphasized');
                helpers.header.classList.remove("hidden")

                // stets the route to a given route
                location.hash = result.route || "#explorer";
            }
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
        }()),
        chat: (function(){
            // enable the chat module
            let chat = document.querySelector('aside span');
            chat.addEventListener("click", function(){
                this.parentNode.classList.toggle("offscreen");
            });
        }())
    };

    // Function to generate the app
    const app = {
        init(){
            // generate routes
            routes.init();
            location.hash = "#explorer";
        }
    };

    // Function to generate the routes
    const routes = {
        init(){
            // helpers.spinner.remove();
            sections.toggle();

            // Do an api call the first time an user get to the homeRoute. This happens only when it is not saved in local storage;
            if (localStorage.data) {
                sections.createContent(JSON.parse(localStorage.data), "#entry-template",'#content');
            }else {
                // sets a spinner
                helpers.spinner.add();
                // gets a list of data and creates the html element for it
                SONGS.getList(SOUNDCLOUD_API.url(), "#entry-template",'#content');
            }
        },
        // change the route
        hashChange: window.addEventListener("hashchange", function(){
            sections.toggle();
        }),
    };

    // handles the sections
    const sections = {
        // function that hides all sections and shows one.
        toggle: function(response){
            // readadd the header that is removed on login to the page
            if(helpers.header.classList.contains("hidden")) {
                helpers.header.classList.remove("hidden");
            }

            let initRoute = new Promise(function(resolve, reject) {
                // check current route if it exists and hides all helpers.pages
                resolve(
                    sections.checkExistingRoute(location.hash),
                    helpers.pages.forEach(function (section) {
                        // Hide all sections
                        section.classList.add("hidden");
                    })
                );
            })
            .then(function(result) {
                self.result = result;
                // uses the response that is returned from checkExistingRoute
                if (result.routeExist) {
                    result.correspondingPage(result.path);
                    document.querySelector(result.route).classList.remove("hidden");
                }else {
                    helpers.alert.add(result);
                }
                return result.route;
            });

        },
        // this method return a object with a rout+info
        checkExistingRoute(hash) {
            // checks if the hash has an path: "#player/songTitle"
            let simpleHash = hash.split("/");
            let replacedHash = simpleHash[0].replace("#","");
            let routeArray = [];
            let response = {};

            // if the current hash(without #) matches one of the sections push it to an array.
            // this array will allways have 1 item at the 0th position.
            helpers.pages.forEach((section)=>{
                section.id == replacedHash ? routeArray.push(simpleHash[0]) : null;
            });

            // check if the previous made array contains an item and give an succes message and use the path if ther is any
            if (routeArray.length > 0) {
                response.message = "Route exist";
                response.route = routeArray[0];
                response.routeExist = true;
                // match the hash to the of the pageFunctions
                response.correspondingPage = sections.show[replacedHash];
                response.path = simpleHash[1];
                simpleHash[1] ? localStorage.setItem("title", simpleHash[1]) : null;
            }else {
                response.message = `${replacedHash || "This route"} does not exist. You will be redirected to the homepage`;
                response.route = "#explorer";
                response.routeExist = false;
            }
            return response;
        },
        createContent(data, htmlInput, htmlOutput){
            console.log(data);
            // Handlebars selection
            let source = document.querySelector(htmlInput).innerHTML;
            let template = Handlebars.compile(source);
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
                    duration: item.duration

                };
            });
            console.log(context);
            document.querySelector(htmlOutput).innerHTML = template(context);
        },
        show: {
            login: function(){
                helpers.header.classList.add("hidden")

                let form = document.querySelector('form[action="#home"]');
                form.addEventListener("submit", function(e){
                    e.preventDefault();

                    // TODO link to database
                    let username = document.querySelector('#field-email').value;
                    let password = document.querySelector('#field-password').value;
                    if(username && password){
                        localStorage.setItem("user", username);
                        location.replace("#explorer");
                    }
                });
            },
            // Routes for home
            explorer: function(){
                let form = document.querySelector('form[action="#search"]');
                // search input
                form.addEventListener("submit", function(e){
                    // Stops the from loading a page
                    e.preventDefault();
                    // Adds a loadings spinner
                    helpers.spinner.add();
                    // Uses userinput as querie
                    SOUNDCLOUD_API.search = this.children[0].value;
                    // Makes ajax call
                    SONGS.getList(SOUNDCLOUD_API.url(), "#entry-template",'#content');
                });
                // Set the id of a song to the localStorage when it is clicked
                var songLink = document.querySelector('#content');
                songLink.addEventListener("click", function(e){
                    localStorage.setItem('id', e.target.id);
                });


            },
            // Routes for searched content
            player: function(){
                let data = JSON.parse(localStorage.getItem('data'));
                let filterOption = {
                    key: "id",
                    value: localStorage.getItem('id')
                };

                // filters the data based on the op
                let filteredData = data.filter(function(item){
                    return item[filterOption.key] == filterOption.value;
                });
                sections.createContent(filteredData, "#player-template", "#player");
            },
            // Routes for searched content
            register: function(name){
                // let data = JSON.parse(localStorage.getItem('data'));
                // // filters the
                // let filteredData = data.filter(function(item){
                //     return item.permalink == (name || localStorage.getItem("path"));
                // });
                // sections.createContent(filteredData, "#player-template", "#player");
            }
        }
    };

    // Start the app
    app.init();
})()
