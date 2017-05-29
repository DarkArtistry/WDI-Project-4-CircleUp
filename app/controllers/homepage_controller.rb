class HomepageController < ApplicationController

  before_action :authenticate_user!

  def index


    @allRelation = Relationship.where(follower_id: current_user.id)
    puts 'here'
    @targetPostObjects = current_user.posts
    @allRelation.each do |relation|
      puts relation.followed.posts

      @targetPostObjects += (relation.followed.posts)

    end

    @Post = JSON.parse(@targetPostObjects.reverse.to_json)
    @allPostlikes = JSON.parse(Postlike.all.to_json)
    @Post.each do |post|
      @allPostComment = JSON.parse(Comment.where(post_id: post["id"]).to_json)
      @allPostComment.each do |comment|
        @commentUser = User.where(id: comment["user_id"])[0]
        comment["username"] = @commentUser.firstname
        # puts comment.inspect
        # puts 'please'
      end

      @postAuthor = User.where(id: post["author_id"])[0]
      @postShareUser = User.where(id: post["user_id"])[0]
      post["comments"] = @allPostComment
      post["author"] = @postAuthor[:firstname]
      post["shareuser"] = @postShareUser[:firstname]
      post["authorid"] = @postAuthor[:id]
      post["shareuserid"] = @postShareUser[:id]
    end
    # puts 'here'
    puts @Post
    @allPost = @Post
    @allPostNoneJSON = Post.all
  end
end
