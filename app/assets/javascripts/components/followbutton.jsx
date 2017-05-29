
class Followbutton extends React.Component {

  constructor (props) {
    console.log('once?');
    super(props);
    this.state = {following: this.props.following}
  }

  follow () {
    console.log('bye');
    this.setState({
      following: true
    })
  }

  unfollow () {
    console.log('hi')
    this.setState({
      following: false
    })
  }

  render () {
    console.log(this.state.following);
    return (
      <div>
        {this.props.user.id !== this.props.userid && this.state.following === false && <span><a href='#' onClick={() => this.follow()}>Follow</a></span> }
        {this.props.user.id !== this.props.userid && this.state.following === true && <span><a href='#' onClick={() => this.unfollow()}>Unfollow</a></span> }
      </div>
    )
  }

}
