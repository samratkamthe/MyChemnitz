import React, { useEffect, useState, useMemo, useContext, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import noteContext from '../context/notes/noteContext';


const categoryColorMap = {
   artwork: "red",
  bench: "green",
  clock: "orange",
  gallery: "violet",
  museum: "blue",
  restaurant: "yellow",
  theatre: "grey",
  default: "black"
};

const getIconForCategory = (category) => {
  const color = categoryColorMap[category.toLowerCase()] || categoryColorMap.default;
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};



function FitBounds({ data }) {
  const map = useMap();
  useEffect(() => {
    if (data?.features?.length) {
      const layer = L.geoJSON(data);
      map.fitBounds(layer.getBounds(), { padding: [40, 40] });
    }
  }, [data, map]);
  return null;
}
const CapitalFunc = (info) => {
  if (!info || typeof info !== 'string') return "Unknown";
  let newinfo = info[0].toUpperCase();
  return newinfo + info.slice(1);
};


export default function MapView( props) {

  const [geoJson, setGeoJson] = useState(null);
  const [searchText, setSearchText] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const locIdFromQuery = queryParams.get('locId');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  //eslint-disable-next-line
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);



  const { addBookmarkNote, booked, fetchBookmarks } = useContext(noteContext);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchBookmarks();
    }
    // eslint-disable-next-line
  }, []);
  ////
  const disabledButtonsRef = useRef(disabledButtons);
  const bookedRef = useRef(booked);
  useEffect(() => {
    if (locIdFromQuery) {
      setSearchText(locIdFromQuery); // this fills the search input
      setSelectedFeatureId(locIdFromQuery); //  to select/highlight that feature
    }
  }, [locIdFromQuery]);
  useEffect(() => {
    disabledButtonsRef.current = disabledButtons;
  }, [disabledButtons]);

  useEffect(() => {
    bookedRef.current = booked;
    // eslint-disable-next-line 
  }, [booked]);
  // eslint-disable-next-line 
