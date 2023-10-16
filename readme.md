# Image resize API

This API resize images using ffmpeg multer and express.

Run:
`npm i && node index.js`

Request:
`curl --location 'http://localhost:3000/resize' \
--form 'image=@"/path/to/image.jpeg"' \
--form 'width="800"' \
--form 'height="500"'`
