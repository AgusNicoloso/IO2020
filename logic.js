$(document).ready(function () {
  $("#add").click(function () {
    var lastField = $("#botonesdinamicos div:last");
    console.log(lastField);
    var intId =
      (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var fieldWrapper = $(`
  <div  style='margin-top: 10px;' class='input-group mb-3' id='field${intId}' />`);
    fieldWrapper.data("idx", intId);
    var fName = $(
      "<input type='text' class='form-control' id='aux" +
        intId +
        "'" +
        "placeholder='Punto intermedio numero " +
        intId +
        "'>"
    );
    var removeButton = $(
      `<a class="input-group-append"> <button class="btn btn-danger" type="button">Eliminar</button> </a>`
    );
    removeButton.click(function () {
      $(this).parent().remove();
    });
    fieldWrapper.append(fName);
    fieldWrapper.append(removeButton);
    $("#botonesdinamicos").append(fieldWrapper);
  });
});
