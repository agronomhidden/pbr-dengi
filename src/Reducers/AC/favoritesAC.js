import {
    GET_FAVORITES, ADD_FAVORITE, UPDATE_FAVORITE, DELETE_FAVORITE, FAVORITE, API_REQUEST_ACTION,
    START, SUCCESS, FAIL
} from "../../CONSTANTS"
import * as creator from "../../Services/Api/Messages/messagesClassStorage";
import {logoutCurrentUser} from "./authAC"

export const getFavoritesStart = () => ({
    type: GET_FAVORITES + START,
})

export const getFavoritesSuccess = res => ({
    type: GET_FAVORITES + SUCCESS,
    payload: res
})

export const getFavorites = () => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetFavorites.METHOD,
    beforeAC: (paramsContainer) => getFavoritesStart(),
    successAC: getFavoritesSuccess,
    forbiddenErrorAC: logoutCurrentUser,
})

export const addFavoriteStart = () => ({
    type: ADD_FAVORITE + START,
})

export const addFavoriteSuccess = res => ({
    type: ADD_FAVORITE + SUCCESS,
    payload: res
})

export const favoriteFail = response => ({
    type: FAVORITE + FAIL,
    payload: {fields: response.result, msg: response.message}
})

export const addFavorite = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageAddFavorite.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => addFavoriteStart(),
    successAC: addFavoriteSuccess,
    fieldErrorAC: favoriteFail,
    forbiddenErrorAC: logoutCurrentUser,
})

export const updateFavoriteStart = () => ({
    type: UPDATE_FAVORITE + START,
})

export const updateFavoriteSuccess = res => ({
    type: UPDATE_FAVORITE + SUCCESS,
})

export const updateFavorite = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageUpdateFavorite.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => updateFavoriteStart(),
    successAC: updateFavoriteSuccess,
    fieldErrorAC: favoriteFail,
    forbiddenErrorAC: logoutCurrentUser,
})

export const deleteFavoriteStart = () => ({
    type: DELETE_FAVORITE + START,
})

export const deleteFavoriteSuccess = res => ({
    type: DELETE_FAVORITE + SUCCESS,
})

export const deleteFavorite = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageDelFavorite.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => deleteFavoriteStart(),
    successAC: deleteFavoriteSuccess,
    forbiddenErrorAC: logoutCurrentUser,
})


