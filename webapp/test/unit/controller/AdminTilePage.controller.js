/*global QUnit*/

sap.ui.define([
	"Admin/appadmin/controller/AdminTilePage.controller"
], function (Controller) {
	"use strict";

	QUnit.module("AdminTilePage Controller");

	QUnit.test("I should test the AdminTilePage controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
