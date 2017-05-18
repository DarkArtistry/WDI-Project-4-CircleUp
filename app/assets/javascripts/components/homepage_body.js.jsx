

class HomepageBody extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      posts: [],
      userid: this.props.userid
    }
  }

  createPost (e) {
    e.preventDefault()
    let form = e.target
    let input = form.querySelector('textarea').value
    let allPost = this.state.posts
    // console.log(allPost)
    let newPost = {
      content: input,
      likes: 0,
      comments: [],
      userid: this.state.userid
    }
    allPost.push(newPost)
    this.setState({
      posts: allPost
    })
    // console.log(allPost)

    savePost(newPost)


  }

  addLike (e) {
    // console.log(e.target.value)
    let targetPost = this.state.posts[e.target.value]
    targetPost.likes++

    this.setState({
      posts: this.state.posts
    })
  }

  addComment (e) {
    e.preventDefault()
    let form = e.target
    let input = form.querySelector('input').value
    // console.log(input)
    let targetPost = this.state.posts[e.target.className]
    let newComment = {
      content: input,
      replies: [],
      likes: 0
    }
    targetPost.comments.push(newComment)

    this.setState({
      posts: this.state.posts
    })
  }

  render () {
    let allPost = this.state.posts.map((post, index) => {
  // console.log(post);
    let allComments = post.comments

    return <div key={index}>
      <Post comments={post.comments} content={post.content} key={index} likes={post.likes} />
      <button value={index} onClick={(e) => this.addLike(e)}>Like</button>
      {post.likes !== 0 ? <div>Likes : {post.likes}</div> : '' }
      {post.comments.length > 0 &&
          allComments.map((comment, commentindex) => {
            return <div key={commentindex}><Comment content={comment} /></div>
          })
        }
      <div>
        <form className={index} onSubmit={(e) => this.addComment(e)}>
          <input type='text' />
        </form>
      </div>
    </div>
  })
    return (
      <div>
        <ShareInput createPost={(e)=>this.createPost(e)}/>
        <div>
          {allPost}
        </div>
      </div>
    )
  }

}
