sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/routing/History',
    'sap/ui/core/UIComponent'
], function (Controller, History, UIComponent) {
    "use strict"

    return Controller.extend("sap.pieces.controller.BaseController", {
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

        getModel: function (sName) {
            return this.getView().getModel(sName);
        },

        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },

        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        myNavBack: function (sRoute, mData) {
            let oHistory = History.getInstance();
            let sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                history.go(-1);
            } else {
                // Otherwise we go backwards with a forward history
                this.getRouter().navTo(sRoute, mData, true);
            }
        }
    })
})