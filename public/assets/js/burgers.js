// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".devour-btn").on("click", function(event) {
      let id = $(this).data("id");
  
      let newStatus = {
        devoured: true
      };
  
      // Send the PUT request.
      $.ajax(`/api/burgers/${id}`, {
        type: "PUT",
        data: newStatus
      }).then(
        function() {
          console.log("burger has been devoured");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".burger-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#new-burger").val().trim(),
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    $(".burger-delete").on("click", function() {
        var id = $(this).data('id');
        $.ajax(`/api/burgers/${id}`, {
            type: "DELETE",
        }).then(
            function() {
                console.log("deleted burger");
                location.reload();
            }
        )
    })
  });
  