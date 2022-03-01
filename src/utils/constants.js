// Appbase Details

var basketBaseUrl = process.env.REACT_APP_BASKET_BASE_URL;
var ProdMode = process.env.REACT_APP_MODE;
var ApiKey = process.env.REACT_APP_API_KEY;
var basketApikey = process.env.REACT_APP_BASKET_API_KEY;
var emailApikey = process.env.REACT_APP_EMAIL_API_KEY;
var ApiBaseUrl = process.env.REACT_APP_API_BASE_URL;
var grantType = process.env.REACT_APP_GRANT_TYPE;
var clientId = process.env.REACT_APP_CLIENT_ID;
var clientSecret = process.env.REACT_APP_CLIENT_SECRET;
var tokenUsername = process.env.REACT_APP_TOKEN_USERNAME;
var tokenPassword = process.env.REACT_APP_TOKEN_PASSWORD;
var tokenScope = process.env.REACT_APP_TOKEN_SCOPE;
var appbaseBasketUrl = process.env.REACT_APP_BASKET_AWS_URL;
var basketEmailUrl = process.env.REACT_APP_EMAIL_AWS_URL;

const BaseURL = "https://kim.kwiat.com";

//Appbase basket details

// const appbaseBasketUrl="https://es-cluster-kwfl-acumatica-catalog-v7-536qcv.searchbase.io/"
// const appbaseBasketCredentials = "sskkHhrv2:855c6e07-7967-4c5b-bf9b-0f9dfd1acaab"

// App credentials
const AppbaseEmployeeApp = "kwfl-acumatica-employees";
// const AppbaseBasketApp = "kwfl-es-basket-production";
const AppbaseBasketApp = "kwfl-es-basket-staging";
const JewelrySerialApp = "kwfl-acumatica-catalog-v7-prod-jewelryserial2";
// const JewelrySerialApp = "kwfl-acumatica-serialsproduction-test";
const JewelryStyleApp = "kwfl-acumatica-catalog-v7-prod-jewelrystyle2";
const DiamondSerialApp = "kwfl-acumatica-catalog-v7-prod-diamondserial2";
const GemstoneSerialApp = "kwfl-acumatica-catalog-v7-prod-gemstoneserial3";
const AppbaseAppUrl =
  "https://es-cluster-kwfl-acumatica-catalog-v7-536qcv.searchbase.io/";
const AppbaseCredentials = "sskkHhrv2:855c6e07-7967-4c5b-bf9b-0f9dfd1acaab";

// Common Fields

const StyleDataField = ["StyleNumber"];
const SerialDataField = ["SerialNumber"];
const MountedStock = ["MountedStockNumber"];
const DiamondTiaraInscription = "DiamondTiaraInscription";
const InProduction = "isInProduction";
const SoldCustomer = ["SoldCustomer", "RetailSoldCustomer"];
const RFID = ["RFIDValue"];

// Jewelry

const KeywordsSearch = [
  "LongDescription",
  "ShortDescription",
  "Description",
  "Name",
  "Provenance",
  "CircaDate",
  "Period",
  "Maker",
  "Metal",
  "CenterShape",
  "ItemSubtype",
  "ItemType",
  "Collection",
  "SubCollection",
  "WRStoneShape",
  "PartwayEternity",
  "VendorRefNbr",
  "LongDescription.autosuggest",
  "ShortDescription.autosuggest",
  "Description.autosuggest",
  "Name.autosuggest",
  "Provenance.autosuggest",
  "CircaDate.autosuggest",
  "Period.autosuggest",
  "Maker.autosuggest",
  "Metal.autosuggest",
  "CenterShape.autosuggest",
  "ItemSubtype.autosuggest",
  "ItemType.autosuggest",
  "Collection.autosuggest",
  "SubCollection.autosuggest",
  "WRStoneShape.autosuggest",
  "PartwayEternity.autosuggest",
  "VendorRefNbr.autosuggest",
];
const WRShapeSerial = "WRShape.keyword";
const WRShapeStyle = "WRStoneShape.keyword";

// Diamond

const DiamondSearchKeyword = ["LabReportNbr"];
const DiamondCaratWeight = "DiamondCaratWeight";
const StoneRatioField = "StoneRatio";

// Gemstone

const GemstoneKeywordSearch = ["LabReportNbr"];

export {
  JewelrySerialApp,
  JewelryStyleApp,
  DiamondSerialApp,
  GemstoneSerialApp,
  AppbaseAppUrl,
  AppbaseCredentials,
  BaseURL,
  StyleDataField,
  SerialDataField,
  DiamondCaratWeight,
  StoneRatioField,
  KeywordsSearch,
  SoldCustomer,
  RFID,
  MountedStock,
  GemstoneKeywordSearch,
  DiamondSearchKeyword,
  DiamondTiaraInscription,
  InProduction,
  WRShapeSerial,
  WRShapeStyle,
  AppbaseEmployeeApp,
  AppbaseBasketApp,
  basketEmailUrl,
  appbaseBasketUrl,
  basketBaseUrl,
  emailApikey,
  ProdMode,
  ApiKey,
  basketApikey,
  ApiBaseUrl,
  grantType,
  clientId,
  clientSecret,
  tokenUsername,
  tokenPassword,
  tokenScope,
};
