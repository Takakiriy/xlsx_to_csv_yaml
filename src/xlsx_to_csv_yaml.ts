import * as xlsx from 'xlsx';
import * as path from 'path';
import * as fs from "fs";  // file system
import * as lib from "./lib";
import indentString from 'indent-string';

const inputDefault: string[] = [
//	String.raw `../test/test_data.xlsx`,
];

async function  main() {
	const  xlsxPath = await lib.inputPath(`input .xlsx file path> `);
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
}

async function  callMain() {

    await  main()
        .catch( (e: any)=>{
			console.log( `ERROR: ${e.message}` );
			const  timeOver = new Date();
			timeOver.setSeconds( timeOver.getSeconds() + 1 );

			while ((new Date()).getTime() < timeOver.getTime()) {
			}
        })
        .finally(()=>{
            lib.getInputObject().close();
        });
}
callMain();
