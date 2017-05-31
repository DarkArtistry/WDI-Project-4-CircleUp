
class ShareInput extends React.Component {

  renderUrl (e) {
    console.log('hello world!')

    console.log(e.target.value)

    var string = ''

      string = $('#shareBox').val()
      var new_arr = string.split(' ')

      new_arr.forEach(function (word) {
        var exp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        var result = exp.test(word)
        var request = new Request('https://github.com/github');

        if (result) {
          console.log('found an URL')
          $.ajax({
          	url: "//api.linkpreview.net",
          	dataType: 'jsonp',
          	data: {q: word, key: '592e235fda0e16c0edc37f0857f16a191369763104d33'},
          	success: function (answer) {
          		console.log(answer)

              $('#previewdiv').append(`<a href="${answer.url}"><img src="${answer.image}" style="width: 25%; display: inline-block;" /></a>`)
              $('#previewdiv').append(`<a href="${answer.url}"><div style="display: inline-block;"><h2>${answer.title}</h2></div></a>`)
              $('#previewdiv').append(`<a href="${answer.url}"><div style="display: inline-block;">${answer.description}</div></a>`)
              $('#urlurl').val(answer.url)
              $('#urlimage').val(answer.image)
              $('#urltitle').val(answer.title)
              $('#urldescription').val(answer.description)
          	}
          })
        }
        //e.g. of what was return from thr linkpreview API
        // {title: "Stacks and Queues", description: "Arrays are one way to store lots of data, but they…lk you through implementing the three structures.", image: "", url: "https://www.codecademy.com/en/courses/stacks-and-queues/4/1"}
      })
  }

  render () {
    return (
      <div className={'shareBox'}>
        <form onSubmit={(e) => this.props.createPost(e)}>
          <div className="InputArea">
            <textarea onBlur={(e) => this.renderUrl(e)} id='shareBox' rows='5' cols='80' placeholder={'Share something'} style={{font: '18px'}} />
          </div>
          <input type="hidden" value="" id="urlurl"/>
          <input type="hidden" id="urlimage"/>
          <input type="hidden" id="urltitle"/>
          <input type="hidden" id="urldescription"/>
          <div className="InputArea">
            <div className={'postButton'}>
              <button className={'shareButton'}>Post</button>
            </div>
            <div className={'clearfix'}></div>
         </div>
          <div className="InputArea" id="previewdiv"></div>
        </form>
      </div>
    )
  }

}
