// jQuery Mobile ready
$(document).on("pagecreate", function () {

  $("#contactForm").submit(function (e) {
    e.preventDefault();

    let name = $("#name").val();
    let email = $("#email").val();
    let message = $("#message").val();

    if (name === "" || email === "" || message === "") {
      alert("Please fill all fields!");
      return;
    }

    alert("Form Submitted Successfully!");

    // Clear form
    $("#contactForm")[0].reset();
  });

});