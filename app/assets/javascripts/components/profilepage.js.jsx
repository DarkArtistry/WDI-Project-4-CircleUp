
class Profilepage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      btmstate: <Profilemain userid={this.props.userid} allPost={this.props.allPost} allPostlikes={this.props.allPostlikes} user={this.props.user.id} />
    }
  }

  toYoutube() {
    this.setState({
      btmstate: <Youtube/>
    })
  }

  toTimeline () {
    console.log('toTimeline Triggered!')
    this.setState({
      btmstate: <Profilemain userid={this.props.userid} allPost={this.props.allPost} allPostlikes={this.props.allPostlikes} user={this.props.user.id} />
    })
  }

  toAbout () {
    console.log('toAbout Triggered!')
    this.setState({
      btmstate: <About user={this.props.user} />
    })
  }

  render () {
    let testState = this.state.topstate
    return (
      <div>
        <Profiletop relationshipID={this.props.relationshipID} user={this.props.user} toYoutube={() => this.toYoutube()} userid={this.props.userid} toTimeline={() => this.toTimeline()} toAbout={() => this.toAbout()} relationshipData={this.props.relationshipData} />
        {this.state.btmstate}
      </div>
    )
  }

}
