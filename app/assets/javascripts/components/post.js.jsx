
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
    console.log(this.state)
    return (
      <div>

          {this.state.content.split('\n').map((item, index) => { return <span key={index}>{item}<br /></span> })}

      </div>
    )
  }

}
