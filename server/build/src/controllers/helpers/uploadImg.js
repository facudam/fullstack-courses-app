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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAndGetUrlImage = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../../config");
// Esta función maneja la carga de la imagen y devuelve la URL de la imagen en Imgur
const uploadAndGetUrlImage = (sampleFile) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadPath = __dirname + '/uploads/' + sampleFile.name;
    // Utilizamos una promesa para envolver la operación asíncrona
    const moveFilePromise = new Promise((resolve, reject) => {
        sampleFile.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
    yield moveFilePromise;
    const imgurResponse = yield axios_1.default.post('https://api.imgur.com/3/image', {
        image: fs_1.default.readFileSync(uploadPath, 'base64'),
    }, {
        headers: {
            Authorization: `Client-ID ${config_1.IMGUR_CLIENTID}`,
            'Content-Type': 'application/json',
        },
    });
    fs_1.default.unlinkSync(uploadPath); // Eliminamos el archivo temporal después de subirlo a Imgur
    return imgurResponse.data.data.link;
});
exports.uploadAndGetUrlImage = uploadAndGetUrlImage;
