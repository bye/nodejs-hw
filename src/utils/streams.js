#!/usr/bin/env node

const fs = require('fs');
const minimist = require('minimist');
const strToStream = require('string-to-stream');
const through2 = require('through2');
const csvjson = require('csvjson');
const path = require('path');
const find = require('find');

(function () {
    const args = minimist(process.argv.slice(2), {
        alias: {
            h: 'help',
            a: 'action',
            f: 'file',
            p: 'path'
        },
        '--': true,
    });

    const processArgv = process.argv.slice(2);
    const optionsInfo = {
        action: [
            '"reverse": [str] reverse string',
            '"transform": [str] transform string to uppercase',
            '"outputFile": [filePath] output file content to console, filePath provided by option --file',
            '"convertFromFile": [filePath] convert file content from csv to json and output to console, filePath provided by option --file',
            '"convertToFile": [filePath] convert file content from csv to json and output to .json file, filePath provided by option --file',
        ],
        file: ['path to file'],
    }
    const openHelp = () => {
        for (const key in optionsInfo) {
            console.log(`--${key} ${optionsInfo[key].join('\n \u0009')}`)
        }
    }
    const options = {
        delimiter: ',',
        quote: '"'
    };

    const reverse = (str) => str.split('').reverse().join('');
    const transform = (str) => str.toUpperCase() + '\n';
    const outputFile = (filePath) => {
        const reader = fs.createReadStream(filePath);
        reader.on('readable', () => {
            let chunk = reader.read();
            if (chunk) {
                console.log(chunk.toString());
            }
        });
        reader.on('end', () => {
            console.log('Finished')
        });
        reader.on('error', (error) => {
            console.log(error)
        });
    };

    const convertFromFile = (filePath) => {
        const reader = fs.createReadStream(filePath);
        reader.on('readable', () => {
            let chunk = reader.read();
            if (chunk) {
                let options = {
                    delimiter: ',',
                    quote: '"'
                };
                console.log(csvjson.toObject(chunk.toString(), options));
            }
        });
        reader.on('end', () => {
            console.log('Finished')
        });
        reader.on('error', (error) => {
            console.log(error)
        });
    };

    const convertToFile = (filePath) => {
        const reader = fs.createReadStream(filePath);
        reader.on('readable', () => {
            let chunk = reader.read();
            if (chunk) {
                const wstream = fs.createWriteStream('output.json');
                const jsonFromChunk = csvjson.toObject(chunk.toString(), options)
                wstream.write(JSON.stringify(jsonFromChunk));
            }
        });
        reader.on('end', () => {
            console.log('Finished')
        });
        reader.on('error', (error) => {
            console.log(error)
        });
    };

    const cssBundler = (pathToDir) => {
        find.file(/\.css$/, pathToDir, function (files) {
                const wstream = fs.createWriteStream('bundle.css');
                files.forEach(path => {
                    const reader = fs.createReadStream(path);
                    reader.on('readable', () => {
                        let chunk = reader.read();
                        if (chunk) {
                            wstream.write(chunk.toString() + '\n');
                        }
                    });
                    reader.on('error', (error) => {
                        console.log(error)
                    });
                })
            })
            .error((error) => {
                console.error(`Such directory doesn't exist`);
            });
    }





    /* Should process ​--help​​ key. If this option is passed as a first argument, print usage message and ignore other options. Ignore this option if other options were passed before. */
    if (processArgv[0] === '--help' || processArgv[0] === '-h') {
        openHelp();
        return;
    }

    /* If there is no action option or --help passed after something else*/
    if (!args.action || !args.action.length && !args.help) {
        console.error('Options are required! Use --help or -h option to find more information');
        return;
    }

    switch (args.action) {
        case 'reverse':
            const input = args._.join(' ');
            if (input) {
                const reversedInput = reverse(input);
                console.log(reversedInput);
            } else {
                console.error('You need to provide some string to reverse');
            };
            break;
        case 'transform':
            const str = args._.join(' ');
            if (str) {
                strToStream(str).pipe(through2(function (chunk) {
                    const upperCasedString = transform(chunk.toString());
                    this.push(upperCasedString);
                })).pipe(process.stdout);
            } else {
                console.error('You need to provide some string to transform');
            };
            break;
        case 'outputFile':
            if (!args.file || !args.file.length) {
                console.error('You need to provide filepath to outputFile');
            } else {
                const pathToFile = path.resolve(__dirname, args.file);
                outputFile(pathToFile);
            };
            break;
        case 'convertFromFile':
            if (!args.file || !args.file.length) {
                console.error('You need to provide file to convertFromFile');
                break;
            }
            if (!args.file.endsWith('.csv')) {
                console.error(`You need to provide file with '.csv' extension`);
            } else {
                const pathToFile = path.resolve(__dirname, args.file);
                convertFromFile(pathToFile);
            };
            break;
        case 'convertToFile':
            if (!args.file || !args.file.length) {
                console.error('You need to provide file to convertToFile');
                break;
            }
            if (!args.file.endsWith('.csv')) {
                console.error(`You need to provide file with '.csv' extension`);
            } else {
                const pathToFile = path.resolve(__dirname, args.file);
                convertToFile(pathToFile);
            }
            break;
        case 'cssBundler':
            if (!args.path || !args.path.length) {
                console.error('You need to provide filepath to convertToFile');
                break;
            } else {
                const pathToDir = path.join(__dirname, args.path);
                console.log(pathToDir);
                cssBundler(pathToDir);
            }
            break;
        default:
            console.log(`${args.action} doesn't exist, use --help to get more information`);
    }
})();