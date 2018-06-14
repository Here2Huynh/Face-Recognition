import React, { Component } from 'react';
import Rank from '../Rank/Rank';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import URL from '../../Constants';

class Home extends Component { 
    constructor(user){
        super();
        this.state = {
            input : '',
            imageUrl: '',
            box: [],
            route: 'signin',
            isSignedIn: false,
            
        }
    }



    //changes the state when the input is changed in the input bar
    onInputChange = (event) => {
    this.setState({input: event.target.value});
    }

    //changes the box coordinates in state so it renders the box
    displayFaceBox = (box) => {
        console.log(box);
        this.setState({box: box});
      }

    //takes res from API and do the conversion
    calculateFaceLocation = (data) => {
        const regions = data.outputs[0].data.regions;
        const clarfifaiFace = regions.map(region => region.region_info.bounding_box);
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        const calculationList = [];
        clarfifaiFace.map(face => {
            const boxConversionObj = {
            leftCol: face.left_col * width,
            topRow: face.top_row * height,
            rightCol: width - (face.right_col * width),
            bottomRow: height - (face.bottom_row * height)
            }
            return calculationList.push(boxConversionObj);
        }
        )
        return calculationList;
    }

    //interacts with the API when the link is submitted 
    //then updates the DB is the API returns something 
    onImageSubmit = () => {
    this.setState({imageUrl: this.state.input});
        fetch(`${URL}/imageurl`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(response => response.json())
        .then(response => {
        if (response) {
            fetch(`${URL}/image`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.user.id
            })
            })
            .then(response => response.json())
            .then(count => {
                this.setState(Object.assign(this.props.user, {entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log)
    }


    render() {
        const { imageUrl, box } = this.state;
        const { user } = this.props;
        return (
            <div>
                <Logo /> 
                <Rank 
                    name={user.name} 
                    entries={user.entries}
                />
                <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onImageSubmit={this.onImageSubmit}
                />
                <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
        );
    }
    
}

export default Home;