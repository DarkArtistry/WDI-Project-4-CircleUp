class UsersController < ApplicationController

  def show
    # puts params.inspect
    @Post = JSON.parse(Post.where(user_id: params["id"]).reverse.to_json)
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
    @allPost = @Post
    @targetUser = JSON.parse(User.where(id: params["id"])[0].to_json)
    @relationshipData = Relationship.where(follower_id: current_user.id, followed_id: User.where(id: params["id"])[0].id)[0]? true : false

    if @relationshipData
      @relationshipID = Relationship.where(follower_id: current_user.id, followed_id: User.where(id: params["id"])[0].id)[0].id
    end

  end

end
