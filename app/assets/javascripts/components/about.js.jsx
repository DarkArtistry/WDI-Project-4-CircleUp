var About = React.createClass({

  render: function() {
    return <div>
      <h2>{this.props.user.firstname} {this.props.user.lastname}</h2>
      <h3>{this.props.user.country}</h3>
      <h3>{this.props.user.education}</h3>
      <h3>{this.props.user.industry}</h3>
      <h3>{this.props.user.occupation}</h3>
      <h3>{this.props.user.company}</h3>
    </div>
  }
});
