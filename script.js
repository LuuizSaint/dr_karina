$(document).ready(function () {
  $(".fieldset_medic, .field_buttons").hide();

  $("#btn_info").click(function (e) {
    $(".fieldset_info").slideToggle(700);
    $(".fieldset_medic").slideUp(700);
    $(".field_buttons").slideUp(700);
  });
  $("#btn_medic").click(function (e) {
    $(".fieldset_medic").slideToggle(700);
    $(".fieldset_info").slideUp(700);
    $(".field_buttons").slideUp(700);
  });
  $("#btn_imp").click(function (e) {
    $(".field_buttons").slideToggle(700);
    $(".fieldset_medic").slideUp(700);
    $(".fieldset_info").slideUp(700);
  });

  $("#radio_field").on("click", "input", (event) => {
    const radio = event.target.value;
  });

  $(".fieldset_info").on("click", "button[type=reset]", (event) => {
    event.preventDefault();
    $(".fieldset_info>input, .fieldset_info>select").val("");
    $("#date_field").val("0000-00-00");
    $("#time_field").val("00-00");
  });

  $(".fieldset_medic").on("click", "button[type=reset]", (event) => {
    event.preventDefault();
    $(".fieldset_medic input").val("");
  });

  $("form").submit(function (e) {
    e.preventDefault();
    const formData = new FormData(document.querySelector("form"));
    formData.forEach((element) => {
      console.log(element);
    });
  });
});
