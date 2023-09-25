import { Component } from 'react';

import { Audio } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMoreButton } from './Button/Button';
import { Modal } from './Modal/Modal';


//key for API
const key = '32145411-8f2f66f9688645c1a0ae56fcc';
//apiURL
const apiURL = `https://pixabay.com/api/?&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;

export class App extends Component {
  state = {
    currentPage: 1,
    images: [],
    isLoading: false,
  };

  fetchAPI = async (q, page) => {
    try {
      this.setState({isLoading: true})
      const response = await fetch(apiURL + `&q=${q}&page=${page}`);
      const data = await response.json();
      const images = data.hits;
      this.setState(prevState => ({
        images: prevState.images.concat(images),
      }));
      // this.setState({images})
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const searchbarValue = e.currentTarget.elements.searchbar.value;
    this.setState({ currentPage: 1, images: [], currentQuery: searchbarValue });
    // const { currentPage } = this.state;

    // this.setState({ currentQuery: searchbarValue });
    await this.fetchAPI(searchbarValue, 1);
    this.setState({isLoading: false})
  };

  fetchMoreImages = () => {
    const { currentQuery, currentPage } = this.state;
    this.fetchAPI(currentQuery, currentPage + 1);
    this.handleCurrentPageUpdate();
    this.setState({isLoading: false})
  };

  handleCurrentPageUpdate = () => {
    this.setState(state => {
      return { currentPage: state.currentPage + 1 };
    });
  };

  // handleClick = (e) => {
  //   console.log("danke")
  //   console.log(e.target);
  //   this.setState({isModalOpen: true})
  // }

  render() {

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        {!this.state.isLoading ? (
          <ImageGallery onClick={this.handleClick}>
            <ImageGalleryItem
              loadedPhotos={this.state.images}
            ></ImageGalleryItem>
          </ImageGallery>
        ) : (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        )}
        <LoadMoreButton
          showButton={this.state.images.length > 0}
          onClick={this.fetchMoreImages}
        ></LoadMoreButton>
        {/* <Modal show={this.state.isModalOpen} imageUrl={}></Modal> */}
      </div>
    );
  }
}
