sap.ui.define([
    "../BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("sap.pieces.controller.graphic.Graphic", {

        onInit: function () {
            let oModel = new JSONModel(jQuery.sap.getModulePath(
                "sap.pieces",
                "/graph.json"));
            oModel.setSizeLimit(Number.MAX_SAFE_INTEGER);
            this.getView().setModel(oModel);


            this.oModelSettings = new JSONModel({
                maxIterations: 200,
                maxTime: 500,
                initialTemperature: 200,
                coolDownStep: 1
            });
            this.setModel(this.oModelSettings, "settings");
            this.oGraph = this.byId("graph");
            this.oGraph._fZoomLevel = 1;
        },

        onNavBack: function () {
            this.myNavBack("pieces");
        }
    })
})