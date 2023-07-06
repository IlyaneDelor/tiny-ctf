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
var axios_1 = require("axios");
var ilyane = {
    user: 'Ilyane',
    secret: '',
    Level: 0,
    Point: 0
};
function setLevel(user, level) {
    user.Level = level;
}
function setPoint(user, point) {
    user.Point = point;
}
var ip_address = '10.33.2.123';
var start_port = 1024;
var end_port = 4096;
var concurrency = 3068; // Nombre de requêtes en parallèle
var counter = 0;
function pingPort(ip, port) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://".concat(ip, ":").concat(port, "/ping");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get(url)];
                case 2:
                    response = _a.sent();
                    console.log("Le port ".concat(port, " a r\u00E9pondu avec le statut ").concat(response.status));
                    signupUser(ip_address, port, 'Ilyane');
                    return [2 /*return*/, port];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function findOpenPorts(ip, startPort, endPort) {
    return __awaiter(this, void 0, void 0, function () {
        var openPorts, promises, port, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    openPorts = [];
                    promises = [];
                    port = startPort;
                    _a.label = 1;
                case 1:
                    if (!(port <= endPort)) return [3 /*break*/, 4];
                    console.log("Test du port ".concat(port, "..."));
                    promises.push(pingPort(ip, port));
                    if (!(promises.length === concurrency || port === endPort)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    results = _a.sent();
                    openPorts.push.apply(openPorts, results.filter(function (port) { return port !== null; }));
                    promises.length = 0; // Réinitialiser les promesses
                    _a.label = 3;
                case 3:
                    port++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, openPorts];
            }
        });
    });
}
findOpenPorts(ip_address, start_port, end_port);
function signupUser(ip, port, user) {
    return __awaiter(this, void 0, void 0, function () {
        var url, data, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://".concat(ip, ":").concat(port, "/signup");
                    data = { User: user };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios_1["default"].post(url, data)];
                case 2:
                    response = _a.sent();
                    console.log('Inscription réussie !');
                    return [4 /*yield*/, fetchSecret(ip_address, port, 'Ilyane')];
                case 3:
                    _a.sent();
                    console.log('Réponse du serveur :', response.data);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('Erreur lors de l\'inscription :', error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function fetchSecret(ip, port, user) {
    return __awaiter(this, void 0, void 0, function () {
        var url, data, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://".concat(ip, ":").concat(port, "/secret");
                    data = { User: user };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios_1["default"].post(url, data)];
                case 2:
                    response = _a.sent();
                    console.log('Secret récupéré !');
                    console.log('', response.data.split(' ')[2].trim());
                    ilyane.secret = response.data.split(' ')[2].trim(); // Mettre à jour la propriété 'secret' de l'objet 'user'
                    return [4 /*yield*/, getUserPoints(ip_address, port, 'Ilyane', ilyane.secret)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error('Erreur lors de la récupération du secret :', error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getLevel(ip, port, user, secret) {
    return __awaiter(this, void 0, void 0, function () {
        var url, data, response, test, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://".concat(ip, ":").concat(port, "/getLevel");
                    data = { User: user, Secret: secret };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios_1["default"].post(url, data)];
                case 2:
                    response = _a.sent();
                    console.log('', response.data);
                    test = parseInt(response.data.split(' ')[1]);
                    setLevel(ilyane, test + 1);
                    console.log(ilyane.Level);
                    return [4 /*yield*/, submitChallenge(ip_address, port, 'Ilyane', ilyane.secret)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Erreur lors de la récupération des levels :', error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getUserPoints(ip, port, user, secret) {
    return __awaiter(this, void 0, void 0, function () {
        var url, data, response, test, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://".concat(ip, ":").concat(port, "/getUserPoints");
                    data = { User: user, Secret: secret };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios_1["default"].post(url, data)];
                case 2:
                    response = _a.sent();
                    console.log('Voici les Puntos: ');
                    console.log('', response.data);
                    test = parseInt(response.data.split('\n')[1]);
                    setPoint(ilyane, test - 1);
                    console.log(ilyane.Point);
                    console.log(ilyane.Point);
                    return [4 /*yield*/, getLevel(ip_address, port, 'Ilyane', ilyane.secret)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.error('Erreur lors de la récupération des points :', error_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getChallenge(ip, port, user, secret) {
    return __awaiter(this, void 0, void 0, function () {
        var url, data, response, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://".concat(ip, ":").concat(port, "/getChallenge");
                    data = { User: user, Secret: secret };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].post(url, data)];
                case 2:
                    response = _a.sent();
                    console.log('Le challenge ');
                    console.log('Challenge :', response.data);
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    console.error('Erreur lors de la récupération des points :', error_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function submitChallenge(ip, port, user, secret) {
    return __awaiter(this, void 0, void 0, function () {
        var url, data, response, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://".concat(ip, ":").concat(port, "/submitChallenge");
                    data = {
                        User: user,
                        Secret: secret,
                        Content: {
                            Level: ilyane.Level,
                            Challenge: {
                                Username: user,
                                Secret: secret,
                                Points: ilyane.Point
                            },
                            Protocol: "SHA-1",
                            SecretKey: "Il n'y a que les imbéciles qui ne changent pas d'avis."
                        }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].post(url, data)];
                case 2:
                    response = _a.sent();
                    console.log('--------', response.data);
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    console.error('Erreur lors de la récupération des points :', error_7);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
