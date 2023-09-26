import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ children , onClick}) => {
    return <ul onClick={onClick} className={css.gallery}>{children}</ul>;
};

ImageGallery.propTypes = {
    children: PropTypes.elementType,
    onClick: PropTypes.func,
}