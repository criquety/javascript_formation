
const routes= [
    {
        pathName: '/meme',
        viewUrl: '/views/editor.html',
        pathRegex: /^\/meme(\/(?<id>\d{0,})?)?\/?$/ //extract number in patch into id group. example: /meme/125/ => id = 125
    },
    {
        pathName: '/thumbnail',
        viewUrl: '/views/thumbnail.html',
        pathRegex: /^\/thumbnail\/?$/
    },
    {
        pathName: '/',
        viewUrl: '/views/home.html',
        pathRegex: /^\/(home)?\/?$/
    }
]


export class RouterDOM{

    #currentUrl
    #currentRoute
    currentParams;

    // Note: not the setter of currentPath, just a way to call it like item.innerHTML = XXX, different from function call
    set currentRoute( url){

        window.history.pushState( null, null, url);
    }

    constructor(){
        this.#currentUrl = window.location.pathname;
    }

    manageRoute=()=>{

        this.#currentUrl = window.location.pathname;

        this.#currentRoute = routes.find(elmt=>{

            const m =  elmt.pathRegex.exec( this.#currentUrl);

            if( m !== null){
                this.currentParams = m.groups;
                return true;
            }
            else {
                return false;
            }
        })

        // LOGS
        if( this.#currentRoute === undefined) {

            console.error("No route found");
        }
        else {
            console.log("Route found" + this.#currentRoute.pathName);
        }

    }
}



// NOTE
// OLD CODE
        //let routeID = 0;
        //let routeFound = false;      
        //let path;

        /*do{
            path = routes[routeID].pathRegex.exec( this.#currentUrl);

            if( path !== null) {
                console.log(" route found" + path);

            }
            else {
                console.error(" wrong route");
            }
            
            routeID++;

        }while(!routeFound && routeID < routes.length)*/