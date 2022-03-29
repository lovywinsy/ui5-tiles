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
    'sap/ui/model/Sorter',
    './ODataService'], function (BaseController, JSONModel, Controller, TypeString, ColumnListItem, Label, SearchField, Token, Filter, FilterOperator, Fragment, Sorter, ODataService) {
    "use strict";

    var gTokens = [];

    return BaseController.extend("sap.pieces.controller.vh.ValueHelp", {
        oDataService: ODataService,

        onInit: function () {
            this._oMultiInput = this.getView().byId("multiInput");
            this.getView().setModel(new JSONModel(ODataService.selectProducts()));
        },

        onNavBack: function () {
            this.myNavBack("pieces");
        },

        onValueHelpRequested: function () {
            this._oBasicSearchField = new SearchField();
            Fragment.load({
                name: "sap.pieces.view.vh.ValueHelpFilter", controller: this
            }).then(function name(oFragment) {
                this._oValueHelpDialog = oFragment;
                this.getView().addDependent(this._oValueHelpDialog);

                var aTokens = this._oMultiInput.getTokens();

                var oFilterBar = this._oValueHelpDialog.getFilterBar();
                oFilterBar.setFilterBarExpanded(false);
                oFilterBar.setBasicSearch(this._oBasicSearchField);

                let mTable = new sap.m.Table({
                    id: "idOfMTable",
                    updateFinished: function (oEvent) {
                        oEvent.getSource().getItems().forEach(item => {
                            let sId = item.getCells()[0].getText();
                            let aTokens = gTokens.map(token => token.getKey());
                            if (aTokens.includes(sId)) {
                                item.setSelected(true);
                            }
                        })
                    },
                    columns: [
                        new sap.m.Column({
                            header: [
                                new sap.m.Label({
                                    text: "ProductId"
                                })
                            ]
                        }),
                        new sap.m.Column({
                            header: [
                                new sap.m.Label({
                                    text: "Name"
                                })
                            ]
                        })
                    ],
                    items: {
                        path: '/',
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({
                                    text: "{ProductId}"
                                }),
                                new sap.m.Text({
                                    text: "{Name}"
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

            return "aa";
        },

        helloWorld: function () {
            alert("hello");
        },

        onValueHelpOkPress: function (oEvent) {
            var aTokens = oEvent.getParameter("tokens");
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
            this.byId("__dialog1-ranges").setVisible(false);

            var sSearchQuery = this._oBasicSearchField.getValue(),
                aSelectionSet = oEvent.getParameter("selectionSet");
            var aFilters = aSelectionSet.reduce(function (aResult, oControl) {
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
                    new Filter({ path: "ProductId", operator: FilterOperator.Contains, value1: sSearchQuery }),
                    new Filter({ path: "Name", operator: FilterOperator.Contains, value1: sSearchQuery })
                ],
                and: false
            }));

            this._filterTable(new Filter({
                filters: aFilters,
                and: true
            }));
        },

        _filterTable: function (oFilter) {
            var oValueHelpDialog = this._oValueHelpDialog;

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
