$(document).ready(function () {
  $(".fieldset_medic, .fieldset_info, .field_text").hide();

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
    btnResetInfo();
    $("#preview_procedure #namePreview").remove();
  });

  $(".fieldset_medic").on("click", "button[type=reset]", (event) => {
    event.preventDefault();
    btnResetMedic();
  });

  const form = document.querySelector("form");
  const submitter = document.querySelector("#btn_submit_info");

  function btnResetInfo() {
    $(".fieldset_info>input, .fieldset_info>select").val("");
    $("#date_field").val("");
    $("#time_field").val("");
    $("input[type=checkbox]").removeAttr("checked");
  }
  function btnResetMedic() {
    $(".fieldset_medic input").val("");
  }

  function createFormData() {
    const formData = new FormData(form, submitter);
    return formData;
  }

  function getFormInfo() {
    const formInfo = createFormData();

    const form = {};
    form.name = formInfo.get("nameField");
    form.place = formInfo.get("placeField");
    form.date = formInfo.get("dateField");
    form.time = formInfo.get("TimeField");
    form.weight = formInfo.get("weightField");

    return form;
  }

  function createProcedPreview(obj) {
    if (obj.name === "") {
      return;
    }

    const p = document.createElement("p");

    const [year, month, day] = obj.date.split("-");
    const date = new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });

    const procedText = `
    Paciente ${obj.name},
    Estar no Hospital ${obj.place === "sta_casa" ? "Santa Casa de Votuporanga" : "(Unimed - Casa Saúde)"}, 
    às ${obj.time}, 
    ${date}, 
    para procedimento odontológico ambulatorial sem necessidade de
    Internação. Aos meus cuidados
    `;
    const text = document.createTextNode(procedText);
    p.appendChild(text);

    const currentPreview = document.querySelector(
      "#preview_procedure #main_preview",
    );
    currentPreview.appendChild(p);

    return;
  }

  function getformMedic() {
    const formMedics = createFormData();

    const form = {};
    form.patient = formMedics.get("namePatField");
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

  function createPrescPreview(obj) {
    if (obj.patient === "" && obj.name === "") {
      return;
    }

    const prescPat = obj.patient;
    const prescName = obj.name;
    const prescAmount = obj.amount;
    const prescBoxes = obj.boxes;
    const prescForm = obj.form;
    const prescIngest = obj.ingest;
    const prescMethod = obj.method;
    const prescHr = obj.hr;
    const prescDay = obj.day;

    const container = document.createElement("p");
    const name = document.createTextNode(obj.patient);

    container.appendChild(name);

    const namePreview = document.querySelector(
      "#preview_prescription #name_preview",
    );
    const firstChild = namePreview.firstChild;

    namePreview.insertBefore(container, firstChild);

    const prescText = `
    ${prescName} — 
    ${prescAmount} 
    ${prescBoxes}(s) — 
    ${prescForm} 
    ${prescIngest} ${prescMethod} 
    de ${prescHr} em ${prescHr} hora(s)
    ${prescDay > 0 ? " — por " + prescDay + " dia(s)" : ""}
    `;

    const p = document.createElement("p");
    const medic = document.createTextNode(prescText);
    p.appendChild(medic);

    const span = document.createElement("span");
    const x = document.createTextNode("X");
    span.appendChild(x);
    p.appendChild(span);

    const currentPreview = document.querySelector(
      "#preview_prescription #main_preview",
    );

    currentPreview.appendChild(p);
  }

  const datePreview = new Date().toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  $("#date_preview").text("Votuporanga " + datePreview);

  $("form").submit(function (e) {
    e.preventDefault();
    console.log(createFormData());
  });

  $("#btn_add_info").click(() => {
    const info = getFormInfo();
    createProcedPreview(info);
    btnResetInfo();
  });
  $("#btn_add_medic").click(() => {
    const medics = getformMedic();
    createPrescPreview(medics);
    btnResetMedic();
  });

  $("#preview_prescription #main_preview").on("click", (e) => {
    if (e.target.nodeName === "SPAN") {
      const remove = e.target.parentNode;
      $(remove).remove();
    }
  });

  $("#preview_prescription").hide();

  $("#prescription").click(() => {
    console.log("Prescrição");
    $("#preview_procedure").hide();
    $("#preview_prescription").show();
    $(".fieldset_medic").slideDown(700);
    $(".field_buttons").slideUp(700);
  });
  $("#procedure").click(() => {
    console.log("Encaminhamento");
    $("#preview_procedure").show();
    $("#preview_prescription").hide();
    $(".fieldset_info").slideDown(700);
    $(".field_buttons").slideUp(700);
  });
});
