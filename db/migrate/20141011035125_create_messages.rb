class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :contacts, array: true
      t.text :text, null: false
      t.integer :user_id
      
      t.timestamps
    end
  end
end
