class ApplicationController < ActionController::Base
  private

  def current_user
    @current_user ||= User.find_by_id session[:user_id]
  end

  helper_method(:current_user)

  def user_signed_in?
    current_user.present?
  end

  helper_method :user_signed_in?

  def authenticated_user!
    redirect_to root_path, notice: "Please sign in" unless user_signed_in?
  end
end
