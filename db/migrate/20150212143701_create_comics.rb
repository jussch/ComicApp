class CreateComics < ActiveRecord::Migration
  def change
    create_table :comics do |t|
      t.string :title, null: false
      t.attachment :image
      t.text :body
      t.integer :author_id, null: false

      t.timestamps null: false
    end

    add_index :author_id
  end
end
