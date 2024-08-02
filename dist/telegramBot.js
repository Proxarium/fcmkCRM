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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var client_1 = require("./src/lib/client");
var bot = new telegraf_1.Telegraf(process.env.TELEGRAM_BOT_TOKEN);
console.log(client_1.default);
bot.on('callback_query', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var callbackData, deductionId_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                callbackData = ctx.callbackQuery.data;
                if (!(callbackData && callbackData.startsWith('replenish_'))) return [3 /*break*/, 7];
                deductionId_1 = callbackData.split('_')[1];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 7]);
                return [4 /*yield*/, client_1.default.$transaction(function (prisma) { return __awaiter(void 0, void 0, void 0, function () {
                        var deductedItems, _i, deductedItems_1, item;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: 
                                // Update the status of the DeductedMedication to true
                                return [4 /*yield*/, prisma.deductedMedication.update({
                                        where: { id: deductionId_1 },
                                        data: { status: true },
                                    })];
                                case 1:
                                    // Update the status of the DeductedMedication to true
                                    _a.sent();
                                    return [4 /*yield*/, prisma.deductedItem.findMany({
                                            where: { deductedMedicationId: deductionId_1 },
                                        })];
                                case 2:
                                    deductedItems = _a.sent();
                                    _i = 0, deductedItems_1 = deductedItems;
                                    _a.label = 3;
                                case 3:
                                    if (!(_i < deductedItems_1.length)) return [3 /*break*/, 6];
                                    item = deductedItems_1[_i];
                                    return [4 /*yield*/, prisma.equipmentMedicalKit.updateMany({
                                            where: { name: item.name },
                                            data: { quantity: { increment: item.quantity } },
                                        })];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5:
                                    _i++;
                                    return [3 /*break*/, 3];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                // Notify the user in the Telegram chat and update the button
                return [4 /*yield*/, ctx.answerCbQuery('Препараты успешно пополнены')];
            case 3:
                // Notify the user in the Telegram chat and update the button
                _a.sent();
                return [4 /*yield*/, ctx.editMessageText('Препараты успешно пополнены', telegraf_1.Markup.inlineKeyboard([
                        telegraf_1.Markup.button.callback('✅', 'done')
                    ]))];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5:
                error_1 = _a.sent();
                console.error('Error replenishing medications:', error_1);
                return [4 /*yield*/, ctx.answerCbQuery('Ошибка при пополнении препаратов')];
            case 6:
                _a.sent();
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
bot.launch();
