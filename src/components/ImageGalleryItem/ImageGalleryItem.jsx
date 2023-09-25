import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ loadedPhotos, onClick}) => {

    return (
        <> { loadedPhotos.map(photo => (
        <li key={photo.id} onClick={onClick} className={css.galleryItem}>
            <img
                className={css.image}
                src={photo.webformatURL}
                alt={photo.tags}
            />
        </li>
    ))}
        </>
    )
}

