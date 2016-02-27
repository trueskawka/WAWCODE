class ToiletsController < ApplicationController

  def index

  end

  def map
    @toilets = Toilet.all
  end

end
