import React from 'react'


const Search = ({photosList, handleSearch, searchInput}) => {
  // To Drag Element Reference
  const dragItem = React.useRef(null)
  const dragOverItem = React.useRef(null)
 

  const handleSorting = () => {
    // Duplicating the photo List
    let photoItems = [...photosList]
    // let defaultItems = [...defaultPhotos]

    // Removing and saving the dragged item
    const draggedItemContent = photoItems.splice(dragItem.current, 1)[0]
    // const draggedDefaultItemContent = defaultItems.splice(dragItem.current, 1)[0]
    // Switch Items
    photoItems.splice(dragOverItem.current, 0, draggedItemContent)
    // defaultItems.splice(dragOverItem.current, 0, draggedDefaultItemContent)
    // Reset the position ref
    dragItem.current = null
    dragOverItem.current = null
    // Update the actual array
    setPhotosList(photoItems)
    // setDefaultPhotos(defaultItems)
  }

  return (
    <div className='h-max p-8 pt-0 | flex flex-col justify-center items-center'>
      <form onSubmit={handleSearch} className='w-screen px-8 pt-0 flex justify-center items-center'>
        <input 
          type="search" 
          className='w-full sm:w-3/5 py-2 px-4 outline-none rounded-md'
          placeholder='Search Images'
          ref={searchInput}/>
        {/* <button onClick={() => handleSelection('nature')} className='text-orange border-solid border-orange p-2'>Search</button> */}
      </form>
    </div>
  )
}

export default Search