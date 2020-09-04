"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipay_png_1 = __importDefault(require("../../assets/images/ipay.png"));
const addLogo = () => {
    const image = document.createElement("img");
    image.src = ipay_png_1.default;
    image.width = 100;
    image.alt = "IPay";
    const container = document.getElementById("ipay-logo-container");
    container.appendChild(image);
};
exports.default = addLogo;
//# sourceMappingURL=add-logo.js.map