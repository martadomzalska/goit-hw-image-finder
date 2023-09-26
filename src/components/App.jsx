import { Component } from 'react';
import { Blocks } from 'react-loader-spinner';
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
    modalURL: '',
    isModalOpen: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  fetchAPI = async (q, page) => {
    try {
      this.setState({ isLoading: true });
      const response = await fetch(apiURL + `&q=${q}&page=${page}`);
      const data = await response.json();
      const images = data.hits;
      this.setState(prevState => ({
        images: prevState.images.concat(images),
      }));
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const searchbarValue = e.currentTarget.elements.searchbar.value;
    this.setState({ currentPage: 1, images: [], currentQuery: searchbarValue });
    await this.fetchAPI(searchbarValue, 1);
    this.setState({ isLoading: false });
  };

  fetchMoreImages = () => {
    const { currentQuery, currentPage } = this.state;
    this.fetchAPI(currentQuery, currentPage + 1);
    this.handleCurrentPageUpdate();
    this.setState({ isLoading: false });
  };

  handleCurrentPageUpdate = () => {
    this.setState(state => {
      return { currentPage: state.currentPage + 1 };
    });
  };

  openModal = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const srcset = e.target.srcset;
    this.setState({ isModalOpen: true, modalURL: srcset }, () => {
      console.log(this.state);
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, modalURL: '' });
  };

  handleKeyPress = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };

  render() {
    const { isLoading, images, isModalOpen, modalURL } = this.state;
    return (
      <div
        styles={{
          // display: 'grid',
          // gridTemplateColumns: '1fr',
          // gridGap: '16px',
          // paddingBottom: '24px',
         
        }}
      >
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        
             {!isLoading ? (
          <ImageGallery onClick={this.openModal}>
            <ImageGalleryItem loadedPhotos={images}></ImageGalleryItem>
          </ImageGallery>
        ) : (
            <div className='container'><Blocks/></div>
        )}
        
        
     <LoadMoreButton
          showButton={images.length > 0}
          onClick={this.fetchMoreImages}
        ></LoadMoreButton>
        <Modal
          show={isModalOpen}
          imageUrl={modalURL}
          onClose={this.closeModal}
        ></Modal>
      </div>
    );
  }
}
