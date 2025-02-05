module.exports = (app) => {
  const multer = require("multer");
  const path = require("path");

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file, "file destination");
      cb(null, path.join(__dirname, "../../public"));
    },
    filename: function (req, file, cb) {
      console.log(file, "file filename");
      const name = Date.now() + "-" + file.originalname;
      cb(null, name);
    },
  });

  const upload = multer({ storage: storage });

  const controller = require("../controller/leads/Leads.controller.js");
  const attachment_controller = require("../controller/leads/Attachment.controller.js");
  const comment_controller = require("../controller/leads/Comment.controller.js");
  const note_controller = require("../controller/leads/Notes.controller.js");
  const task_controller = require("../controller/leads/Task.controller.js");

  const Authenticator = require("../utils/Authenticator.js");
  const AccessChecker = require("../utils/AccessChecker.js");
  const Subscription = require("../utils/Subscription.js")
  var router = require("express").Router();

  router.post(
    "/create_lead",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.create_lead
  );
  router.get(
    "/get_leads",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.getLeads
  );
  router.get(
    "/find_single_lead",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.find_single_lead
  );
  router.get(
    "/find_assignees",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.find_assignees
  );
  router.put(
    "/update_lead_assignee",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_amend,
    controller.update_lead_assignee
  );
  router.put(
    "/update_single_lead",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_amend,
    controller.update_lead
  );
  router.delete(
    "/remove_lead_assignee",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_delete,
    controller.remove_lead_assignee
  );
  router.post(
    "/create_lead_attachment",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    upload.single("file"),
    attachment_controller.create
  );
  router.get(
    "/get_attachment_by_lead_id",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    attachment_controller.get_by_lead_id
  );

  router.get(
    "/find_all_lead_by_search",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    attachment_controller.find_all_lead_by_search
  );

  router.post(
    "/create_lead_comment",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    comment_controller.create
  );
  router.get(
    "/get_lead_comment_by_lead_id",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    comment_controller.get_by_lead_id
  );

  router.post(
    "/create_lead_note_attachment",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    note_controller.create
  );
  router.get(
    "/get_lead_note_by_lead_id",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    note_controller.get_by_lead_id
  );

  router.post(
    "/create_lead_task",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    task_controller.create
  );
  router.get(
    "/get_lead_task_by_lead_id",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    task_controller.get_by_lead_id
  );

  router.post(
    "/create_lead_scoring_rules",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.create_lead_scoring_rules
  );
  router.get(
    "/get_lead_scoring_rules",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.get_lead_scoring_rules
  );

  router.delete(
    "/delete_lead",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_delete,
    controller.delete_lead_scoring_rules
  );

  router.delete(
    "/delete_lead_comment",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_delete,
    comment_controller.delete_lead_comment
  );
  router.put(
    "/update_lead_comment",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_amend,
    comment_controller.update_lead_comment
  );

  router.delete(
    "/delete_lead_task",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_delete,
    task_controller.delete_lead_task
  );
  router.put(
    "/update_lead_task",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_amend,
    task_controller.update_lead_task
  );

  router.delete(
    "/delete_lead_note",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_delete,
    note_controller.delete_lead_note
  );
  router.put(
    "/update_lead_note",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_amend,
    note_controller.update_lead_note
  );

  router.delete(
    "/delete_lead_attachment",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_delete,
    attachment_controller.delete_lead_attachment
  );
  router.get(
    "/get_lead_activity",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.get_lead_activity
  );
  app.use("/api/v1/crm/", router);
};