useEffect(() => {
  fetch("http://localhost:5000/api/tourist")
    .then((r) => r.json())
    .then((data) => {
      // console.log("GeoJSON response:", data);

      setGeoJson(data);
    })
    .catch(console.error);
}, []);
  

  // Extract unique categories
  const categories = useMemo(() => {
    if (!geoJson) return [];
    const setCats = new Set(
      geoJson.features.map((f) => f.properties.amenity || f.properties.tourism)
    );
    return Array.from(setCats).sort();
  }, [geoJson]);

  // Filtered data based on search and category
  const filteredGeo = useMemo(() => {
    if (!geoJson) return null;

    const feats = geoJson.features.filter((f) => {
      const name = (f.properties.name || "").toLowerCase();
      const amenity = (f.properties.amenity || f.properties.tourism).toLowerCase();
      const id = (f.id || "").toString().toLowerCase();

      const matchesText =
        !searchText ||
        name.includes(searchText.toLowerCase()) ||
        amenity.includes(searchText.toLowerCase()) || id.includes(searchText.toLowerCase());;

      const matchesCategory =
        categoryFilter.length === 0 || categoryFilter.includes(amenity);

      return matchesText && matchesCategory;
    });

    // console.log("Filtered features count:", feats.length);

    
    return {
      type: "FeatureCollection",
      features: feats,
    };
  }, [geoJson, searchText, categoryFilter]);


  const onEachFeature = (feature, layer) => {
    const featureId = feature.id.toString();

    layer.on("click", () => {
      setSelectedFeatureId(feature.id);
      const panel = document.getElementById("info-panel");
      panel.style.display = "block";
      // Update content
      document.getElementById("feature-title").innerText =
        feature.properties.name && feature.properties.amenity ? feature.properties.name + "(" + feature.properties.amenity + ")" : feature.properties.name ||
          CapitalFunc(feature.properties.amenity || feature.properties.tourism || "");
      document.getElementById("feature-description").innerHTML =
        (feature.properties.description ? feature.properties.description + "<br/>" : "") +
        `<i class="fa-solid fa-location-dot" style="margin-right: 4px;"></i>` +
        (feature.properties["addr:city"] || "Chemnitz") + `<br/>` +
        (`${feature.properties["addr:postcode"] ? "<b>Postal Code: </b>" + feature.properties["addr:postcode"] + "<br/>" : ""}`) +
        (feature.properties["addr:street"] ? "<b>Street: </b>" + feature.properties["addr:street"] + `<br/>` : "") +
        (feature.properties["opening_hours"] ? "<b>Opening Hours: </b>" + feature.properties["opening_hours"] : "")

      const website = feature.properties.website;
      const websiteContainer = document.getElementById("feature-website-container");

      // Clear previous content
      websiteContainer.innerHTML = "";

      if (website) {
        const link = document.createElement("a");
        link.href = website;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.innerText = website;
        link.style.wordBreak = "break-word";
        link.style.color = "blue";
        link.style.textDecoration = "underline";
        websiteContainer.appendChild(link);
      } else {
        const noWebsite = document.createElement("span");
        noWebsite.innerText = "No website available";
        noWebsite.style.color = "gray";
        websiteContainer.appendChild(noWebsite);
      }


      const btn = document.getElementById("bookmark-btn");
      // use latest state from refs here
      const isDisabled =
        bookedRef.current.some(book => book.LocId === featureId) ||
        disabledButtonsRef.current.includes(featureId);

      btn.disabled = isDisabled;
      btn.onclick = async () => {
        if (localStorage.getItem('token')) {
          if (btn.disabled) return;
          btn.disabled = true;
      

          try {
            await addBookmarkNote(
              feature.properties.name,
              feature.properties.amenity,
              feature.properties.tourism,
              feature.properties.description,
              feature.properties.website,
              featureId
            );
            props.showAlert("BookMarked!","success","Successfully")
            setDisabledButtons(prev => [...prev, featureId]);
          } catch (error) {
            btn.disabled = false;
          }
        }
       else {
          props.showAlert("Loginor Signup to Bookmark ","info","Info")
        }
      }
    });
  };


  // Toggle checkbox
  const toggleCategory = (cat) => {
    setCategoryFilter((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

  if (!geoJson) return <div>Loading …</div>;

      const uniqueCategories = [
  ...new Set(
    filteredGeo.features.map(f => f.properties.amenity || f.properties.tourism)
  )
];

  return (<>
    <h1 id="MapPgBg" style={{color:"black", zIndex:1000}} > CHEMNITZ CITY CULTURAL SPOTS</h1>
    <div style={{ height: "58vh", width: "100%", position: "relative" }} className="mapPage">
      {/* filter  section UI all category and other features */}
     
      <div
        style={{
          position: "absolute", top: 10, left: 51, zIndex: 1000, background: "white", padding: 10, borderRadius: 4, boxShadow: "0 0 4px rgba(0,0,0,0.3)",
          maxWidth: 300, border:"2px solid grey"
        }}
      >
        <input type="text" placeholder="Search name or category…" value={searchText} onChange={(e) => setSearchText(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />

        <details>
          <summary>Filter by category</summary>
          <div
            style={{ maxHeight: 150, overflowY: "auto", marginTop: 4, }}
          >

{categories.map((cat) => {
  const lowerCat = cat.toLowerCase();
  const color = categoryColorMap[lowerCat] || categoryColorMap.default;

  return (
    <label key={cat} style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
      <span
        style={{
          display: "inline-block",
          width: 12,
          height: 12,
          borderRadius: "20%",
          backgroundColor: color,
          marginRight: 8,
          border: "2px solid #000",
        }}
      ></span>
      <input
        type="checkbox"
        checked={categoryFilter.includes(lowerCat)}
        onChange={() => toggleCategory(lowerCat)}
        style={{ marginRight: 4 }}
      />
      {CapitalFunc(cat)}
    </label>
  );
})}

          </div>
        </details>
         

             
      </div>
      {(categoryFilter.length > 0 || searchText.trim() !== "") ? (
  filteredGeo && filteredGeo.features.length > 0 ? (
    <div className="" style={{position: "absolute", top: 238, left: 14, maxHeight: 270, overflowY: "auto", marginTop: 19, overflowX: "hidden", zIndex:1000, width:'320px',msOverflowStyle: "none",
    scrollbarWidth: "none" , background:"white", padding:"5px", border:"2px solid grey", borderRadius:'8px' }}>
      <ul className=" mt-4 space-y-2 "  style={{paddingLeft:"0px"}}>
    
        <p  className="sticky-top" style={{textAlign:"center", background:"#d8bbe0", borderRadius:'7px', border: "3px solid grey", fontFamily: "serif"}} ><b>Filtered List- {uniqueCategories.map(cat => CapitalFunc(cat)).join(", ")}</b><br/>{"(click on the location mark for more Info)"} </p>
        {filteredGeo.features.map((feature) => (
    
          <li style={{ listStyle: "none", fontFamily: "serif" , background:"beige", cursor:"pointer", borderRadius:'7px', border: "3px solid grey", marginBottom:"4px"  }} onClick={()=>{setSearchText(feature.id)}} key={feature.id} className="border-black p-3 rounded-lg shadow-sm list-group-item list-group-item-action ">
            <h3 className="text-lg font-semibold">{feature.properties.name || "Unnamed Location"}</h3>
            <p className="text-sm text-gray-600">
             <b> {CapitalFunc(feature.properties.amenity || feature.properties.tourism)}</b><br/>
            </p>
          </li>
      
        ))}
      </ul>
    </div>
  ) : (
    <p className="text-gray-500 mt-4" style={{position: "absolute",
    left: '551px',
    zIndex: 1111,
    background: '#d7c7c7',
    padding: '2px',
    borderRadius: '7px',
    fontWeight: '500'}}>No locations found.</p>
  )
) : null}






      {/* Map */}

      <MapContainer
        center={[50.83, 12.92]}
        zoom={13}
        style={{ height: "130%", width: "100%", border:"2px solid black"}}
      >
 
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {filteredGeo && (
  <GeoJSON
    key={JSON.stringify(filteredGeo)} // Force re-render
    data={filteredGeo}
    onEachFeature={onEachFeature}
    pointToLayer={(feature, latlng) => {
      const category = feature.properties.amenity ||feature.properties.tourism || "default";
      const icon = getIconForCategory(category);
      return L.marker(latlng, { icon });
    }}
  />
)}
       

        <FitBounds data={filteredGeo} />
      </MapContainer>
      
      {/* Info Panel for feature details */}
      <div id="info-panel" style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000,
        background: "white",
        padding: 16,
        width: 333,
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        display: "none"
      }}>
        <h3 id="feature-title" style={{ wordBreak: "break-word" }} >Select a marker</h3>
        <p id="feature-description" className="feature-desc-font">Click on a marker to see details</p>
        <div id="feature-website-container" style={{ marginTop: 8 }}></div>

        <button id="bookmark-btn" className='btn' style={{ marginTop: 8, border: '2px solid black' }}>🔖 Bookmark</button>
        <button className='btn' onClick={() => {
          let info = document.getElementById('info-panel')
          info.style.display = 'none'
        }} style={{ marginTop: 8, marginLeft: 8, border: '2px solid black' }} >close</button>
      </div>


    </div>
    </>
  );
}
