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
    console.log(TaxEntityCodes.find().fetch()); // Empty Array
    return TaxEntityCodes.find().fetch();
  }
});

Template.taxSettingsPanel.onCreated(function () {
  this.autorun(() => {
    this.subscribe("Account");
  });
});
