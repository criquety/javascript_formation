import { MessageBox, ConfirmBox } from "./webComponents/modal.js";
import { Memes } from "./coreLib/meme.js";
import { Images } from "./coreLib/image.js"
import { RouterDOM} from './router.js'
import { memesList, imagesList } from "./coreLib/dataInst.js";

//const modalConfirm = new ConfirmBox( ()=> {console.log( "CallBack OK");}, ()=> {console.log( "CallBack Cancel");});
//modalConfirm.showConfirmBox( '<h2>HEY</h2>', 'bla bla bla bla bla', ()=> { console.log( "CallBack OK 2");}, ()=> {console.log( "CallBack Cancel 2"); });

const router = new RouterDOM();


class MemesDOM {

    memesList = memesList;
    imagesList = imagesList;

    constructor(){

        document.addEventListener( 'DOMContentLoaded', (evt)=>{
    
            this.initNavBarLinks();

            // initialize main wrapper content according to current url
            Promise.all( [this.imagesList.load(), this.memesList.load()] )
                .then( prValues=>{
                    router.manageRoute();
                    return prValues;
                })
        });
    }  

    initNavBarLinks=()=>{

        document.querySelectorAll('.navbar-home').forEach( link=>{
            link.addEventListener('click', (evt)=>{

                evt.preventDefault();
                router.currentRoute= '/';
            })
        })

        document.querySelectorAll('.navbar-meme').forEach( link=>{
            link.addEventListener('click', (evt)=>{

                evt.preventDefault();
                router.currentRoute= '/meme';  
            })
        })

        document.querySelectorAll('.navbar-thumbnail').forEach( link=>{
            link.addEventListener('click', (evt)=>{

                evt.preventDefault();
                router.currentRoute= '/thumbnail';
            })
        })
    }
}

const memesDOM = new MemesDOM();







