"use strict";
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
//	String.raw `../test/test_data.xlsx`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzeF90b19jc3ZfeWFtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy94bHN4X3RvX2Nzdl95YW1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQXFDO0FBQ3JDLDJCQUE2QjtBQUM3QiwyQkFBNkI7QUFDN0IsdUJBQXlCLENBQUUsY0FBYztBQUN6QywrQ0FBeUM7QUFFekMsSUFBTSxZQUFZLEdBQWE7QUFDL0IsdUNBQXVDO0NBQ3RDLENBQUM7QUFFRixTQUFnQixJQUFJOzs7Ozt3QkFDRCxxQkFBTSxTQUFTLENBQUMseUJBQXlCLENBQUMsRUFBQTs7b0JBQXJELFFBQVEsR0FBRyxTQUEwQztvQkFDckQsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3BDLGNBQWMsR0FBRyxVQUFVLEdBQUUsR0FBRyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFFLFdBQVcsQ0FBQztvQkFDaEYsTUFBTSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFFOUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3RDLFdBQXVDLEVBQWYsS0FBQSxJQUFJLENBQUMsVUFBVSxFQUFmLGNBQWUsRUFBZixJQUFlLEVBQUU7d0JBQTlCLFNBQVM7d0JBQ2QsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUN6RixXQUFXLEdBQUcsSUFBQSwwQkFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUUsQ0FBQzt3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WUFBVSxDQUFDLENBQUMsT0FBUyxDQUFFLENBQUM7Z0NBQzlCLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dDQUM3QixRQUFRLENBQUMsVUFBVSxDQUFFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQztnQ0FFakQsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUU7aUNBQ25EOzZCQUNEOzs7eUJBQ0QsQ0FBQyxDQUNELFNBQU8sQ0FBQSxDQUFDO3dCQUNSLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDckIsQ0FBQyxDQUFDLEVBQUE7O29CQWhCSCxTQWdCRyxDQUFDOzs7OztDQUNKO0FBQ0QsUUFBUSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyByZWFkbGluZSBmcm9tICdyZWFkbGluZSc7XHJcbmltcG9ydCAqIGFzIHhsc3ggZnJvbSAneGxzeCc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiOyAgLy8gZmlsZSBzeXN0ZW1cclxuaW1wb3J0IGluZGVudFN0cmluZyBmcm9tICdpbmRlbnQtc3RyaW5nJztcclxuXHJcbmNvbnN0IGlucHV0RGVmYXVsdDogc3RyaW5nW10gPSBbXHJcbi8vXHRTdHJpbmcucmF3IGAuLi90ZXN0L3Rlc3RfZGF0YS54bHN4YCxcclxuXTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uICBtYWluKCkge1xyXG5cdGNvbnN0ICB4bHN4UGF0aCA9IGF3YWl0IGlucHV0UGF0aChgaW5wdXQgLnhsc3ggZmlsZSBwYXRoPiBgKTtcclxuXHRjb25zdCAgcGFyZW50UGF0aCA9IHBhdGguZGlybmFtZSh4bHN4UGF0aCk7XHJcblx0Y29uc3QgIG91dHB1dEZpbGVQYXRoID0gcGFyZW50UGF0aCArJy8nKyBwYXRoLmJhc2VuYW1lKHhsc3hQYXRoLCAnLnhsc3gnKSArJy5jc3YueWFtbCc7XHJcblx0Y29uc3QgIHdyaXRlciA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKG91dHB1dEZpbGVQYXRoKTtcclxuXHJcblx0Y29uc3QgIGJvb2sgPSB4bHN4LnJlYWRGaWxlKHhsc3hQYXRoKTtcclxuXHRmb3IgKGNvbnN0IHNoZWV0TmFtZSBvZiBib29rLlNoZWV0TmFtZXMpIHtcclxuXHRcdGxldCAgc3RyaW5nT2ZDU1YgPSB4bHN4LnV0aWxzLnNoZWV0X3RvX2Nzdihib29rLlNoZWV0c1tzaGVldE5hbWVdKS5yZXBsYWNlKC9cXG4vZywnXFxyXFxuJyk7XHJcblx0XHRzdHJpbmdPZkNTViA9IGluZGVudFN0cmluZyggc3RyaW5nT2ZDU1YsIDQsIHtpbmRlbnQ6ICcgJ30gKTtcclxuXHJcblx0XHR3cml0ZXIud3JpdGUoYCR7c2hlZXROYW1lfTogfFxcclxcbmApO1xyXG5cdFx0d3JpdGVyLndyaXRlKGAke3N0cmluZ09mQ1NWfVxcclxcbmApO1xyXG5cdH1cclxuXHR3cml0ZXIuZW5kKCk7XHJcblx0YXdhaXQgbmV3IFByb21pc2UoIChyZXNvbHZlKSA9PiB7XHJcblx0XHR3cml0ZXIub24oJ2ZpbmlzaCcsICgpID0+IHtyZXNvbHZlKDApO30pO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vLyBTdGFuZGFyZElucHV0QnVmZmVyXHJcbmNsYXNzICBTdGFuZGFyZElucHV0QnVmZmVyIHtcclxuXHRyZWFkbGluZXM6IHJlYWRsaW5lLkludGVyZmFjZTtcclxuXHRpbnB1dEJ1ZmZlcjogc3RyaW5nW10gPSBbXTtcclxuXHRpbnB1dFJlc29sdmVyPzogKGFuc3dlcjpzdHJpbmcpPT52b2lkID0gdW5kZWZpbmVkO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMucmVhZGxpbmVzID0gcmVhZGxpbmUuY3JlYXRlSW50ZXJmYWNlKHtcclxuXHRcdFx0aW5wdXQ6IHByb2Nlc3Muc3RkaW4sXHJcblx0XHRcdG91dHB1dDogcHJvY2Vzcy5zdGRvdXRcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5yZWFkbGluZXMub24oJ2xpbmUnLCBhc3luYyAobGluZTogc3RyaW5nKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLmlucHV0UmVzb2x2ZXIpIHtcclxuXHRcdFx0XHR0aGlzLmlucHV0UmVzb2x2ZXIobGluZSk7XHJcblx0XHRcdFx0dGhpcy5pbnB1dFJlc29sdmVyID0gdW5kZWZpbmVkO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaW5wdXRCdWZmZXIucHVzaChsaW5lKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5yZWFkbGluZXMuc2V0UHJvbXB0KCcnKTtcclxuXHRcdHRoaXMucmVhZGxpbmVzLnByb21wdCgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgIGlucHV0KGd1aWRlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuICBuZXcgUHJvbWlzZShcclxuXHRcdFx0KHJlc29sdmU6IChhbnN3ZXI6c3RyaW5nKT0+dm9pZCwgIHJlamVjdDogKGFuc3dlcjpzdHJpbmcpPT52b2lkICkgPT5cclxuXHRcdHtcclxuXHRcdFx0Y29uc3QgIG5leHRMaW5lID0gdGhpcy5pbnB1dEJ1ZmZlci5zaGlmdCgpO1xyXG5cdFx0XHRpZiAobmV4dExpbmUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhndWlkZSArIG5leHRMaW5lKTtcclxuXHRcdFx0XHRyZXNvbHZlKG5leHRMaW5lKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwcm9jZXNzLnN0ZG91dC53cml0ZShndWlkZSk7XHJcblx0XHRcdFx0dGhpcy5pbnB1dFJlc29sdmVyID0gcmVzb2x2ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjbG9zZSgpIHtcclxuXHRcdHRoaXMucmVhZGxpbmVzLmNsb3NlKCk7XHJcblx0fVxyXG59XHJcblxyXG4vLyBJbnB1dE9wdGlvblxyXG5jbGFzcyBJbnB1dE9wdGlvbiB7XHJcblx0aW5wdXRMaW5lczogc3RyaW5nW107XHJcblx0bmV4dExpbmVJbmRleDogbnVtYmVyO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihpbnB1dExpbmVzOiBzdHJpbmdbXSkge1xyXG5cdFx0dGhpcy5pbnB1dExpbmVzID0gaW5wdXRMaW5lcztcclxuXHRcdHRoaXMubmV4dExpbmVJbmRleCA9IDA7XHJcblx0fVxyXG59XHJcblxyXG4vLyBpbnB1dE9wdGlvblxyXG5jb25zdCBpbnB1dE9wdGlvbiA9IG5ldyBJbnB1dE9wdGlvbihpbnB1dERlZmF1bHQpO1xyXG5cclxuLy8gaW5wdXRcclxuLy8gRXhhbXBsZTogY29uc3QgbmFtZSA9IGF3YWl0IGlucHV0KCdXaGF0IGlzIHlvdXIgbmFtZT8gJyk7XHJcbmFzeW5jIGZ1bmN0aW9uICBpbnB1dCggZ3VpZGU6IHN0cmluZyApOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdC8vIElucHV0IGVtdWxhdGlvblxyXG5cdGlmIChpbnB1dE9wdGlvbi5pbnB1dExpbmVzKSB7XHJcblx0XHRpZiAoaW5wdXRPcHRpb24ubmV4dExpbmVJbmRleCA8IGlucHV0T3B0aW9uLmlucHV0TGluZXMubGVuZ3RoKSB7XHJcblx0XHRcdGNvbnN0ICB2YWx1ZSA9IGlucHV0T3B0aW9uLmlucHV0TGluZXNbaW5wdXRPcHRpb24ubmV4dExpbmVJbmRleF07XHJcblx0XHRcdGlucHV0T3B0aW9uLm5leHRMaW5lSW5kZXggKz0gMTtcclxuXHRcdFx0Y29uc29sZS5sb2coZ3VpZGUgKyB2YWx1ZSk7XHJcblx0XHRcdHJldHVybiAgdmFsdWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBpbnB1dFxyXG5cdHJldHVybiAgSW5wdXRPYmplY3QuaW5wdXQoZ3VpZGUpO1xyXG59XHJcbmNvbnN0ICBJbnB1dE9iamVjdCA9IG5ldyBTdGFuZGFyZElucHV0QnVmZmVyKCk7XHJcblxyXG4vLyBpbnB1dFBhdGhcclxuLy8gRXhhbXBsZTogY29uc3QgbmFtZSA9IGF3YWl0IGlucHV0KCdXaGF0IGlzIHlvdXIgbmFtZT8gJyk7XHJcbmFzeW5jIGZ1bmN0aW9uICBpbnB1dFBhdGgoIGd1aWRlOiBzdHJpbmcgKSB7XHJcblx0Y29uc3QgIGtleSA9IGF3YWl0IGlucHV0KGd1aWRlKTtcclxuXHRyZXR1cm4gIHBhdGhSZXNvbHZlKGtleSk7XHJcbn1cclxuXHJcbi8vIHBhdGhSZXNvbHZlXHJcbmZ1bmN0aW9uICBwYXRoUmVzb2x2ZShwYXRoXzogc3RyaW5nKSB7XHJcblxyXG5cdC8vICcvYy9ob21lJyBmb3JtYXQgdG8gY3VycmVudCBPUyBmb3JtYXRcclxuXHRpZiAocGF0aF8ubGVuZ3RoID49IDMpIHtcclxuXHRcdGlmIChwYXRoX1swXSA9PT0gJy8nICAmJiAgcGF0aF9bMl0gPT09ICcvJykge1xyXG5cdFx0XHRwYXRoXyA9IHBhdGhfWzFdICsnOicrIHBhdGhfLnN1YnN0cigyKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIENoYW5nZSBzZXBhcmF0b3JzIHRvIE9TIGZvcm1hdFxyXG5cdHBhdGhfID0gcGF0aC5yZXNvbHZlKHBhdGhfKTtcclxuXHJcblx0cmV0dXJuIHBhdGhfXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uICBjYWxsTWFpbigpIHtcclxuXHJcblx0YXdhaXQgIG1haW4oKVxyXG5cdFx0LmNhdGNoKCBhc3luYyAoZSk9PntcclxuXHRcdFx0aWYgKCBmYWxzZSAvKnByb2dyYW1PcHRpb25zLnRlc3QqLykge1xyXG5cdFx0XHRcdHRocm93IGU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCBgRVJST1I6ICR7ZS5tZXNzYWdlfWAgKTtcclxuXHRcdFx0XHRjb25zdCAgdGltZU92ZXIgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHRcdHRpbWVPdmVyLnNldFNlY29uZHMoIHRpbWVPdmVyLmdldFNlY29uZHMoKSArIDUgKTtcclxuXHJcblx0XHRcdFx0d2hpbGUgKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgPCB0aW1lT3Zlci5nZXRUaW1lKCkpIHtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHQuZmluYWxseSgoKT0+e1xyXG5cdFx0XHRJbnB1dE9iamVjdC5jbG9zZSgpO1xyXG5cdFx0fSk7XHJcbn1cclxuY2FsbE1haW4oKTtcclxuIl19