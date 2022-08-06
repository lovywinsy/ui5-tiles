sap.ui.define([
    "../BaseController",
    "sap/ui/model/json/JSONModel",
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/type/String',
    'sap/m/ColumnListItem',
    'sap/m/Label',
    'sap/m/SearchField',
    'sap/m/Token',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/core/Fragment',
    'sap/ui/model/Sorter'], function (BaseController, JSONModel, Controller, TypeString, ColumnListItem, Label, SearchField, Token, Filter, FilterOperator, Fragment, Sorter) {
    "use strict";

    let gTokens = [];

    return BaseController.extend("sap.pieces.controller.vh.ValueHelp", {

        onInit: function () {
            this._oMultiInput = this.getView().byId("multiInput");
            this.getView().setModel(new JSONModel(jQuery.sap.getModulePath(
                "sap.pieces",
                "/data/products.json")));
        },

        onNavBack: function () {
            this.myNavBack("pieces");
        },

        onValueHelpRequested: function () {
            this._oBasicSearchField = new SearchField();
            this._oBasicSearchField.setShowSearchButton(false);
            Fragment.load({
                name: "sap.pieces.view.vh.ValueHelpFilter", controller: this
            }).then(function name(oFragment) {
                this._oValueHelpDialog = oFragment;
                this.getView().addDependent(this._oValueHelpDialog);
                let oFilterBar = this._oValueHelpDialog.getFilterBar();
                oFilterBar.setFilterBarExpanded(false);
                oFilterBar.setBasicSearch(this._oBasicSearchField);
                let table = sap.ui.xmlfragment("sap.pieces.view.vh.GridValueHelpTable", this);
                this._oValueHelpDialog.setTable(table);
                this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
                this._oValueHelpDialog.open();
            }.bind(this));
        },

        onValueHelpOkPress: function (oEvent) {
            let aTokens = oEvent.getParameter("tokens");
            this._oMultiInput.setTokens(aTokens);
            gTokens = aTokens;
            this._oValueHelpDialog.close();
        },

        onValueHelpCancelPress: function () {
            this._oValueHelpDialog.close();
        },

        onValueHelpAfterClose: function () {
            this._oValueHelpDialog.destroy();
        },

        onFilterBarSearch: function (oEvent) {
            let sSearchQuery = this._oBasicSearchField.getValue(),
                aSelectionSet = oEvent.getParameter("selectionSet");
            let aFilters = aSelectionSet.reduce(function (aResult, oControl) {
                if (oControl.getValue()) {
                    aResult.push(new Filter({
                        path: oControl.getName(),
                        operator: FilterOperator.Contains,
                        value1: oControl.getValue()
                    }));
                }
                return aResult;
            }, []);

            aFilters.push(new Filter({
                filters: [
                    new Filter({path: "ProductId", operator: FilterOperator.Contains, value1: sSearchQuery}),
                    new Filter({path: "Name", operator: FilterOperator.Contains, value1: sSearchQuery})
                ],
                and: false
            }));

            this._filterTable(new Filter({
                filters: aFilters,
                and: true
            }));
        },

        _filterTable: function (oFilter) {
            let oValueHelpDialog = this._oValueHelpDialog;

            oValueHelpDialog.getTableAsync().then(function (oTable) {
                if (oTable.bindRows) {
                    oTable.getBinding("rows").filter(oFilter);
                }

                if (oTable.bindItems) {
                    oTable.getBinding("items").filter(oFilter);
                }

                oValueHelpDialog.update();
            });
        },
    })
})
