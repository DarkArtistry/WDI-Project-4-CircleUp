class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.references :user, foreign_key: true
      t.string :content
      t.references :author, references: :user
      t.integer :likes
      t.string :urlimage
      t.string :urltitle
      t.string :urldescription
      t.string :urlurl

      t.timestamps
    end
    add_foreign_key :posts, :users, column: :author_id
  end
end
