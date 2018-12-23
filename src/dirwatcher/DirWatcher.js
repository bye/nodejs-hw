const Emitter = require("events");
export const emitter = new Emitter();
const fs = require('fs');
const chokidar = require('chokidar');


export class DirWatcher {

	watch(path, delay) {
		const watcher = chokidar.watch(path, { atomic: true, 
		'atomicity delay': delay});
		watcher.on('all', function(event, path) {
			emitter.emit('dirwatcher:changed');
		});
	}
}