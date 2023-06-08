import { memesList, imagesList } from "./coreLib/dataInst.js";
import { DataFiller } from "./coreLib/dataFiller.js"

const routes= [
    {
        name: 'editor',
        pathName: '/meme',
        viewUrl: '/views/editor.html',
        pathRegex: /^\/meme(\/(?<id>\d{0,})?)?\/?$/ //extract number in patch into id group. example: /meme/125/ => id = 125
    },
    {
        name: 'thumb',
        pathName: '/thumbnail',
        viewUrl: '/views/thumbnail.html',
        pathRegex: /^\/thumbnail\/?$/,
        data:
        { 
            memes: memesList,
            images: imagesList
        }
    },
    {
        name: 'home',
        pathName: '/',
        viewUrl: '/views/home.html',
        pathRegex: /^\/?(home)?\/?$/
    },
    {
        name: '404',
        pathRegex: /404/,
        templateText: '<h1>No Content Available Here.</h1><hr/><h3>Error 404 - NOT FOUND</h3>'
    }
]


export class RouterDOM{

    #currentUrl;
    #currentRoute; 
    currentParams;

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

        this.#currentRoute = routes.find(elmt=>{

            const m = elmt.pathRegex.exec( this.#currentUrl);

            if( m !== null){
                this.currentParams = m.groups;
                return true;
            }
            else {
                return false;
            }
        })

        if( this.#currentRoute === undefined) {

            console.error("No route found");
            this.currentRoute = '/404'
        }
        else {
            console.log("Route found" + this.#currentRoute.pathName);

            if (undefined !== this.#currentRoute.templateText) {
                this.#wrapTemplate( this.#currentRoute);
            }
            else{
                this.#loadTemplate( this.#currentRoute);
            }
        }
    }

    /***
     * Load html view attached to a route
     */
    #loadTemplate=( route)=>{

        fetch( route.viewUrl)
            .then( f=>f.text())
            .then( text=>{

                // store template html content into the route const
                route.templateText = text;
                this.#wrapTemplate( route);
            })
    }

    /**
     * Assign html template content to main-wrapper (in index.html)
     * @param { string} text: template html content 
     */
    #wrapTemplate=( route)=>{

        const wrapper = document.querySelector('#main-wrapper');

        const resultsFilled = DataFiller.fillView( route.data, route.templateText+'');
        wrapper.innerHTML = resultsFilled;

        //wrapper.innerHTML = route.templateText;
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