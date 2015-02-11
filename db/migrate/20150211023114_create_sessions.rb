class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :token, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :sessions, :token
    add_index :sessions, :user_id
  end
end
