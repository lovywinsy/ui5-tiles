sap.ui.define([
    "../BaseController",
    "sap/ui/model/json/JSONModel",
    'sap/ui/comp/library',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/type/String',
    'sap/m/ColumnListItem',
    'sap/m/Label',
    'sap/m/SearchField',
    'sap/m/Token',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/core/Fragment',
    'sap/ui/model/Sorter',
    './ODataService'], function (BaseController, JSONModel, compLibrary, Controller, TypeString, ColumnListItem, Label, SearchField, Token, Filter, FilterOperator, Fragment, Sorter, ODataService) {
    "use strict";

    return BaseController.extend("sap.pieces.controller.vh.ValueHelp", {
        oDataService: ODataService,

        onInit: function () {
            this._oMultiInput = this.getView().byId("multiInput");
            this._oMultiInput.setTokens(this._getDefaultTokens());
            this.oProductsModel = new JSONModel(ODataService.selectProducts());
            this.getView().setModel(this.oProductsModel);
            this.getView().setModel(this.oProductsModel, "ooo");
        },

        onNavBack: function () {
            this.myNavBack("pieces");
        },

        onValueHelpRequested: function () {
            Fragment.load({
                name: "sap.pieces.view.vh.ValueHelpFilter", controller: this
            }).then(function name(oFragment) {
                this._oValueHelpDialog = oFragment;
                this.getView().addDependent(this._oValueHelpDialog);

                var oFilterBar = this._oValueHelpDialog.getFilterBar();
                oFilterBar.setFilterBarExpanded(false);
                oFilterBar.setBasicSearch(new SearchField());

                let mTable = new sap.m.Table({
                    id: "idOfMTable",
                    columns: [
                        new sap.m.Column({
                            header: [
                                new sap.m.Label({
                                    text: "Processes Designer"
                                })
                            ]
                        }),
                        new sap.m.Column({
                            header: [
                                new sap.m.Label({
                                    text: "Process Name~"
                                })
                            ]
                        })
                    ],
                    items: {
                        path: '/',
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({
                                    text: "{Name}"
                                }),
                                new sap.m.Text({
                                    text: "{SupplierName}"
                                })
                            ]
                        })
                    }
                });

                this._oValueHelpDialog.setTable(mTable);
                this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
                this._oValueHelpDialog.open();
            }.bind(this));
        },

        formatName: function (sName) {
            alert(sName);
            return "aa";
        },

        onValueHelpOkPress: function (oEvent) {


            var aTokens = oEvent.getParameter("tokens");
            this._oMultiInput.setTokens(aTokens);
            this._oValueHelpDialog.close();
        },

        onValueHelpCancelPress: function () {
            this._oValueHelpDialog.close();
        },

        onValueHelpAfterClose: function () {
            this._oValueHelpDialog.destroy();
        },

        _getDefaultTokens: function () {
            var oToken = new Token({
                key: "HT-1001", text: "Notebook Basic 17 (HT-1001)"
            });
            return [oToken];
        }
    })
})
