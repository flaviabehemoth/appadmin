sap.ui.define([
    'sap/ui/core/message/ControlMessageProcessor',
    'sap/ui/core/message/Message',
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/library',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessagePopover',
    'sap/m/MessagePopoverItem',
    'sap/m/MessageToast',
    "sap/ui/core/Core",
    "./Utils",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/core/UIComponent",
    "../model/formatter"
], function (ControlMessageProcessor, Message, Controller, coreLibrary, JSONModel, MessagePopover, MessagePopoverItem, MessageToast, oCore, Utils, Filter, FilterOperator, FilterType, UIComponent, formatter) {
    "use strict";

    var MessageType = coreLibrary.MessageType;

    var PageController = Controller.extend("Admin.appadmin.controller.AdminTilePage", {

        formatter: formatter,

        onInit: function () {
            // var oModel = new JSONModel(sap.ui.require.toUrl("tileproject/tileproject/model/Utenti.json"));
            // this.getView().setModel(oModel);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteAnagFlussi").attachMatched(this._onObjectMatched, this);


            var oMessageProcessor = new ControlMessageProcessor();
            var oMessageManager = oCore.getMessageManager();

            oMessageManager.registerMessageProcessor(oMessageProcessor);

            oMessageManager.addMessages(
                new Message({
                    message: "Something wrong happened",
                    type: MessageType.Error,
                    processor: oMessageProcessor
                })
            );









        },




        onPress: function (oEvent) {

            MessageToast.show("Pressed custom button " + oEvent.getSource().getId());
        },
        onSemanticButtonPress: function (oEvent) {

            var sAction = oEvent.getSource().getMetadata().getName();
            sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

            MessageToast.show("Pressed: " + sAction);
        },
        onSemanticSelectChange: function (oEvent, oData) {
            var sAction = oEvent.getSource().getMetadata().getName();
            sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

            var sStatusText = sAction + " by " + oEvent.getSource().getSelectedItem().getText();
            MessageToast.show("Selected: " + sStatusText);
        },
        onPositionChange: function (oEvent) {
            MessageToast.show("Positioned changed to " + oEvent.getParameter("newPosition"));
        },
        onMessagesButtonPress: function (oEvent) {

            var oMessagesButton = oEvent.getSource();
            if (!this._messagePopover) {
                this._messagePopover = new MessagePopover({
                    items: {
                        path: "message>/",
                        template: new MessagePopoverItem({
                            description: "{message>description}",
                            type: "{message>type}",
                            title: "{message>message}"
                        })
                    }
                });
                oMessagesButton.addDependent(this._messagePopover);
            }
            this._messagePopover.toggle(oMessagesButton);
        },
        onMultiSelectPress: function (oEvent) {
            if (oEvent.getSource().getPressed()) {
                MessageToast.show("MultiSelect Pressed");
            } else {
                MessageToast.show("MultiSelect Unpressed");
            }
        },

        getRouter: function () {
            return UIComponent.getRouterFor(this);

        },
        add: function () {
            this.getRouter().navTo("RouteAddFlusso");
        },


        refresh: function () {

            this.byId("nome").setValue(""),
                this.byId("descrizione").setValue(""),
                this.byId("modulo").setValue("")
        },
        save: function () {

            this.byId("nome").setProperty("editable", false),
                this.byId("descrizione").setProperty("editable", false),
                this.byId("modulo").setProperty("editable", false),

                this.byId("refreshBtn").setProperty("visible", false),
                this.byId("saveBtn").setProperty("visible", false),
                this.byId("editBtn").setProperty("visible", true),
                this.byId("tableUtentiFlussi").byId("eliminaUtenteDaFlussoBtn").setProperty("enabled", false)
        },
        // edit: function () {


        //     this.byId("nome").setProperty("editable", true);
        //     this.byId("descrizione").setProperty("editable", true);
        //     this.byId("modulo").setProperty("editable", true);

        //     this.byId("refreshBtn").setProperty("visible", true),
        //         this.byId("saveBtn").setProperty("visible", true),
        //         this.byId("editBtn").setProperty("visible", false),
        //         this.getView().byId("eliminaUtenteDaFlussoBtn").setProperty("enabled", true)
        // },




        onSelectionChange: function (oEvent) {
            var oList = oEvent.getSource(),
                bSelected = oEvent.getParameter("selected");
            // skip navigation when deselecting an item in multi selection mode
            if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
                // get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
                this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());



            }
        },
        // _onObjectMatched : function (oEvent) {
        //     var sObjectId =  oEvent.getParameter("arguments").objectId;
        //     this._bindView("/Anagrafica_Flussi" + sObjectId);
        // },
        // _bindView : function (sObjectPath) {
        //     var oViewModel = this.getModel("objectView");

        //     this.getView().bindElement({
        //         path: sObjectPath,
        //         events: {
        //             change: this._onBindingChange.bind(this),
        //             dataRequested: function () {
        //                 oViewModel.setProperty("/busy", true);
        //             },
        //             dataReceived: function () {
        //                 oViewModel.setProperty("/busy", false);
        //             }
        //         }
        //     });
        // },
        // onPress: function (oEvent) {
        //     // The source is the list item that got pressed
        //     this._showObject(oEvent.getSource());
        // },

        _showObject: function (oItem) {
            this.getRouter().navTo("object", {
                objectId: oItem.getBindingContext().getPath().substring("/Anagrafica_Flussi".length)
            });
        },

        _showDetail: function (oItem) {
            var id = oItem.getBindingContext().getProperty("ID_FLUSSO"); //prendo l'elemento da selezionare tramite id nella master page

            var moduloNumerico = oItem.getBindingContext().getProperty("ID_MODULO");
            console.log(moduloNumerico);
            this.getView().byId("detail").bindElement({ path: "/Anagrafica_Flussi/" + id });
            // if (moduloNumerico === 1) {
            //     this.byId("modulo").setValue("SD")
            // } else if (moduloNumerico === 2) {
            //     this.byId("modulo").setValue("FI")
            // } else if (moduloNumerico === 3) {
            //     this.byId("modulo").setValue("MM")
            // } else if (moduloNumerico === 4) {
            //     this.byId("modulo").setValue("PM")
            // } else if (moduloNumerico === 5) {
            //     this.byId("modulo").setValue("FI-CA")
            // } else {

            //}
        },
        onSearch: function (oEvt) {
            var sQuery = oEvt.getParameter("query");
           
                var aFilters = [];
                if (isNaN(sQuery)) {
                    aFilters.push(new Filter({
                        filters: [new Filter({
                            path: "NOME_FLUSSO",
                            operator: FilterOperator.Contains,
                            value1: sQuery,
                            caseSensitive: false
                        }),
                        // new Filter({
                        //     path: "ID_MODULO",
                        //     formatter: '.formatter.idModuloToString',
                        //     operator: FilterOperator.Contains,
                        //     value1: sQuery,
                        //     caseSensitive: false
                        // }),
                        ],
                        and: false

                    }));
                } else {
                    aFilters.push(new Filter({
                        filters: [new Filter({
                            path: "ID_FLUSSO",
                            operator: FilterOperator.EQ,
                            value1: sQuery,
                            
                        }),
                        
                        ],
                        and: false
                    }));
                }

               

                var oBinding = this.getView().byId("list").getBinding("items");
                oBinding.filter(aFilters);
            // var sQuery = oEvt.getParameter("query"),
            //     aFilter = [new Filter("NOME_FLUSSO", FilterOperator.Contains, sQuery),
            //     new Filter("ID_FLUSSO", FilterOperator.EQ, sQuery),

            //         // new Filter("ID_MODULO", FilterOperator.Contains, sQuery),
            //     ],
            //     oTable = this.byId("list"),
            //     oBinding = oTable.getBinding("items"),
            //     oFilter = null;
            // if (sQuery.length != 0) {
            //     oFilter = new Filter({
            //         filters: aFilter,
            //         and: false
            //     });
            // }
            // oBinding.filter(oFilter);
        },



        onSearchUtentiAssociati: function (oEvt) {

            var sQuery = oEvt.getParameter("query"),
                aFilter = [new Filter("id", FilterOperator.Contains, sQuery),
                new Filter("cognome", FilterOperator.Contains, sQuery),
                new Filter("nome", FilterOperator.Contains, sQuery),

                ],
                oTable = this.byId("tableUtentiFlussi"),
                oTable1 = this.byId("tableUtenti"),
                oBinding = oTable.getBinding("items"),
                oBinding1 = oTable1.getBinding("items"),
                oFilter = null;
            if (sQuery.length != 0) {
                oFilter = new Filter({
                    filters: aFilter,
                    and: false
                });




            }

            oBinding.filter(oFilter);
            oBinding1.filter(oFilter);



        },


        // onSearchUtenti: function (oEvt) {

        //     var sQuery = oEvt.getParameter("query"),
        //         aFilter = [new Filter("id", FilterOperator.Contains, sQuery),
        //         new Filter("cognome", FilterOperator.Contains, sQuery),
        //         new Filter("nome", FilterOperator.Contains, sQuery),

        //         ],
        //         oTable = this.byId("tableUtenti"),
        //         oBinding = oTable.getBinding("items"),
        //         oFilter = null;
        //     if (sQuery.length != 0) {
        //         oFilter = new Filter({
        //             filters: aFilter,
        //             and: false
        //         });
        //     }
        //     oBinding.filter(oFilter);





        // },



























        aggiungiUtenteAFlusso: function () {
            this.byId("tableUtenti").setProperty("visible", true)
        },


        // edit: function (oEvent) {
        //     var items = this.getView().byId("tableUtentiFlussi").getItems();

        //     for (var i = 0; i < items.length; i++) {

        //         var oTable = this.getView().byId("tableUtentiFlussi");
        //         var nvalue = oTable.getItems()[i];

        //         for (var y = 0; y < 4; y++) {
        //             var celle = nvalue.getCells()[y];
        //             if (y == 3) {
        //                 celle.setProperty("enabled", true)
        //             }
        //         }
        //     }
        // },

        edit: function (oEvent) {

            // utenti flusso
            var itemsUtentiFlussi = this.getView().byId("tableUtentiFlussi").getItems();
            var arrayUtentiFlussi = [];

            for (var i = 0; i < itemsUtentiFlussi.length; i++) {

                var oTableUtentiFlussi = this.getView().byId("tableUtentiFlussi");
                var nvalueUtentiFlussi = oTableUtentiFlussi.getItems()[i];

                for (var y = 0; y < 4; y++) {
                    var celleUtentiFlussi = nvalueUtentiFlussi.getCells()[y];
                    if (y == 0) {
                        var idUtentiFlussi = celleUtentiFlussi.getText();

                    }
                }

                arrayUtentiFlussi.push(idUtentiFlussi);

            }

            // utenti
            var itemsUtenti = this.getView().byId("tableUtenti").getItems();
            var arrayUtenti = [];

            for (var i = 0; i < itemsUtenti.length; i++) {

                var oTableUtenti = this.getView().byId("tableUtenti");
                var nvalueUtenti = oTableUtenti.getItems()[i];

                for (var y = 0; y < 4; y++) {
                    var celleUtenti = nvalueUtenti.getCells()[y];
                    if (y == 0) {
                        var idUtenti = celleUtenti.getText();

                    }
                }

                arrayUtenti.push(idUtenti);
            }



            // console.log(arrayUtentiFlussi);
            // console.log(arrayUtenti[idUtentiFlussi]);


            // for (var i = 0; i < arrayUtenti.length; i++) {

            //     if (arrayUtenti[i] === 2) {
            //         arrayUtenti.splice(i, 1);
            //         i--;
            //     }
            // }


            //  var arrayUtentiFiltrato = arrayUtenti.filter(x => arrayUtentiFlussi.indexOf(x) === -1);
            //  console.log(arrayUtentiFiltrato);

            // arrayUtenti;

            // array_tabella_utenti messi; //push dentro questa

            // const intersectionArray = array1.filter(element => array_tabella_utenti messi.includes(element));

            // for( var i = 0; i < arrayUtenti.length; i++){ 

            //         if ( arrayUtenti[i] === intersectionArray ) { 
            //             arrayUtenti.splice(i, 1); 
            //             i--; 
            //         }
            //     }



            // se id utenti flusso è uguale ad id utente prendi le 4 celle di quell id tente e mettigli visible false

            // if(



            // ){
            //     for (var y = 0; y < 4; y++) {
            //         var celleUtenti = nvalueUtenti.getCells()[y];
            //         if (y == 0) {
            //             var idUtenti = celleUtenti.setVisible(false);

            //         }
            //     }
            // }

        },


    });
    return PageController;
});