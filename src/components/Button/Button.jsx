import css from './Button.module.css';
import PropTypes from 'prop-types';

export const LoadMoreButton = ({ showButton, onClick }) => {
  return (
    <div className={css.buttonContainer}>
      {showButton ? (
        <button className={css.button} onClick={onClick}>
          Load more
        </button>
      ) : null}
    </div>
  );
};

LoadMoreButton.propTypes = {
  showButton: PropTypes.bool,
  onClick: PropTypes.func,
}