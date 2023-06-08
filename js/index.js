import { MessageBox, ConfirmBox } from "./webComponents/modal.js";
import { Memes } from "./coreLib/meme.js";
import { Images } from "./coreLib/image.js"

const memesList = new Memes();
const imagesList = new Images();
//const modalConfirm = new ConfirmBox( ()=> {console.log( "CallBack OK");}, ()=> {console.log( "CallBack Cancel");});

document.addEventListener( 'DOMContentLoaded', (evt)=>{
    
    //modalConfirm.showConfirmBox( '<h2>HEY</h2>', 'bla bla bla bla bla', ()=> { console.log( "CallBack OK 2");}, ()=> {console.log( "CallBack Cancel 2"); });

    /*memesList.load();
    imagesList.load();*/
});
