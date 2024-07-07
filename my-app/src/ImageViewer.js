import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Marker from './Marker'; // Assuming Marker component is in the same directory

const ImageViewer = () => {
  const imageUrl = process.env.PUBLIC_URL + '/RuneterraMap2.png';

  // State to manage markers
  const [markers, setMarkers] = useState([]);

  // Handler for adding markers on click
  const handleMapClick = (event) => {
    // Calculate the click position relative to the image/map
    const { offsetX, offsetY } = event.nativeEvent;
    // Adjust for current zoom and pan
    const scale = 1 / event.target.clientWidth; // Assuming defaultScale=1 in TransformWrapper
    const x = offsetX * scale;
    const y = offsetY * scale;

    // Add new marker to state
    setMarkers(prevMarkers => [
      ...prevMarkers,
      { id: Date.now(), x, y }  // Generate unique id for each marker
    ]);
  };

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <TransformWrapper
        defaultScale={1}
        wheel={{ step: 0.1 }}
        options={{
          minScale: 0.5,
          limitToBounds: true,
        }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <React.Fragment>
            <div className="tools">
              <button onClick={zoomIn}>+</button>
              <button onClick={zoomOut}>-</button>
              <button onClick={resetTransform}>Reset</button>
            </div>
            <TransformComponent>
              <div
                style={{
                  position: 'relative',
                  width: '50%',
                  height: '50%',
                  cursor: 'crosshair',  // Change cursor to crosshair for marker placement
                }}
                onClick={handleMapClick} // Handle click on map to add marker
              >
                <img
                  src={imageUrl}
                  alt="Map"
                  style={{ width: '50%', height: 'auto' }}
                />
                {/* Render all markers */}
                {markers.map(marker => (
                  <Marker key={marker.id} x={marker.x} y={marker.y} />
                ))}
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ImageViewer;
