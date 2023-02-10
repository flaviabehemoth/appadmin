sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent) {
        "use strict";

        return Controller.extend("Admin.appadmin.controller.AdminTilePage", {
            onInit: function () {

            },
            
            getRouter: function () {
                return UIComponent.getRouterFor(this);

            },
            
            vaiAnagUtenti: function () {


                this.getRouter().navTo("RouteAnagUtenti");

            },
            vaiAnagFlussi: function () {


                this.getRouter().navTo("RouteAnagFlussi");

            },
            vaiTabellaGestione: function () {


                this.getRouter().navTo("RouteUtentiFlusso");

            }
        });
    });