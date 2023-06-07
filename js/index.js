import { MessageBox, ConfirmBox } from "./modal.js";
import { Memes } from "./meme.js";

const memesList = new Memes();
const modalConfirm = new ConfirmBox( ()=> {console.log( "CallBack OK");}, ()=> {console.log( "CallBack Cancel");});

document.addEventListener( 'DOMContentLoaded', (evt)=>{
    
    modalConfirm.showConfirmBox( '<h2>HEY</h2>', 'bla bla bla bla bla', ()=> { console.log( "CallBack OK 2");}, ()=> {console.log( "CallBack Cancel 2"); });

    memesList.load();
});
