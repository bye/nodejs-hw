
import { DirWatcher, emitter }from './dirwatcher/DirWatcher'
import { Importer } from './importer/Importer'

const path = require('path');

let dirwatcher = new DirWatcher();
let importer = new Importer(); 
const pathToData = path.resolve(__dirname, 'data')
dirwatcher.watch( pathToData, 300);

emitter.on('dirwatcher:changed', () => {
	importer.import(pathToData);		
});

emitter.on('dirwatcher:changed', () => {
	importer.importSync(pathToData);		
});



