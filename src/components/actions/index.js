import {
  TOGGLE_IFRAME_MODAL,
  TOGGLE_SINGLE_VIEW_MODAL,
  TOGGLE_BASKET,
  SETAPPTYPE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  UPDATE_INTERNAL_NOTES,
  BASKET_FORM_INFO,
  RESET_STATE,
  UPDATE_PRICE_VISIBILITY,
  UPDATE_LINK_VISIBILITY,
  UPDATE_ITEM_SELECTED,
  OPEN_BASKET_ITEMS,
  TOGGLE_BASKET_LOADER,
  SETTOKEN,
  SETSORTOPTION,
  SET_ASSET_OR_MEMO,
  SET_GROUPS,
} from "./actionTypes";

export function setGroups(payload) {
  return {
    type: SET_GROUPS,
    payload,
  };
}
export function toggleIframeModal(payload) {
  return {
    type: TOGGLE_IFRAME_MODAL,
    payload,
  };
}
export function toggleBasket({ show }) {
  return {
    type: TOGGLE_BASKET,
    payload: { show },
  };
}
export function toggleSingleView({ show, item }) {
  return {
    type: TOGGLE_SINGLE_VIEW_MODAL,
    payload: { show, item },
  };
}

export const setAppType = (type) => ({
  type: SETAPPTYPE,
  payload: type,
});

export const setToken = (token) => ({
  type: SETTOKEN,
  payload: token,
});

export const setSortOption = (option) => ({
  type: SETSORTOPTION,
  payload: option,
});

export function addToCart({ product, productType, assetOrmemo }) {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
      productType,
      assetOrmemo,
    },
  };
}

export function removeFromCart(item) {
  return {
    type: REMOVE_FROM_CART,
    payload: item,
  };
}

export function updateQuantity({ item, qty }) {
  return {
    type: UPDATE_QUANTITY,
    payload: { item: item, qty: qty },
  };
}

export function updateInternalNotes({ item, note }) {
  return {
    type: UPDATE_INTERNAL_NOTES,
    payload: { item: item, note: note },
  };
}

export function setBasketFormInput({
  orderNbr,
  basketType,
  desc,
  internalNotes,
  customer,
  contact,
  occasion,
  includeRetail,
  includeWholesale,
  includePrice,
  user,
  includeLinks,
  basketUserDetails,
  makePrivate,
  status,
  edit,
  assetOrmemo,
  showWholesale,
  access,
}) {
  return {
    type: BASKET_FORM_INFO,
    payload: {
      basketType: basketType,
      desc: desc,
      internalNotes: internalNotes,
      customer: customer,
      contact: contact,
      occasion: occasion,
      includeRetail: includeRetail,
      includeWholesale: includeWholesale,
      includePrice: includePrice,
      orderNbr: orderNbr,
      user: user,
      includeLinks: includeLinks,
      basketUserDetails: basketUserDetails,
      makePrivate: makePrivate,
      status: status,
      edit: edit,
      assetOrmemo: assetOrmemo,
      showWholesale: showWholesale,
      access: access,
    },
  };
}

export function updatePriceVisibility({ item, visibility }) {
  return {
    type: UPDATE_PRICE_VISIBILITY,
    payload: { item: item, visibility: visibility },
  };
}

export function updateLinkVisibility({ item, visibility }) {
  return {
    type: UPDATE_LINK_VISIBILITY,
    payload: { item: item, visibility: visibility },
  };
}
export function updateItemSelected({ item, selected }) {
  return {
    type: UPDATE_ITEM_SELECTED,
    payload: { item: item, selected: selected },
  };
}
export function setAssetOrMemo({ item, value }) {
  return {
    type: SET_ASSET_OR_MEMO,
    payload: { item: item, value: value },
  };
}

export function openCartItems(item) {
  return {
    type: OPEN_BASKET_ITEMS,
    payload: { item: item },
  };
}

export function resetStates() {
  return {
    type: RESET_STATE,
  };
}

export function toggleLoader({ isLoading }) {
  return {
    type: TOGGLE_BASKET_LOADER,
    payload: isLoading,
  };
}
