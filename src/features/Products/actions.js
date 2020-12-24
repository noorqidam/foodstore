import {
  PREV_PAGE,
  NEXT_PAGE,
  TOGGLE_TAG,
  SET_TAGS,
  SET_CATEGORY,
  SET_KEYWORD,
  SET_PAGE,
  ERROR_FETCHING_PRODUCT,
  SUCCESS_FETCHING_PRODUCT,
  START_FETCHING_PRODUCT,
} from "./constants";
import { getProducts } from "../../api/product";
import debounce from "debounce-promise";

let debounceFetchProducts = debounce(getProducts, 1000);

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchProducts());

    let perPage = getState().products.perPage || 9;
    let currentPage = getState().products.currentPage || 1;
    let tags = getState().products.tags || [];
    let keyword = getState().products.keyword || "";
    let category = getState().products.category || "";

    const params = {
      limit: perPage,
      skip: currentPage * perPage - perPage,
      q: keyword,
      tags,
      category,
    };

    try {
      let {
        data: { data, count },
      } = await debounceFetchProducts(params);
      dispatch(successFetchProducts({ data, count }));
    } catch (err) {
      dispatch(errorFetchProducts());
    }
  };
};

export const startFetchProducts = () => {
  return {
    type: START_FETCHING_PRODUCT,
  };
};

export const successFetchProducts = (payload) => {
  return {
    type: SUCCESS_FETCHING_PRODUCT,
    ...payload,
  };
};

export const errorFetchProducts = () => {
  return {
    type: ERROR_FETCHING_PRODUCT,
  };
};

export const setPage = (number = 1) => {
  return {
    type: SET_PAGE,
    currentPage: number,
  };
};

export const goToNextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};

export const goToPrevPage = () => {
  return {
    type: PREV_PAGE,
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category,
  };
};

export const setTags = (tags) => {
  return {
    type: SET_TAGS,
    tags,
  };
};

export const clearTags = () => {
  return setTags([]);
};

export const toggleTag = (tag) => {
  return {
    type: TOGGLE_TAG,
    tag,
  };
};
