# Circle Up

![CircleUp](https://s-media-cache-ak0.pinimg.com/originals/63/98/f6/6398f61cdd8d9ea570d48b7c68d33132.png)

[Expand Your Social Circle Now!](https://shielded-thicket-10055.herokuapp.com/)

### Inspired LinkedIn & Success At School

***
### Development

* [ruby-on-rails](http://rubyonrails.org/)
* [react](https://facebook.github.io/react/)
* [react-rails](https://github.com/reactjs/react-rails)
* [devise](https://github.com/plataformatec/devise)
* [redis Heroku](https://devcenter.heroku.com/articles/redistogo)
* [cloudinary](https://cloudinary.com/users/login)
* [proc.link](http://www.proc.link/)
* [actioncable](https://www.learnenough.com/action-cable-tutorial)
* [500pix](https://500px.com/)
* [jQuery-Autocomplete](https://jqueryui.com/autocomplete/)
* [Bootstrap](http://getbootstrap.com/)

* ruby, jQuery, Ajax


***
### Workings

Step 1 FlowChart
![FlowChart](/app/assets/images/componentBreakDown.jpg)

Step 2 ERD
![ERD](https://github.com/DarkArtistry/WDI-Project-4-CircleUp/blob/master/CircleUpERD.png?raw=true)

Step 3 MVP
![MVP](https://github.com/DarkArtistry/WDI-Project-4-CircleUp/blob/master/MVP.png?raw=true)

Step 4 Database
![Database](/app/assets/images/Database.png)

Start Project, first with connecting to the database and install react-rails then login page!

***
### Hiccups & Techniques

#### 1. Understanding the many ways of using react with rails

```
<%= react_component("HelloWorld", { greeting: "Hello" }) %>
```

#### 2. React-Component (Esp w/o react-router)

```  
constructor (props) {
  super(props)
  this.state = {
    btmstate: <Profilemain userid={this.props.userid} allPost={this.props.allPost} allPostlikes={this.props.allPostlikes} user={this.props.user.id} />
  }
  ```

#### 3. Text Area (Line Breaks)

```
<div className={"onlyPostShared"}>
  <div className={"postSharedContent"}>
      {this.state.content.split('\n').map((item, index) => { return <span key={index}>{item}<br /></span> })}...

```

#### 4. AjaxS

There were many Ajax that I used during thing project

```
createPost (e) {
  e.preventDefault()
  let form = e.target
  let input = form.querySelector('textarea').value
  let allPosts = this.state.posts
  // console.log(allPosts)
  let urlURL = form.querySelectorAll('input')[0].value
  let urlImage = form.querySelectorAll('input')[1].value
  let urlTitle = form.querySelectorAll('input')[2].value
  let urlDescription = form.querySelectorAll('input')[3].value

  let newPost = {
    content: input,
    likes: 0,
    comments: [],
    user_id: this.state.userid,
    authorid: this.state.userid,
    shareuserid: this.state.userid,
    author: this.props.username,
    urlurl: urlURL,
    urlimage: urlImage,
    urltitle: urlTitle,
    urldescription: urlDescription
  }
  // console.log(allPost)
  $.ajax({
    url: '/posts',
    type: 'POST',
    data: { post: newPost },
    success: (post) => {
      // console.log('post', newPost)
      allPosts.unshift(newPost)
      this.setState({
        posts: allPosts
      })
    }
  })
}
```
Below are for the link previews:

Initially i used Linkpreview.net But theie request is made in http which creates CORS issues because my server request in https but receives a http response instead, it works on my local host but not on deployment. and I didn't had the NPM package that louisa used in her express project 2
```
var target = 'https://www.google.com';

$.ajax({
	url: "http://api.linkpreview.net",
	dataType: 'jsonp',
	data: {q: target, key: 123456},
	success: function (answer) {
		console.log(answer);
	}
});
```
thus instead i used proclink
```
renderUrl (e) {
  var string = ''

    string = $('#shareBox').val()
    var new_arr = string.split(' ')

    new_arr.forEach(function (word) {
      var exp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      var result = exp.test(word)
      var request = new Request('https://github.com/github');

      if (result) {
        console.log('found an URL')
        var word2 = encodeURIComponent(word)
        $.ajax({
          url: "https://api.proc.link/oembed?url=" + word2,
          success: function (answer) {
            console.log(answer)

            $('#previewdiv').append(`<a href="${answer.url}"><img src="${answer.thumbnail_url}" style="width: 25%; display: inline-block;" /></a>`)
            $('#previewdiv').append(`<a href="${answer.url}"><div style="display: inline-block;"><h2>${answer.title}</h2></div></a>`)
            $('#previewdiv').append(`<a href="${answer.url}"><div style="display: inline-block;">${answer.description}</div></a>`)
            $('#urlurl').val(answer.url)
            $('#urlimage').val(answer.thumbnail_url)
            $('#urltitle').val(answer.title)
            $('#urldescription').val(answer.description)
          }
        })
      }
}
```

#### 5. 2-Way Action Cable

First, set individual users to listen to a channel relative to their individual id

```
class ConversationChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "conversation_channel#{current_user.id}"
  end
end
in cable.js ...
(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);

```

After the broadcast, in the conversation.js i check if he is the sender or receiver and append the message to their respective chat boxes
```
received: function (data) {

  var $msg = $(`<div style="display: block; position: relative; float: left; clear:both; background-color: white; border-radius:0.5em; padding:0.2em; margin:0.5em; box-shadow: 10px 10px 5px #888888; border: grey solid 0.05em;"><p>${data.message.content}</p></div>`)

  var $msg2 = $(`<div style="display: block; position: relative; float: right; clear:both; background-color: rgb(17, 217, 61); border-radius:0.5em; padding:0.2em; margin:0.5em; box-shadow: 10px 10px 5px #888888; border: grey solid 0.05em;"><p>${data.message.content}</p></div>`)
  console.log(data)
  console.log(data.message)

  if (data.sender === true) {
    var $targetbox = $(`#message${data.message.sender_id}${data.message.receiver_id}`)
    $targetbox.append($msg2)
  } else {
    var $targetbox = $(`#message${data.message.receiver_id}${data.message.sender_id}`)
    $targetbox.append($msg)
  }
  var $targetContentBox = $(`.MessageMainContent`)
  $targetContentBox.animate({ scrollTop: $targetContentBox.prop("scrollHeight")}, 1000)
  // return alert(JSON.stringify(data))
}
```

#### 6. Cloudinary & Industry pictures

I used the server side uploading method, which requires me to create a customized devise user controller

```
def update
  super
  puts 'omgggggggggg'
  puts params.inspect
  @User = User.where(email: params["user"]["email"])[0]


  if params[:user][:profilepic]
    puts params[:user][:profilepic].inspect
    uploaded_file = params[:user][:profilepic].path
    cloudnary_file = Cloudinary::Uploader.upload(uploaded_file)
    @User.profilepic = cloudnary_file['url']
  end

  if params[:user][:bannerpic]
    uploaded_file2 = params[:user][:bannerpic].path
    cloudnary_file2 = Cloudinary::Uploader.upload(uploaded_file2)
    @User.bannerpic = cloudnary_file2['url']
  end
  @User.save
end
```

### Additional things I will do

* Add in Youtube APIs
* Set state for the like button
* make the messaging into one single component that displays usernames on the left and conversation on the right
* Add in Notification for my messagings


### Credits

* Prima
* YiSheng
* Sharona
* Jon
* Maria
* Ian
* Raymond
* Robin
* Louisa
