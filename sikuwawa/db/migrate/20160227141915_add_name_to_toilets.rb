class AddNameToToilets < ActiveRecord::Migration
  def change
    add_column :toilets, :name, :string
    add_column :toilets, :adress, :string
    add_column :toilets, :desc, :string
    add_column :toilets, :toilettype, :string
  end
end
