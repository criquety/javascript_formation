import { routes }  from "../config/routeConfig.js";
import { imagesList, memesList } from "../coreLib/dataInst.js";
import { Meme } from "../coreLib/meme.js"
import router from "../coreLib/router.js"

// store svg image globally to be able to import it after delete
let svgImg = undefined;

export class EditorController {
 
    wrapper;
    #params;

    memes;
    images;

    #currentMeme = undefined;
    #currentImage = undefined;

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

                this.#currentImage = undefined;
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
            /*this.#currentMeme = new Meme();
            this.#currentImage = new Image();*/
        }

    }

    initView=()=>{

        if( undefined !== this.wrapper) {

            const form = this.wrapper.querySelector('form');

            // fill form with current meme data
            if ( undefined !== form) {

                form['image'].addEventListener( 'change', (evt)=>{
                        this.#currentMeme.imageId = Number(evt.target.value);
                        this.#currentImage = this.images.find( i=> i.id === this.#currentMeme.imageId);
                        this.refreshSVG();
                });

                form['title'].addEventListener( 'input', (evt)=>{
                    this.#currentMeme.title = evt.target.value;
                });

                form['text'].addEventListener( 'input', (evt)=>{
                    this.#currentMeme.text = evt.target.value;
                    this.refreshSVG();
                });

                form['x'].addEventListener( 'input', (evt)=>{
                    this.#currentMeme.x = Number(evt.target.value);
                    this.refreshSVG();
                });

                form['y'].addEventListener( 'input', (evt)=>{
                    this.#currentMeme.y = Number(evt.target.value);
                    this.refreshSVG();
                });

                form['fontSize'].addEventListener( 'input', (evt)=>{
                    this.#currentMeme.fontSize = Number(evt.target.value);
                    this.refreshSVG();
                });

                form['fontWeight'].addEventListener( 'input', (evt)=>{
                    this.#currentMeme.fontWeight = evt.target.value;
                    this.refreshSVG();
                });

                form['frameSizeX'].addEventListener( 'input', (evt)=>{
                    this.#currentMeme.frameSizeX = Number(evt.target.value);
                    this.refreshSVG();
                });

                form['frameSizeY'].addEventListener( 'input', (evt)=>{
                    this.#currentMeme.frameSizeY = Number(evt.target.value);
                    this.refreshSVG();
                });

                form['color'].addEventListener( 'input', (evt)=>{
                    this.#currentMeme.color = evt.target.value;
                    this.refreshSVG();
                });

                form['underline'].addEventListener( 'change', (evt)=>{
                    this.#currentMeme.underline = evt.target.checked;
                    this.refreshSVG();
                });

                form['italic'].addEventListener( 'change', (evt)=>{
                    this.#currentMeme.italic = evt.target.checked;
                    this.refreshSVG();
                });                

                this.refresh();
            }
        }
    }

    refreshSVG=()=>{

        const svgNode = this.wrapper.querySelector('svg');
        const svgText = svgNode.querySelector('text');

        if( undefined === svgImg) {
            svgImg = svgNode.querySelector('image');
        }

        // clean image
        svgImg.remove();

        if( this.#currentImage === undefined) {
            svgNode.setAttribute( 'viewBox', '0 0 1000 1000');
        }
        else 
        {       
            //refresh image content    
            svgNode.setAttribute( 'viewBox', `${-this.#currentMeme.frameSizeX} 
                                              ${-this.#currentMeme.frameSizeY} 
                                              ${this.#currentImage.w + 2*this.#currentMeme.frameSizeX} 
                                              ${this.#currentImage.h + 2*this.#currentMeme.frameSizeY}`);
           
            svgImg.setAttribute('xlink:href', this.#currentImage.url);
            svgNode.insertBefore( svgImg, svgText);

            //refresh text
            svgText.setAttribute( 'x', this.#currentMeme.x);
            svgText.setAttribute( 'y', this.#currentMeme.y);

            svgText.style.fontSize = this.#currentMeme.fontSize;
            svgText.style.fontWeight = this.#currentMeme.fontWeight;
            svgText.style.fill = this.#currentMeme.color;
            svgText.style.textDecoration = this.#currentMeme.underline ? 'underline' : 'none';
            svgText.style.fontStyle = this.#currentMeme.italic ? 'italic' : 'normal';
            
            svgText.textContent = this.#currentMeme.text;
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

            this.refreshSVG();

        }
        else {

            console.error( "No Wrapper Available");
        }
    };
}