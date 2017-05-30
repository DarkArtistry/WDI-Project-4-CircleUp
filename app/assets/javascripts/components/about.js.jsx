var About = React.createClass({

  render: function() {
    return <div className="aboutContainer">
      <div className="aboutfields"><h3 className="aboutname">{this.props.user.firstname} {this.props.user.lastname}</h3></div>
      {this.props.user.country && <div className="aboutfields"><h4>Country : {this.props.user.country}</h4></div>}
      {this.props.user.education && <div className="aboutfields"><h4> Education: {this.props.user.education}</h4></div>}
      <div className="aboutfields"><h4>Industry: {this.props.user.industry}</h4></div>
    <div className="aboutfields"><h4>Occupation: {this.props.user.occupation}</h4></div>
      {this.props.user.company && <div className="aboutfields"><h4>Company: {this.props.user.company}</h4></div>}
    </div>
  }
});
