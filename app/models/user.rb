class User < ApplicationRecord
  has_secure_password
  before_save { self.email = email.downcase }
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }

  def normal_name
    "#{name}"
  end
end
