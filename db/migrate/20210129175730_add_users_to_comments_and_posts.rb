class AddUsersToCommentsAndPosts < ActiveRecord::Migration[6.1]
  def change
    add_reference :comments, :user, foreign_key: true
    add_reference :posts, :user, foreign_key: true
  end
end
