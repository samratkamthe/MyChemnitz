import React, { useContext, useEffect } from 'react';
import { useNavigate} from 'react-router-dom'

import noteContext from '../context/notes/noteContext';

const BookmarkItem = (props) => {
  let navigator=useNavigate();
  const context = useContext(noteContext);
  const { fetchBookmarks, booked ,deleteBookmark} = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchBookmarks();
    }
    // eslint-disable-next-line
  }, []);

    const handleViewOnMap = (locId) => {
    navigator(`/mapview?locId=${encodeURIComponent(locId)}`);
  };

  return (
    <>
    <div className="WholoBookMark">
    <h1 style={{fontWeight:"bold",zIndex:1000}}>Bookmarked Locations</h1>
    <div className="bookmark-scroll-container" style={{msOverflowStyle: "none",
    scrollbarWidth: "none"}} >
    <div className=" d-flex justify-content-around row overflow-y-auto align-items " >
     {booked && booked.length > 0 ? (
      booked.map((book, index) => (
        <div className="card my-3 col-md-3 card mx-3 text-bg-primary mb-3 " style={{ height:"270px",width:"350px",paddingBottom:"22px",border:"4px Solid black" ,   zIndex:3}} key={index}>
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title " style={{marginBottom:"15px"}}><b>Location Info : </b>{book.name||book.amenity||book.tourism}</h5>
            <p style={{ wordBreak: "break-word" }}>
  <b>Website : </b>
  {book.website ? (
    <a href={book.website} target="_blank" rel="noopener noreferrer">
      {book.website}
    </a>
  ) : (
    <>
      Website Unavailable<br />
      <span><b>(Please check the location on map)</b></span>
    </>
  )}
</p>

          <div className="d-flex justify-content-between  mt-auto">
  <button className="btn btn-outline-primary me-2"
          onClick={async() =>{ await deleteBookmark(book._id); props.showAlert("Location Removed", "success", "Successfully");}}>
    Remove Location
   
  </button>
  <button className="btn btn-outline-primary"
          onClick={() => handleViewOnMap(book.LocId)}>
    Locate on Map
  </button>
</div>
          </div>
        </div>
      ))) : (
  <p className='d-flex justify-content-center ' style={{zIndex:100, position:'absolute' , top:400}}>No bookmarks found.</p>
)}
    </div>
    </div>
    </div>
    </>
  );
  
};

export default BookmarkItem;
