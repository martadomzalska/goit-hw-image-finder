import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onSubmit}>
        <button type="submit" className={css.button}>
          Search
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          name="searchbar"
        />
      </form>
    </header>
  );
};
