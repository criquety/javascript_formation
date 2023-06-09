import { routes }  from "../config/routeConfig.js";
import { imagesList, memesList } from "../coreLib/dataInst.js";

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
    }

    refresh=()=> {
       
       
    };
}