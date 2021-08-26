sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("sap.pieces.controller.Pieces", {
        onInit: function () {
        },

        onNavToLibrary: function () {
            this.getRouter().navTo("bookList");
        },

        onNavToGraphic: function () {
            this.getRouter().navTo("graphic");
        },

        onNavToAjax: function () {
            this.getRouter().navTo("ajax");
        },

        onNavToJsonModel: function () {
            this.getRouter().navTo("jsonmodel");
        },

        onNavToProcess: function () {
            this.getRouter().navTo("processList");
        }
    })
})


