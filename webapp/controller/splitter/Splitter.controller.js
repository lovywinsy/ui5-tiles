sap.ui.define([
    "../BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("sap.pieces.controller.splitter.Splitter", {
        onInit: function () {
            let oData = {
                "Suppliers": [
                    {
                        "ID": "1dqwdqwdqwdqwdqwdasfqwdqsdqsdqwdqwdasdqwdasdwqd1dqwdqwdqwdqwdqwdasfqwdqsdqsdqwdqwdasdqwdasdwqd1dqwdqwdqwdqwdqwdasfqwdqsdqsdqwdqwdasdqwdasdwqd",
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
        }
    })
})
