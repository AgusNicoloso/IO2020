$(document).ready(function () {
  $("#add").click(function () {
    var lastField = $("#formulario div:last");
    var intId =
      (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var fieldWrapper = $('<div id="field' + intId + '"/>');
    fieldWrapper.data("idx", intId);
    var fName = $("<input type='text' placeholder='Punto nro " + intId + "'>");
    var removeButton = $(
      '<input type="button" class="btn btn-danger" value="Eliminar" />'
    );
    removeButton.click(function () {
      $(this).parent().remove();
    });
    fieldWrapper.append(fName);
    fieldWrapper.append(removeButton);
    $("#formulario").append(fieldWrapper);
  });
});
