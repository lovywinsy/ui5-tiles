sap.ui.define(function () {
    "use strict";

    return {
        statusColour: function (sStatus) {
            if (sStatus === "COMPLETED") {
                return "Success";
            } else if (sStatus === "SUBMITTED") {
                return "Information";
            } else if (sStatus === "RUNNING") {
                return "Warning";
            } else {
                return "None";
            }
        }
    };
});