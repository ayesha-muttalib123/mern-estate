import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Ensure these are imported correctly
// import { app } from "firebase-admin";

function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileper,setfileper]=useState(0)
  const [uploadError,setuploadError]=useState(false)
  const [formData,setformData]=useState({})
  console.log(fileper)
  console.log(uploadError)
  console.log(formData)

  useEffect(() => {
    if (file) {
      handleUpload(file);
    }
  }, [file]);

  const handleUpload = async (file) => {
    const storage = getStorage();

    const filename = new Date().getTime() + file.name;
    const storageref = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageref, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfileper(progress)
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        setuploadError(true)
        // console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformData({...formData,avatar:downloadURL}  )
          // console.log('File available at', downloadURL);
        });


        
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>

      <form action="" className="flex flex-col gap-4 mt-5">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar||currentUser.avatar}
          alt="profile"
          className="rounded-full w-24 h-24 self-center"
        />
          <p className="text-sm self-center">
          {uploadError ? (
            <span className="text-red-700">Error in uploading image,Image must be less than  2 MB</span>
          ) : fileper > 0 && fileper < 100 ? (
            <span className="text-slate-700">Uploading {fileper.toFixed(2)}%</span>
          ) : fileper === 100 ? (
            <span className="text-green-400 ">Image Uploaded Successfully {fileper}%</span>
          ) : null}
        </p>
        <input
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          placeholder="password"
          type="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90">
          Update
        </button>
      </form>
      <div className="flex justify-between text-red-700">
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
