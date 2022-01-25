{
    if ($('.comment-button').children().text() == 0) {
        $('.comment-button').children().text("");
    }
    
    $('#posts-list-container').on('click', '.like-button', function(e) {
        $.ajax({
            type: 'POST',
            url: $(this).attr('href'),
        })
        .done((data) => {
            var likesCount = parseInt($(this).text(), 10);
            if ($(this).hasClass('far')) {
                // User has liked (insert userId, itemId into Likes table)
                likesCount++;
                $(this).attr("class","fas fa-thumbs-up like-button");
            } else {
                // User removed his like (delete from table Likes where userId and itemId)
                likesCount--;
                $(this).attr("class","far fa-thumbs-up like-button");
            }
            $(this).children().text(likesCount);
        })
        .fail(function(errData) {
            console.log('error in completing the request');
        });
        
    })

}