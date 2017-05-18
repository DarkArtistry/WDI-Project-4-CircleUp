class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content.content,
      replies: [],
      likes: 0
    }
  }

  addLike (e) {
    console.log(e.target.value)
    this.state.likes++

    this.setState({
      posts: this.state.posts
    })
  }

  render () {
    return (
      <div>
        <div>{this.state.content}</div>
        {this.state.likes !==0? <div>Likes : {this.state.likes}</div> : ''}
        <button onClick={(e)=>this.addLike(e)}>Like</button>
      </div>
    )
  }

}
