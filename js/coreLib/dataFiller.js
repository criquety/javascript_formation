//import { memesList } from "./coreLib/dataInst.js";

// NOTE
// regex anything between {{}} without other checks
// (?<js>(?<=\{\{).*?(?=\}\}))

// regex that validate a bit the js content
// {{(?<js>([<>\w\d'"!?:\[\];,=().*\/+-])*|^({{2,})|^(}{2,}))}}


export class DataFiller{

    //static filterHTMLRegex = /(?<js>(?<=\{\{).*?(?=\}\}))/gm
    static filterHTMLRegex = /{{(?<js>([<>\w\d'"!?:\[\];,=().*\/+-])*|^({{2,})|^(}{2,}))}}/gm

    static fillView=( data, templateText)=>{

        let m;

        while( m = DataFiller.filterHTMLRegex.exec( templateText)) {

            const toExec = m.groups.js;
            const execResult = eval( toExec); // execute the js code extracted from the template

            if( typeof execResult !== 'object' && typeof execResult !== 'function'){
                templateText = templateText.replace( m[0], execResult);
            }
            else if( Array.isArray( execResult)) {

                templateText = templateText.replace( m[0], execResult.join(''));
            }
        }

        return templateText;         
    }
}