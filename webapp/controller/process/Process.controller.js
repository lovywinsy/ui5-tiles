sap.ui.define([
    "../BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/pieces/model/formatter"
], function (BaseController, JSONModel, formatter) {
    "use strict";

    return BaseController.extend("sap.pieces.controller.process.Process", {
        formatter: formatter,

        onInit: function () {
            this.setModel(new JSONModel({}), "process");
            this.setModel(new JSONModel({}), "workflowList");
            this.getRouter().getRoute("process").attachPatternMatched(this._onRouteMatched, this);
        },

        onNavBack: function () {
            this.myNavBack("processList");
        },

        _onRouteMatched: function (oEvent) {
            const sProcessId = oEvent.getParameter("arguments").processId;
            const sProcessUrl = `http://localhost:9006/octopus/processes/${sProcessId}`;
            const sWorkflowsUrl = `http://localhost:9006/octopus/workflows`;
            this._loadData(sProcessUrl, "process");
            this._loadData(sWorkflowsUrl, "workflowList");
        },

        _loadData: function (sUrl, sModelName) {
            let that = this;
            $.ajax({
                url: sUrl,
                success: function (sResult) {
                    that.setModel(new JSONModel(sResult), sModelName);
                }
            });
        },
    })
})