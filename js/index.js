import { MessageBox, ConfirmBox } from "./webComponents/modal.js";
import { Memes } from "./coreLib/meme.js";
import { Images } from "./coreLib/image.js"

//const modalConfirm = new ConfirmBox( ()=> {console.log( "CallBack OK");}, ()=> {console.log( "CallBack Cancel");});
//modalConfirm.showConfirmBox( '<h2>HEY</h2>', 'bla bla bla bla bla', ()=> { console.log( "CallBack OK 2");}, ()=> {console.log( "CallBack Cancel 2"); });

class MemesDOM {

    
    memesList = new Memes();
    imagesList = new Images();

    constructor(){

        document.addEventListener( 'DOMContentLoaded', (evt)=>{
    
            Promise.all( [this.imagesList.load(), this.memesList.load()] )
                .then( prValues=>{



                    return prValues;
                })
        });
    }
}

const memesDOM = new MemesDOM();







