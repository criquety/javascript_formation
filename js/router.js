
const routes={
    thumbnail: '/thumbnail',
    home: '/'
}


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


    }
}