class IndustriesController < ApplicationController

def index
  @allIndustries = Industry.all
end

def show
   puts params.inspect
   @Title = params["id"]

   @theIndustry = JSON.parse(Industry.where(name: @Title)[0].to_json)

   @allIndustryPost = []
   @allIndustryUser = User.where(industry: @Title)

   if @allIndustryUser.length > 0

     @allIndustryUser.each do |user|
       @allIndustryPost += user.posts
     end
   end

   @allIndustryPost.sort

   if @allIndustryPost.length > 0

     @Post = JSON.parse(@allIndustryPost.to_json)
     @allPostlikes = JSON.parse(Postlike.all.to_json)

     @Post.each do |post|
       @allPostComment = JSON.parse(Comment.where(post_id: post["id"]).to_json)
       @allPostComment.each do |comment|
         @commentUser = User.where(id: comment["user_id"])[0]
         comment["username"] = @commentUser.firstname
       end

     end
       @postAuthor = User.where(id: post["author_id"])[0]
       @postShareUser = User.where(id: post["user_id"])[0]
       post["comments"] = @allPostComment
       post["author"] = @postAuthor[:firstname]
       post["shareuser"] = @postShareUser[:firstname]
       post["authorid"] = @postAuthor[:id]
       post["shareuserid"] = @postShareUser[:id]
       @allPost = @Post

   end
   @targetUser = JSON.parse(User.where(id: params["id"])[0].to_json)

   end

end
