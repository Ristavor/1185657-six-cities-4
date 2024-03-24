import { AppRoute } from '../../const';
import { Link, NavLink } from 'react-router-dom';
import { CardType, Offers } from '../../types/types';
import CardList from '../../components/card-list/card-list';

type FavoritesScreenProps = {
  offers: Offers;
};

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  // Функция для фильтрации отелей по наличию закладок
  const filterBookmarkedOffers = (city: string) => offers.filter((offer) => offer.city.title === city && offer.isBookmarked);

  // Получение уникальных городов из списка отелей
  const cities = Array.from(new Set(offers.map((offer) => offer.city.title)));
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={{ pathname: AppRoute.Main }}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink className="header__nav-link header__nav-link--profile" to={{ pathname: AppRoute.Favorites}}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">{offers.filter((offer) => offer.isBookmarked).length}</span>
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city) => (
                <CardList key={city} cardsType={CardType.Favorite} offers={filterBookmarkedOffers(city)} />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
