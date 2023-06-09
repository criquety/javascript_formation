import { routes }  from "../config/routeConfig.js";
import { imagesList, memesList } from "../coreLib/dataInst.js";
import router from "../coreLib/router.js"

export class ThumbnailController {
    
    images;
    memes;
    wrapper;

    constructor(memes = memesList, images = imagesList) {
        this.memes = memes;
        this.images = images;
    }


    refresh=()=> {
       
        if (undefined === this.wrapper) {
            console.log("%c%s", "color:red", "Wrapper not defined");
            return;
        }
    
        const wrapperList = this.wrapper.querySelector("#meme-list")
        const svgModel = wrapperList.querySelector('#meme-model')
    
        this.memes.map( m=>{

            const img = this.images.find( i=>i.id === m.imageId);

            // clone the template node to create a new html entry to store the meme
            const memeNode = svgModel.cloneNode(true);

            memeNode.id = 'meme-' + m.id;
            
            const aSection = memeNode.querySelector('a')
            
            aSection.href = '/memes/' + m.id;

            aSection.addEventListener('click', evt=>{
                evt.preventDefault();
                router.removeActiveNavbarLink();
                router.currentRoute = `/meme/${m.id}`
            })
           
            const svgSection = memeNode.querySelector('svg')

            if(undefined != img) {
                svgSection.setAttribute('viewBox','0 0 ' + img.w + ' ' + img.h);
                svgSection.querySelector('image').setAttribute('xlink:href', img.url);
            }
            else {
                svgSection.querySelector('image').remove();
            }
            
            const textSection = svgSection.querySelector('text')
            textSection.innerHTML = m.text;
            textSection.setAttribute('font-size', m.fontSize);
            textSection.setAttribute('font-weight', m.fontWeight);
            textSection.setAttribute('fill', m.color);
            wrapperList.appendChild(memeNode);
        })
    
        // remove the template section at the end
        svgModel.style.display = 'none';
    };
}