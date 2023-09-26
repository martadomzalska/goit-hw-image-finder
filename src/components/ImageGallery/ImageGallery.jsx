import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ loadedPhotos, onClick }) => {
  return (
    <ul onClick={onClick} className={css.gallery}>
      {loadedPhotos.map(photo => (
        <ImageGalleryItem
          key={photo.id}
          webFormatURL={photo.webformatURL}
          largeImageURL={photo.largeImageURL}
          tags={photo.tags}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  loadedPhotos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      pageURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.func,
};
