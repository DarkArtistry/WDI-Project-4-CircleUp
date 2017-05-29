class RelationshipsController < ApplicationController

  def create
    @new_relationship = Relationship.new()
    @new_relationship.followed_id = params["followed_id"]
    @new_relationship.follower_id = current_user.id
    @new_relationship.save
  end

  def destroy
    puts params.inspect
    @target_relationship = Relationship.where(id: params["relationID"])[0]
    @target_relationship.destroy
  end

end
