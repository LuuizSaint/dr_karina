$(document).ready(function () {
  $(
    ".fieldset_medic, .fieldset_info, .field_text, #preview_prescription, #preview_obs",
  ).hide();

  $("#btn_info").click(function (e) {
    $("#preview_procedure").show();
    $("#preview_prescription").hide();
    $("#preview_obs").hide();

    $(".fieldset_info").slideToggle(700);
    $(".fieldset_medic").slideUp(700);
    $(".field_buttons").slideUp(700);
    $(".field_text").slideUp(700);
  });
  $("#btn_medic").click(function (e) {
    $("#preview_prescription").show();
    $("#preview_procedure").hide();
    $("#preview_obs").hide();

    $(".fieldset_medic").slideToggle(700);
    $(".fieldset_info").slideUp(700);
    $(".field_buttons").slideUp(700);
    $(".field_text").slideUp(700);
  });
  $("#btn_obs").click(function (e) {
    $("#preview_obs").show();
    $("#preview_procedure").hide();
    $("#preview_prescription").hide();

    $(".field_text").slideToggle(700);
    $(".fieldset_medic").slideUp(700);
    $(".fieldset_info").slideUp(700);
    $(".field_buttons").slideUp(700);
  });

  let namePatient;

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
  function btnResetObs() {
    $("#text_obs").val("");
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

  function toUpper(str) {
    const strResult = str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return strResult;
  }

  function takeFirstName() {
    const arrName = namePatient.split(" ");
    namePatient = arrName[0].charAt(0).toUpperCase() + arrName[0].slice(1);

    return namePatient;
  }

  function period(time) {
    const trueTime = time.split(":");
    console.log(trueTime[0]);
    if (Number(trueTime[0]) <= 11) {
      return time + " da manhã";
    } else {
      return time + " da tarde";
    }
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
    Paciente ${toUpper(obj.name)},
    Estar no Hospital ${obj.place === "sta_casa" ? "Santa Casa de Votuporanga" : "(Unimed - Casa Saúde)"}, 
    às ${period(obj.time)},
    ${date}, 
    para procedimento odontológico ambulatorial sem necessidade de
    Internação. Aos meus cuidados
    `;
    const text = document.createTextNode(procedText);
    p.appendChild(text);

    const currentPreview = document.querySelector(
      "#preview_procedure #main_preview",
    );
    p.setAttribute("class", "removeForNewPrint");
    currentPreview.appendChild(p);

    namePatient = obj.name;
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
    const name = document.createTextNode(toUpper(obj.patient));

    container.setAttribute("class", "removeForNewPrint");
    container.appendChild(name);

    const namePreview = document.querySelector(
      "#preview_prescription #name_preview",
    );
    const firstChild = namePreview.firstChild;

    namePreview.insertBefore(container, firstChild);
    const partOne = `${prescName} — ${prescAmount} ${prescBoxes}(s) —`;
    const partTwo = `${
      prescForm === "Colocar"
        ? prescForm + " " + prescIngest + " Filme "
        : prescForm + " " + prescIngest + " " + prescMethod
    }`;
    const partThree = `${
      prescHr > 0 ? "de " + prescHr + " em " + prescHr + "hora(s) " : "por dia"
    }`;
    const partFour = `${prescDay > 0 ? " — por " + prescDay + " dia(s)" : ""}`;

    const prescText = `${partOne} ${partTwo} ${partThree} ${partFour}`;

    const p = document.createElement("p");
    const medic = document.createTextNode(prescText);
    p.appendChild(medic);

    const span = document.createElement("span");
    const x = document.createTextNode("X");
    span.appendChild(x);
    p.appendChild(span);

    p.setAttribute("class", "removeForNewPrint");

    const currentPreview = document.querySelector(
      "#preview_prescription #main_preview",
    );

    currentPreview.appendChild(p);
  }

  function getObs() {
    const obsText = createFormData();
    const obs = obsText.get("textObs");
    return obs;
  }

  function createObsPreview(str) {
    if (!str) {
      return;
    }
    const container = document.createElement("p");
    const strong = document.createElement("strong");
    const italic = document.createElement("i");
    const text = document.createTextNode(toUpper(str));
    italic.appendChild(text);
    strong.appendChild(italic);
    container.appendChild(strong);

    const span = document.createElement("span");
    const x = document.createTextNode("X");
    span.appendChild(x);
    container.appendChild(span);

    const patientName = document.createTextNode(takeFirstName());
    const patientNameContainer = document.createElement("p");
    patientNameContainer.appendChild(patientName);

    const obsName = document.querySelector("#preview_obs #header_preview");
    const firstChildName = obsName.firstChild;

    patientNameContainer.setAttribute("class", "patientName");
    obsName.insertBefore(patientNameContainer, firstChildName);

    const obsPreview = document.querySelector("#preview_obs #main_preview");
    const firstChild = obsPreview.firstChild;

    container.setAttribute("class", "removeForNewPrint");
    obsPreview.insertBefore(container, firstChild);
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

  $("#btn_add_obs").click(() => {
    const obs = getObs();
    createObsPreview(obs);
    btnResetObs();
  });

  $("#preview_prescription #main_preview").on("click", (e) => {
    if (e.target.nodeName === "SPAN") {
      const remove = e.target.parentNode;
      $(remove).remove();
    }
  });

  $("#preview_obs #main_preview").on("click", (e) => {
    if (e.target.nodeName === "SPAN") {
      const remove = e.target.parentNode;
      $(remove).remove();
    }
  });

  $("#btn_print").click(() => {
    window.print();
  });

  $("#btn_new_print").click(() => {
    $(".removeForNewPrint").remove();
  });
});
