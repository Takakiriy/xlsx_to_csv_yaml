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
var child_process = require("child_process");
var scriptPath = '../build/xlsx_to_csv_yaml.js';
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, callChildProccess("node " + scriptPath)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// callChildProccess
function callChildProccess(commandLine, option) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolveFunction, rejectFunction) { return __awaiter(_this, void 0, void 0, function () {
                    var returnValue, childProcess, _i, _a, inputLine, e_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                returnValue = new ProcessReturns();
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 8, , 9]);
                                childProcess = child_process.exec(commandLine, 
                                // on close the "childProcess" (2)
                                function (error, stdout, stderr) {
                                    returnValue.stdout = stdout;
                                    returnValue.stderr = stderr;
                                    resolveFunction(returnValue);
                                });
                                if (!(option && childProcess.stdin)) return [3 /*break*/, 7];
                                if (!option.inputLines) return [3 /*break*/, 6];
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 300); })];
                            case 2:
                                _b.sent();
                                _i = 0, _a = option.inputLines;
                                _b.label = 3;
                            case 3:
                                if (!(_i < _a.length)) return [3 /*break*/, 6];
                                inputLine = _a[_i];
                                console.log(inputLine);
                                childProcess.stdin.write(inputLine + "\n");
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                            case 4:
                                _b.sent();
                                _b.label = 5;
                            case 5:
                                _i++;
                                return [3 /*break*/, 3];
                            case 6:
                                childProcess.stdin.end();
                                _b.label = 7;
                            case 7:
                                // on close the "childProcess" (1)
                                childProcess.on('close', function (exitCode) {
                                    returnValue.exitCode = exitCode;
                                });
                                childProcess.on('exit', function (exitCode) {
                                    returnValue.exitCode = exitCode;
                                });
                                return [3 /*break*/, 9];
                            case 8:
                                e_1 = _b.sent();
                                throw Error("Error in the command line " + commandLine);
                            case 9: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
