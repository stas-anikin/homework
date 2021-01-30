class CommentsController < ApplicationController
  before_action :authenticated_user!
  # before_action :authorize_user!, only: [:create, :destroy]

  def new
    @comment = Comment.new
  end

  def create
    @post = Post.find params[:post_id]
    @comment = Comment.new comment_params
    @comment.post = @post
    @comment.user = current_user
    if @comment.save
      redirect_to post_path(@post), notice: "Comment posted"
    else
      @comment = @post.comments.order(created_at: :desc)
      render "/posts/show"
    end
  end

  def destroy
    @comment = Comment.find params[:format]
    @comment.destroy
    redirect_to post_path(@comment.post), notice: "Comment deleted"
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

  def authorize_user!
    redirect_to root_path, alert: "not authorized" unless can?(:crud, @comment)
  end
end
