
class Profiletop extends React.Component {

  constructor (props) {
    console.log('twice?');
    super(props)
    this.state = {
      following: this.props.relationshipData,
    }
  }

  follow () {
    console.log('bye');
    this.setState({
      following: true
    })

    $.ajax({
      url: `/relationships`,
      type: 'POST',
      data: {followed_id: this.props.user.id},
      success: (data) => {

      }
    })

  }

  unfollow () {
    console.log('hi')
    this.setState({
      following: false
    })

    $.ajax({
      url: `/relationships/${this.props.relationshipID}`,
      type: 'DELETE',
      data: {followed_id: this.props.user.id,
            relationID: this.props.relationshipID},
      success: (data) => {

      }
    })
  }

  render () {
    console.log(this.state.following);
    console.log(this.props.user.bannerpic);
    return (
      <div>
      <div style={{backgroundImage: "url("+this.props.user.bannerpic+")", height: "15em", maxWidth: "800px", margin: "0 auto", backgroundSize: "cover", overflow: "visible", border: "1px solid black"}}>
                {/* <span><img src={this.props.user.profilepic} style={{height: "11em", width: "11em"}}/></span> */}
        <div class="profilepicimage" style={{backgroundImage: "url("+this.props.user.profilepic+")", height: "10em", width: "10em", backgroundSize: "cover", position: "relative", top: "6em", overflow: "visible", zIndex: "5", border: "solid white 0.5em", left: "1em"}}>

        </div>
      </div>
      <nav>
        <ul className="profileNavList">

          <li><a onClick={this.props.toTimeline}>TimeLine</a></li>
          <li><a onClick={this.props.toAbout}>About</a></li>
          {this.props.user.id !== this.props.userid && <li><a href={"/messages/" + this.props.user.id}>Message</a></li>}
          <li>
            {this.props.user.id !== this.props.userid && this.state.following === false &&
              <span><a onClick={() => this.follow()}>Follow</a></span> }
              {this.props.user.id !== this.props.userid && this.state.following &&
                <span><a onClick={() => this.unfollow()}>Unfollow</a></span>}
              </li>
              {this.props.user.id !== this.props.userid && <li><a href="/users/edit">Edit Profile</a></li>}

            </ul>
          </nav>
    </div>
    )
  }

}
