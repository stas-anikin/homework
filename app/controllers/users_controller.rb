class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy, :edit_password, :update_password]
  before_action :user_signed_in?, only: [:edit, :update, :edit_password, :update_password]
  before_action :require_same_user, only: [:edit, :update, :destroy, :edit_password, :update_password]

  def new
    @user = User.new
  end

  def admin_panel
    @users = User.all.order(created_at: :desc)
  end

  def create
    @user = User.new user_params
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: "#{@user.normal_name} successfully signed up!"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
      flash[:notice] = "Your account information was successfully updated"
      redirect_to root_path
    else
      render "edit"
    end
  end

  def destroy
    @user.destroy
    session[:user_id] = nil if @user == current_user
    flash[:notice] = "Account successfully deleted"
    redirect_to root_path
  end

  def edit_password
  end

  def update_password
    if @user&.authenticate params[:user][:current_password]
      new_password = params[:user][:new_password]
      new_password_confirmation = params[:user][:new_password_confirmation]
      new_password_valid = new_password != params[:user][:current_password]
      password_confirmed = new_password == new_password_confirmation
      if new_password_valid && password_confirmed
        if @user.update password: new_password, password_confirmation: new_password_confirmation
          flash[:notice] = "Password updated successfully"
          redirect_to root_path
        else
          flash[:alert] = "Password update failed"
          render :edit_password
        end
      else
        flash[:alert] = "Passwords do not match"
        render :edit_password
      end
    else
      flash[:alert] = "Inccorrect Password entered"
      render :edit_password
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def set_user
    @user = User.find(params[:id])
  end

  def require_same_user
    if current_user != @user && !current_user.is_admin?
      flash[:alert] = "You can only edit or delete your own account"
      redirect_to root_path
    end
  end
end
