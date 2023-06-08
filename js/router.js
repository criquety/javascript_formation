
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

    // Note: not the setter of currentPath, just a way to call it like item.innerHTML = XXX, different from function call
    set currentRoute( url){

        window.history.pushState( null, null, url);
    }

    constructor(){
        this.#currentUrl = window.location.pathname;
    }

    manageRoute=()=>{

        let routeID = 0;
        let routeFound = false;

        do{

        }while(!routeFound && routeID < routes.length)

    }
}