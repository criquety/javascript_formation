import { EditorController } from "../controllers/editorController.js";
import { ThumbnailController } from "../controllers/thumbnailController.js";
import { memesList, imagesList } from "../coreLib/dataInst.js";

export const routes= [
    {
        name: 'editor',
        pathName: '/meme',
        viewUrl: '/views/editor.html',
        pathRegex: /^\/meme(\/(?<id>\d{0,})?)?\/?$/, //extract number in patch into id group. example: /meme/125/ => id = 125
        controller: new EditorController( memesList, imagesList)
    },
    {
        name: 'thumb',
        pathName: '/thumbnail',
        viewUrl: '/views/thumbnail.html',
        pathRegex: /^\/thumbnail\/?$/,
        controller: new ThumbnailController( memesList, imagesList)
    },
    {
        name: 'home',
        pathName: '/',
        viewUrl: '/views/home.html',
        pathRegex: /^\/?(home)?\/?$/
    },
    {
        name: '404',
        pathRegex: /404/,
        templateText: '<h1>No Content Available Here.</h1><hr/><h3>Error 404 - NOT FOUND</h3>'
    }
]
