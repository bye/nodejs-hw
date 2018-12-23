const fs = require('fs');
const csvjson = require('csvjson');

export class Importer {
	importSync(path) {
		fs.readdirSync(path).forEach(file => {
			let data = fs.readFileSync(path + '/' + file, {
				encoding: 'utf8'
			});
			let options = {
				delimiter: ',',
				quote: '"'
			};
			console.log(csvjson.toObject(data, options));	
		});
	}

	import(path) {
		console.log('catched 2')
		fs.readdir(path, (err, items) => {
			if (err) return err;
			items.forEach((file) => {
				let options = {
					delimiter: ',',
					quote: '"'
				};
				fs.readFile(path + '/' + file, 'utf8', (err, data) => {
					if (err) {
						console.log('Error', err);
					} else {
						console.log(csvjson.toObject(data, options));
					}
				});
			});
		});
	}
}