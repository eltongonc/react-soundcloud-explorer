(function(){
    "use strict";

    var mapOptions = {
        name: "SANDBOX",
        type: "LINEAIR",
        gpsAvailable: "GPS_AVAILABLE",
        gpsUnavailable: "GPS_UNAVAILABLE",
        positionUpdated: "false",
        refreshRate: 1000,
        currentPosition: false,
        currentPositionMarker: false,
        customDebugging: false,
        debugId: false,
        map: false,
        interval: false,
        intervalCounter: false,
        updateMap: false,
        locationRow: {
            marker: []
        }
    }


    var canvas = document.getElementById('canvas')

    var ET = {
        init: function(){
            this.debugMessage("Controleer of GPS beschikbaar is...");

            // Test of GPS beschikbaar is (via geo.js) en vuur een event af
            this.addListener(mapOptions.gpsAvailable, this.startInterval);


            this.addListener(mapOptions.gps, function(){
                this.debugMessage('GPS is niet beschikbaar.')
            });

            ( this.init() ) ?
            this.fire(mapOptions.gpsAvailable) :
            this.fire(mapOptions.gpsUnavailable);
        },

        // Start een interval welke op basis van REFRESH_RATE de positie updated
        startInterval: function(){
            this.debugMessage("Controleer of GPS beschikbaar is...");

            this.updatePosition();

            mapOptions.interval = self.setInterval(this.updatePosition, mapOptions.refreshRate);
            this.addListener(mapOptions.positionUpdated, this.checkLocations);
        },



        // Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
        updatePosition: function(){
            mapOptions.intervalCounter++;
            geo_position_js.getCurrentPosition(this.setPosition, this.geoErrorHandler, {enableHighAccuracy:true});
        },

        // Callback functie voor het instellen van de huidige positie, vuurt een event af
        setPosition: function(position){
            mapOptions.currentPosition = position;

            this.fire("POSITION_UPDATED");

            this.debugMessage(`
                ${intervalCounter} positie
                lat:${position.coords.latitude}  long:${position.coords.longitude}`);
        },


        // Controleer de locaties en verwijs naar een andere pagina als we op een locatie zijn
        checkLocations: function(event){
            // Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
            for (var i = 0; i < locaties.length; i++) {
                var locatie = {
                    coords:{latitude: locaties[i][3],longitude: locaties[i][4]}};

                if(calculateDistance(locatie, currentPosition)<locaties[i][2]){

                    // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
                    if(window.location!=locaties[i][1] && localStorage[locaties[i][0]]=="false"){
                        // Probeer local storage, als die bestaat incrementeer de locatie
                        try {
                            (localStorage[locaties[i][0]]=="false")?localStorage[locaties[i][0]]=1:localStorage[locaties[i][0]]++;
                        } catch(error) {
                            this.debugMessage("Localstorage kan niet aangesproken worden: "+error);
                        }

                        // TODO: Animeer de betreffende marker

                        window.location = locaties[i][1];
                        this.debugMessage("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
                    }
                }
            }
        },


        // Bereken het verchil in meters tussen twee punten
        calculateDistance: function(p1, p2){
            var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);

            var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);

            return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
        },


        listener: {},

        // Event functies - bron:
        addListener: function(a,c){
            "undefined"==typeof this.listener[a] && (this.listener[a]=[]);
            this.listener[a].push(c)
        },

        fire: function(a){ "string"==typeof a&&(a={type:a});a.target||(a.target=this);
            if(!a.type)throw Error("Event object missing 'type' property.");
            if(this.listener[a.type]instanceof Array)
            for(var c=this.listener[a.type],b=0,d=c.length;b<d;b++)c[b].call(this,a)
        },

        removeListener: function(a,c){
            if(this.listener[a]instanceof Array)for(var b= this.listener[a],d=0,e=b.length;d<e;d++)if(b[d]===c){b.splice(d,1);break}
        },


        // FUNCTIONS FOR DEBUGGING
        geoErrorHandler: function(code, message) {
            debugMessage(`geo.js error ${code}:${message}`);
        },
        debugMessage: function(message){
            (mapOptions.customDebugging && mapOptions.debugId ) ? document.getElementById(mapOptions.debugId).innerHTML : console.log(message);
        },
        setCustomThis: function( debugId ){
            mapOptions.debugId = debugId;
            mapOptions.customDebugging = true;
        }

    }


    var googleMaps = {
        generateMap: function(myOptions, canvasId){
            // TODO: Kan ik hier asynchroon nog de google maps api aanroepen? dit scheelt calls
            ET.debugMessage("Genereer een Google Maps kaart en toon deze in #"+canvasId)

            mapOptions.map = new google.maps.Map(document.getElementById(canvasId), myOptions);

            var routeList = [];
            // Voeg de markers toe aan de map afhankelijk van het tourtype
            ET.debugMessage("Locaties intekenen, tourtype is: "+tourType);

            for (var i = 0; i < locaties.length; i++) {

                // Met kudos aan Tomas Harkema, probeer local storage, als het bestaat, voeg de locaties toe
                try {
                    (localStorage.visited==undefined||isNumber(localStorage.visited))?localStorage[locaties[i][0]]=false:null;
                } catch (error) {
                    this.debugMessage("Localstorage kan niet aangesproken worden: "+error);
                }

                var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
                routeList.push(markerLatLng);

                marker[i] = {};
                for (var attr in locatieMarker) {
                    marker[i][attr] = locatieMarker[attr];
                }
                marker[i].scale = locaties[i][2]/3;

                var marker = new google.maps.Marker({
                    position: markerLatLng,
                    map: map,
                    icon: marker[i],
                    title: locaties[i][0]
                });
            }
            // TODO: Kleur aanpassen op het huidige punt van de tour
            if(tourType == mapOptions.type){
                // Trek lijnen tussen de punten
                this.debugMessage("Route intekenen");
                var route = new google.maps.Polyline({
                    clickable: false,
                    map: map,
                    path: routeList,
                    strokeColor: 'Black',
                    strokeOpacity: .6,
                    strokeWeight: 3
                });

            }

            // Voeg de locatie van de persoon door
            mapOptions.currentPositionMarker = new google.maps.Marker({
                position: kaartOpties.center,
                map: map,
                icon: positieMarker,
                title: 'U bevindt zich hier'
            });

            // Zorg dat de kaart geupdated wordt als het POSITION_UPDATED event afgevuurd wordt
            ET.addListener(mapOptions.positionUpdated, this.update_positie);
        },

        isNumber: function(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        },

        // Update de positie van de gebruiker op de kaart
        update_positie: function(event){
            // use currentPosition to center the map
            var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
            map.setCenter(newPos);
            currentPositionMarker.setPosition(newPos);
        },

    }

console.log("ET.init");
console.log(ET.init);
console.log("ET.startInterval");
console.log(ET.startInterval);

}())
