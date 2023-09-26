import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webFormatURL,
  largeImageURL,
  tags,
}) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.image}
        src={webFormatURL}
        srcSet={largeImageURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webFormatURL : PropTypes.string,
  largeImageURL : PropTypes.string,
  tags : PropTypes.string,
};
