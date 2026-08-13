let btnInfo = document.getElementById("btn_info");
let btnMedic = document.getElementById("btn_medic");
let btnImp = document.getElementById("btn_imp");

let inputName = document.querySelector("#name_field").values;
let inputPlace = document.querySelector("#place_field");
let inputDate = document.querySelector("#date_field");
let inputTime = document.querySelector("#time_field");
let inputWeight = document.querySelector("#weight_field");

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

const Client = {
  name: inputName,
  place: inputPlace,
  date: inputDate,
  time: inputTime,
  weight: inputWeight,
};

for (const attr of Object.values(Client)) {
  console.log(Client[attr]);
}
