import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";

function CreateListing() {
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleSubmitImage = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length <= 6) {
      setUploading(true);
      const promises = files.map((file) => storeImage(file));

      Promise.all(promises)
        .then((urls) => {
          setUploadedImages((prevImages) => [...prevImages, ...urls]);
          setUploading(false);
          alert("All files uploaded successfully!");
        })
        .catch((err) => {
          console.error(err);
          alert("Error uploading files!");
          setUploading(false);
        });
    } else {
      alert("Please select up to 6 images.");
    }
  };

  const handleDelete = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Handle progress here if needed
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return (
    <main className="m-auto max-w-4xl">
      <h1 className="font-semibold text-3xl text-center p-3">Create Listing</h1>
      <form className="flex flex-col sm:flex-row p-3 gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input type="text" placeholder="Name" id="name" className="rounded-lg p-3" />
          <textarea placeholder="Description" id="description" className="rounded-lg p-3 border"></textarea>
          <input type="text" placeholder="Address" id="address" className="rounded-lg p-3" />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-3">
              <input type="number" className="w-10 border-gray-300 text-center" min={0} max={10} />
              <span>Beds</span>
            </div>
            <div className="flex gap-3">
              <input type="number" className="w-10 border-gray-300 text-center" min={0} max={10} />
              <span>Baths</span>
            </div>
            <div className="flex gap-3">
              <input type="number" className="w-10 border-gray-300 text-center" min={0} max={10} />
              <div className="flex flex-col flex-1 text-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex gap-3">
              <input type="number" className="w-10 border-gray-300 text-center" min={0} max={10} />
              <div className="flex flex-col flex-1 text-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-1">
            <p>Images:</p>
            <span className="font-normal text-gray-600 ml-2">The first Image will be the cover (max 6)</span>
          </div>
          <div className="flex justify-between gap-4">
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="border p-3 border-gray-300"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button onClick={handleSubmitImage} className="uppercase rounded border border-green-700 text-green-700 p-3">
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {uploadedImages.map((url, index) => (
              <div key={index} className="flex flex-col items-center">
                <img src={url} alt={`Uploaded ${index}`} className="rounded-lg w-32 h-32 object-cover mb-2" />
                <button
                  onClick={() => handleDelete(index)}
                  className="uppercase rounded border border-red-700 text-red-700 p-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button className="p-3 rounded bg-slate-700 uppercase text-white hover:placeholder-opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
