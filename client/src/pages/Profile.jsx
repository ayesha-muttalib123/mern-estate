import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { SignOutInFailure, SignOutInSuccess, deleteInFailure, deleteInSuccess, deleteInstart, updateInFailure, updateInSuccess, updateInstart } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const {currentUser,loading,error} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePer] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate=useNavigate()


  console.log(filePer);
  console.log(uploadError);
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleUpload(file);
    }
  }, [file]);

  const handleUpload = async (file) => {
    const storage = getStorage();
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        setUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          console.log('File available at', downloadURL);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateInstart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateInFailure(data.message));
      } else {
        dispatch(updateInSuccess(data));
        setUpdateSuccess(true)
      }
    } catch (error) {
      dispatch(updateInFailure(error.message));
    }
  };
  const handleDelete = async () => {
    dispatch(deleteInstart());

    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!data.success) {
        dispatch(deleteInFailure(data.message));
      } else {
        dispatch(deleteInSuccess(data));
        navigate('/signIn');
      }
    } catch (error) {
      dispatch(deleteInFailure(error.message));
    }
  };

const HandleSignOut=async()=>{
 try {
  

  dispatch(SignOutInSuccess());
  const res=await fetch('api/auth/signout')
  const data=await res.json();
  if(data.success===false){
    dispatch(SignOutInFailure(data.message));
    return;
  }
  dispatch(SignOutInSuccess(data.message))
  

 } catch (error) {
  dispatch(SignOutInFailure(data.message));
  
 }
}
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full w-24 h-24 self-center"
        />
        <p className="text-sm self-center">
          {uploadError ? (
            <span className="text-red-700">Error in uploading image, Image must be less than 2 MB</span>
          ) : filePer > 0 && filePer < 100 ? (
            <span className="text-slate-700">Uploading {filePer.toFixed(2)}%</span>
          ) : filePer === 100 ? (
            <span className="text-green-400 ">Image Uploaded Successfully {filePer}%</span>
          ) : null}
        </p>
        <input
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          placeholder="password"
          type="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90">
        {loading?'loading...':'Update Profile'}
        </button>
     
      <Link to={'/listing'} disabled={loading} className="bg-green-500 p-3 rounded-lg hover:opacity-95 text-center text-white ">
          Create Listing

        </Link>
      </form>
      <div className="flex justify-between text-red-700">
        <span onClick={handleDelete}>Delete Account</span>
        <span className="text-green-400">Show Insights</span>
        <span onClick={HandleSignOut}>Sign Out</span>
        
      </div>

      {/* <div>  Show Insights</div> */}
      <p className="text-red-700">{error?error:''}</p>
      <p className="text-green-700">{updateSuccess?'update pofile Successfully!':''}</p>


    </div>
  );
}

export default Profile;





















// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { updateInFailure, updateInSuccess, updateInstart, deleteInFailure, deleteInSuccess, deleteInstart } from "../redux/userSlice";

// const Profile = () => {
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const fileRef = useRef(null);
//   const [file, setFile] = useState(null);
//   const [filePer, setFilePer] = useState(0);
//   const [uploadError, setUploadError] = useState(false);
//   const [formData, setFormData] = useState({
//     username: currentUser.username,
//     email: currentUser.email,
//     password: "",
//     avatar: currentUser.avatar,
//   });
//   const [updateSuccess, setUpdateSuccess] = useState(false);

//   useEffect(() => {
//     if (file) {
//       handleUpload(file);
//     }
//   }, [file]);

//   const handleUpload = (file) => {
//     const storage = getStorage();
//     const filename = new Date().getTime() + file.name;
//     const storageRef = ref(storage, filename);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setFilePer(progress);
//         console.log("Upload is " + progress + "% done");
//       },
//       (error) => {
//         setUploadError(true);
//         console.error(error);
//       },
//       async () => {
//         try {
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//           setFormData((prev) => ({ ...prev, avatar: downloadURL }));
//           console.log("File available at", downloadURL);
//         } catch (error) {
//           setUploadError(true);
//           console.error(error);
//         }
//       }
//     );
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(updateInstart());

//     try {
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (!data.success) {
//         dispatch(updateInFailure(data.message));
//       } else {
//         dispatch(updateInSuccess(data));
//         setUpdateSuccess(true);
//       }
//     } catch (error) {
//       dispatch(updateInFailure(error.message));
//     }
//   };

  // const handleDelete = async () => {
  //   dispatch(deleteInstart());

  //   try {
  //     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await res.json();
  //     if (!data.success) {
  //       dispatch(deleteInFailure(data.message));
  //     } else {
  //       dispatch(deleteInSuccess(data));
  //     }
  //   } catch (error) {
  //     dispatch(deleteInFailure(error.message));
  //   }
  // };

//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl font-semibold text-center">Profile</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           ref={fileRef}
//           hidden
//           accept="image/*"
//         />
//         <img
//           onClick={() => fileRef.current.click()}
//           src={formData.avatar || currentUser.avatar}
//           alt="profile"
//           className="rounded-full w-24 h-24 self-center"
//         />
//         <p className="text-sm self-center">
//           {uploadError ? (
//             <span className="text-red-700">Error in uploading image, Image must be less than 2 MB</span>
//           ) : filePer > 0 && filePer < 100 ? (
//             <span className="text-slate-700">Uploading {filePer.toFixed(2)}%</span>
//           ) : filePer === 100 ? (
//             <span className="text-green-400">Image Uploaded Successfully {filePer}%</span>
//           ) : null}
//         </p>
//         <input
//           placeholder="username"
//           id="username"
//           className="border p-3 rounded-lg"
//           value={formData.username}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="email"
//           id="email"
//           className="border p-3 rounded-lg"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="password"
//           type="password"
//           className="border p-3 rounded-lg"
//           id="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <button
//           disabled={loading}
//           className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90"
//         >
//           {loading ? "loading..." : "Update Profile"}
//         </button>
//       </form>
//       <div className="flex justify-between text-red-700 mt-4">
//         <button onClick={handleDelete} className="hover:underline">
//           Delete Account
//         </button>
//         <button className="hover:underline">Sign Out</button>
//       </div>
//       {error && <p className="text-red-700 mt-4">{error}</p>}
//       {updateSuccess && <p className="text-green-700 mt-4">Profile updated successfully!</p>}
//     </div>
//   );
// };

// export default Profile;

