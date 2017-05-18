function savePost (targetPost) {

  console.log('the object is ...', targetPost)
  var newPost = Post.new()
  newPost.comments = targetPost.comments
  newPost.content = targetPost.content
  newPost.likes = targetPost.likes
  newPost.user_id = targetPost.userid
  newPost.author_id = targetPost.userid
}
