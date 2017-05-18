

class ShareInput extends React.Component {

  render() {
    return (
  <div>
      <form onSubmit={(e)=>this.props.createPost(e)}>
        <textarea rows='8' cols='80' />
        <button>Post</button>
      </form>
  </div>
    )
  }

}
