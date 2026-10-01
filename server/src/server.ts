import "dotenv/config";
import app from "./app";
import cloudinary from "./config/cloudinary";

const PORT = process.env.PORT || 3000;

cloudinary.api.ping()
  .then((result) => {
    console.log('Cloudinary connection:', result)
  })
  .catch((error) => {
    console.error('Cloudinary connection error:', error)
  })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});