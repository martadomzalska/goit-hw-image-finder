import css from './Button.module.css'

export const LoadMoreButton = ({ showButton, onClick }) => {
  return (
    <>{showButton ? <button className={css.button} onClick={onClick}>Load more</button> : null}</>
  );
};