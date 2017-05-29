class Relationship < ApplicationRecord
  belongs_to :follower, class_name: 'User', :primary_key => 'id'
  belongs_to :followed, class_name: 'User', :primary_key =>'id'
end
