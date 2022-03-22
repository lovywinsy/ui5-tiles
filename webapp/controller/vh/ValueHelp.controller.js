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
    './ODataService'
], function (BaseController, JSONModel, compLibrary, Controller, TypeString, ColumnListItem, Label, SearchField, Token, Filter, FilterOperator, Fragment, Sorter, ODataService) {
    "use strict";

    return BaseController.extend("sap.pieces.controller.vh.ValueHelp", {
        onInit: function () {
            this._oMultiInput = this.getView().byId("multiInput");
            this._oMultiInput.setTokens(this._getDefaultTokens());

            this._mViewSettingsDialogs = {};
            this.mGroupFunctions = {
                SupplierName: function (oContext) {
                    var name = oContext.getProperty("SupplierName");
                    return {
                        key: name,
                        text: name
                    };

                }
            };

            let oData = {
                    "cols": [
                        {
                            "label": "ProductId",
                            "template": "ProductId",
                            "width": "5rem"
                        },
                        {
                            "label": "Product Name",
                            "template": "Name"
                        },
                        {
                            "label": "Category",
                            "template": "Category"
                        },
                        {
                            "label": "SupplierName",
                            "template": "SupplierName"
                        },
                    ]
                }
            ;


            this.oProductsModel = new JSONModel(
                ODataService.selectProducts()
            );


            this.oColModel = new JSONModel(oData);

            this.setModel(this.oProductsModel, "ProductCollection");

            this.getView().setModel(this.oProductsModel);
        },

        onNavBack: function () {
            this.myNavBack("pieces");
        },

        // #region
        onValueHelpRequested: function () {
            var aCols = this.oColModel.getData().cols;
            this._oBasicSearchField = new SearchField();

            Fragment.load({
                name: "sap.pieces.view.vh.ValueHelpFilter",
                controller: this
            }).then(function name(oFragment) {
                this._oValueHelpDialog = oFragment;
                this.getView().addDependent(this._oValueHelpDialog);

                this._oValueHelpDialog.setRangeKeyFields([{
                    label: "Product",
                    key: "ProductId",
                    type: "string",
                    typeInstance: new TypeString({}, {
                        maxLength: 7
                    })
                }]);

                var oFilterBar = this._oValueHelpDialog.getFilterBar();
                oFilterBar.setFilterBarExpanded(false);
                oFilterBar.setBasicSearch(this._oBasicSearchField);

                // this._oValueHelpDialog.getTableAsync().then(function (oTable) {
                //     oTable.setModel(this.oProductsModel);
                //     oTable.setModel(this.oColModel, "columns");
                //
                //     if (oTable.bindRows) {
                //         oTable.bindAggregation("rows", "/");
                //     }
                //
                //     if (oTable.bindItems) {
                //         oTable.bindAggregation("items", "/", function () {
                //             return new ColumnListItem({
                //                 cells: aCols.map(function (column) {
                //                     return new Label({text: "{" + column.template + "}"});
                //                 })
                //             });
                //         });
                //     }
                //
                //
                //     this._oValueHelpDialog.update();
                //
                //
                //     //
                //
                //
                //     //
                //
                //
                // }.bind(this));

                let mTable = new sap.m.Table("idOfMTable", {
                    inset: false,
                    headerText: "asdqwdqwd",
                    mode: sap.m.ListMode.None,
                    growingThreshold: 10
                });


                var col1 = new sap.m.Column("colAttch1", {
                    header: new sap.m.Label({
                        text: "Processes Designer"
                    }),
                    mergeDuplicates: false
                });


                var col2 = new sap.m.Column("colAttch2", {
                    header: new sap.m.Label({
                        text: "Process Name",
                    })
                });
                mTable.addColumn(col2);
                mTable.addColumn(col1);

                if (mTable.bindRows) {
                    mTable.bindAggregation("rows", "/");
                }
                if (mTable.bindItems) {
                    mTable.bindAggregation("items", "/", function () {
                        return new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Label({text: "{Name}"}),
                                new sap.m.Label({text: "{SupplierName}"})

                            ]
                        })
                    });
                }


                var genericToolBar = new sap.m.Toolbar();
                genericToolBar.addContent(new sap.m.ToolbarSpacer()).addContent(new sap.m.Button({
                    tooltip: "Group",
                    icon: "sap-icon://group-2",
                    press: function (oEvt) {
                        this.handleGroupButtonPressed(oEvt);
                    }.bind(this),
                    enabled: true
                }))

                mTable.setHeaderToolbar(genericToolBar);

                this._oValueHelpDialog.setTable(mTable);

                this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
                this._oValueHelpDialog.open();
            }.bind(this));
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
                key: "HT-1001",
                text: "Notebook Basic 17 (HT-1001)"
            });

            return [oToken];
        },


        getViewSettingsDialog: function (sDialogFragmentName) {
            var pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

            if (!pDialog) {
                pDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: sDialogFragmentName,
                    controller: this
                }).then(function (oDialog) {
                    oDialog.addStyleClass("sapUiSizeCompact");

                    return oDialog;
                });
                this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
            }
            return pDialog;
        },

        handleGroupButtonPressed: function () {
            this.getViewSettingsDialog("sap.pieces.view.vh.GroupSelector")
                .then(function (oViewSettingsDialog) {
                    oViewSettingsDialog.open();
                });
        },

        handleGroupDialogConfirm: function (oEvent) {

            var
                oTable = this.byId("idProductsTable"),
                mParams = oEvent.getParameters(),
                oBinding = oTable.getBinding("items"),
                sPath,
                bDescending,
                vGroup,
                aGroups = [];

            if (mParams.groupItem) {
                sPath = mParams.groupItem.getKey();
                bDescending = mParams.groupDescending;
                vGroup = this.mGroupFunctions[sPath];
                aGroups.push(new Sorter("SupplierName", bDescending, vGroup));
                // apply the selected group settings
                oBinding.sort(aGroups);
            } else if (this.groupReset) {
                oBinding.sort();
                this.groupReset = false;
            }

        },

        handleGroupDialogConfirm2: function (oEvent) {


            let groupKey = oEvent.getParameters().groupItem?oEvent.getParameters().groupItem.getKey():undefined;
            this._oValueHelpDialog.getTableAsync().then(function (oTable) {

                    var
                        // oTable = this.byId("idProductsTable"),
                        mParams = oEvent.getParameters(),

                        oBinding = oTable.getBinding("items"),
                        sPath,
                        bDescending,
                        vGroup,
                        aGroups = [];
                if (groupKey) {
                    // sPath = mParams.groupItem.getKey();
                    sPath = "SupplierName";
                    bDescending = true;
                    vGroup = this.mGroupFunctions[sPath];
                    aGroups.push(new Sorter(sPath, bDescending, vGroup));
                    // apply the selected group settings
                    oBinding.sort(aGroups);
                } else {
                    oBinding.sort();
                    this.groupReset = false;
                }


            }.bind(this));
        },
    })
})
