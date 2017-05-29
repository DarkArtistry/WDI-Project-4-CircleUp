
class HomepageBody extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      posts: this.props.allPost,
      postlikes: this.props.allPostlikes,
      userid: this.props.userid
    }
  }

  createPost (e) {
    e.preventDefault()
    var form = e.target
    var input = form.querySelector('textarea').value
    var allPosts = this.state.posts
    // console.log(allPosts)
    var urlURL = form.querySelectorAll('input')[0].value
    var urlImage = form.querySelectorAll('input')[1].value
    var urlTitle = form.querySelectorAll('input')[2].value
    var urlDescription = form.querySelectorAll('input')[3].value

    var newPost = {
      content: input,
      likes: 0,
      comments: [],
      user_id: this.state.userid,
      authorid: this.state.userid,
      shareuserid: this.state.userid,
      author: this.props.username,
      urlurl: urlURL,
      urlimage: urlImage,
      urltitle: urlTitle,
      urldescription: urlDescription
    }
    // console.log(allPost)
    $.ajax({
      url: '/posts',
      type: 'POST',
      data: { post: newPost },
      success: (post) => {
        // console.log('post', newPost)
        allPosts.unshift(newPost)
        this.setState({
          posts: allPosts
        })
      }
    })
  }

  deletePost (e) {
    var allPost = this.state.posts
    console.log('delete function activated!')
    console.log(e.target.className)
    console.log(e.target.id)
    console.log(this.state.posts[e.target.id])

    allPost.splice(e.target.id, 1)

    this.setState({
      posts: allPost
    })

    ajaxTarget = {
      post_id: e.target.className
    }

    $.ajax({
      url: `/posts/${e.target.className}`,
      type: 'delete',
      data: { deleteTargetPost: ajaxTarget },
      success: (post) => {
        // console.log('post', newPost)
      }
    })
  }

  addLike (e) {
    // console.log(e.target.dataset.postindex)
    var targetPost = this.state.posts[e.target.dataset.postindex]
    console.log('target post is...', targetPost)
    targetPost.likes++

    $.ajax({
      url: '/postlikes',
      type: 'POST',
      data: { postlike: targetPost },
      success: (post) => {
        this.setState({
          posts: this.state.posts
        })
      }
    })
  }

  addComment (e) {
    e.preventDefault()
    console.log('hi')
    var form = e.target
    var input = form.querySelector('input').value
    var targetPost = this.state.posts[e.target.className]
    var newComment = {
      contents: input,
      replies: [],
      likes: 0,
      username: this.props.username,
      userid: this.props.userid
    }
    console.log(targetPost)
    console.log('new comment is ' , newComment)

    var ajaxTarget = {
      id: this.state.posts[e.target.className].id,
      user_id: this.state.posts[e.target.className].id,
      content: this.state.posts[e.target.className].content,
      author_id: this.state.posts[e.target.className].author_id,
      likes: this.state.posts[e.target.className].likes,
      comments: input,
      commentor: this.state.username
    }
    // console.log(ajaxTarget)

    if (!targetPost['comments']) {
      targetPost['comments'] = [newComment]
    } else {
      targetPost.comments.push(newComment)
    }

    this.setState({
      posts: this.state.posts
    })
    $.ajax({
      url: '/comments',
      type: 'POST',
      data: { targetPost: ajaxTarget },
      success: (post) => {
      }
    })

    this.setState({
      posts: this.state.posts
    })
  }

  deleteComment (e) {
    var targetPost = this.state.posts[e.target.dataset.postindex]
    var targetComment = targetPost.comments[e.target.dataset.commentindex]
    console.log(e.target.className)
    console.log(e.target.dataset.postindex)
    var comment_index = e.target.dataset.commentindex
    targetPost.comments.splice(comment_index, 1)
    console.log(targetPost)

    $.ajax({
      url: `/comments/${e.target.className}`,
      type: 'DELETE',
      data: { targetComment: targetComment },
      success: (data) => {
      }
    })

    this.setState({
      posts: this.state.posts
    })
  }

  render () {
    // console.log('new state is',  this.state.posts)
    var allPosts = this.state.posts.map((post, index) => {
        console.log('the posts is ...', post)
      var allComments = post.comments

      return <div key={index} className={"postBox"}>
        <div>
          { post.authorid === post.shareuserid && <div className={"whoShared"}><a href={"/users/" + post.shareuserid}>{post.author}</a></div>}
          { post.authorid !== post.shareuserid && <div className={"whoShared"}><a href={"/users/" + post.shareuserid}>{post.shareuser}</a> shared a post by <a href={"/users/" + post.shareuserid}>{post.authorid}{post.author}</a>: </div>}
        </div>
        <div className={"postShared"}>
          <Post urlurl={post.urlurl} urldescription={post.urldescription} urlimage={post.urlimage} urltitle={post.urltitle} comments={post.comments} content={post.content} key={post.content + index} className={post.id} likes={post.likes} userid={this.props.userid} postuser={post.user_id} postindex={index} delete={(e) => this.deletePost(e)} />
          <div className={"likeRow"}>
          <a data-postindex={index} onClick={(e) => this.addLike(e)}>Like</a>
        </div>
        </div>
        <div className="likesandcomment">
            {post.likes !== 0 ? <div className={"noOfLikes"}>Likes : {post.likes}</div> : '' }
            {post.comments && post.comments.length > 0 &&
              allComments.sort(function(a, b) {
                a.created_at - b.created_at
              }).map((comment, commentindex) => {
                // console.log(comment)
                return <div key={comment.contents + index} className={"noOfComments"}>
                  <Comment postindex={index} username={comment.username} commentor={comment.commentor} commentid={comment.id} delete={(e) => this.deleteComment(e)} userid={this.props.userid} commentuser={comment.user_id} content={comment} likes={comment.likes} commentindex={commentindex} />
                </div>
              })
             }
      </div>
        <div>
          <form className={index} onSubmit={(e) => this.addComment(e)}>
            <input placeholder="Write a comment" className={"commentInput"} type='text' />
          </form>
        </div>
      </div>
    })

    return (
      <div>
         <ShareInput createPost={(e) => this.createPost(e)} />
         <div id="test">

         </div>
        <div>
          {allPosts}
        </div>
      </div>
    )
  }

}
