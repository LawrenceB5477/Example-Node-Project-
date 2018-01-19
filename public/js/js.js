function onClickButt() {
   var form = document.getElementById("form1");
   for (input of form.elements) {
     if (input.type != "submit") {
       input.value = "";
      }
   }
}

$(document).ready(function() {
  $(".deleteUser").on("click", deleteUser);
});

function deleteUser() {
  var confirmation = confirm("Delete User?");
  if (confirmation) {
    $.ajax({
      type: "DELETE",
      url: "/users/delete/" + $(this).data("id")
    }).done(function(response) {
    });
    window.location.replace("/root");
  } else {
    return false;
  }
}
