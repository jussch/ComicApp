# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

jeff = User.new({
  username: "jeff",
  password: "password",
  password_confirmation: "password",
  status: "ADMIN"
})
jeff.save

admin = User.new({
  username: "admin",
  password: "adminpassword",
  password_confirmation: "adminpassword",
  status: "ADMIN"
})
admin.save
