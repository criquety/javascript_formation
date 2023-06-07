// NOTE:
// ES5
/*function deleteModal(){

    //var modal = document.querySelector('#modal').remove();


    console.log(arguments); // Note: log all arguments even if you provide more arguments than the one requested.
}
deleteModal();*/
// ES6
// NOTE: difference between var & let: var is a global variable accessible in memory via document, let restreint accessiblity to the file
// var modal or let modal
/*const deleteModal=()=>{

    modal.remove();

}*/

// kind of class --- ES5
// call by doing titi = new Modal()
// titi.showModal('<h1>gna gna</h1>','tatatatatatatatatat');
/*function Modal() {

    //def variable & functions
    var mdl = undefined;
    // everything private by default (var & functions)


    function initContext(){
        document.addEventListener( 'DOMContentLoaded', (evt)=>{
          
            modalNode = document.querySelector('#modal');
            deleteModal();
        });
    }

    // expose function
    this.show = showModal;

    initContext();
}*/

//// ES6 --------------------
//let modalNode = undefined;


/**
 * Delete modal pop up from Document
 */
/*const deleteModal=()=>{

    if( modalNode !== undefined){
        modalNode.remove();

        console.log( 'modalNode removed');
    } else {
        console.error('No modal pop up defined');
    }
}


/**
 * Show a modal pop up on a page, if pop up not already defined in the page
 * @param {string} title title of pop up
 * @param {string} content content of pop up
 */
/*const showModal=( title, content)=>{

    // check that modal node is not already in the page
    if( null === document.querySelector('#modal'))
    {
        if( modalNode !== undefined){
            
            // update pop up content
            if( undefined !== title) {
                modalNode.querySelector('#modal-title').innerHTML = title;
            }

            if( undefined !== content) {
                modalNode.querySelector('#modal-content').innerHTML = content;
            }

            // display pop up
            document.body.appendChild( modalNode);
            console.log( 'show modal');
        }
    }
    else{
        console.error('modal pop up already displayed');
    }
}


document.addEventListener( 'DOMContentLoaded', (evt)=>{
    
    //console.log(evt);
    
    modalNode = document.querySelector('#modal');
    
    console.log(modalNode);

    // remove modal node from DOM
    deleteModal();

    //show modal
    showModal( '<h2>HEY</h2>', 'bla bla bla bla bla');
});*/

// ----- ------- ES6 Class 
/// temp query selector to retrieve doc content
       /* document.addEventListener( 'DOMContentLoaded', (evt)=>{
          
            //this.modalNode = document.querySelector('#' + this.refId); // ES5
            this.#modalNode = document.querySelector(`#${this.#refId}`); //ES6
     
            this.#deleteModal();
        });*/

// ";" not mandatory on ES6, return considered as ";", need to be careful not to split line or add ``
// Note: au moment d'un set du innerHTML, cela reconstruit le DOM du noeud. Attention les events sont liés au DOM, donc si les events ont été créé avant, on perd tout.
// l'utilisation du appendChild n'enclenche pas la reconstruction du DOM. 



class Modal{

    // public by default, to reference as private, add a #
    #refId
    #modalNode

    #modalTemplateString='\
        <div>\
            <div id="modal-title"><h3>title</h3></div>\
            <div id="modal-content">content</div>\
            <div id="modal-button"></div>\
        </div>'

    constructor( idModal="modal"){
        console.log( '----- class Modal Constructor call -----');

        this.#refId=idModal;

        this.#modalNode = document.createElement('div')
        this.#modalNode.id = this.#refId
        this.#modalNode.innerHTML = this.#modalTemplateString

        /*const dom = new DOMParser();
        dom.parseFromString(this.#modalTemplateString, 'text/html');*/
    }

    /**
     * Delete modal pop up from Document
     */
    #deleteModal=()=>{

        if( this.#modalNode !== undefined){
            this.#modalNode.remove();

            console.log( 'modalNode removed');
        } else {
            console.error('No modal pop up defined');
        }
    }

    /**
     * Show a modal pop up on a page, if pop up not already defined in the page
     * @param {string} title title of pop up
     * @param {string} content content of pop up
     */
    showModal=( title, content)=>{

        // check that modal node is not already in the page
        if( null === document.querySelector(`#${this.refId}`)){
            if( this.#modalNode !== undefined){
                
                // update pop up content
                if( undefined !== title) {
                    this.#modalNode.querySelector(`#${this.#refId}-title`).innerHTML = title;
                }

                if( undefined !== content) {
                    this.#modalNode.querySelector(`#${this.#refId}-content`).innerHTML = content;
                }

                // display pop up
                document.body.appendChild( this.#modalNode);
                console.log( 'show modal');
            }
        }
        else{
            console.error('modal pop up already displayed');
        }
    }

    // not a function, called modal.modalID and not modal.modalID()
    get modalID(){
        return this.#refId;
    }

    // not a function, called modal.modalID = 'titi' and not modal.modalID('titi')
    set modalID(value){
        if( value.length>0){
            this.#refId = value;
            this.#modalNode.id = this.#refId;
        }
    }
}



const modal = new Modal('modal');


document.addEventListener( 'DOMContentLoaded', (evt)=>{
   
    modal.showModal( '<h2>HEY</h2>', 'bla bla bla bla bla');
});




