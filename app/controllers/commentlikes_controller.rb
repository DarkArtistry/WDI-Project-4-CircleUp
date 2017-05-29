class CommentlikesController < ApplicationController

  def create
    @newCommentLike = Commentlike.new()
    @newCommentLike.comment_id = params["targetCommentLike"]["comment_id"]
    @newCommentLike.user_id = current_user.id
    # @newCommentLike.save


    @targetComment = Comment.where(id: params["targetCommentLike"]["comment_id"])[0]
    puts @targetComment.inspect
    @targetComment.likes +=1
    @targetComment.save
  end


end
