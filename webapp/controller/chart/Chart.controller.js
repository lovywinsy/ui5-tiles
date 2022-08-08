sap.ui.define([
    "../BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("sap.pieces.controller.chart.Chart", {
        onInit: function () {
        },

        onNavBack: function () {
            this.myNavBack("pieces");
        }
    })
})
