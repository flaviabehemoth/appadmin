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
    "sap/ui/model/odata/v4/ODataModel",
    "../model/formatter",
    "sap/ui/model/Sorter",
	"sap/m/ViewSettingsDialog",
	"sap/m/ViewSettingsItem"
],

    function (ControlMessageProcessor, Message, Controller, coreLibrary, JSONModel, MessagePopover, MessagePopoverItem, MessageToast, oCore, Utils, Filter, FilterOperator, FilterType, UIComponent, ODataModel, formatter, Sorter,
        ViewSettingsDialog,  ViewSettingsItem) {
        "use strict";
        var MessageType = coreLibrary / MessageType;

        var PageController = Controller.extend("Admin.appadmin.controller.AdminTilePage", {
            formatter: formatter,
            onInit: function () {
                // this._oTable = this.byId("list");
                // this._oVSD = null;
                // this._sSortField = null;
                // this._bSortDescending = false;
                // this._aValidSortFields = ["ID_UTENTE", "COGNOME_UTENTE", "NOME_UTENTE"];
                // this._sSearchQuery = null;
    
                // this._initViewSettingsDialog();

//1)applySortGroup v2
this.bDescending = true;





                // var oModel = new JSONModel(sap.ui.require.toUrl("tileproject/tileproject/model/Utenti.json"));
                // this.getView().setModel(oModel);
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteAnagUtenti").attachMatched(this._onObjectMatched, this);

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

         
                
                //2) applySortGroup v2
                onSorters : function () {
                var oList=this.byId ("list"),
                oBinding = oList.getBinding ("items");
                var sSorterKey = "ID_UTENTE";
                this.bDescending = !this. bDescending; //switcha il boolean da ascendente to discendente
                //var bGroup = false;
                var aSorter = [];
                aSorter.push(new Sorter (sSorterKey, this. bDescending)) ;
                oBinding.sort (aSorter);




                },







            // onSorters : function (oEvent) {
            //     var oView = this.getView(),
            //         aStates = [undefined, "asc", "desc"],
            //         aStateTextIds = ["sortNone", "sortAscending", "sortDescending"],
            //         sMessage,
            //         iOrder = oView.byId("id"),
            //         sOrder;
    
            //     // Cycle between the states
            //     iOrder = (iOrder + 1) % aStates.length;
            //     sOrder = aStates[iOrder];
    
            //     oView.getModel().setProperty("ID_UTENTE", iOrder);
            //     oView.byId("list").getBinding("items")
            //         .sort(sOrder && new Sorter("COGNOME_UTENTE", sOrder === "desc"));
    
            //     sMessage = this._getText("sortMessage", [this._getText(aStateTextIds[iOrder])]);
            //     MessageToast.show(sMessage);
            // },

		// onSort : function () {
		// 	this._oVSD.open();
		// },

		// onSearchEmployeesTable : function (oEvent) {
		// 	this._applySearchFilter( oEvent.getSource().getValue() );
		// },

		// _initViewSettingsDialog : function () {
		// 	this._oVSD = new ViewSettingsDialog("vsd", {
		// 		confirm: function (oEvent) {
		// 			var oSortItem = oEvent.getParameter("sortItem");
		// 			this._applySorter(oSortItem.getKey(), oEvent.getParameter("sortDescending"));
		// 		}.bind(this)
		// 	});

		// 	// init sorting (with simple sorters as custom data for all fields)
		// 	this._oVSD.addSortItem(new ViewSettingsItem({
		// 		key: "ID_UTENTE",
		// 		text: "ID_UTENTE",
		// 		selected: true			// by default the MockData is sorted by EmployeeID
		// 	}));

		// 	this._oVSD.addSortItem(new ViewSettingsItem({
		// 		key: "COGNOME_UTENTE",
		// 		text: "COGNOME_UTENTE",
		// 		selected: false
		// 	}));

		// 	this._oVSD.addSortItem(new ViewSettingsItem({
		// 		key: "NOME_UTENTE",
		// 		text: "NOME_UTENTE",
		// 		selected: false
		// 	}));
		// },
        // _applySorter : function (sSortField, sortDescending){
		// 	var bSortDescending, oBinding, oSorter;

		// 	// only continue if we have a valid sort field
		// 	if (sSortField && this._aValidSortFields.indexOf(sSortField) > -1) {

		// 		// convert  the sort order to a boolean value
		// 		if (typeof sortDescending === "string") {
		// 			bSortDescending = sortDescending === "true";
		// 		} else if (typeof sortDescending === "boolean") {
		// 			bSortDescending =  sortDescending;
		// 		} else {
		// 			bSortDescending = false;
		// 		}

		// 		// sort only if the sorter has changed
		// 		if (this._sSortField && this._sSortField === sSortField && this._bSortDescending === bSortDescending) {
		// 			return;
		// 		}

		// 		this._sSortField = sSortField;
		// 		this._bSortDescending = bSortDescending;
		// 		oSorter = new Sorter(sSortField, bSortDescending);

		// 		// sync with View Settings Dialog
		// 		this._syncViewSettingsDialogSorter(sSortField, bSortDescending);

		// 		oBinding = this._oTable.getBinding("items");
		// 		oBinding.sort(oSorter);
		// 	}
		// },

		// _syncViewSettingsDialogSorter : function (sSortField, bSortDescending) {
		// 	// the possible keys are: "EmployeeID" | "FirstName" | "LastName"
		// 	// Note: no input validation is implemented here
		// 	this._oVSD.setSelectedSortItem(sSortField);
		// 	this._oVSD.setSortDescending(bSortDescending);
		// },


        // onSort : function () {
		// 	var oView = this.getView(),
		// 		aStates = [undefined, "asc", "desc"],
		// 		aStateTextIds = ["sortNone", "sortAscending", "sortDescending"],
		// 		sMessage,
		// 		iOrder = oView.getModel("appView").getProperty("/order"),
		// 		sOrder;

		// 	// Cycle between the states
		// 	iOrder = (iOrder + 1) % aStates.length;
		// 	sOrder = aStates[iOrder];

		// 	oView.getModel("appView").setProperty("/order", iOrder);
		// 	oView.byId("peopleList").getBinding("items")
		// 		.sort(sOrder && new Sorter("LastName", sOrder === "desc"));

		// 	sMessage = this._getText("sortMessage", [this._getText(aStateTextIds[iOrder])]);
		// 	MessageToast.show(sMessage);
		// },



            onPress: function (oEvent) {

                MessageToast.show("Pressed custom button " + oEvent.getSource().getId());
            },
            onSemanticButtonPress: function (oEvent) {

                // var sAction = oEvent.getSource().getMetadata().getName();
                // sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

                // MessageToast.show("Pressed: " + sAction);
            },
            onSemanticSelectChange: function (oEvent, oData) {
                var sAction = oEvent.getSource().getMetadata().getName();
                sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

                var sStatusText = sAction  + oEvent.getSource().getSelectedItem().getText();
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
                this.byId("SimpleFormDisplay354wideAdd").setVisible(true);
                this.byId("SimpleFormDisplay354wide").setVisible(false);
                this.byId("editBtn").setVisible(false);
                this.byId("refreshAddBtn").setVisible(true);
                this.byId("saveAddAddBtn").setVisible(true);
                this.byId("saveAddQuitBtn").setVisible(true);
                this.byId("exitAddBtn").setProperty("visible", true);
            },
            refreshAdd: function () {
                this.byId("idAdd").setValue(""),
                    this.byId("cognomeAdd").setValue(""),
                    this.byId("nomeAdd").setValue(""),
                    this.byId("ruoloAdd").setValue(""),
                    this.byId("emailAdd").setValue(""),
                    this.byId("telefonoAdd").setValue("")
            },

            saveAddAdd: function (oEvent) {
                var id = parseInt(this.getView().byId("idAdd").getValue());
                var cognome = this.getView().byId("cognomeAdd").getValue();
                var nome = this.getView().byId("nomeAdd").getValue();
                var ruolo = parseInt(this.getView().byId("ruoloAdd").getValue());
                var email = this.getView().byId("emailAdd").getValue();
                var telefono = this.getView().byId("telefonoAdd").getValue();


                var oContext = this.getView().byId("list").getBinding("items")
                    .create({
                        ID_UTENTE: id,
                        COGNOME_UTENTE: cognome,
                        NOME_UTENTE: nome,
                        EMAIL_UTENTE: email,
                        ID_RUOLO: ruolo,
                        TELEFONO_UTENTE: telefono
                    });

                // Note: This promise fails only if the transient entity is deleted
                oContext.created().then(function () {
                    alert("ok")
                }, function (oError) {
                    alert("fail")
                });

                var oView = this.getView();

                function resetBusy() {
                    oView.setBusy(false);
                }

                // lock UI until submitBatch is resolved, to prevent errors caused by updates while submitBatch is pending
                oView.setBusy(true);

                oView.getModel().submitBatch(oView.getModel().getUpdateGroupId()).then(resetBusy, resetBusy);

                this.byId("idAdd").setValue(""),
                    this.byId("cognomeAdd").setValue(""),
                    this.byId("nomeAdd").setValue(""),
                    this.byId("ruoloAdd").setValue(""),
                    this.byId("emailAdd").setValue(""),
                    this.byId("telefonoAdd").setValue("")
            },

            saveAddQuit: function (params) {
                var id = parseInt(this.getView().byId("idAdd").getValue());
                var cognome = this.getView().byId("cognomeAdd").getValue();
                var nome = this.getView().byId("nomeAdd").getValue();
                var ruolo = parseInt(this.getView().byId("ruoloAdd").getValue());
                var email = this.getView().byId("emailAdd").getValue();
                var telefono = this.getView().byId("telefonoAdd").getValue();
                this.byId("id").setProperty("editable", false);
                this.byId("cognome").setProperty("editable", false);
                this.byId("nome").setProperty("editable", false);
                this.byId("ruolo").setProperty("editable", false);
                this.byId("email").setProperty("editable", false);
                this.byId("telefono").setProperty("editable", false);

                MessageToast.show("salvato");


                var oContext = this.getView().byId("list").getBinding("items")
                    .create({
                        ID_UTENTE: id,
                        COGNOME_UTENTE: cognome,
                        NOME_UTENTE: nome,
                        EMAIL_UTENTE: email,
                        ID_RUOLO: ruolo,
                        TELEFONO_UTENTE: telefono
                    });

                // Note: This promise fails only if the transient entity is deleted
                oContext.created().then(function () {
                    alert("ok")
                }, function (oError) {
                    alert("fail")
                });

                var oView = this.getView();

                function resetBusy() {
                    oView.setBusy(false);
                }

                // lock UI until submitBatch is resolved, to prevent errors caused by updates while submitBatch is pending
                oView.setBusy(true);

                oView.getModel().submitBatch(oView.getModel().getUpdateGroupId()).then(resetBusy, resetBusy);

                this.byId("SimpleFormDisplay354wideAdd").setVisible(false);
                this.byId("SimpleFormDisplay354wide").setVisible(true);
                this.byId("editBtn").setVisible(true);
                this.byId("refreshAddBtn").setVisible(false);
                this.byId("saveAddAddBtn").setVisible(false);
                this.byId("saveAddQuitBtn").setVisible(false);
                this.byId("exitAddBtn").setProperty("visible", false);

            },
            exitAdd: function () {
                this.byId("SimpleFormDisplay354wideAdd").setVisible(false);
                this.byId("SimpleFormDisplay354wide").setVisible(true);
                this.byId("editBtn").setVisible(true);
                this.byId("refreshAddBtn").setVisible(false);
                this.byId("saveAddAddBtn").setVisible(false);
                this.byId("saveAddQuitBtn").setVisible(false);
                this.byId("exitAddBtn").setProperty("visible", false);

                

            },

            edit: function () {
                this.byId("id").setProperty("editable", true);
                this.byId("cognome").setProperty("editable", true);
                this.byId("nome").setProperty("editable", true);
                this.byId("ruolo").setProperty("editable", true);
                this.byId("email").setProperty("editable", true);
                this.byId("telefono").setProperty("editable", true);
                this.byId("refreshBtn").setProperty("visible", true);
                this.byId("saveBtn").setProperty("visible", true);
                this.byId("deleteBtn").setProperty("visible", true);
                this.byId("exitBtn").setProperty("visible", true);
                this.byId("editBtn").setProperty("visible", false);
            },
            refresh: function () {
                this.byId("id").setValue(""),
                    this.byId("cognome").setValue(""),
                    this.byId("nome").setValue(""),
                    this.byId("ruolo").setValue(""),
                    this.byId("email").setValue(""),
                    this.byId("telefono").setValue("")
            },

            save: function () {

                this.byId("refreshBtn").setProperty("visible", false);
                this.byId("saveBtn").setProperty("visible", false);
                this.byId("deleteBtn").setProperty("visible", false);
                this.byId("exitBtn").setProperty("visible", false);
                this.byId("editBtn").setProperty("visible", true);
                this.byId("id").setProperty("editable", false);
                this.byId("cognome").setProperty("editable", false);
                this.byId("nome").setProperty("editable", false);
                this.byId("ruolo").setProperty("editable", false);
                this.byId("email").setProperty("editable", false);
                this.byId("telefono").setProperty("editable", false);

                var cognome = this.getView().byId("cognome").getValue();
                var nome = this.getView().byId("nome").getValue();
                var ruolo = parseInt(this.getView().byId("ruoloAdd").getSelectedKey());
                var email = this.getView().byId("email").getValue();
                var telefono = this.getView().byId("telefono").getValue();

                if (ruolo == "Admin") {

                    oContext.setProperty("ID_RUOLO", 1);

                } else if (ruolo == "Technical") {

                    oContext.setProperty("ID_RUOLO", 2);

                } else if (ruolo == "Consumer") {

                    oContext.setProperty("ID_RUOLO", 3);

                } else {

                }
                var oContext = this.getView().byId("detail").getBindingContext();

                oContext.setProperty("COGNOME_UTENTE", cognome);
                oContext.setProperty("NOME_UTENTE", nome);
                oContext.setSelectedKey("ID_RUOLO", ruolo);
                oContext.setProperty("EMAIL_UTENTE", email);
                oContext.setProperty("TELEFONO_UTENTE", telefono);
                this.getView().getModel().submitBatch();



            },

            delete: function (oEvent) {

                // var oDetailId = this.getView().byId("id").getValue();
                // console.log(oDetailId);

                var oSalesOrderContext = this.getView().byId("detail").getBindingContext();

                oSalesOrderContext.delete("$auto").then(function () {
                    alert("OK")
                }, function (oError) {
                    alert("FAIL")
                });

                var oView = this.getView();

                function resetBusy() {
                    oView.setBusy(false);
                }

                // lock UI until submitBatch is resolved, to prevent errors caused by updates while submitBatch is pending
                oView.setBusy(true);

                oView.getModel().submitBatch(oView.getModel().getUpdateGroupId()).then(resetBusy, resetBusy);

                this.byId("refreshBtn").setProperty("visible", false);
                this.byId("saveBtn").setProperty("visible", false);
                this.byId("deleteBtn").setProperty("visible", false);
                this.byId("exitBtn").setProperty("visible", false);
                this.byId("editBtn").setProperty("visible", true);
            },


            onSelectionChange: function (oEvent) {
                var oList = oEvent.getSource(),
                    bSelected = oEvent.getParameter("selected");
                // skip navigation when deselecting an item in multi selection mode
                if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
                    // get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
                    this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());

                }






            },
            // _onObjectMatched: function (oEvent) {
            //     var sObjectId = oEvent.getParameter("arguments").objectId;
            //     this._bindView("/Anagrafica_Utenti" + sObjectId);
            // },
            // _bindView: function (sObjectPath) {
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
                    objectId: oItem.getBindingContext().getPath().substring("/Anagrafica_Utenti".length)
                });

            },

            _showDetail: function (oItem) {
                var id = oItem.getBindingContext().getProperty("ID_UTENTE"); //prendo l'elemento da selezionare tramite id nella master page

                var ruoloNumerico = oItem.getBindingContext().getProperty("ID_RUOLO");
                // console.log(ruoloNumerico);
                this.getView().byId("detail").bindElement({ path: "/Anagrafica_Utenti/" + id });
                //  if (ruoloNumerico === 1) {
                //      this.byId("ruolo").setValue("Admin")
                //  } else if (ruoloNumerico === 2) {
                //      this.byId("ruolo").setValue("Technical")
                //  } else if (ruoloNumerico === 3) {
                //      this.byId("ruolo").setValue("Consumer")
                //  } else {

                //  }
            },

            onSearch: function (oEvt) {
                // var oView = this.getView();
                // var sQuery = oView.byId("searchField").getValue;
                var sQuery = oEvt.getParameter("query");
                var aFilters = []
                var oFilter = null 
                if (sQuery.length != 0) {
                        oFilter = new Filter({
                            filters: aFilters,
                            and: false
                        }); 
                    }
                if (isNaN(sQuery)) {
                    aFilters.push(new Filter({
                        filters: [new Filter({
                            path: "COGNOME_UTENTE",
                            operator: FilterOperator.Contains,
                            value1: sQuery,
                            caseSensitive: false
                        }),
                        new Filter({
                            path: "NOME_UTENTE",
                            operator: FilterOperator.Contains,
                            value1: sQuery,
                            caseSensitive: false
                        }),
                        ],
                        and: false

                    }));
                } else {
                    aFilters.push(new Filter({
                        filters: [new Filter({
                            path: "ID_UTENTE",
                            operator: FilterOperator.EQ,
                            value1: sQuery,
                            
                        }),
                        
                        ],
                        
                        and: false
                    }));
                }

                

                // var sQuery = oEvt.getParameter("query"),
                //     aFilter = [new Filter("COGNOME_UTENTE", FilterOperator.Contains, sQuery),
                //     new Filter("NOME_UTENTE", FilterOperator.Contains, sQuery),
                //     new Filter("ID_UTENTE", FilterOperator.EQ, sQuery),
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
                var oBinding = this.getView().byId("list").getBinding("items");
                oBinding.filter(oFilter);
            },

            // onSort: function(oEvent){


            // }

        //     filtraTutto: function(oEvt) {
        //         var sQuery = oEvt.getParameter("query"),
        //          aFilter = [new Filter("id",FilterOperator.Contains,sQuery),
        //          new Filter("nome",FilterOperator.Contains,sQuery),
        //          new Filter("tel",FilterOperator.Contains,sQuery),
        //          new Filter("ragiones",FilterOperator.Contains,sQuery),
        //          new Filter("email",FilterOperator.Contains,sQuery),
        //          new Filter("fatturato",FilterOperator.Contains,sQuery),
        //          new Filter("piva",FilterOperator.Contains,sQuery),
        //          new Filter("citta",FilterOperator.Contains,sQuery),
        //         ],
        //          oTable = this.byId("table"),
        //          oBinding = oTable.getBinding("rows"),
        //          oFilter = null;
        //             if(sQuery.length!=0){
        //                 oFilter = new Filter({
        //                 filters: aFilter,
        //                 and : false
        //                  });
        //   }      
        //   oBinding.filter(oFilter);
        //     },


        });


        return PageController;


        

    });