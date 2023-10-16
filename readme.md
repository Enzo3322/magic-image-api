# Image resize API

This API resize images using ffmpeg multer and express.

Run:
`npm i && node index.js`

Request for resize:
`curl --location 'http://localhost:3000/resize' \
--form 'image=@"/path/to/image.jpg"' \
--form 'width="800"' \
--form 'height="500"'`

Request for crop:
`curl -X POST -F "image=@/path/to/image.jpg" -F "ratio=16:9" http://localhost:3000/crop`
