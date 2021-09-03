import * as readline from 'readline';
import * as xlsx from 'xlsx';
import * as path from 'path';
import * as fs from "fs";  // file system
import indentString from 'indent-string';

const inputDefault: string[] = [
//	String.raw `../test/test_data.xlsx`,
];

async function  main() {
	const  xlsxPath = await inputPath(`input .xlsx file path> `);
	const  parentPath = path.dirname(xlsxPath);
	const  outputFilePath = parentPath +'/'+ path.basename(xlsxPath, '.xlsx') +'.csv.yaml';
	const  writer = fs.createWriteStream(outputFilePath);

	const  book = xlsx.readFile(xlsxPath);
	for (const sheetName of book.SheetNames) {
		let  stringOfCSV = xlsx.utils.sheet_to_csv(book.Sheets[sheetName]).replace(/\n/g,'\r\n');
		stringOfCSV = indentString( stringOfCSV, 4, {indent: ' '} );

		writer.write(`${sheetName}: |\r\n`);
		writer.write(`${stringOfCSV}\r\n`);
	}
	writer.end();
	await new Promise( (resolve) => {
		writer.on('finish', () => {resolve(0);});
	});
}

// StandardInputBuffer
class  StandardInputBuffer {
	readlines: readline.Interface;
	inputBuffer: string[] = [];
	inputResolver?: (answer:string)=>void = undefined;

	constructor() {
		this.readlines = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		this.readlines.on('line', async (line: string) => {
			if (this.inputResolver) {
				this.inputResolver(line);
				this.inputResolver = undefined;
			} else {
				this.inputBuffer.push(line);
			}
		});

		this.readlines.setPrompt('');
		this.readlines.prompt();
	}

	async  input(guide: string): Promise<string> {
		return  new Promise(
			(resolve: (answer:string)=>void,  reject: (answer:string)=>void ) =>
		{
			const  nextLine = this.inputBuffer.shift();
			if (nextLine) {
				console.log(guide + nextLine);
				resolve(nextLine);
			} else {
				process.stdout.write(guide);
				this.inputResolver = resolve;
			}
		});
	}

	close() {
		this.readlines.close();
	}
}

// InputOption
class InputOption {
	inputLines: string[];
	nextLineIndex: number;

	constructor(inputLines: string[]) {
		this.inputLines = inputLines;
		this.nextLineIndex = 0;
	}
}

// inputOption
const inputOption = new InputOption(inputDefault);

// input
// Example: const name = await input('What is your name? ');
async function  input( guide: string ): Promise<string> {
	// Input emulation
	if (inputOption.inputLines) {
		if (inputOption.nextLineIndex < inputOption.inputLines.length) {
			const  value = inputOption.inputLines[inputOption.nextLineIndex];
			inputOption.nextLineIndex += 1;
			console.log(guide + value);
			return  value;
		}
	}

	// input
	return  InputObject.input(guide);
}
const  InputObject = new StandardInputBuffer();

// inputPath
// Example: const name = await input('What is your name? ');
async function  inputPath( guide: string ) {
	const  key = await input(guide);
	return  pathResolve(key);
}

// pathResolve
function  pathResolve(path_: string) {

	// '/c/home' format to current OS format
	if (path_.length >= 3) {
		if (path_[0] === '/'  &&  path_[2] === '/') {
			path_ = path_[1] +':'+ path_.substr(2);
		}
	}

	// Change separators to OS format
	path_ = path.resolve(path_);

	return path_
}

async function  callMain() {

	await  main()
		.catch( async (e)=>{
			if ( false /*programOptions.test*/) {
				throw e;
			} else {

				console.log( `ERROR: ${e.message}` );
				const  timeOver = new Date();
				timeOver.setSeconds( timeOver.getSeconds() + 5 );

				while ((new Date()).getTime() < timeOver.getTime()) {
				}
			}
		})
		.finally(()=>{
			InputObject.close();
		});
}
callMain();
