{
    // Method to submit form data for new post with AJAX
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create-post',
                data: newPostForm.serialize(),
                success: function(data) {
                    let newPost = newPostDOM(data.data.post);
                    console.log(data);
                    // $('#posts-list-container').prepend(newPost);
                    $(newPost).prependTo('#posts-list-container').hide().slideDown(600);
                }, error: function(err) {
                    console.log(err, responseText);
                }
            })
            .done(function() {
                new Noty({
                    text: "Post added successfully",
                    type: 'success',
                    theme: 'relax',
                    timeout: 2000
                }).show();
            })

        });
    }

    // Method to display a post in DOM 
    let newPostDOM = function(p){
        return $(`<div class="post" id="${p._id}">
                    <div class="posted-by">${p.user.name}</div>
                    <div class="created-at">moment(${p.createdAt}).format( \"Do MMM \'YY, h:mm a\")</div>
                    <div class="post-content">${p.content}</div>
                    <div class="delete-button" title="Delete">
                        <a href="/posts/destroy-post/${p._id}">
                            Delete post<i class="fas fa-trash-alt"></i>
                        </a>
                    </div>
                    <div class="add-comments">
                        <form action="/comments/create-comment" method="POST">
                            <div class="input-group mb-3">
                                <input class="form-control shadow-none add-comment-input" type="text" name="content" placeholder="Add a comment..." required>
                                <input type="hidden" name="post" value="${p._id}">
                                <div class="input-group-append">
                                    <input class="btn btn-primary input-group-append" type="submit" value="Add">
                                </div>
                            </div>
                        </form>
                    </div>
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse<%= p._id %>" aria-expanded="true" aria-controls="${p._id}">
                        ${p.comments.length} Comments
                    </button>
                    <div id="collapse${p._id}" class="collapse">
                        <div class="comments-list">
                        </div>
                    </div>
                </div>`)
    }

    let deletePost = function() {
        $('.delete-post-button').click(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url:  $(e.target).attr("href"),
                success: function(data) {
                    console.log('delete:');
                    console.log(data);
                    console.log(`#${data.data.post_id}`)
                    $(`#${data.data.post_id}`).fadeTo(1000, 0.01, function(){ 
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
                    text: "Post deleted successfully",
                    type: 'success',
                    theme: 'relax',
                    timeout: 2000
                }).show();
            })
        })
    }
    
    createPost();
    deletePost();
}
