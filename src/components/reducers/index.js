import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
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
  OPEN_BASKET_ITEMS,
  TOGGLE_BASKET_LOADER,
  SETTOKEN,
  SETSORTOPTION,
  UPDATE_ITEM_SELECTED,
  SET_ASSET_OR_MEMO,
  SET_GROUPS,
} from "../actions/actionTypes";
import { toast } from "react-toastify";

let defaultState = {
  show: false,
  url: "",
  editorial: "",
};
let defaultSingleViewState = {
  show: false,
  item: {},
};
let defaultGroupState = {
  groups: [],
};
let defaultBasketState = {
  show: false,
};
let defaultAppState = {
  app: "original",
};
let defaultCartProduct = {
  items: [],
};
let defaultBasketInputs = {
  orderNbr: "New",
  basketType: "Retail Proposal",
  desc: "",
  internalNotes: "",
  customer: "",
  contact: "",
  occasion: "default",
  includeRetail: false,
  includeWholesale: false,
  includePrice: false,
  user: "",
  includeLinks: "",
  basketUserDetails: "",
  makePrivate: false,
  status: "Active",
  edit: false,
  assetOrmemo: "A",
  showWholesale: true,
  access: "",
};
let defaultLoaderState = {
  isLoading: false,
};
let defaultToken = {
  token: "",
};
let defaultSortOption = {
  basketSortOption: [],
};

function basket(state = defaultBasketState, action) {
  let { payload } = action;
  switch (action.type) {
    case TOGGLE_BASKET:
      return Object.assign({}, state, {
        show: payload.show,
      });
    default:
      return state;
  }
}
function singleViewModal(state = defaultSingleViewState, action) {
  let { payload } = action;
  switch (action.type) {
    case TOGGLE_SINGLE_VIEW_MODAL:
      return Object.assign({}, state, {
        show: payload.show,
        item: payload.item,
      });
    default:
      return state;
  }
}
function iframeModal(state = defaultState, action) {
  let { payload } = action;
  switch (action.type) {
    case TOGGLE_IFRAME_MODAL:
      return Object.assign({}, state, {
        show: payload.show,
        url: payload.url,
        editorial: payload.editorial,
      });
    default:
      return state;
  }
}
function AppType(state = defaultAppState, action) {
  let { payload } = action;
  switch (action.type) {
    case SETAPPTYPE:
      return Object.assign({}, state, {
        app: payload,
      });
    default:
      return state;
  }
}
function cartActions(state = defaultCartProduct, action) {
  let { payload } = action;
  switch (action.type) {
    case ADD_TO_CART:
      var UpdatedItems = {
        ...payload.product,
        quantity: 1,
        InternalNote: "",
        priceVisibility: "Default",
        linkVisibility: "Default",
        productType: payload.productType,
        itemSelected: true,
        // assetOrmemo: payload.assetOrmemo,
        assetOrmemo: "",
      };
      let index = state.items.findIndex(
        (el) =>
          el.SerialNumber === UpdatedItems.SerialNumber &&
          el.StyleNumber === UpdatedItems.StyleNumber
      );
      if (index === -1) {
        toast.success("Added to basket !", {
          // position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          pauseOnHover: false,
          theme: "colored",
        });
        return {
          items: [UpdatedItems, ...state.items],
        };
      } else {
        toast.success("Already added !", {
          // position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          pauseOnHover: false,
          theme: "colored",
        });
        return {
          items: state.items,
        };
      }
    case OPEN_BASKET_ITEMS:
      return {
        items: [...payload.item],
      };
    case REMOVE_FROM_CART:
      var remainingItems = state.items.filter((item) => {
        return JSON.stringify(item) !== JSON.stringify(payload);
      });
      return {
        items: remainingItems,
      };
    case UPDATE_QUANTITY:
      var updatedQtyItems = state.items.map((el) => {
        if (JSON.stringify(el) === JSON.stringify(payload.item)) {
          el.quantity = payload.qty;
          return el;
        } else {
          return el;
        }
      });
      return {
        items: updatedQtyItems,
      };
    case UPDATE_INTERNAL_NOTES:
      var updatedNoteItems = state.items.map((el) => {
        if (JSON.stringify(el) === JSON.stringify(payload.item)) {
          el.InternalNote = payload.note;
          return el;
        } else {
          return el;
        }
      });
      return {
        items: updatedNoteItems,
      };
    case UPDATE_PRICE_VISIBILITY:
      var updatedVisibilityItem = state.items.map((el) => {
        if (JSON.stringify(el) === JSON.stringify(payload.item)) {
          el.priceVisibility = payload.visibility;
          return el;
        } else {
          return el;
        }
      });
      return {
        items: updatedVisibilityItem,
      };
    case UPDATE_LINK_VISIBILITY:
      var updatedVisibilityItem = state.items.map((el) => {
        if (JSON.stringify(el) === JSON.stringify(payload.item)) {
          el.linkVisibility = payload.visibility;
          return el;
        } else {
          return el;
        }
      });
      return {
        items: updatedVisibilityItem,
      };
    case UPDATE_ITEM_SELECTED:
      var updatedSelectedItems = state.items.map((el) => {
        if (JSON.stringify(el) === JSON.stringify(payload.item)) {
          el.itemSelected = payload.selected;
          return el;
        } else {
          return el;
        }
      });
      return {
        items: updatedSelectedItems,
      };
    case SET_ASSET_OR_MEMO:
      var updatedAssetOrMemoItem = state.items.map((el) => {
        if (JSON.stringify(el) === JSON.stringify(payload.item)) {
          el.assetOrmemo = payload.value;
          return el;
        } else {
          return el;
        }
      });
      return {
        items: updatedAssetOrMemoItem,
      };
    case RESET_STATE:
      sessionStorage.removeItem("reduxState");
      return (state = defaultCartProduct);
    default:
      return state;
  }
}

