{
    // Method to submit form data for new comment with AJAX
    let createComment = function() {
        $('#posts-list-container').on('submit', '.add-comment-form', function(e) {
            e.preventDefault();
            let username = $('#profile-dropdown').text();

            $.ajax({
                type: 'post',
                url: '/comments/create-comment',
                data: $(e.target).serialize(),
                success: function(data) {
                    let newComment = newPostDOM(data.data.comment, username);
                    let commentsList = $(e.target).parent().parent().find('.comments-list');
                    console.log(data);
                    $(newComment).appendTo(commentsList).hide().slideDown(600);
                }, error: function(err) {
                    console.log(err, responseText);
                }
            })
            .done(function() {
                new Noty({
                    text: "Comment added successfully",
                    type: 'success',
                    theme: 'relax',
                    timeout: 2000
                }).show();
            })

        });
    }

    // Method to display a post in DOM 
    let newPostDOM = function(c, username){
        return $(`
        <div class="comment-item" id="${c._id}">
            <div class="comment-item-user">${username}</div>
            <div class="comment-item-content">${c.content}</div>
            
            <div class="actionbar-container">
                <!-- Likes -->
                <i class="far fa-thumbs-up like-button" href="/likes/toggle/?id=${c._id}&type=Comment">
                    <span>0</span>
                </i>
                <!-- Delete -->
                <a class="delete-comment-button" href="/comments/destroy-comment/${c._id} ">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </div>

        </div>
        
        `)
    }

    let deleteComment = function() {
        $('#posts-list-container').on('click', '.delete-comment-button', function(e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url:  $(e.target).parent().attr("href"),
                success: function(data) {
                    console.log('delete:');
                    console.log(data);
                    // console.log(`#${data.data.post_id}`)
                    $(`#${data.data.comment_id}`).fadeTo(1000, 0.01, function(){ 
                        $(this).slideUp(150, function() {
                            $(this).remove(); 
                        }); 
                    });
                }, error: function(err) {
                    console.log("Error: ", err.responseText);
                }
            })
            .done(function() {
                new Noty({
                    text: "Comment deleted successfully",
                    type: 'success',
                    theme: 'relax',
                    timeout: 2000
                }).show();
            })
        })
    }
    
    createComment();
    deleteComment();
}
