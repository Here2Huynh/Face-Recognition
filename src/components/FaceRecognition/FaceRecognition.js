import React from 'react';
import './FaceRecognition.css';
import BoundingBox from './BoundingBox';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='ma center-flex'>
            <div className='absolute mt2 ma3'>
                <img 
                    id='inputImage'
                    src={imageUrl}
                    alt='' 
                    width='500px'
                    height='auto'
                />
            {
                box.map((face,i) =>
                <BoundingBox box={face} key={i} />
                )
            }
            
            </div>
        </div>
    );
}

export default FaceRecognition;