"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
const add_logo_1 = __importDefault(require("./add-logo"));
const HASH_KEY = "demoCHANGED";
const requestInitiatorValues = {
    live: 0,
    oid: "1",
    inv: "1",
    ttl: 1,
    tel: "254717582057",
    eml: "user@email.com",
    vid: "demo",
    curr: "KES",
    p1: "demo",
    p2: "demo",
    p3: "demo",
    p4: "demo",
    cbk: "http://localhost:3001",
    cst: 1,
    crl: 0,
    hsh: "",
};
add_logo_1.default();
const form = document.getElementById("iPay-Form");
const submitBtn = document.createElement("input");
submitBtn.type = "submit";
submitBtn.className = "btn btn-primary";
submitBtn.value = `Pay ${requestInitiatorValues.curr}(${requestInitiatorValues.ttl})`;
const onChange = (event) => {
    const { name, value } = event.target;
    Object.assign(requestInitiatorValues, Object.assign(Object.assign({}, requestInitiatorValues), { [name]: value }));
    if (name === "oid" || name === "inv") {
        // ensure invoice and order id are the same
        const orderId = requestInitiatorValues.oid;
        const invoiceId = requestInitiatorValues.inv;
        const orderIdInput = document.getElementById("id-oid");
        const invoiceIdInput = document.getElementById("id-inv");
        if (orderId > invoiceId) {
            requestInitiatorValues.inv = orderId;
            invoiceIdInput.value = orderId;
        }
        if (invoiceId > orderId) {
            requestInitiatorValues.oid = invoiceId;
            orderIdInput.value = invoiceId;
        }
    }
};
Object.keys(requestInitiatorValues).forEach((key) => {
    const group = document.createElement("div");
    group.className = "form-group";
    const label = document.createElement("label");
    label.setAttribute("for", `id-${key}`);
    const labelText = document.createTextNode(key.toUpperCase());
    label.appendChild(labelText);
    const input = document.createElement("input");
    input.name = key;
    input.value = requestInitiatorValues[key];
    input.id = `id-${key}`;
    input.name = key;
    input.className = "form-control";
    input.addEventListener("change", (event) => {
        onChange(event);
    });
    group.appendChild(label);
    group.appendChild(input);
    form.appendChild(group);
    form.appendChild(submitBtn);
});
const hashDataString = (dataString) => {
    return crypto_js_1.default.HmacSHA1(dataString, HASH_KEY).toString();
};
const onSubmit = () => {
    const dataStringObj = Object.assign({}, requestInitiatorValues);
    delete dataStringObj.hsh;
    const dataString = Object.keys(dataStringObj)
        .map((key) => dataStringObj[key])
        .join("");
    const hash = hashDataString(dataString);
    const hashInput = document.getElementById("id-hsh");
    hashInput.value = hash;
};
form.addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmit();
    event.target.submit();
});
//# sourceMappingURL=app.js.map