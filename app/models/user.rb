class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :messages
  has_many :postlike
  has_many :posts
  has_many :followers, class_name: 'Relationship', :foreign_key => 'follower_id'
  has_many :followeds, class_name: 'Relationship', :foreign_key => 'followed_id'

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
