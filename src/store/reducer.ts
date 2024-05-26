// src/store/reducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffer, setOffers, setReviews, setNearbyOffers, fetchOffer, fetchReviews, fetchNearbyOffers, fetchOffers, setAuthorizationStatus, checkAuth, setUserData, login } from './action';
import { City, Offer, Reviews, WideOffer, UserData } from '../types/types';
import { CITIES, AuthorizationStatus } from '../const';

type StateType = {
  city: City;
  offers: Offer[];
  currentOffer: WideOffer | null;
  reviews: Reviews;
  nearbyOffers: Offer[];
  isLoadingOffers: boolean;
  isLoadingOffer: boolean;
  isLoadingReviews: boolean;
  isLoadingNear: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

const initialState: StateType = {
  city: CITIES.find((city) => city.name === 'Paris') as City,
  offers: [],
  currentOffer: null,
  reviews: [],
  nearbyOffers: [],
  isLoadingOffers: true,
  isLoadingOffer: true,
  isLoadingReviews: true,
  isLoadingNear: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
      state.isLoadingOffers = false;
    })
    .addCase(setOffer, (state, action) => {
      state.currentOffer = action.payload;
      state.isLoadingOffer = false;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
      state.isLoadingReviews = false;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
      state.isLoadingNear = false;
    })
    .addCase(setAuthorizationStatus, (state, action: { payload: AuthorizationStatus }) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action: { payload: UserData}) => {
      state.userData = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isLoadingOffers = true;
    })
    .addCase(fetchOffer.pending, (state) => {
      state.isLoadingOffer = true;
    })
    .addCase(fetchReviews.pending, (state) => {
      state.isLoadingReviews = true;
    })
    .addCase(fetchNearbyOffers.pending, (state) => {
      state.isLoadingNear = true;
    })
    .addCase(fetchOffers.fulfilled, (state) => {
      state.isLoadingOffers = false;
    })
    .addCase(fetchOffer.fulfilled, (state) => {
      state.isLoadingOffer = false;
    })
    .addCase(fetchReviews.fulfilled, (state) => {
      state.isLoadingReviews = false;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state) => {
      state.isLoadingNear = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isLoadingOffer = false;
    })
    .addCase(fetchOffer.rejected, (state) => {
      state.isLoadingOffer = false;
    })
    .addCase(fetchReviews.rejected, (state) => {
      state.isLoadingReviews = false;
    })
    .addCase(fetchNearbyOffers.rejected, (state) => {
      state.isLoadingNear = false;
    })
    .addCase(checkAuth.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(login.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(login.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export { reducer };
