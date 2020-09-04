import addLogo from "./add-logo";

type RequestInitiatorType = {
  [field: string]: string | number;
};

const requestInitiatorValues: RequestInitiatorType = {
  live: 0,
  oid: "",
  inv: "",
  amount: 1,
  tel: "",
  eml: "",
  vid: "demo",
  curr: "KES",
  p1: "demo",
  p2: "demo",
  p3: "demo",
  p4: "demo",
  cbk: "",
  cst: 1,
  crl: 0,
  hash: "",
};

addLogo();
const form = document.getElementById("iPay-Form")!;
const submitBtn = document.createElement("input");
submitBtn.type = "submit";
submitBtn.className = "btn btn-primary";
submitBtn.value = `Pay ${requestInitiatorValues.curr}(${requestInitiatorValues.amount})`;

Object.keys(requestInitiatorValues).forEach((key: string) => {
  const group = document.createElement("div");
  group.className = "form-group";

  const label = document.createElement("label");
  label.setAttribute("for", `id-${key}`);
  const labelText = document.createTextNode(key.toUpperCase());
  label.appendChild(labelText);

  const input: any = document.createElement("input");
  input.name = key;
  input.value = requestInitiatorValues[key];
  input.id = `id-${key}`;
  input.name = key;
  input.className = "form-control";

  group.appendChild(label);
  group.appendChild(input);

  form.appendChild(group);
  form.appendChild(submitBtn);
});

console.log("yeeey");
