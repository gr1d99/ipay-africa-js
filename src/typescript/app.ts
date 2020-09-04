import CryptoJS from "crypto-js";
import addLogo from "./add-logo";

const HASH_KEY = "demoCHANGED";

type RequestInitiatorType = {
  [field: string]: string | number;
};

const requestInitiatorValues: RequestInitiatorType = {
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

addLogo();
const form = document.getElementById("iPay-Form")!;
const submitBtn = document.createElement("input");
submitBtn.type = "submit";
submitBtn.className = "btn btn-primary";
submitBtn.value = `Pay ${requestInitiatorValues.curr}(${requestInitiatorValues.ttl})`;

const onChange = (event: Event): void => {
  const { name, value } = <HTMLInputElement>event.target;
  Object.assign(requestInitiatorValues, {
    ...requestInitiatorValues,
    [name]: value,
  });

  if (name === "oid" || name === "inv") {
    // ensure invoice and order id are the same
    const orderId = requestInitiatorValues.oid;
    const invoiceId = requestInitiatorValues.inv;

    const orderIdInput = <HTMLInputElement>document.getElementById("id-oid");
    const invoiceIdInput = <HTMLInputElement>document.getElementById("id-inv");

    if (orderId > invoiceId) {
      requestInitiatorValues.inv = <string>orderId;
      invoiceIdInput.value = <string>orderId;
    }

    if (invoiceId > orderId) {
      requestInitiatorValues.oid = <string>invoiceId;
      orderIdInput.value = <string>invoiceId;
    }
  }
};

Object.keys(requestInitiatorValues).forEach((key: string) => {
  const group = document.createElement("div");
  group.className = "form-group";

  const label = document.createElement("label")!;
  label.setAttribute("for", `id-${key}`);
  const labelText = document.createTextNode(key.toUpperCase());
  label.appendChild(labelText);

  const input: any = document.createElement("input");
  input.name = key;
  input.value = requestInitiatorValues[key];
  input.id = `id-${key}`;
  input.name = key;
  input.className = "form-control";
  input.addEventListener("change", (event: Event) => {
    onChange(event);
  });

  group.appendChild(label);
  group.appendChild(input);

  form.appendChild(group);
  form.appendChild(submitBtn);
});

const hashDataString = (dataString: string): string => {
  return CryptoJS.HmacSHA1(dataString, HASH_KEY).toString();
};

const onSubmit = (): void => {
  const dataStringObj: RequestInitiatorType = { ...requestInitiatorValues };

  delete dataStringObj.hsh;

  const dataString: string = Object.keys(dataStringObj)
    .map((key: string): string => <string>dataStringObj[key])
    .join("");

  const hash: string = hashDataString(dataString);

  const hashInput = <HTMLInputElement>document.getElementById("id-hsh")!;
  hashInput.value = hash;
};

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  onSubmit();
  (<HTMLFormElement>event.target).submit();
});
