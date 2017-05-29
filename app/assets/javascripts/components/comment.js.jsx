class Comment extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      content: this.props.content.contents,
      replies: [],
      likes: this.props.likes
    }
  }

  addCommentLike (e) {
    // console.log(e.target.value)
    this.state.likes++

    var ajaxTarget = {
      comment_id: e.target.dataset.valuelike
    }

    $.ajax({
    url: '/commentlikes',
    type: 'POST',
    data: { targetCommentLike: ajaxTarget },
      success: (post) => {
      }
    })
    this.setState()
  }

  render () {
    return (
      <div>
        <div className="commenterLink"><a href={"/users/" + this.props.userid}>{this.props.username}</a> : {this.state.content}</div>

        {this.props.userid === this.props.commentuser && <span className={"deleteComment"}><a onClick={this.props.delete} className={this.props.commentid} data-postindex={this.props.postindex} data-commentindex={this.props.commentindex}>Delete Comment</a></span>}

        {this.state.likes !== 0 ? <div>Likes : {this.state.likes}</div> : ''}
        <div className="commenterLink"><a data-valuelike={this.props.commentid} onClick={(e) => this.addCommentLike(e)}>Like</a></div>
      </div>
    )
  }
}
