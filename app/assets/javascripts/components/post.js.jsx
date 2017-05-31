
class Post extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      content: this.props.content,
      comments: this.props.comments,
      replies: []
    }
  }
  render () {
    // console.log('post component', this.state.content)
    // console.log(this.state)
    return (
      <div className={"onlyPostShared"}>
        <div className={"postSharedContent"}>
            {this.state.content.split('\n').map((item, index) => { return <span key={index}>{item}<br /></span> })}
            <div className="deletePost">
              {this.props.userid === this.props.postuser && <span><a className={this.props.className} onClick={this.props.delete} id={this.props.postindex}>Delete Post</a></span>}
            </div>
        </div>
        {console.log('image is ', this.props.urlimage)}
        {this.props.urlurl && <a href={this.props.urlurl}><div><img className="PostImage" src={"" + this.props.urlimage} /><div ><h2>{this.props.urltitle}</h2></div><div>{this.props.urldescription}</div></div></a>}
      </div>
    )
  }

}
