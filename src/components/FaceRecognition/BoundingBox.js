import React from 'react';

const BoundingBox = ({box,i}) => {
    return(
        <div 
            key={i}
            className='boundingBox'
            style={{top: box.topRow, 
                    right: box.rightCol, 
                    bottom: box.bottomRow, 
                    left: box.leftCol
            }}
        >
        </div>
    );
}

export default BoundingBox;
