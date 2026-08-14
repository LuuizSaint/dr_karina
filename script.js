let btnInfo = document.getElementById("btn_info");
let btnMedic = document.getElementById("btn_medic");
let btnImp = document.getElementById("btn_imp");

let fieldInfo = document.querySelector(".fieldset_info");
let fieldMedic = document.querySelector(".fieldset_medic");
let fieldBtn = document.querySelector(".field_buttons");

btnInfo.addEventListener("click", function click(e) {
  e.preventDefault();
  fieldInfo.classList.toggle("fieldsetDisplayNone");
  fieldMedic.classList.add("fieldsetDisplayNone");
  fieldBtn.classList.add("fieldsetDisplayNone");
});
btnMedic.addEventListener("click", function click(e) {
  e.preventDefault();
  fieldMedic.classList.toggle("fieldsetDisplayNone");
  fieldInfo.classList.add("fieldsetDisplayNone");
  fieldBtn.classList.add("fieldsetDisplayNone");
});
btnImp.addEventListener("click", function click(e) {
  e.preventDefault();
  console.log("A");
  fieldBtn.classList.toggle("fieldsetDisplayNone");
  fieldMedic.classList.add("fieldsetDisplayNone");
  fieldInfo.classList.add("fieldsetDisplayNone");
});

let inputClientName = document.querySelector("#name_field").value;
let inputClientPlace = document.querySelector("#place_field").value;
let inputClientDate = document.querySelector("#date_field").value;
let inputClientTime = document.querySelector("#time_field").value;
let inputClientWeight = document.querySelector("#weight_field").value;

const Client = {
  name: inputClientName,
  place: inputClientPlace,
  date: inputClientDate,
  time: inputClientTime,
  weight: inputClientWeight,
};
console.log(Client.name);
console.log(Client.place);
console.log(Client.date);
console.log(Client.time);
console.log(Client.weight);
console.log(
  "############################################################################################################",
);
let inputMedicName = document.querySelector("#med_name_field").value;
let inputMedicAmount = document.querySelector("#med_amount_field").value;
let inputMedicBoxes = document.querySelector("#med_boxes_field").value;
let inputMedicForm = document.querySelector("#med_form_field").value;
let inputMedicAmountIngested = document.querySelector(
  "#med_amount_ingested_field",
).value;
let inputMedicMethod = document.querySelector("#med_method_field").value;
let inputMedicHr = document.querySelector("#med_hr_field").value;
let inputMedicDay = document.querySelector("#med_day_field").value;

const Medic = {
  name: inputMedicName, //med_name_field
  amount: inputMedicAmount, //med_amount_field
  boxes: inputMedicBoxes, //med_boxes_field
  form: inputMedicForm, //med_form_field
  amountIngested: inputMedicAmountIngested, //med_amount_ingested_field
  method: inputMedicMethod, //med_method_field
  timeHr: inputMedicHr, //med_hr_field
  timeDay: inputMedicDay, //med_day_field
};

console.log(Medic.name);
console.log(Medic.amount);
console.log(Medic.boxes);
console.log(Medic.form);
console.log(Medic.amountIngested);
console.log(Medic.method);
console.log(Medic.timeHr);
console.log(Medic.timeDay);
