class PostsController < ApplicationController

  def create
    puts 'start'
    puts params.inspect
      @new_post = Post.new(filter_params)
      puts @new_post.inspect
      @new_post.author_id = current_user.id

      @new_post.save
  end

  def destroy

    @target_postlikes = Postlike.where(post_id: params["deleteTargetPost"]["post_id"])
    @target_postlikes.each do |postlike|
      postlike.destroy
    end

    @target_postcomments = Comment.where(post_id: params["deleteTargetPost"]["post_id"])
    @target_postcomments.each do |postcomment|
        @all_commentlikes = Commentlike.where(comment_id: postcomment.id)
        @all_commentlikes.each { |commentlike| commentlike.destroy }
        postcomment.destroy
    end

    params.inspect
    @target_post = Post.where(id: params["deleteTargetPost"]["post_id"])[0]
    puts @target_post.inspect
    @target_post.destroy

  end

  private

  def filter_params
    params.require(:post).permit(:content, :likes, :user_id, :urlurl, :urlimage, :urltitle, :urldescription)
  end

end
