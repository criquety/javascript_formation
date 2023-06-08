
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
        pathRegex: /^\/thumbnail\/?$/
    },
    {
        name: 'home',
        pathName: '/',
        viewUrl: '/views/home.html',
        pathRegex: /^\/?(home)?\/?$/
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
     * 
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
        }
        else {
            console.log("Route found" + this.#currentRoute.pathName);

            const templateText = sessionStorage.getItem( this.#currentRoute.name);
            if (null !== templateText) {
                this.#wrapTemplate( templateText);
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

                sessionStorage.setItem( route.name, text);
                this.#wrapTemplate(text);
            })
    }

    /**
     * Assign html template content to main-wrapper (in index.html)
     * @param { string} text: template html content 
     */
    #wrapTemplate=( text)=>{

        const wrapper = document.querySelector('#main-wrapper');
        wrapper.innerHTML = text;
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