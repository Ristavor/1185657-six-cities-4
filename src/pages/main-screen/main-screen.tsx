import { useDispatch, useSelector } from 'react-redux';
import { AppRoute } from '../../const';
import { Link, NavLink } from 'react-router-dom';
import { City, CardType } from '../../types/types';
import { setCity } from '../../store/action';
import { selectCity, selectOffers } from '../../store/selectors';
import CardListComponent from '../../components/card-list/card-list';
import MapComponent from '../../components/map/map';
import CityList from '../../components/city-list/city-list'; // Импортируем новый компонент
import { CITIES } from '../../const'; // Импортируем константу с городами

function MainScreen(): JSX.Element {
  const dispatch = useDispatch();
  const city = useSelector(selectCity);
  const offers = useSelector(selectOffers);

  const handleCityChange = (newCity: City) => {
    dispatch(setCity(newCity));
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={{ pathname: AppRoute.Main }}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink className="header__nav-link header__nav-link--profile" to={{ pathname: AppRoute.Favorites}}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList cities={CITIES} currentCity={city} onCityChange={handleCityChange} /> {/* Используем новый компонент */}
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.filter((offer) => offer.city.title === city.title).length} places to stay in {city.title}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  &nbsp;Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <CardListComponent offers={offers.filter((offer) => offer.city.title === city.title)} cardsType={CardType.City} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {offers.length > 0 && (
                  <MapComponent city={city} points={offers.filter((offer) => offer.city.title === city.title)} selectedPoint={undefined} />
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
