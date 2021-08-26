sap.ui.define([
    "../BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("sap.pieces.controller.process.ProcessList", {
        onInit: function () {
            this.setModel(new JSONModel(), "processList");
            this.getRouter().getRoute("processList").attachPatternMatched(this._onRouteMatched, this);
        },

        onNavBack: function () {
            this.myNavBack("pieces");
        },

        _onRouteMatched: function () {
            this._loadData();
        },

        _loadData: function () {
            let that = this;
            $.ajax({
                url: "http://localhost:9006/octopus/processes",
                success: function (sResult) {
                    that.setModel(new JSONModel(sResult), "processList");
                }
            });
        },

        onPress: function (oEvent) {
            this.getRouter().navTo("process", {
                processId: oEvent.getSource().getBindingContext("processList").getProperty("id")
            });
        }
    })
})