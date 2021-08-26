sap.ui.define([
    "../BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("sap.pieces.controller.model.JsonModel", {
        onInit: function () {
            let oData = {
                "Suppliers": [
                    {
                        "ID": "1",
                        "Name": "Exotic Liquids",
                        "Address": {
                            "Street": "NE 228th",
                            "City": "Sammamish",
                            "State": "WA",
                            "ZipCode": "98074",
                            "Country": "USA"
                        }
                    },
                    {
                        "ID": "2",
                        "Name": "Tokyo Traders",
                        "Address": {
                            "Street": "NE 40th",
                            "City": "Redmond",
                            "State": "WA",
                            "ZipCode": "98052",
                            "Country": "USA"
                        }
                    }
                ]
            };

            let oModel = new JSONModel(oData);

            let oModelTwo = new JSONModel(oData);

            this.setModel(oModel);
            this.setModel(oModelTwo, "supplierList");
        },

        onNavBack: function () {
            this.myNavBack("pieces");
        },

        concatAddress: function (sStreet, sCity, sState, sCountry) {
            return sStreet + " / " + sCity + " / " + sState + " / " + sCountry;
        }
    })
})
