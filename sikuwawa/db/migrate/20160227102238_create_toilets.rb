class CreateToilets < ActiveRecord::Migration
  def change
    create_table :toilets do |t|
      t.float :lat
      t.float :lon
      t.boolean :disabledfriendly
      t.boolean :momfriendly
      t.float :prize

      t.timestamps null: false
    end
  end
end