// ProcessOption
var ProcessOption = /** @class */ (function () {
    function ProcessOption() {
    }
    return ProcessOption;
}());
// ProcessReturns
var ProcessReturns = /** @class */ (function () {
    function ProcessReturns() {
        this.exitCode = 0;
        this.stdout = '';
        this.stderr = '';
    }
    return ProcessReturns;
}());
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbl90ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21haW5fdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQztBQUUvQyxJQUFPLFVBQVUsR0FBRyw4QkFBOEIsQ0FBQztBQUVuRCxTQUFnQixJQUFJOzs7O3dCQUNuQixxQkFBTSxpQkFBaUIsQ0FBQyxVQUFRLFVBQVksQ0FBQyxFQUFBOztvQkFBN0MsU0FBNkMsQ0FBQzs7Ozs7Q0FDOUM7QUFFRCxvQkFBb0I7QUFDcEIsU0FBZ0IsaUJBQWlCLENBQUMsV0FBbUIsRUFBRyxNQUFzQjs7OztZQUM3RSxzQkFBUyxJQUFJLE9BQU8sQ0FBRSxVQUFPLGVBQWUsRUFBRSxjQUFjOzs7OztnQ0FDcEQsV0FBVyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7Ozs7Z0NBRWxDLFlBQVksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFFLFdBQVc7Z0NBRXBELGtDQUFrQztnQ0FDbEMsVUFBQyxLQUF5QyxFQUFFLE1BQWMsRUFBRSxNQUFjO29DQUN6RSxXQUFXLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQ0FDNUIsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0NBQzVCLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FDOUIsQ0FBQyxDQUNELENBQUM7cUNBQ0UsQ0FBQSxNQUFNLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQSxFQUE1Qix3QkFBNEI7cUNBRTNCLE1BQU0sQ0FBQyxVQUFVLEVBQWpCLHdCQUFpQjtnQ0FDcEIscUJBQU0sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUF4QixDQUF3QixDQUFDLEVBQUE7O2dDQUF0RCxTQUFzRCxDQUFDO3NDQUNkLEVBQWpCLEtBQUEsTUFBTSxDQUFDLFVBQVU7OztxQ0FBakIsQ0FBQSxjQUFpQixDQUFBO2dDQUE5QixTQUFTO2dDQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUN2QixZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0NBQzNDLHFCQUFNLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxFQUFBOztnQ0FBdEQsU0FBc0QsQ0FBQzs7O2dDQUhoQyxJQUFpQixDQUFBOzs7Z0NBTTFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7OztnQ0FHMUIsa0NBQWtDO2dDQUNsQyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLFFBQWdCO29DQUN6QyxXQUFXLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQ0FDakMsQ0FBQyxDQUFDLENBQUM7Z0NBQ0gsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxRQUFnQjtvQ0FDeEMsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0NBQ2pDLENBQUMsQ0FBQyxDQUFDOzs7O2dDQUVILE1BQU0sS0FBSyxDQUFDLCtCQUE2QixXQUFhLENBQUMsQ0FBQzs7OztxQkFFekQsQ0FBQyxFQUFDOzs7Q0FDSDtBQUVELGdCQUFnQjtBQUNoQjtJQUFBO0lBRUEsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFFRCxpQkFBaUI7QUFDakI7SUFBQTtRQUNDLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQixXQUFNLEdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBRUQsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjaGlsZF9wcm9jZXNzIGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xyXG5cclxuY29uc3QgIHNjcmlwdFBhdGggPSAnLi4vYnVpbGQveGxzeF90b19jc3ZfeWFtbC5qcyc7XHJcblxyXG5hc3luYyBmdW5jdGlvbiAgbWFpbigpIHtcclxuXHRhd2FpdCBjYWxsQ2hpbGRQcm9jY2Vzcyhgbm9kZSAke3NjcmlwdFBhdGh9YCk7XHJcbn1cclxuXHJcbi8vIGNhbGxDaGlsZFByb2NjZXNzXHJcbmFzeW5jIGZ1bmN0aW9uICBjYWxsQ2hpbGRQcm9jY2Vzcyhjb21tYW5kTGluZTogc3RyaW5nLCAgb3B0aW9uPzogUHJvY2Vzc09wdGlvbik6IFByb21pc2U8UHJvY2Vzc1JldHVybnM+IHtcclxuXHRyZXR1cm4gICBuZXcgUHJvbWlzZSggYXN5bmMgKHJlc29sdmVGdW5jdGlvbiwgcmVqZWN0RnVuY3Rpb24pID0+IHtcclxuXHRcdGNvbnN0ICByZXR1cm5WYWx1ZSA9IG5ldyBQcm9jZXNzUmV0dXJucygpO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgIGNoaWxkUHJvY2VzcyA9IGNoaWxkX3Byb2Nlc3MuZXhlYyggY29tbWFuZExpbmUsXHJcblxyXG5cdFx0XHRcdC8vIG9uIGNsb3NlIHRoZSBcImNoaWxkUHJvY2Vzc1wiICgyKVxyXG5cdFx0XHRcdChlcnJvcjogY2hpbGRfcHJvY2Vzcy5FeGVjRXhjZXB0aW9uIHwgbnVsbCwgc3Rkb3V0OiBzdHJpbmcsIHN0ZGVycjogc3RyaW5nKSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm5WYWx1ZS5zdGRvdXQgPSBzdGRvdXQ7XHJcblx0XHRcdFx0XHRyZXR1cm5WYWx1ZS5zdGRlcnIgPSBzdGRlcnI7XHJcblx0XHRcdFx0XHRyZXNvbHZlRnVuY3Rpb24ocmV0dXJuVmFsdWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdFx0aWYgKG9wdGlvbiAmJiBjaGlsZFByb2Nlc3Muc3RkaW4pIHtcclxuXHJcblx0XHRcdFx0aWYgKG9wdGlvbi5pbnB1dExpbmVzKSB7XHJcblx0XHRcdFx0XHRhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMzAwKSk7XHJcblx0XHRcdFx0XHRmb3IgKGNvbnN0IGlucHV0TGluZSBvZiBvcHRpb24uaW5wdXRMaW5lcykge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhpbnB1dExpbmUpO1xyXG5cdFx0XHRcdFx0XHRjaGlsZFByb2Nlc3Muc3RkaW4ud3JpdGUoaW5wdXRMaW5lICsgXCJcXG5cIik7XHJcblx0XHRcdFx0XHRcdGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMDApKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2hpbGRQcm9jZXNzLnN0ZGluLmVuZCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBvbiBjbG9zZSB0aGUgXCJjaGlsZFByb2Nlc3NcIiAoMSlcclxuXHRcdFx0Y2hpbGRQcm9jZXNzLm9uKCdjbG9zZScsIChleGl0Q29kZTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuVmFsdWUuZXhpdENvZGUgPSBleGl0Q29kZTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGNoaWxkUHJvY2Vzcy5vbignZXhpdCcsIChleGl0Q29kZTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuVmFsdWUuZXhpdENvZGUgPSBleGl0Q29kZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHRocm93IEVycm9yKGBFcnJvciBpbiB0aGUgY29tbWFuZCBsaW5lICR7Y29tbWFuZExpbmV9YCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbi8vIFByb2Nlc3NPcHRpb25cclxuY2xhc3MgUHJvY2Vzc09wdGlvbiB7XHJcblx0aW5wdXRMaW5lcz86IHN0cmluZ1tdO1xyXG59XHJcblxyXG4vLyBQcm9jZXNzUmV0dXJuc1xyXG5jbGFzcyBQcm9jZXNzUmV0dXJucyB7XHJcblx0ZXhpdENvZGU6IG51bWJlciA9IDA7XHJcblx0c3Rkb3V0OiBzdHJpbmcgPSAnJztcclxuXHRzdGRlcnI6IHN0cmluZyA9ICcnO1xyXG59XHJcblxyXG5tYWluKCk7Il19