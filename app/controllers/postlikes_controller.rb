class PostlikesController < ApplicationController


  def create
    @newPostLike = Postlike.new()
    @newPostLike.post_id = params["postlike"]["id"]
    @newPostLike.user_id = current_user.id
    @newPostLike.save

    @targetPost = Post.where(id: params["postlike"]["id"])[0]
    puts 'this is the target post'
    puts @targetPost.likes += 1
    @targetPost.save
  end


end
