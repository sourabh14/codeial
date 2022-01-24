{
    if ($('.comment-button').children().text() == 0) {
        $('.comment-button').children().text("");
    }
    
    $('.like-button').click(function(event) {
        var val = parseInt($(this).text(), 10);
        if ($(this).hasClass('far')) {
            val++;
            $(this).attr("class","fas fa-thumbs-up like-button");
            // User has liked (insert userId, itemId into Likes table)
        } else {
            val--;
            $(this).attr("class","far fa-thumbs-up like-button");
            // User removed his like (delete from table Likes where userId and itemId)
        }
  
        $(this).children().text(val);
    })

    
}