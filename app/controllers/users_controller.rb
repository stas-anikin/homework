class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      #   session[:user_id] = @user.id
      redirect_to posts_path, notice: "#{@user.full_name} successfully signed up!"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
      flash[:notice] = "Your account information was successfully updated"
      redirect_to @user
    else
      render "edit"
    end
  end

  def destroy
    @user.destroy
    # session[:user_id] = nil if @user == current_user
    flash[:notice] = "Account successfully deleted"
    redirect_to posts_path
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
