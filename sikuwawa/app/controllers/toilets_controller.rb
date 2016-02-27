class ToiletsController < ApplicationController

  def index
    @toilets = Toilet.all
  end

end
