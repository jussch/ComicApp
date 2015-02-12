json.extract!(@comic, :id, :title, :body, :author_id, :created_at, :updated_at)

json.image_url asset_path(@comic.image.url)
