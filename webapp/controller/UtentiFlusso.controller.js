sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast,UIComponent,Filter,FilterOperator,FilterType) {
        "use strict";

        return Controller.extend("tileproject.tileproject.controller.tile", {
            onInit: function () {

                var dataModel = this.getOwnerComponent().getModel("model/flussi.json");
                this.getView().setModel(dataModel, "flussiModel");
                console.log("finita oninit")
            },


           


            getRouter: function () {
                return UIComponent.getRouterFor(this);

            },

            vaiADnD: function () {
                this.getRouter().navTo("RouteDnD");
            },

            vaiHome: function () {
                window.history.go(-1)
            },
            onSearch: function (oEvt) {
                var sQuery = oEvt.getParameter("query"),
                    aFilter = [new Filter("id", FilterOperator.Contains, sQuery),
                    new Filter("nome", FilterOperator.Contains, sQuery),
                    new Filter("modulo", FilterOperator.Contains, sQuery),
                    new Filter("cognome", FilterOperator.Contains, sQuery),
                    new Filter("flusso", FilterOperator.Contains, sQuery),
                ],
                    oTable = this.byId("tableUtentiFlussi"),
                    oBinding = oTable.getBinding("items"),
                    oFilter = null;
                if (sQuery.length != 0) {
                    oFilter = new Filter({
                        filters: aFilter,
                        and: false
                    });
                }
                oBinding.filter(oFilter);
            },
            vaiAlDettaglio: function (oEvent) {
                
                var oSource = oEvent.getSource(),
                    oContext = oSource.getBindingContext("flussiModel"),
                    yes = oContext.getPath(),
                    cliente = oContext.getProperty("id");
                this.getRouter().navTo("RouteDnD", {
                    selectedobj: cliente
                });
            },


            vaiHome: function(){
                this.getRouter().navTo("Routetile");
            },
    
            goBack: function(){
                window.history.go(-1);
            },

        });
    });