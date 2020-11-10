$(document).ready(function () {
  $("#add").click(function () {
    var lastField = $("#botonesdinamicos div:last");
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
      "' required>"
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

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: -38.00042,
      lng: -57.5562
    },
    zoom: 13,
  });
}

function secondsToString(seconds) {
  var hour = Math.floor(seconds / 3600);
  hour = (hour < 10) ? '0' + hour : hour;
  var minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10) ? '0' + minute : minute;
  return hour === '00' ? minute + " minutos" : hour + ' Horas ' + minute + " minutos";
}

let routes = null
function calculateAndDisplayRoute() {
  let menu = document.getElementById('myList');
  while (menu.firstChild) {
    menu.removeChild(menu.firstChild);
  }
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: -38.00042,
      lng: -57.5562
    },
    zoom: 12,
  });
  directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    });
  var pointa = document.getElementById("puntoa").value;
  var pointb = document.getElementById("puntob").value;
  var optimize = document.getElementById("optimize").checked;
  var inputFormDiv = document.getElementById('botonesdinamicos');
  var divForminput = inputFormDiv.getElementsByTagName('div');
  var count = inputFormDiv.getElementsByTagName('div').length;
  var waypointsinput = [];
  for (var i = 1; i <= count; i++) {
    var obj = {
      'location': document.getElementById('aux' + i).value
    }
    waypointsinput.push(obj);
  }
  directionsService.route({
    origin: pointa,
    optimizeWaypoints: optimize,
    destination: pointb,
    travelMode: google.maps.TravelMode.DRIVING,
    waypoints: waypointsinput

  },
    function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        routes = response.routes
        for (var i = 0; i <= response.routes[0].legs.length; i++) {
          var node = document.createElement("LI");
          var nodeP1 = document.createElement("P");
          var nodeP2 = document.createElement("P");
          var nodeP3 = document.createElement("P");

          var textnode = document.createTextNode("Desde : " + response.routes[0].legs[i].start_address);
          var textnode1 = document.createTextNode("Hasta : " + response.routes[0].legs[i].end_address);
          var textnode2 = document.createTextNode("\nDistancia : " + response.routes[0].legs[i].distance.text + "\n Duracion : " + response.routes[0].legs[i].duration.text);
          nodeP1.appendChild(textnode);
          nodeP2.appendChild(textnode1);
          nodeP3.appendChild(textnode2);

          node.appendChild(nodeP1)
          node.appendChild(nodeP2)
          node.appendChild(nodeP3)
          document.getElementById("myList").appendChild(node);
          var total = document.getElementById("total");
          var currentTotal = total.getAttribute("data-value")
          total.removeAttribute("data-value")
          total.setAttribute("data-value", parseInt(currentTotal) + response.routes[0].legs[i].duration.value)
          const newnode = document.createElement("div");
          newnode.textContent = "Duración total: " + secondsToString(parseInt(total.getAttribute("data-value")));
          newnode.setAttribute("data-value", parseInt(currentTotal) + response.routes[0].legs[i].duration.value)
          newnode.setAttribute("id", "total")

          document.getElementById('container').replaceChild(newnode, total);

          var totalDistance = document.getElementById("distance");
          var currentTotalDistance = totalDistance.getAttribute("data-value")
          console.log(currentTotalDistance,  response.routes[0].legs[i].distance.value)
          totalDistance.removeAttribute("data-value")
          totalDistance.setAttribute("data-value", parseInt(currentTotalDistance) + response.routes[0].legs[i].distance.value)
          const newnodeDistance = document.createElement("div");
          newnodeDistance.textContent = "Distancia total: " + (parseInt(totalDistance.getAttribute("data-value")) / 1000) + " Km";
          newnodeDistance.setAttribute("data-value", parseInt(currentTotalDistance) + response.routes[0].legs[i].distance.value)
          newnodeDistance.setAttribute("id", "distance")

          document.getElementById('container').replaceChild(newnodeDistance, totalDistance);
        }
      } else {
        window.alert("Por favor ingrese los nombres correctamente.");
      }
    });
}
initMap();