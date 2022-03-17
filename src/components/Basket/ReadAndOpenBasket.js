import axios from "axios";
import { toast } from "react-toastify";
import Appbase from "appbase-js";
import {
  basketBaseUrl,
  ApiKey,
  ApiBaseUrl,
  AppbaseCredentials,
  AppbaseAppUrl,
  JewelrySerialApp,
  JewelryStyleApp,
  DiamondSerialApp,
  GemstoneSerialApp,
  basketApikey,
  appbaseBasketUrl,
  AppbaseBasketApp,
} from "../../utils/constants";

async function fetchBasket(basketSelected, token) {
  var payload = {
    data: {
      defaults: {
        // baseURL: basketBaseUrl,
        // token: token,
        index: AppbaseBasketApp,
      },
      inputs: {
        id: basketSelected,
      },
    },
  };
  // console.log("payload : ", payload);
  return await axios
    // .post(ApiBaseUrl + "orderdetails", payload, {
    //   headers: {
    //     "x-api-key": ApiKey,
    //   },
    // })
    .post(appbaseBasketUrl + "getbasket", payload, {
      headers: {
        "x-api-key": basketApikey,
      },
    })
    .then((res) => {
      // console.log("resp : ", res);
      // return JSON.parse(res.data.body);
      return res.data;
    })
    .catch((err) => {
      console.log("error : ", err);
      toast.error("Fetching baskets error !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
      });
      return false;
    });
}

function getUniqueItemWithQty(basketItems) {
  const arrayFiltered = [];
  basketItems.forEach((obj) => {
    const item = arrayFiltered.find((thisItem) => {
      var { Quantity, LineNbr, ...omittedOriginal } = thisItem;
      var { Quantity, LineNbr, ...omittedUpdated } = obj;
      return JSON.stringify(omittedOriginal) === JSON.stringify(omittedUpdated);
    });
    if (item) {
      item.Quantity = item.Quantity + 1;
      return;
    }
    arrayFiltered.push(obj);
  });
  return arrayFiltered;
}

async function getItemFromAppBase({ item, searchOption, appFlag }) {
  var query = item.SerialNumber || item;
  var dynamicQuery;
  var app = JewelrySerialApp;
  if (item.ProductType === "D") {
    dynamicQuery = [
      {
        query: {
          bool: {
            must: [
              {
                match: { SerialNumber: item.SerialNumber },
              },
              { match: { ItemStatus: "Active" } },
            ],
          },
        },
      },
    ];
    app = DiamondSerialApp;
  } else if (item.ProductType === "G") {
    dynamicQuery = [
      {
        query: {
          bool: {
            must: [
              {
                match: { SerialNumber: item.SerialNumber },
              },
              { match: { ItemStatus: "Active" } },
            ],
          },
        },
      },
    ];
    app = GemstoneSerialApp;
  } else {
    if (
      (searchOption && searchOption === "serial") ||
      (searchOption === "mixed" &&
        item.SerialNumber &&
        item.SerialNumber !== null)
    ) {
      // console.log("item.serial: ", item.SerialNumber);
      // console.log("dynamic query 1");
      dynamicQuery = [
        {
          query: {
            bool: {
              must: [
                {
                  match: { SerialNumber: query },
                },
                { match: { ItemStatus: "Active" } },
              ],
            },
          },
        },
      ];
      app = JewelrySerialApp;
    }
    if (searchOption && searchOption === "style") {
      // console.log("dynamic query 2");
      dynamicQuery = [
        {
          query: {
            bool: {
              must: {
                match: { StyleNumber: query },
              },
            },
          },
        },
      ];
      app = JewelryStyleApp;
    }
    if (
      (searchOption === "mixed" && !item.SerialNumber) ||
      item.SerialNumber === null
    ) {
      // console.log("dynamic query 3");
      dynamicQuery = [
        {
          query: {
            bool: {
              must: {
                match: { StyleNumber: item.StyleNumber },
              },
            },
          },
        },
      ];
      app = JewelryStyleApp;
    }
    if (searchOption && searchOption === "serial" && appFlag === "D") {
      // console.log("dynamic query 4");
      dynamicQuery = [
        {
          query: {
            bool: {
              must: [
                {
                  match: { SerialNumber: query },
                },
                { match: { ItemStatus: "Active" } },
              ],
            },
          },
        },
      ];
      app = DiamondSerialApp;
    }
    if (searchOption && searchOption === "serial" && appFlag === "G") {
      // console.log("dynamic query 5");
      dynamicQuery = [
        {
          query: {
            bool: {
              must: [
                {
                  match: { SerialNumber: query },
                },
                { match: { ItemStatus: "Active" } },
              ],
            },
          },
        },
      ];
      app = GemstoneSerialApp;
    }
  }
  // console.log("dynamic query: ", dynamicQuery);
  var appbase = Appbase({
    url: AppbaseAppUrl,
    app: app,
    credentials: AppbaseCredentials,
  });
  var res = appbase
    .search({
      body: dynamicQuery,
    })
    .then((response) => {
      return response.hits.hits;
    })
    .catch(() => console.log("error while appbase fetch"));
  return res;
}

export { fetchBasket, getUniqueItemWithQty, getItemFromAppBase };
