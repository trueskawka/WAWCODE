class AddNameToToilets < ActiveRecord::Migration
  def change
    add_column :toilets, :name, :string
    add_column :toilets, :adress, :text
    add_column :toilets, :desc, :text
    add_column :toilets, :toilettype, :string
  end
end
