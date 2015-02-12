json.array! @users do |user|
  json.extract!(user, :id, :username, :status, :created_at, :updated_at)
end
