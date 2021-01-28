# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Post.destroy_all()

50.times do
  title = Faker::Hipster.sentence
  body = Faker::Hipster.paragraph_by_chars(characters: 256, supplemental: false)
  Post.create(
    title: title,
    body: body,
  )
end
posts = Post.all
puts "created #{posts.count} posts"
