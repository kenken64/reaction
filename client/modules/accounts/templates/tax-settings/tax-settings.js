import _ from "lodash";
import { Accounts } from "/lib/collections";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { TaxEntityCodes } from "/client/collections";

Template.taxSettingsPanel.helpers({
  account() {
    if (Reaction.Subscriptions.Account.ready()) {
      return Accounts.findOne({
        userId: Meteor.userId()
      });
    }
    return null;
  },
  entityCodes() {
    return TaxEntityCodes.find().map((entityCode) => {
      return _.assign({}, entityCode, { label: entityCode.name, value: entityCode.code });
    });
  }
});

Template.taxSettingsPanel.onCreated(function () {
  this.autorun(() => {
    this.subscribe("Account");
  });

  Meteor.call("avalara/getEntityCodes", (error, entityCodes) => {
    _.each(entityCodes, (entityCode) => {
      TaxEntityCodes.insert(entityCode);
    });
  });
});

