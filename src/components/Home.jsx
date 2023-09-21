import React, { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { database } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import axios from "axios";
// https://api.unsplash.com/photos?client_id=F70Avb-VkF7RE5zq-tL3UlolH-TYthKyfpdbuT-iiKU
const Home = () => {
  const API_URL_1 = "https://api.unsplash.com/search/photos";
  // To set default photos
  const [defaultPhotos, setDefaultPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getSearchPhotos(searchWord) {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${API_URL_1}?page=1&query=${searchWord}&client_id=F70Avb-VkF7RE5zq-tL3UlolH-TYthKyfpdbuT-iiKU`
      );
      setPhotosList(data.results);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching photos:", error);
    }
  }

  // useEffect(() => {
  //   getDefaultPhotos();
  // }, []);

  // To get searched Photos
  const API_URL = "https://api.unsplash.com/photos";

  const [photosList, setPhotosList] = useState([]);

  async function getPhotos() {
    try {
    setLoading(true)
      const { data } = await axios.get(
        `${API_URL}?client_id=F70Avb-VkF7RE5zq-tL3UlolH-TYthKyfpdbuT-iiKU`
      );
      setPhotosList(data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  useEffect(() => {
    getPhotos();
  }, []);

  //  To Search
  const searchInput = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    let search = searchInput.current.value
    getSearchPhotos(search);
  };

  // const handleSelection = (selection) => {
  //   searchInput.current.value = selection
  //   getPhotos()
  // }

  // To Sign Out
  const history = useNavigate();

  const handleSignOut = () => {
    signOut(database).then((value) => {
      console.log(value, "value");
      history("/");
    });
  };

  // To Drag Element Reference
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  // const onDragStart = (e, index) => {
  //   console.log("drag started", index);
  // }
  // const onDragEnter = (e, index) => {
  //   console.log("drag entered", index);
  // }
  // const onDragEnd = (e) => {
  //   console.log("drag ended");
  // }

  const handleSorting = () => {
    // Duplicating the photo List
    // let photoItems = [...photosList]
    let defaultItems = [...defaultPhotos];
    // Removing and saving the dragged item
    // const draggedItemContent = photoItems.splice(dragItem.current, 1)[0]
    const draggedDefaultItemContent = defaultItems.splice(
      dragItem.current,
      1
    )[0];
    // Switch Items
    // photoItems.splice(dragOverItem.current, 0, draggedItemContent)
    defaultItems.splice(dragOverItem.current, 0, draggedDefaultItemContent);
    // Reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;
    // Update the actual array
    // setPhotosList(photoItems)
    setDefaultPhotos(defaultItems);
  };

  const handleFilterSorting = () => {
    // Duplicating the photo List
    let photoItems = [...photosList];
    // let defaultItems = [...defaultPhotos]

    // Removing and saving the dragged item
    const draggedItemContent = photoItems.splice(dragItem.current, 1)[0];
    // const draggedDefaultItemContent = defaultItems.splice(dragItem.current, 1)[0]

    // Switch Items
    photoItems.splice(dragOverItem.current, 0, draggedItemContent);
    // defaultItems.splice(dragOverItem.current, 0, draggedDefaultItemContent)

    // Reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // Update the actual array
    setPhotosList(photoItems);
    // setDefaultPhotos(defaultItems)
  };

  // Default Photo Element
  const defaultPhotosElement = defaultPhotos.map((photos, index) => (
    <div
      key={photos.id}
      draggable
      className="cursor-grab flex justify-center items-center"
      onDragStart={(e) => (dragItem.current = index)}
      onDragEnter={(e) => (dragOverItem.current = index)}
      onDragEnd={handleSorting}
      onDragOver={(e) => e.preventDefault()}
    >
      <img
        draggable
        src={photos.urls.small}
        className="w-48 h-48 md:h-56  sm:w-80 sm:h-80  object-cover rounded "
        alt={photos.alt}
      />
    </div>
  ));

  // Photo Grid Element
  const photosListElement = photosList.map((photo, index) => (
    <div
      key={photo.id}
      draggable
      className="cursor-grab flex justify-center items-center "
      onDragStart={(e) => (dragItem.current = index)}
      onDragEnter={(e) => (dragOverItem.current = index)}
      onDragEnd={handleFilterSorting}
      onDragOver={(e) => e.preventDefault()}
    >
      <img
        draggable
        src={photo.urls.small}
        className="w-48 h-48 md:h-56  sm:w-80 sm:h-80  object-cover rounded "
        alt={photo.alt}
      />

      <div>
        {photosList.length == 0 ? (
          <h2 className="w-full text-center text-3xl m-auto h-10 p">
            No Results Found
          </h2>
        ) : (
          ""
        )}
      </div>
    </div>
  ));

  return (
    <div className="bg-bg-orange w-full h-max p-8 | flex flex-col justify-center items-center gap-8">
      <button
        onClick={handleSignOut}
        className="text-orange font-semibold rounded-md py-2  | absolute top-5 right-8"
      >
        Log Out
      </button>
      <h1 className="text-black text-2xl">
        Drag and drop any picture to re-arrange your gallery
      </h1>
      <Search
        photosList={photosList}
        handleSearch={handleSearch}
        searchInput={searchInput}
      />
{ 
  loading ?
  <div>
    {defaultPhotos <= 0 ? (
      <h2 className="w-full text-center text-3xl m-auto h-calc p-20">
        Loading...
      </h2>
    ) : (
      ""
    )}
  </div>
  :
  <div className="w-full grid sm:grid-cols-4 grid-cols-2 content-center gap-4 ">
    {photosList.length > 0 ? photosListElement : defaultPhotosElement}
  </div>
}
      

      
    </div>
  );
};

export default Home;
