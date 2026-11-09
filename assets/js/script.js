$(document).ready(function () {
  $(
    ".fieldset_medic, .fieldset_info, .fieldset_sadt, .field_text, #preview_procedure, #preview_prescription, #preview_obs",
  ).hide();

  $("#btn_sadt").click(function () {
    $("#preview_sadt").show();
    $("#preview_procedure").hide();
    $("#preview_prescription").hide();
    $("#preview_obs").hide();

    $("#preview_sadt").attr("class", "print_a5");
    $("#preview_procedure").attr("class", "no-print");
    $("#preview_prescription").attr("class", "no-print");
    $("#preview_obs").attr("class", "no-print");
    $("#preview_obs_copy").attr("class", "no-print");

    $(".fieldset_sadt").slideToggle(700);
    $(".fieldset_info").slideUp(700);
    $(".fieldset_medic").slideUp(700);
    $(".field_buttons").slideUp(700);
    $(".field_text").slideUp(700);

  });
  $("#btn_info").click(function () {
    $("#preview_procedure").show();
    $("#preview_sadt").hide();
    $("#preview_prescription").hide();
    $("#preview_obs").hide();

    $("#preview_procedure").attr("class", "print_a5");
    $("#preview_prescription").attr("class", "no-print");
    $("#preview_obs").attr("class", "no-print");
    $("#preview_obs_copy").attr("class", "no-print");
    $("#preview_sadt").attr("class", "no-print");

    $(".fieldset_info").slideToggle(700);
    $(".fieldset_medic").slideUp(700);
    $(".field_buttons").slideUp(700);
    $(".field_text").slideUp(700);
    $(".fieldset_sadt").slideUp(700);
  });
  $("#btn_medic").click(function () {
    $("#preview_prescription").show();
    $("#preview_procedure").hide();
    $("#preview_sadt").hide();
    $("#preview_obs").hide();

    $("#preview_procedure").attr("class", "no-print");
    $("#preview_prescription").attr("class", "print_a5");
    $("#preview_obs").attr("class", "no-print");
    $("#preview_obs_copy").attr("class", "no-print");
    $("#preview_sadt").attr("class", "no-print");

    $(".fieldset_medic").slideToggle(700);
    $(".fieldset_info").slideUp(700);
    $(".field_buttons").slideUp(700);
    $(".field_text").slideUp(700);
    $(".fieldset_sadt").slideUp(700);
  });
  $("#btn_obs").click(function () {
    $("#preview_obs").show();
    $("#preview_procedure").hide();
    $("#preview_prescription").hide();
    $("#preview_sadt").hide();

    $("#preview_procedure").attr("class", "no-print");
    $("#preview_prescription").attr("class", "no-print");
    $("#preview_obs").attr("class", "print");
    $("#preview_obs_copy").attr("class", "print");
    $("#preview_sadt").attr("class", "no-print");

    $(".field_text").slideToggle(700);
    $(".fieldset_medic").slideUp(700);
    $(".fieldset_info").slideUp(700);
    $(".field_buttons").slideUp(700);
    $(".fieldset_sadt").slideUp(700);
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

  function btnResetNameReason() {
    $(".fieldset_sadt>input").val("");
  }

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
  function btnResetJejum() {
    $("#jejum_time").val("");
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

  function getNameReason() {
    const formReason = createFormData();
    const form = {};
    form.name = formReason.get("nameSadtField");
    form.reason = formReason.get("reasonSadtField");

    return form;
  }

  function getFormJejumTime() {
    const formTime = createFormData();
    const form = {};
    form.jejum = formTime.get("jejumTime");

    return form.jejum;
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
    namePatient = "Paciente: " + arrName[0].charAt(0).toUpperCase() + arrName[0].slice(1);

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
  function createNameReasonPreview(form) {
    const text1 = "Solicito sedação inalatória para procedimento odontológico ambulatorial, sem necessidade de internação, para o paciente: ";
    const text2 = "Aguardo autorização. COD TUSS 31602312";
    const nameReasonText = `${text1} ${toUpper(form.name)}. ${form.reason}. ${text2}`;
    const p = document.createElement("p");
    const text = document.createTextNode(nameReasonText);
    p.appendChild(text);

    const currentPreview = document.querySelector(
      "#preview_sadt #main_preview",
    );
    p.setAttribute("class", "removeForNewPrint");
    currentPreview.appendChild(p);
  }

  function createProcedPreview(obj) {
    if (obj.name === "") {
      return;
    }
    const p = document.createElement("p");
    const [year, month, day] = obj.date.split("-");
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleString("pt-BR", { month: "long" });
    const weekdayName = date.toLocaleString("pt-BR", { weekday: "long" });
    const dayName = date.toLocaleString("pt-BR", { day: "2-digit" });
    const yearName = date.toLocaleString("pt-BR", { year: "numeric" });


    const procedText = `
    Paciente ${toUpper(obj.name)},
    Estar no Hospital ${obj.place === "sta_casa" ? "(Santa Casa de Votuporanga)" : "(Unimed - Casa Saúde)"}, 
    às ${period(obj.time)},
    ${dayName} de ${monthName} de ${yearName} (${weekdayName}), 
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
    const partTwo = `${prescForm === "Colocar"
      ? prescForm + " " + prescIngest + " Filme "
      : prescForm + " " + prescIngest + " " + prescMethod
      }`;
    const partThree = `${prescHr > 0 ? "de " + prescHr + " em " + prescHr + "hora(s) " : "por dia"
      }`;
    const partFour = `${prescDay > 0 ? " — por " + prescDay + " dia(s)" : ""}`;

    const prescText = `${partOne} ${partTwo} ${partThree} ${partFour}`;

    const li = document.createElement("li");
    const medic = document.createTextNode(prescText);
    li.appendChild(medic);

    const span = document.createElement("span");
    const x = document.createTextNode("X");
    span.appendChild(x);
    li.insertBefore(span, li.firstChild);

    li.setAttribute("class", "removeForNewPrint");

    const currentPreview = document.querySelector(
      "#preview_prescription #main_preview",
    );

    currentPreview.appendChild(li);
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

    const obsPreview = document.querySelector("#preview_obs #main_preview");
    const firstChild = obsPreview.firstChild;

    container.setAttribute("class", "removeForNewPrint, obsPreviewText");
    obsPreview.insertBefore(container, firstChild);
  }

  function createName() {
    const patientName = document.createTextNode(takeFirstName());
    const patientNameContainer = document.createElement("p");
    patientNameContainer.appendChild(patientName);

    const obsName = document.querySelector("#preview_obs #header_preview");
    const firstChildName = obsName.firstChild;

    patientNameContainer.setAttribute("class", "patientName");
    obsName.insertBefore(patientNameContainer, firstChildName);
  }

  const datePreview = new Date().toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  $("#date_preview, #date_preview_prescription").text("Votuporanga " + datePreview);

  $('#type1').click(() => {
    const text4Container = document.querySelector("#type2Text4");
    const text5Container = document.querySelector("#type2Text5");
    const text6Container = document.querySelector("#type2Text6");


    const text4 = document.createTextNode(`→ Após alta hospitalar deixar a criança
       descansar (dormir se quiser) não ficar acordando a criança para dar comida; Não pode
            tomar sol ou realizar atividades físicas por 48 horas (repouso por
            48 horas); Atenção, é normal a criança apresentar vômito.`);
    const containerp4 = document.createElement("p");
    containerp4.appendChild(text4);

    const text5 = document.createTextNode(`→ Após alta hospitalar dar alimentos leves
      para a criança comer, em pequenas quantidades (evitar dar líquidos antes de dar
       algo para comer). Pode comer: arroz com feijão amassadinho, macarrão, purê de batata,
       etc. Alimentação mais molinha (pastosa) por 01 dia`);
    const containerp5 = document.createElement("p");
    containerp5.appendChild(text5);

    const text6 = document.createTextNode(`→ Realizar higienização normal dos
      dentes. (Pode escovar normalmente)`);
    const containerp6 = document.createElement("p");
    containerp6.appendChild(text6);

    text4Container.appendChild(containerp4);
    text5Container.appendChild(containerp5);
    text6Container.appendChild(containerp6);
  })

  $('#type2').click(() => {
    const text4Container = document.querySelector("#type2Text4");
    const text5Container = document.querySelector("#type2Text5");
    const text6Container = document.querySelector("#type2Text6");
    const text7Container = document.querySelector("#type2Text7");


    const text4 = document.createTextNode(`→ Após alta hospitalar deixar a criança descansar (dormir se
            quiser) não ficar acordando a criança para dar comida; Não pode
            tomar sol ou realizar atividades físicas por 48 horas (repouso por
            48 horas); Atenção, é normal a criança apresentar vômito e em
            casos de extrações ou cirurgia de freio, pode sair um pouquinho
            de sangue enquanto dorme (saliva com sangue)`);
    const containerp4 = document.createElement("p");
    containerp4.appendChild(text4);

    const text5 = document.createTextNode(`→ Após alta hospitalar dar alimentos leves para a criança comer em
            pequenas quantidades (evitar dar líquidos antes de dar algo para
            comer) dar preferencialmente alimentos gelados como sorvetes,
            picolés de fruta e Danone. Pode comer também: arroz com feijão amassadinho,
            purê de batata, etc. Não dar alimentos quentes ou duros e
            nada de exageros; Alimentação pastosa por 2 dias;`);
    const containerp5 = document.createElement("p");

    const text6 = document.createTextNode(`→ Realizar higienização normal da boca
       evitando o local da cirurgia e só realizar bochechos após 5 dias;`);
    const containerp6 = document.createElement("p");
    containerp6.appendChild(text6);

    const text7 = document.createTextNode(`→ Em caso de cirurgia de Freio: Iniciar pós operatório com fonoaudióloga, 
                  48 horas após o procedimento cirúrgico (5 sessões)`);
    const containerp7 = document.createElement("p");
    containerp7.appendChild(text7);

    text4Container.appendChild(containerp4);
    text5Container.appendChild(containerp5);
    text6Container.appendChild(containerp6);
    text7Container.appendChild(containerp7);
  })

  function clone() {
    const clone = $("#preview_obs").clone();
    clone.insertBefore("#preview_obs");
    console.log("Clone")
  }

  $("form").submit(function (e) {
    e.preventDefault();
    createFormData();
  });

  $("#btn_add_sadt").click(() => {
    const form = getNameReason();
    createNameReasonPreview(form);
    btnResetNameReason();
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

  $("#btn_add_jejum").click(() => {
    createName();
    const time = getFormJejumTime();

    const part1 = "<strong> → Jejum total a partir:";
    const part2 = time;
    const part3 = " Horas ( Não é permitido dar água, leite ou alimentos. ) </strong>";
    $("#hr_jejum").html(part1 + "<div class='time_jejum'>" + part2 + "</div>" + part3);
    btnResetJejum();
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
    console.log("chamdo Clone")

    clone()
    console.log("retorno Clone")

    window.print();
    console.log("print")

  });

  $("#btn_new_print").click(() => {
    $(".removeForNewPrint").remove();
  });
});
