class Meme {

    title = ""; //string
    text = ""; // string
    x = 0; //number
    y = 20; //number
    fontWeight = "500"; //string
    fontSize = 20; //number
    underline = false; //bolean
    italic = false; //boolean
    imageID = -1; //number
    color = "#000000"; //string
    frameSizeX = 0; //number
    frameSizeY = 0; //number

    constructor(){}

    save=()=>{}

    deserialize=( jsonData)=>{}
}


class Memes extends Array {

    static resourcesName = '/memes'
    constructor(){
        super();
    }

    /**
     * Add Meme(s) to list
     * @param { Meme or Array<Meme>} values : a Meme or an Array of Meme, to be added to Memes list
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

        return fetch( `${REST_ADDR}${Memes.resourcesName}`)
            .then(data=>data.json()) // we change from json to array, so not json anymore. otherwise should have used json.parse
            .then(arr=>{

                arr.forEach(item=>{  
                    console.log(item);

                    // assignation of item data in Meme object created
                    const meme = new Meme();
                    Object.assign( meme, item);
                    this.push( Object.freeze(meme));
                });
                return arr;
            });    
    }
}



const memesList = new Memes();
memesList.load(); // TEMP