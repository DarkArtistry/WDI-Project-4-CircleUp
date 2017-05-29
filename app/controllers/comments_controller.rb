class CommentsController < ApplicationController

  def create
    @newComment = Comment.new
    @newComment.post_id = params["targetPost"]["id"]
    @newComment.user_id = current_user.id
    puts 'herrrrreeeeeeee'
    puts params.inspect
    @newComment.contents = params["targetPost"]["comments"]
    @newComment.likes = 0

    puts @newComment.inspect
    @newComment.save
  end

  def destroy
    params.inspect
    @target_comment = Comment.where(id: params["targetComment"]["id"])[0]
    @target_comment_likes = Commentlike.where(comment_id: params["targetComment"]["id"])
    @target_comment_likes.each do |like|
      like.destory
    end
    @target_comment.destroy
  end

end
