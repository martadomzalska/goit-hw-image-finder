import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ loadedPhotos, onClick}) => {

    return (
        <> { loadedPhotos.map(photo => (
        <li key={photo.id} onClick={onClick} className={css.galleryItem}>
            <img
                className={css.image}
                    src={photo.webformatURL}
                    srcSet={photo.largeImageURL}
                alt={photo.tags}
            />
        </li>
    ))}
        </>
    )
}

ImageGalleryItem.propTypes = {
    loadedPhotos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            pageURL: PropTypes.string,
            largeImageURL: PropTypes.string,
        })
    ),
    onClick: PropTypes.func,
}

