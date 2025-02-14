module.exports = (app) => {
  const controller = require("../../controller/campaign/Campaign.controller.js");
  const Authenticator = require("../../utils/Authenticator.js");
  const Subscription = require("../../utils/Subscription.js");
  var router = require("express").Router();

  

  // Call Campaign Analytics Routes
  router.get(
    "/call_campaign_analytics",
    Authenticator.user,
    Subscription.check_subscription,
    controller.getCallCampaignAnalytics
  );
  // router.get("/call_campaign_analytics/:id", Authenticator.user, controller.getCallCampaignAnalytic);
  router.post(
    "/call_campaign_analytics",
    Authenticator.user,
    Subscription.check_subscription,
    controller.createCallCampaignAnalytic
  );
//   router.put(
//     "/call_campaign_analytics/:id",
//     Authenticator.user,
//     controller.editCallCampaignAnalytic
//   );
  router.delete(
    "/call_campaign_analytics/:id",
    Authenticator.user,
    Subscription.check_subscription,
    controller.deleteCallCampaignAnalytic
  );
  router.delete(
    "/call_campaign_analytics",
    Authenticator.user,
    Subscription.check_subscription,
    controller.deleteMultipleCallCampaignAnalytics
  );

  // Campaign Routes
  router.get("/campaigns", 
      Authenticator.user, 
      Subscription.check_subscription,
       controller.getCampaigns);
        // router.get("/campaigns/:id", Authenticator.user, controller.getCampaign);
        router.post("/campaigns", 
          Authenticator.user, 
          Subscription.check_subscription,
          controller.createCampaign);
        // router.put("/campaigns/:id", Authenticator.user, controller.editCampaign);
        router.delete(
          "/campaigns/:id",
          Authenticator.user,
          Subscription.check_subscription,
          controller.deleteCampaign
        );
        router.delete(
          "/campaigns",
          Authenticator.user,
          Subscription.check_subscription,
          controller.deleteMultipleCampaigns
        );




  // Campaign List Routes
  router.get(
    "/campaign_lists",
    Authenticator.user,
    Subscription.check_subscription,
    controller.getCampaignLists
  );
  // router.get("/campaign_lists/:id", Authenticator.user, controller.getCampaignList);
  router.post(
    "/create_campaign_lists",
    Authenticator.user,
    Subscription.check_subscription,
    controller.createCampaignList
  );
  // router.put("/campaign_lists/:id", Authenticator.user, controller.editCampaignList);
  router.delete(
    "/campaign_lists/:id",
    Authenticator.user,
    Subscription.check_subscription,
    controller.deleteCampaignList
  );
  router.delete(
    "/campaign_lists",
    Authenticator.user,
    Subscription.check_subscription,
    controller.deleteMultipleCampaignLists
  );

  // Campaign List Member Routes
  router.get(
    "/campaign_list_members",
    Authenticator.user,
    Subscription.check_subscription,
    controller.getCampaignListMembers
  );
  // router.get("/campaign_list_members/:id", Authenticator.user, controller.getCampaignListMember);
  router.post(
    "/campaign_list_members",
    Authenticator.user,
    Subscription.check_subscription,
    controller.createCampaignListMember
  );
  // router.put("/campaign_list_members/:id", Authenticator.user, controller.editCampaignListMember);
  router.delete(
    "/campaign_list_members/:id",
    Authenticator.user,
    Subscription.check_subscription,
    controller.deleteCampaignListMember
  );
  router.delete(
    "/campaign_list_members",
    Authenticator.user,
    Subscription.check_subscription,
    controller.deleteMultipleCampaignListMembers
  );

  // Email Campaign Analytics Routes
  router.get(
    "/email_campaign_analytics",
    Authenticator.user,
    Subscription.check_subscription,
    controller.getEmailCampaignAnalytics
  );
  router.get(
    "/email_campaign_analytics/:id",
    Authenticator.user,
    Subscription.check_subscription,
    controller.getEmailCampaignAnalytic
  );
  // router.post("/email_campaign_analytics", Authenticator.user, controller.createEmailCampaignAnalytic);
  router.put(
    "/email_campaign_analytics/:id",
    Authenticator.user,
    Subscription.check_subscription,
    controller.editEmailCampaignAnalytic
  );
  router.delete(
    "/email_campaign_analytics/:id",
    Authenticator.user,
    Subscription.check_subscription,
    controller.deleteEmailCampaignAnalytic
  );
  // router.delete("/email_campaign_analytics", Authenticator.user, controller.deleteMultipleEmailCampaignAnalytics);

  // Whatsapp Campaign Analytics Routes
  router.get(
    "/whatsapp_campaign_analytics",
    Authenticator.user,
    Subscription.check_subscription,
    controller.getWhatsappCampaignAnalytics
  );
  router.get(
    "/whatsapp_campaign_analytics/:id",
    Authenticator.user,
    Subscription.check_subscription,
    controller.getWhatsappCampaignAnalytic
  );
  // router.post("/whatsapp_campaign_analytics", Authenticator.user, controller.createWhatsappCampaignAnalytic);
  router.put(
    "/whatsapp_campaign_analytics/:id",
    Authenticator.user,
    Subscription.check_subscription,
    controller.editWhatsappCampaignAnalytic
  );
  router.delete(
    "/whatsapp_campaign_analytics/:id",
    Authenticator.user,
    Subscription.check_subscription,
    controller.deleteWhatsappCampaignAnalytic
  );
  router.delete(
    "/whatsapp_campaign_analytics",
    Authenticator.user,
    Subscription.check_subscription,
    controller.deleteMultipleWhatsappCampaignAnalytics
  );

  app.use("/api/v1/crm/", router);
};
