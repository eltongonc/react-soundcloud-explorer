## Feedback
- Using strict mode outside of your IFFE can cause problems with other libraries who are made to work without.
- Script in head with async or defer attribute.
- Use eventListeners
- Multiple articles in one section.
- No camelCase in class
- use of const
```js
    const APIKEY = "....."
    const app = {
        //.....
    }

```

# Week 2

## Ajax
You can do API calls with `XMLHttpRequest`
```js

    var req = new XMLHttpRequest();

    req.open("GET", "url", true)
    if (req.status >= 200 && req.status < 400){
        // succes
        // turns de response in a object
        var data = JSON.parse(req.responseText);
    }else {
        // errorHandler
    }

    // you can have errors before
    req.onError(function() {/*....*/})
```

## API
Application something interface. Ways to let your app connect and collect to other data.
Most common API is the REST API
There are API available on [Programable Web](programableweb.com)

## libraries
Use only libraries that do one thing. Micro-libraries

```js
    fetch(req).then(function(data){
        //response
    }).catch((err))
```

## Templating
- Transparancy

## Routing
vanilla Routing
dynamic routing


## Web worker


## Functional programming

Alonzo Church
Hashell Curry -


objecten;
bepaalde staat van je programma heet een state;

Functional;
Stappen naar je gebruiker.
geen objecten, geen loops, zo min mogelijk vars.
Wel functies en params. en geen state.
Debugging wordt makkelijker.

### unary Function
1 argument, 1 return waarde;
```js
    functies(text){
        return `<h1>${text}</h1>`
    }
```

Don't
inro - [Learn Functional prog](learnyouahasjekk.com)
