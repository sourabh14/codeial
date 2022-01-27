{
    console.log("friendship loaded");
    $('#friend-button').click( function(e) {
        if ($(this).html() == 'Add as a friend') {
            $.ajax({
                type: 'POST',
                url: $(this).attr('href'),
                success: (data) => {
                    $(this).removeClass("btn-primary").addClass("btn-outline-primary");
                    $(this).html(data.message);
                }, error: function(err) {
                    console.log(err, responseText);
                }
            })
            .done((data) => {
                new Noty({
                    text: "Friend request sent successfully",
                    type: 'success',
                    theme: 'relax',
                    timeout: 2000
                }).show();
            })
            .fail(function(errData) {
                console.log('Error in completing the request');
            });
        } else if ($(this).html() == 'Approve friend request') {
            $.ajax({
                type: 'POST',
                url: $(this).attr('href'),
                success: (data) => {
                    $(this).removeClass("btn-outline-primary").addClass("btn-success");
                    $(this).html(data.message);
                }, error: function(err) {
                    console.log(err, responseText);
                }
            })
            .done((data) => {
                new Noty({
                    text: "Friend request approved",
                    type: 'success',
                    theme: 'relax',
                    timeout: 2000
                }).show();
            })
            .fail(function(errData) {
                console.log('Error in completing the request');
            });
        }   
        console.log("friend button clicked");
        
    });
}