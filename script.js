$(document).ready(function () {
  $(".fieldset_info, .field_buttons, .field_text").hide();

  $("#btn_info").click(function (e) {
    $(".fieldset_info").slideToggle(700);
    $(".fieldset_medic").slideUp(700);
    $(".field_buttons").slideUp(700);
    $(".field_text").slideUp(700);
  });
  $("#btn_medic").click(function (e) {
    $(".fieldset_medic").slideToggle(700);
    $(".fieldset_info").slideUp(700);
    $(".field_buttons").slideUp(700);
    $(".field_text").slideUp(700);
  });
  $("#btn_imp").click(function (e) {
    $(".field_buttons").slideToggle(700);
    $(".fieldset_medic").slideUp(700);
    $(".fieldset_info").slideUp(700);
    $(".field_text").slideUp(700);
  });
  $("#btn_obs").click(function (e) {
    $(".field_text").slideToggle(700);
    $(".fieldset_medic").slideUp(700);
    $(".fieldset_info").slideUp(700);
    $(".field_buttons").slideUp(700);
  });

  $(".fieldset_info").on("click", "button[type=reset]", (event) => {
    event.preventDefault();
    $(".fieldset_info>input, .fieldset_info>select").val("");
    $("#date_field").val("");
    $("#time_field").val("");
    $("input[type=checkbox]").removeAttr("checked");
  });

  $(".fieldset_medic").on("click", "button[type=reset]", (event) => {
    event.preventDefault();
    $(".fieldset_medic input").val("");
  });

  const form = document.querySelector("form");
  const submitter = document.querySelector("#btn_submit_info");

  function getFormInfo() {
    const formInfo = createFormData();

    const form = {};
    form.name = formInfo.get("nameField");
    form.place = formInfo.get("placeField");
    form.date = formInfo.get("dateField");
    form.time = formInfo.get("TimeField");
    form.weight = formInfo.get("weightField");
    form.text = formInfo.get("textObs");

    return form;
  }
  function getformMedic() {
    const formMedics = createFormData();

    const form = {};
    form.name = formMedics.get("medicNameField");
    form.amount = formMedics.get("medAmountField");
    form.boxes = formMedics.get("medBoxesField");
    form.form = formMedics.get("medFormField");
    form.ingest = formMedics.get("medAmountIngestedField");
    form.method = formMedics.get("medMethodField");
    form.hr = formMedics.get("medHrField");
    form.day = formMedics.get("medDayField");

    return form;
  }

  function createFormData() {
    const formData = new FormData(form, submitter);
    return formData;
  }

  function createPreview(obj) {
    const pre = document.createElement("p");
    const info = document.createTextNode(obj.name);
    pre.appendChild(info);

    const currentPreview = document.querySelector("#name_preview");
    const firstChild = currentPreview.firstChild;

    currentPreview.insertBefore(pre, firstChild);
  }
  $("form").submit(function (e) {
    e.preventDefault();
    console.log(createFormData());
  });

  $("#btn_add_info").click(() => {
    const info = getFormInfo();
    createPreview(info);
    console.log(info);
  });
  $("#btn_add_medic").click(() => {
    const medics = getformMedic();
    console.log(medics);
  });
});
