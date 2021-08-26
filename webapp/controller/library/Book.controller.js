sap.ui.define([
    "../BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("sap.pieces.controller.library.Book", {
        onInit: function () {
            let oData = {
                "Id": "123",
                "Name": "Pineapple",
                "Price": 21
            };
            let oModel = new JSONModel(oData);
            this.getView().setModel(oModel);


            this.getRouter().getRoute("book").attachPatternMatched(this._onPostMatched, this);

        },

        onNavBack: function () {
            this.myNavBack("bookList");
        },

        _onPostMatched: function (oEvent) {
        }
    })
})
