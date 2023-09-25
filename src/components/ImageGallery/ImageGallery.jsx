import css from './ImageGallery.module.css';

export const ImageGallery = ({ children , onClick}) => {
    return <ul onClick={onClick} className={css.gallery}>{children}</ul>;
};
