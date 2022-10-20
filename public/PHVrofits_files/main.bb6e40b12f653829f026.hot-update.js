webpackHotUpdate("main",{

/***/ "./src/Pages/UserPages/LogListPage/Components/Header.tsx":
/*!***************************************************************!*\
  !*** ./src/Pages/UserPages/LogListPage/Components/Header.tsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var _this = undefined,
    _jsxFileName = "/Users/tanyihao/Documents/GitHub/phvrofits-frontend/src/Pages/UserPages/LogListPage/Components/Header.tsx";




var Header = function Header(props) {
  var dateRange = props.dateRange,
      totalResults = props.totalResults;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_0__["Box"], {
    sx: {
      padding: '7px 7px 7px 14px',
      display: 'flex',
      border: '1px solid rgba(224,224,224,1)',
      borderRadius: '15px',
      margin: '5px 0 15px 0',
      boxShadow: 'rgba(100, 100, 111, 0.3) 0px 7px 29px 0px',
      height: '20px',
      background: '#2995F7',
      fontSize: '14px',
      color: 'white'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 5
    }
  }, dateRange ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, "Displaying ", totalResults, " logs from", ' ', dateRange.from && dateRange.from.toLocaleDateString(), " to", dateRange.to ? dateRange.to.toLocaleDateString() : ' today') : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, " ", totalResults, " logs found"));
};

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ })

})
//# sourceMappingURL=main.bb6e40b12f653829f026.hot-update.js.map