function basketInputChange(state = defaultBasketInputs, action) {
  let { payload } = action;
  switch (action.type) {
    case BASKET_FORM_INFO:
      // console.log("basketInputObjpayload: ", payload);
      return Object.assign({}, state, {
        orderNbr:
          payload.orderNbr === undefined ? state.orderNbr : payload.orderNbr,
        basketType: payload.basketType || state.basketType,
        desc: payload.desc === undefined ? state.desc : payload.desc,
        internalNotes:
          payload.internalNotes === undefined
            ? state.internalNotes
            : payload.internalNotes,
        customer:
          payload.customer === undefined ? state.customer : payload.customer,
        contact:
          payload.contact === undefined ? state.contact : payload.contact,
        occasion: payload.occasion || state.occasion,
        includeRetail:
          payload.includeRetail === undefined
            ? state.includeRetail
            : payload.includeRetail,
        includeWholesale:
          payload.includeWholesale === undefined
            ? state.includeWholesale
            : payload.includeWholesale,
        includePrice:
          payload.includePrice === undefined
            ? state.includePrice
            : payload.includePrice,
        user: payload.user === undefined ? state.user : payload.user,
        includeLinks:
          payload.includeLinks === undefined
            ? state.includeLinks
            : payload.includeLinks,
        basketUserDetails:
          payload.basketUserDetails === undefined
            ? state.basketUserDetails
            : payload.basketUserDetails,
        makePrivate:
          payload.makePrivate === undefined
            ? state.makePrivate
            : payload.makePrivate,
        status: payload.status === undefined ? state.status : payload.status,
        edit: payload.edit === undefined ? state.edit : payload.edit,
        assetOrmemo:
          payload.assetOrmemo === undefined
            ? state.assetOrmemo
            : payload.assetOrmemo,
        showWholesale:
          payload.showWholesale === undefined
            ? state.showWholesale
            : payload.showWholesale,
        access: payload.access === undefined ? state.access : payload.access,
      });
    case RESET_STATE:
      sessionStorage.removeItem("reduxState");
      return (state = { ...defaultBasketInputs, user: state.user });
    // return (state = defaultBasketInputs);
    default:
      return state;
  }
}

function loaderActions(state = defaultLoaderState, action) {
  let { payload } = action;
  switch (action.type) {
    case TOGGLE_BASKET_LOADER:
      return Object.assign({}, state, {
        isLoading: payload,
      });
    default:
      return state;
  }
}
function tokenState(state = defaultToken, action) {
  let { payload } = action;
  switch (action.type) {
    case SETTOKEN:
      return Object.assign({}, state, {
        token: payload,
      });
    default:
      return state;
  }
}
function sortOption(state = defaultSortOption, action) {
  let { payload } = action;
  switch (action.type) {
    case SETSORTOPTION:
      return Object.assign({}, state, {
        basketSortOption: payload,
      });
    case RESET_STATE:
      return (state = defaultSortOption);
    default:
      return state;
  }
}
function SetGroups(state = defaultGroupState, action) {
  let { payload } = action;
  console.log({ payload });

  switch (action.type) {
    case SET_GROUPS:
      return Object.assign({}, state, {
        groups: payload.groups,
      });
    default:
      return state;
  }
}

export default // (history) =>
combineReducers({
  iframeModal,
  singleViewModal,
  basket,
  AppType,
  cartActions,
  basketInputChange,
  loaderActions,
  tokenState,
  sortOption,
  SetGroups,
  // router: connectRouter(history),
});
