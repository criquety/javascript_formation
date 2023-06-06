// NOTE:
// JS5
/*function deleteModal(){

    //var modal = document.querySelector('#modal').remove();


    console.log(arguments); // Note: log all arguments even if you provide more arguments than the one requested.
}
deleteModal();*/
// JS6
// NOTE: difference between var & let: var is a global variable accessible in memory via document, let restreint accessiblity to the file
// var modal or let modal
/*const deleteModal=()=>{

    modal.remove();

}*/

//// --------------------
let modalNode = undefined;


/**
 * Delete modal pop up from Document
 */
const deleteModal=()=>{

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
const showModal=( title, content)=>{

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
});









