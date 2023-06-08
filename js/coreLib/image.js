import {REST_ADDR} from "../config/config.js"

// NOTE:
/*
in array.foreach: not possible to return something
array.map => quicker, may return a list of all elements returned
*/

/*class Image {

    static resourceName = '/images'

    title = ""; //string
    url = ""; // string
    w = 200; //number
    h = 200; //number

    #fullResourceName = ""

    constructor(){}


    get fullResourceName(){

        return `${undefined !== this.id ? Meme.resourceName + '/' + this.id : Meme.resourceName}`
    }
}*/


export class Images extends Array {

    static resourcesName = '/images'

    constructor(){
        super();
    }

    /**
     * Add Image(s) to list
     * @param { image object or Array<image object>} values : a Image or an Array of Image, to be added to Images list
     */
    push=( values)=>{
        
        if( Array.isArray( values)){
            values.forEach( value=>super.push(value));
        }
        else {
            super.push( values);
        }
    }

    load=()=>{

        return fetch( `${REST_ADDR}${Images.resourcesName}`)
            .then(data=>data.json()) // we change from json to array, so not json anymore. otherwise should have used json.parse
            .then(arr=>{

                arr.forEach(item=>{  
                    //console.log(item);
                    this.push( Object.seal(item));
                });
                return arr;
            });    
    }
}