import { memesList } from "./coreLib/dataInst.js";


class ThumbnailCtrl{

    memesList = memesList
    domNode

    constructor( domNode){

        this.domNode = domNode;
    }

    fillView=()=>{

        content = this.domNode.innerHTML;

            
    }
}