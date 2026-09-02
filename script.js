$(document).ready(function () {
  $(".fieldset_medic, .field_buttons, .field_text").hide();

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

  $("#field_check").on("click", "input[type=checkbox]", (event) => {
    let check = event.target.value;
    console.log(check);
    if (check) {
      console.log("true");
      check = "off";
    }
    console.log(check);
  });

  $(".fieldset_info").on("click", "button[type=reset]", (event) => {
    event.preventDefault();
    $(".fieldset_info>input, .fieldset_info>select").val("");
    $("#date_field").val("0000-00-00");
    $("#time_field").val("00-00");
    $("#time_field").val("00-00");
  });

  $(".fieldset_medic").on("click", "button[type=reset]", (event) => {
    event.preventDefault();
    $(".fieldset_medic input").val("");
  });

  $("form").submit(function (e) {
    e.preventDefault();
    submitForm();
  });

  function submitForm() {
    const formData = new FormData(document.querySelector("form"));
    formData.forEach((element) => {
      console.log(element);
    });
  }

  $("#btn_submit_info").click((e) => {
    e.preventDefault();
  });

  $("#btn_submit_medic").click((e) => {
    e.preventDefault();
  });
});
