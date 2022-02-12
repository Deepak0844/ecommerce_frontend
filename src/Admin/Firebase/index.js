import { storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

//firebase image uploader
//it takes the file(images) and returns the file(images) as a url to display images
const firebaseFileUpload = ({ file, setLoading, setImage, setProgress }) => {
  setLoading(true);
  const storageRef = ref(storage, `product_image/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (err) => {
      console.log(err);
      setLoading(false);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setImage(url);
        setLoading(false);
      });
    }
  );
};

export default firebaseFileUpload;
