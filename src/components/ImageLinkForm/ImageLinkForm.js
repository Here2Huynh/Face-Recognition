import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
    return (
        <div className=''>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className='form center'>
                <div className='pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70' type='text' onChange={onInputChange} />
                    <button className='w-30 grow f4 tc link pa2 dib white bg-light-purple'
                    onClick={onImageSubmit}>
                    Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;