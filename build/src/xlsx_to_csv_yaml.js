"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var readline = require("readline");
var xlsx = require("xlsx");
var path = require("path");
var fs = require("fs"); // file system
var indent_string_1 = require("indent-string");
var inputDefault = [
    String.raw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["../test/test_data.xlsx"], ["../test/test_data.xlsx"]))),
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var xlsxPath, parentPath, outputFilePath, writer, book, _i, _a, sheetName, stringOfCSV;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, inputPath("input .xlsx file path> ")];
                case 1:
                    xlsxPath = _b.sent();
                    parentPath = path.dirname(xlsxPath);
                    outputFilePath = parentPath + '/' + path.basename(xlsxPath, '.xlsx') + '.csv.yaml';
                    writer = fs.createWriteStream(outputFilePath);
                    book = xlsx.readFile(xlsxPath);
                    for (_i = 0, _a = book.SheetNames; _i < _a.length; _i++) {
                        sheetName = _a[_i];
                        stringOfCSV = xlsx.utils.sheet_to_csv(book.Sheets[sheetName]).replace(/\n/g, '\r\n');
                        stringOfCSV = (0, indent_string_1["default"])(stringOfCSV, 4, { indent: ' ' });
                        writer.write(sheetName + ": |\r\n");
                        writer.write(stringOfCSV + "\r\n");
                    }
                    writer.end();
                    return [4 /*yield*/, new Promise(function (resolve) {
                            writer.on('finish', function () { resolve(0); });
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// StandardInputBuffer
var StandardInputBuffer = /** @class */ (function () {
    function StandardInputBuffer() {
        var _this = this;
        this.inputBuffer = [];
        this.inputResolver = undefined;
        this.readlines = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.readlines.on('line', function (line) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.inputResolver) {
                    this.inputResolver(line);
                    this.inputResolver = undefined;
                }
                else {
                    this.inputBuffer.push(line);
                }
                return [2 /*return*/];
            });
        }); });
        this.readlines.setPrompt('');
        this.readlines.prompt();
    }
    StandardInputBuffer.prototype.input = function (guide) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var nextLine = _this.inputBuffer.shift();
                        if (nextLine) {
                            console.log(guide + nextLine);
                            resolve(nextLine);
                        }
                        else {
                            process.stdout.write(guide);
                            _this.inputResolver = resolve;
                        }
                    })];
            });
        });
    };
    StandardInputBuffer.prototype.close = function () {
        this.readlines.close();
    };
    return StandardInputBuffer;
}());
// InputOption
var InputOption = /** @class */ (function () {
    function InputOption(inputLines) {
        this.inputLines = inputLines;
        this.nextLineIndex = 0;
    }
    return InputOption;
}());
// inputOption
var inputOption = new InputOption(inputDefault);
// input
// Example: const name = await input('What is your name? ');
function input(guide) {
    return __awaiter(this, void 0, void 0, function () {
        var value;
        return __generator(this, function (_a) {
            // Input emulation
            if (inputOption.inputLines) {
                if (inputOption.nextLineIndex < inputOption.inputLines.length) {
                    value = inputOption.inputLines[inputOption.nextLineIndex];
                    inputOption.nextLineIndex += 1;
                    console.log(guide + value);
                    return [2 /*return*/, value];
                }
            }
            // input
            return [2 /*return*/, InputObject.input(guide)];
        });
    });
}
var InputObject = new StandardInputBuffer();
// inputPath
// Example: const name = await input('What is your name? ');
function inputPath(guide) {
    return __awaiter(this, void 0, void 0, function () {
        var key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, input(guide)];
                case 1:
                    key = _a.sent();
                    return [2 /*return*/, pathResolve(key)];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, main()["catch"](function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var timeOver;
                        return __generator(this, function (_a) {
                            if (false /*programOptions.test*/) {
                                throw e;
                            }
                            else {
                                console.log("ERROR: " + e.message);
                                timeOver = new Date();
                                timeOver.setSeconds(timeOver.getSeconds() + 5);
                                while ((new Date()).getTime() < timeOver.getTime()) {
                                }
                            }
                            return [2 /*return*/];
                        });
                    }); })["finally"](function () {
                        InputObject.close();
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
callMain();
var templateObject_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzeF90b19jc3ZfeWFtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy94bHN4X3RvX2Nzdl95YW1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFxQztBQUNyQywyQkFBNkI7QUFDN0IsMkJBQTZCO0FBQzdCLHVCQUF5QixDQUFFLGNBQWM7QUFDekMsK0NBQXlDO0FBRXpDLElBQU0sWUFBWSxHQUFhO0lBQzlCLE1BQU0sQ0FBQyxHQUFHLDJGQUFDLHdCQUF3QjtDQUNuQyxDQUFDO0FBRUYsU0FBZ0IsSUFBSTs7Ozs7d0JBQ0QscUJBQU0sU0FBUyxDQUFDLHlCQUF5QixDQUFDLEVBQUE7O29CQUFyRCxRQUFRLEdBQUcsU0FBMEM7b0JBQ3JELFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNwQyxjQUFjLEdBQUcsVUFBVSxHQUFFLEdBQUcsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRSxXQUFXLENBQUM7b0JBQ2hGLE1BQU0sR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBRTlDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0QyxXQUF1QyxFQUFmLEtBQUEsSUFBSSxDQUFDLFVBQVUsRUFBZixjQUFlLEVBQWYsSUFBZSxFQUFFO3dCQUE5QixTQUFTO3dCQUNkLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsQ0FBQzt3QkFDekYsV0FBVyxHQUFHLElBQUEsMEJBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUMsTUFBTSxF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Q0FFTixPQUFPLENBQUMsR0FBRyxDQUFFLFlBQVUsQ0FBQyxDQUFDLE9BQVMsQ0FBRSxDQUFDO2dDQUM5QixRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDN0IsUUFBUSxDQUFDLFVBQVUsQ0FBRSxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUM7Z0NBRWpELE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFO2lDQUNuRDs2QkFDRDs7O3lCQUNELENBQUMsQ0FDRCxTQUFPLENBQUEsQ0FBQzt3QkFDUixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3JCLENBQUMsQ0FBQyxFQUFBOztvQkFoQkgsU0FnQkcsQ0FBQzs7Ozs7Q0FDSjtBQUNELFFBQVEsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcmVhZGxpbmUgZnJvbSAncmVhZGxpbmUnO1xyXG5pbXBvcnQgKiBhcyB4bHN4IGZyb20gJ3hsc3gnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjsgIC8vIGZpbGUgc3lzdGVtXHJcbmltcG9ydCBpbmRlbnRTdHJpbmcgZnJvbSAnaW5kZW50LXN0cmluZyc7XHJcblxyXG5jb25zdCBpbnB1dERlZmF1bHQ6IHN0cmluZ1tdID0gW1xyXG5cdFN0cmluZy5yYXcgYC4uL3Rlc3QvdGVzdF9kYXRhLnhsc3hgLFxyXG5dO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gIG1haW4oKSB7XHJcblx0Y29uc3QgIHhsc3hQYXRoID0gYXdhaXQgaW5wdXRQYXRoKGBpbnB1dCAueGxzeCBmaWxlIHBhdGg+IGApO1xyXG5cdGNvbnN0ICBwYXJlbnRQYXRoID0gcGF0aC5kaXJuYW1lKHhsc3hQYXRoKTtcclxuXHRjb25zdCAgb3V0cHV0RmlsZVBhdGggPSBwYXJlbnRQYXRoICsnLycrIHBhdGguYmFzZW5hbWUoeGxzeFBhdGgsICcueGxzeCcpICsnLmNzdi55YW1sJztcclxuXHRjb25zdCAgd3JpdGVyID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0ob3V0cHV0RmlsZVBhdGgpO1xyXG5cclxuXHRjb25zdCAgYm9vayA9IHhsc3gucmVhZEZpbGUoeGxzeFBhdGgpO1xyXG5cdGZvciAoY29uc3Qgc2hlZXROYW1lIG9mIGJvb2suU2hlZXROYW1lcykge1xyXG5cdFx0bGV0ICBzdHJpbmdPZkNTViA9IHhsc3gudXRpbHMuc2hlZXRfdG9fY3N2KGJvb2suU2hlZXRzW3NoZWV0TmFtZV0pLnJlcGxhY2UoL1xcbi9nLCdcXHJcXG4nKTtcclxuXHRcdHN0cmluZ09mQ1NWID0gaW5kZW50U3RyaW5nKCBzdHJpbmdPZkNTViwgNCwge2luZGVudDogJyAnfSApO1xyXG5cclxuXHRcdHdyaXRlci53cml0ZShgJHtzaGVldE5hbWV9OiB8XFxyXFxuYCk7XHJcblx0XHR3cml0ZXIud3JpdGUoYCR7c3RyaW5nT2ZDU1Z9XFxyXFxuYCk7XHJcblx0fVxyXG5cdHdyaXRlci5lbmQoKTtcclxuXHRhd2FpdCBuZXcgUHJvbWlzZSggKHJlc29sdmUpID0+IHtcclxuXHRcdHdyaXRlci5vbignZmluaXNoJywgKCkgPT4ge3Jlc29sdmUoMCk7fSk7XHJcblx0fSk7XHJcbn1cclxuXHJcbi8vIFN0YW5kYXJkSW5wdXRCdWZmZXJcclxuY2xhc3MgIFN0YW5kYXJkSW5wdXRCdWZmZXIge1xyXG5cdHJlYWRsaW5lczogcmVhZGxpbmUuSW50ZXJmYWNlO1xyXG5cdGlucHV0QnVmZmVyOiBzdHJpbmdbXSA9IFtdO1xyXG5cdGlucHV0UmVzb2x2ZXI/OiAoYW5zd2VyOnN0cmluZyk9PnZvaWQgPSB1bmRlZmluZWQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5yZWFkbGluZXMgPSByZWFkbGluZS5jcmVhdGVJbnRlcmZhY2Uoe1xyXG5cdFx0XHRpbnB1dDogcHJvY2Vzcy5zdGRpbixcclxuXHRcdFx0b3V0cHV0OiBwcm9jZXNzLnN0ZG91dFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnJlYWRsaW5lcy5vbignbGluZScsIGFzeW5jIChsaW5lOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuaW5wdXRSZXNvbHZlcikge1xyXG5cdFx0XHRcdHRoaXMuaW5wdXRSZXNvbHZlcihsaW5lKTtcclxuXHRcdFx0XHR0aGlzLmlucHV0UmVzb2x2ZXIgPSB1bmRlZmluZWQ7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pbnB1dEJ1ZmZlci5wdXNoKGxpbmUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlYWRsaW5lcy5zZXRQcm9tcHQoJycpO1xyXG5cdFx0dGhpcy5yZWFkbGluZXMucHJvbXB0KCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyAgaW5wdXQoZ3VpZGU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gIG5ldyBQcm9taXNlKFxyXG5cdFx0XHQocmVzb2x2ZTogKGFuc3dlcjpzdHJpbmcpPT52b2lkLCAgcmVqZWN0OiAoYW5zd2VyOnN0cmluZyk9PnZvaWQgKSA9PlxyXG5cdFx0e1xyXG5cdFx0XHRjb25zdCAgbmV4dExpbmUgPSB0aGlzLmlucHV0QnVmZmVyLnNoaWZ0KCk7XHJcblx0XHRcdGlmIChuZXh0TGluZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGd1aWRlICsgbmV4dExpbmUpO1xyXG5cdFx0XHRcdHJlc29sdmUobmV4dExpbmUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHByb2Nlc3Muc3Rkb3V0LndyaXRlKGd1aWRlKTtcclxuXHRcdFx0XHR0aGlzLmlucHV0UmVzb2x2ZXIgPSByZXNvbHZlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNsb3NlKCkge1xyXG5cdFx0dGhpcy5yZWFkbGluZXMuY2xvc2UoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vIElucHV0T3B0aW9uXHJcbmNsYXNzIElucHV0T3B0aW9uIHtcclxuXHRpbnB1dExpbmVzOiBzdHJpbmdbXTtcclxuXHRuZXh0TGluZUluZGV4OiBudW1iZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGlucHV0TGluZXM6IHN0cmluZ1tdKSB7XHJcblx0XHR0aGlzLmlucHV0TGluZXMgPSBpbnB1dExpbmVzO1xyXG5cdFx0dGhpcy5uZXh0TGluZUluZGV4ID0gMDtcclxuXHR9XHJcbn1cclxuXHJcbi8vIGlucHV0T3B0aW9uXHJcbmNvbnN0IGlucHV0T3B0aW9uID0gbmV3IElucHV0T3B0aW9uKGlucHV0RGVmYXVsdCk7XHJcblxyXG4vLyBpbnB1dFxyXG4vLyBFeGFtcGxlOiBjb25zdCBuYW1lID0gYXdhaXQgaW5wdXQoJ1doYXQgaXMgeW91ciBuYW1lPyAnKTtcclxuYXN5bmMgZnVuY3Rpb24gIGlucHV0KCBndWlkZTogc3RyaW5nICk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0Ly8gSW5wdXQgZW11bGF0aW9uXHJcblx0aWYgKGlucHV0T3B0aW9uLmlucHV0TGluZXMpIHtcclxuXHRcdGlmIChpbnB1dE9wdGlvbi5uZXh0TGluZUluZGV4IDwgaW5wdXRPcHRpb24uaW5wdXRMaW5lcy5sZW5ndGgpIHtcclxuXHRcdFx0Y29uc3QgIHZhbHVlID0gaW5wdXRPcHRpb24uaW5wdXRMaW5lc1tpbnB1dE9wdGlvbi5uZXh0TGluZUluZGV4XTtcclxuXHRcdFx0aW5wdXRPcHRpb24ubmV4dExpbmVJbmRleCArPSAxO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhndWlkZSArIHZhbHVlKTtcclxuXHRcdFx0cmV0dXJuICB2YWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIGlucHV0XHJcblx0cmV0dXJuICBJbnB1dE9iamVjdC5pbnB1dChndWlkZSk7XHJcbn1cclxuY29uc3QgIElucHV0T2JqZWN0ID0gbmV3IFN0YW5kYXJkSW5wdXRCdWZmZXIoKTtcclxuXHJcbi8vIGlucHV0UGF0aFxyXG4vLyBFeGFtcGxlOiBjb25zdCBuYW1lID0gYXdhaXQgaW5wdXQoJ1doYXQgaXMgeW91ciBuYW1lPyAnKTtcclxuYXN5bmMgZnVuY3Rpb24gIGlucHV0UGF0aCggZ3VpZGU6IHN0cmluZyApIHtcclxuXHRjb25zdCAga2V5ID0gYXdhaXQgaW5wdXQoZ3VpZGUpO1xyXG5cdHJldHVybiAgcGF0aFJlc29sdmUoa2V5KTtcclxufVxyXG5cclxuLy8gcGF0aFJlc29sdmVcclxuZnVuY3Rpb24gIHBhdGhSZXNvbHZlKHBhdGhfOiBzdHJpbmcpIHtcclxuXHJcblx0Ly8gJy9jL2hvbWUnIGZvcm1hdCB0byBjdXJyZW50IE9TIGZvcm1hdFxyXG5cdGlmIChwYXRoXy5sZW5ndGggPj0gMykge1xyXG5cdFx0aWYgKHBhdGhfWzBdID09PSAnLycgICYmICBwYXRoX1syXSA9PT0gJy8nKSB7XHJcblx0XHRcdHBhdGhfID0gcGF0aF9bMV0gKyc6JysgcGF0aF8uc3Vic3RyKDIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gQ2hhbmdlIHNlcGFyYXRvcnMgdG8gT1MgZm9ybWF0XHJcblx0cGF0aF8gPSBwYXRoLnJlc29sdmUocGF0aF8pO1xyXG5cclxuXHRyZXR1cm4gcGF0aF9cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gIGNhbGxNYWluKCkge1xyXG5cclxuXHRhd2FpdCAgbWFpbigpXHJcblx0XHQuY2F0Y2goIGFzeW5jIChlKT0+e1xyXG5cdFx0XHRpZiAoIGZhbHNlIC8qcHJvZ3JhbU9wdGlvbnMudGVzdCovKSB7XHJcblx0XHRcdFx0dGhyb3cgZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Y29uc29sZS5sb2coIGBFUlJPUjogJHtlLm1lc3NhZ2V9YCApO1xyXG5cdFx0XHRcdGNvbnN0ICB0aW1lT3ZlciA9IG5ldyBEYXRlKCk7XHJcblx0XHRcdFx0dGltZU92ZXIuc2V0U2Vjb25kcyggdGltZU92ZXIuZ2V0U2Vjb25kcygpICsgNSApO1xyXG5cclxuXHRcdFx0XHR3aGlsZSAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSA8IHRpbWVPdmVyLmdldFRpbWUoKSkge1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdC5maW5hbGx5KCgpPT57XHJcblx0XHRcdElucHV0T2JqZWN0LmNsb3NlKCk7XHJcblx0XHR9KTtcclxufVxyXG5jYWxsTWFpbigpO1xyXG4iXX0=