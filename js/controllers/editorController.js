import { routes }  from "../config/routeConfig.js";
import { imagesList, memesList } from "../coreLib/dataInst.js";
import { Meme } from "../coreLib/meme.js"
import router from "../coreLib/router.js"

export class EditorController {
 
    wrapper;
    #params;

    memes;
    images;

    #currentMeme;
    #currentImage;

    constructor(memes = memesList, images = imagesList) {
        this.memes = memes;
        this.images = images;
    }

    set params( paramList) {

        this.#params = paramList;

        // retrieve existing meme from the list
        if( undefined !== this.#params.id){

            this.#currentMeme = this.memes.find( i=>i.id === Number( this.#params.id));

            if( this.#currentMeme === undefined) {

                console.error("Meme not found");
                router.currentRoute = '/404';
            }
            else {
                // retrieve current image
                this.#currentImage = this.images.find( i=>i.id === this.#currentMeme.imageId);

                if( this.#currentImage === undefined) {

                    console.error("Image not found");
                }
            }
        }
        else {

            //create a new meme
            this.#currentMeme = new Meme();
        }

    }

    refresh=()=> {
       
        console.log( " Refresh Editor ");
        console.log(this.#currentMeme);
        console.log(this.#currentImage);

        if( undefined !== this.wrapper) {

            const form = this.wrapper.querySelector('form');

            // fill form with current meme data
            if ( undefined !== form) {
                
                form['title'].value = this.#currentMeme.title; 

                form['text'].value = this.#currentMeme.text;
                form['x'].value = this.#currentMeme.x; 
                form['y'].value = this.#currentMeme.y; 

                form['fontSize'].value = this.#currentMeme.fontSize;
                form['fontWeight'].value = this.#currentMeme.fontWeight;

                form['frameSizeX'].value = this.#currentMeme.frameSizeX;
                form['frameSizeY'].value = this.#currentMeme.frameSizeY;

                form['underline'].checked = this.#currentMeme.underline; 
                form['italic'].checked = this.#currentMeme.italic; 

                form['color'].value = this.#currentMeme.color;

                // fill image list
                const imageSelector = form['image'];
                const nullOption = imageSelector.querySelector('option[value="-1"]');
                imageSelector.innerHTML = '';

                form['image'].appendChild( nullOption);

                this.images.map( m=>{
                    const option = document.createElement("option");
                    option.text = m.title;
                    option.value = m.id;
                    form['image'].appendChild( option);
                });
 
                // select correct image
                form['image'].value = this.#currentMeme.imageId;
            }

        }
        else {

            console.error( "No Wrapper Available");
        }
    };
}