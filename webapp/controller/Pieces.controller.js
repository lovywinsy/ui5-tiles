sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("sap.pieces.controller.Pieces", {
        onInit: function () {
        },

        onNavToGraphic: function () {
            this.getRouter().navTo("graphic");
        },

        onNavToProcess: function () {
            this.getRouter().navTo("processList");
        },

        onNavToValueHelp: function () {
            this.getRouter().navTo("valueHelp");
        },

        onNavToSplitter: function () {
            this.getRouter().navTo("splitter");
        }
    })
})
