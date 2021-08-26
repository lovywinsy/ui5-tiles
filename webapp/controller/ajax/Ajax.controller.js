sap.ui.define([
    "../BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    return BaseController.extend("sap.pieces.controller.ajax.Ajax", {
        onInit: function () {

        },

        onNavBack: function () {
            this.myNavBack("pieces");
        }
    })
})