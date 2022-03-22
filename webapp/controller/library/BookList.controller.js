sap.ui.define([
    "../BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("sap.pieces.controller.library.BookList", {

        onInit: function () {
            let oMetadata = {
                "bTableVisible": true
            };
            let oModel = new JSONModel(oMetadata);
            this.setModel(oModel, "ocModel");
        },

        onNavBack: function () {
            this.myNavBack("pieces");
        },

        onPress: function (oEvent) {
            this.getRouter().navTo("book", {
                Id: oEvent.getSource().getBindingContext("book").getProperty("Id")
            });
        },

        onHide: function () {
            this.getView().byId("table").setVisible(false);
        }
    })
})
