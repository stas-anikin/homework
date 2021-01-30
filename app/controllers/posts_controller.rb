class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update, :destroy]
  before_action :authorize_user!, only: [:edit, :update, :destroy]
  before_action :authenticated_user!, except: [:index, :show]

  def index
    @posts = Post.all
  end

  def show
    @post = Post.find params[:id]
    @comments = @post.comments.all.order(created_at: :desc)
    @comment = Comment.new
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new post_params
    @post.user = current_user
    if @post.save
      flash[:notice] = "Post created successfully"
      redirect_to post_path(@post.id)
    else
      render :new
    end
  end

  def update
    if @post.update post_params
      redirect_to post_path(@post.id), notice: "Post updated successfully"
    else
      render :edit
    end
  end

  def edit
  end

  def destroy
    @post.destroy
    redirect_to posts_path
  end

  private

  def find_post
    @post = Post.find params[:id]
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end

  def authorize_user!
    redirect_to root_path, alert: "not authorized" unless can?(:crud, @post)
  end
end
