// modal
function saveModal() {
  $('#exampleModal').modal('toggle');
}

// create, edit, update of form 
$(document).ready(function () {
  $("#register-form").submit(function (event) {
    event.preventDefault();
    const name = $('#exampleInputName').val();
    const email = $('#exampleInputEmail1').val();
    const password = $('#exampleInputPassword1').val();
    const dataForm = {
      name: name,
      email: email,
      password: password
    }
    window.localStorage.setItem("dataForm", JSON.stringify(dataForm));
  })

})

$('#myButton').on('click', function () {
  var $btn = $(this).button('complete')
  // business logic...
  $btn.button('loading')
})