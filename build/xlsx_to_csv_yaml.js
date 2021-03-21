"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const xlsx_1 = __importDefault(require("xlsx"));
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs")); // file system
const indent_string_1 = __importDefault(require("indent-string"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const xlsxPath = yield inputPath(`input .xlsx file path> `);
        const parentPath = path.dirname(xlsxPath);
        const outputFilePath = parentPath + '/' + path.basename(xlsxPath, '.xlsx') + '.csv.yaml';
        const writer = fs_1.default.createWriteStream(outputFilePath);
        const book = xlsx_1.default.readFile(xlsxPath);
        for (const sheetName of book.SheetNames) {
            let stringOfCSV = xlsx_1.default.utils.sheet_to_csv(book.Sheets[sheetName]).replace(/\n/g, '\r\n');
            stringOfCSV = indent_string_1.default(stringOfCSV, 4, { indent: ' ' });
            writer.write(`${sheetName}: |\r\n`);
            writer.write(`${stringOfCSV}\r\n`);
        }
        writer.end();
        yield new Promise((resolve) => {
            writer.on('finish', () => { resolve(0); });
        });
    });
}
// StandardInputBuffer
class StandardInputBuffer {
    constructor() {
        this.inputBuffer = [];
        this.inputResolver = undefined;
        this.readlines = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.readlines.on('line', (line) => __awaiter(this, void 0, void 0, function* () {
            if (this.inputResolver) {
                this.inputResolver(line);
                this.inputResolver = undefined;
            }
            else {
                this.inputBuffer.push(line);
            }
        }));
        this.readlines.setPrompt('');
        this.readlines.prompt();
    }
    input(guide) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const nextLine = this.inputBuffer.shift();
                if (nextLine) {
                    console.log(guide + nextLine);
                    resolve(nextLine);
                }
                else {
                    process.stdout.write(guide);
                    this.inputResolver = resolve;
                }
            });
        });
    }
    close() {
        this.readlines.close();
    }
}
// InputOption
class InputOption {
    constructor(inputLines) {
        this.inputLines = inputLines;
        this.nextLineIndex = 0;
    }
}
// inputOption
const inputOption = new InputOption([
//	String.raw `c:/Users/user1/Downloads/会計令和3年.xlsx`,
]);
// input
// Example: const name = await input('What is your name? ');
function input(guide) {
    return __awaiter(this, void 0, void 0, function* () {
        // Input emulation
        if (inputOption.inputLines) {
            if (inputOption.nextLineIndex < inputOption.inputLines.length) {
                const value = inputOption.inputLines[inputOption.nextLineIndex];
                inputOption.nextLineIndex += 1;
                console.log(guide + value);
                return value;
            }
        }
        // input
        return InputObject.input(guide);
    });
}
const InputObject = new StandardInputBuffer();
// inputPath
// Example: const name = await input('What is your name? ');
function inputPath(guide) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield input(guide);
        return pathResolve(key);
    });
}
// pathResolve
function pathResolve(path_) {
    // '/c/home' format to current OS format
    if (path_.length >= 3) {
        if (path_[0] === '/' && path_[2] === '/') {
            path_ = path_[1] + ':' + path_.substr(2);
        }
    }
    // Change separators to OS format
    path_ = path.resolve(path_);
    return path_;
}
function callMain() {
    return __awaiter(this, void 0, void 0, function* () {
        yield main()
            .catch((e) => __awaiter(this, void 0, void 0, function* () {
            if (false /*programOptions.test*/) {
                throw e;
            }
            else {
                console.log(`ERROR: ${e.message}`);
                const timeOver = new Date();
                timeOver.setSeconds(timeOver.getSeconds() + 5);
                while ((new Date()).getTime() < timeOver.getTime()) {
                }
            }
        }))
            .finally(() => {
            InputObject.close();
        });
    });
}
callMain();
//# sourceMappingURL=xlsx_to_csv_yaml.js.map