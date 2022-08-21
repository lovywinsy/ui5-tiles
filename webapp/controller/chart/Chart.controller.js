sap.ui.define([
    "../BaseController",
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/data/FlattenedDataset',
    'sap/viz/ui5/controls/common/feeds/FeedItem',
    'sap/viz/ui5/format/ChartFormatter'
], function (BaseController, JSONModel, FlattenedDataset, FeedItem, ChartFormatter) {
    "use strict";

    return BaseController.extend("sap.pieces.controller.chart.Chart", {
        /* ============================================================ */
        /* Constants                                                    */
        /* ============================================================ */
        /**
         * Constants used in the example.
         *
         * @private
         * @property {String} sampleName Name of the chart container sample
         * @property {Object} vizFrame Viz Frame used in the view
         * @property {String} vizFrame.id Id of the Viz Frame
         * @property {Object} vizFrame.dataset Config used for the Viz Frame Flattened data
         * @property {Object[]} vizFrame.dataset.dimensions Flattened data dimensions
         * @property {Object[]} vizFrame.dataset.measures Flattened data measures
         * @property {Object} vizFrame.dataset.data Flattened data other config
         * @property {Object} vizFrame.dataset.data.path Flattened data path
         * @property {String} vizFrame.modulePath Path to the module's data
         * @property {String} vizFrame.type Viz Frame Type
         * @property {Object} vizFrame.properties Viz Frame properties
         * @property {Object} vizFrame.properties.plotArea Viz Frame plot area property
         * @property {Object} vizFrame.properties.plotArea.showGap Viz Frame plot area property
         * @property {Object[]} vizFrame.feedItems Viz Frame feed items
         */
        _constants: {
            sampleName: "sap/suite/ui/commons/sample/ChartContainerSimpleToolbar",
            vizFrame: {
                id: "chartContainerVizFrame",
                dataset: {
                    dimensions: [{
                        name: 'date',
                        value: "{date}"
                    }],
                    measures: [{
                        name: 'success',
                        value: '{total}'
                    }, {
                        name: 'fail',
                        value: '{avg_duration}'
                    }],
                    data: {
                        path: "/Processes"
                    }
                },
                type: "dual_line",
                properties: {
                    plotArea: {
                        showGap: true,
                        dataLabel: {
                            visible: true
                        }
                    },
                    valueAxis: {
                        visible: true,
                        title: {
                            visible: true
                        }
                    },
                    valueAxis2: {
                        visible: true,
                        title: {
                            visible: true
                        }
                    },
                    axisLabels: {
                        title: {
                            visible: false
                        },
                        interval: {
                            unit: ''
                        }
                    },
                    title: {
                        visible: false
                    },
                    interaction: {
                        syncValueAxis: false
                    }
                },
                feedItems: [{
                    'uid': "valueAxis",
                    'type': "Measure",
                    'values': ["success"]
                }, {
                    'uid': "valueAxis2",
                    'type': "Measure",
                    'values': ["fail"]
                }, {
                    'uid': "axisLabels",
                    'type': "Dimension",
                    'values': ["date"]
                }]
            }
        },

        onInit: function () {
            this.setModel(new JSONModel(jQuery.sap.getModulePath(
                "sap.pieces",
                "/data/chart.json")));
            let oVizFrame = this.byId(this._constants.vizFrame.id);
            this._updateVizFrame(oVizFrame);
        },

        onNavBack: function () {
            this.myNavBack("pieces");
        },

        _updateVizFrame: function (vizFrame) {
            let oVizFrame = this._constants.vizFrame;
            let oDataset = new FlattenedDataset(oVizFrame.dataset);

            vizFrame.setDataset(oDataset);
            vizFrame.setModel(this.getModel());
            vizFrame.setVizType(oVizFrame.type);
            vizFrame.setVizProperties(oVizFrame.properties);
            this._addFeedItems(vizFrame, oVizFrame.feedItems);
        },
        /**
         * Adds the passed feed items to the passed Viz Frame.
         *
         * @private
         * @param {sap.viz.ui5.controls.VizFrame} vizFrame Viz Frame to add feed items to
         * @param {Object[]} feedItems Feed items to add
         */
        _addFeedItems: function (vizFrame, feedItems) {
            for (var i = 0; i < feedItems.length; i++) {
                vizFrame.addFeed(new FeedItem(feedItems[i]));
            }
        }
    });
})
