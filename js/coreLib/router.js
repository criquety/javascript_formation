import { routes } from "../config/routeConfig.js"

export class RouterDOM{

    static get viewWrapper() {
        return document.querySelector("#main-wrapper");
    }

    #currentUrl;
    #currentRoute; 
    #currentParams;

    // Note: not the setter of currentPath, just a way to call it like item.innerHTML = XXX, different from function call
    set currentRoute( url){

        window.history.pushState( null, null, url);
        this.manageRoute();
    }

    constructor(){
        this.#currentUrl = window.location.pathname;
    }

    /***
     * According to current URL, find if a corresponding route is defined, and load corresponding view
     */
    manageRoute=()=>{

        this.#currentUrl = window.location.pathname;
        this.#currentParams = {};
        
        this.#currentRoute = routes.find(elmt=>{

            const m = elmt.pathRegex.exec( this.#currentUrl);

            if( m !== null){
                this.#currentParams = undefined !== m.groups ? m.groups : {};
                return true;
            }
            else {
                return false;
            }
        })

        if( this.#currentRoute === undefined) {

            console.error("No route found");
            this.currentRoute = '/404';
            return false;
        }
        else {
            console.log("Route found" + this.#currentRoute.pathName);

            if (undefined !== this.#currentRoute.templateText) {
                this.#wrapTemplate();
            }
            else{
                this.#loadTemplate();
            }
        }
    }

    /***
     * Load html view attached to this.#currentRoute
     */
    #loadTemplate=()=>{

        fetch( this.#currentRoute.viewUrl)
            .then( f=>f.text())
            .then( text=>{

                // store template html content into the route const
                this.#currentRoute.templateText = text;
                this.#wrapTemplate();
            })
    }

    /**
     * Assign html template content from this.#currentRoute to main-wrapper (in index.html)
     */
    #wrapTemplate=()=>{

        RouterDOM.viewWrapper.innerHTML = this.#currentRoute.templateText;

        if( undefined !== this.#currentRoute.controller) {
            this.#currentRoute.controller.wrapper = RouterDOM.viewWrapper;
            this.#currentRoute.controller.params = this.#currentParams; // not defined for thumbnail controller, provide the possiblity for controller having params defined
            this.refresh();
        }
    }

    refresh=()=>{

        if( undefined !== this.#currentRoute.controller) {
            this.#currentRoute.controller.refresh();
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