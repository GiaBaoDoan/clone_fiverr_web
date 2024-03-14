import axios from "axios";

const upload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fiverr");
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/giabao12/image/upload",
      formData
    );
    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};
export default upload;
