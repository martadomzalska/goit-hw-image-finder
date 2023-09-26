import { Component } from 'react';
import { Blocks } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from 'services/api';

export class App extends Component {
  state = {
    currentPage: 1,
    images: [],
    isLoading: false,
    modalURL: '',
    isModalOpen: false,
    totalHits: null,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  async handleFetchImages(q, page) {
    try {
      this.setState({ isLoading: true });
      const images = await fetchImages(q, page).then(data => {
        this.setState({ totalHits: data.totalHits });
        return data.hits;
      });
      this.setState(prevState => ({
        images: prevState.images.concat(images),
      }));
    } catch (error) {
      this.setState({ isLoading: false, error });
      console.log(error);
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const searchbarValue = e.currentTarget.elements.searchbar.value;
    this.setState({ currentPage: 1, images: [], currentQuery: searchbarValue });
    await this.handleFetchImages(searchbarValue, 1);
    this.setState({ isLoading: false });
  };

  fetchMoreImages = () => {
    const { currentQuery, currentPage } = this.state;
    this.handleFetchImages(currentQuery, currentPage + 1);
    this.handleCurrentPageUpdate();
    this.setState({ isLoading: false });
    console.log(this.state);
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
    this.setState({ isModalOpen: true, modalURL: srcset });
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
    const { isLoading, images, isModalOpen, modalURL, totalHits } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>

        {!isLoading ? (
          <ImageGallery loadedPhotos={images}onClick={this.openModal}>
          </ImageGallery>
        ) : (
          <div className="container">
              <Blocks />
             
          </div>
        )}
        {totalHits === 0 && <p>We're sorry, the picutures you are looking for were not found :( Try searching something else!</p>}

        <LoadMoreButton
          showButton={images.length > 0 && images.length < totalHits}
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
