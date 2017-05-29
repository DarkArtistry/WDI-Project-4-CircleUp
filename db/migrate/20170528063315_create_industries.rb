class CreateIndustries < ActiveRecord::Migration[5.0]
  def change
    create_table :industries do |t|
      t.string :name
      t.string :image

      t.timestamps
    end
  end
end
