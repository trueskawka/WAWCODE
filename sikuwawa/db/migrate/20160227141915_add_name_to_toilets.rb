class AddNameToToilets < ActiveRecord::Migration
  def change
    add_column :toilets, :name, :string
    add_column :toilets, :adress, :string
    add_column :toilets, :description, :string
    add_column :toilets, :type, :string
  end
end
