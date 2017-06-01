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

Step 1
![FlowChart](/app/assets/images/componentBreakDown.jpg)

Step 2
![ERD](https://github.com/DarkArtistry/WDI-Project-4-CircleUp/blob/master/CircleUpERD.png?raw=true)

Step 3
![MVP](https://github.com/DarkArtistry/project2/blob/master/Untitled%20Diagram.png?raw=true)

Step 3

Start Project, first with connecting to the database and install express then login page!

***
### Hiccups & Techniques

#### 1. Authentication with passport

#### 2. Deep population

```  
User.findById(req.params.id).populate({
    path: 'articles',
    populate: {
      path: 'user',
      model: 'User'
    },
    populate: {
      path: 'coments',
      model: 'Coment',
      populate: {
        path: 'user',
        model: 'User'
      }
    }
  })
  ```

This made it even clearer
[Deep Population Techniques](http://frontendcollisionblog.com/mongodb/2016/01/24/mongoose-populate.html)

#### 3. Text Area

```
<div>
  <p class="articlefields">
    <%- news.content.replace(/\r\n/g, "<br>") %>
    <br>
    Journalist:
    <a class="profilelink" href="/profile/<%- news.user.id %>">
      <%- news.user.firstname %>
    </a>
  </p>
</div>
```

#### 4. Ajax

So you have to declare a script, I declared it in my layouts to call a public folder to run my script.js, where one of the on click event triggers my Ajax

```
var $bookmarkbtn = $('.bookmarkbtn')

$bookmarkbtn.on('click', function () {
  var thebutton = $(this)
  var $bookmarkid = $(this).val()
  $.ajax({
    type: 'PUT',
    // url: 'https://still-mesa-80925.herokuapp.com/bookmark.json',
    url: 'http://localhost:5000/bookmark.json',
    data: {
      articleid: $bookmarkid
    }
  }).done(function (data) {
    console.log('I am from ajax', data)

    if (thebutton.val() === data) {
      thebutton.removeClass('bm')
    } else {
      thebutton.addClass('bm')
    }

  })
})
```
```
function bookmarkJson (req, res) {
  var userArticles = req.user.articles.toString().split(',')
  var currentArticle = req.body.articleid.toString()
  var currentUser = req.user
  if (userArticles.includes(currentArticle)) {
    var index = req.user.articles.indexOf(req.body.articleid)
    currentUser.articles.splice(index, 1)
    currentUser.save(function (err, data) {
      res.json(currentArticle)
    })
  } else {
    currentUser.articles.unshift(currentArticle)
    currentUser.save(function (err, data) {
      res.json(data)
    })
  }
}
```
Which leads to the saving error I had

#### 5. Saving - By Passing Pre-save w/ my User model

```
userSchema.pre('save', function (next) {
  var user = this
  if(!user.isModified('password')) return next()
  var hash = bcrypt.hashSync(user.password, 10)
  user.password = hash
  next()
})
```

Later I learn that i could do something like this:
```
.delete((req, res) => {
  Business.findByIdAndUpdate(req.user.business, {$pull: {menu: req.body.id}}, (err, data) => {
    if (err) {
      req.flash('error', 'There was an error finding your business. Please try again.')
      return res.redirect('back')
    }
    req.flash('success', 'Your menu item was successfully removed.')
    res.redirect('/business/dashboard')
  })
})
```

#### 6. Finally The Newspaper Feel !

I was introduced to [Mansory](http://masonry.desandro.com/#install)

With this i was able to make use of his function to guide my css to have a 'jaggered' feel.

In  my ejs I will need :
* grid Div
* grid-size div
* grid-item div

Run this script in my layouts
```
<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
```
```
var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});
})
```

### Additional things I will do

* Implement more APIs for more informations e.g finance & weather
* get socket to provide notification
* improve on my CSS for profile
* refactor my controller to have 1 model 1 controller

### Credits

* Prima
* YiSheng
* Sharona
* Jon
* Cara
* Ian
