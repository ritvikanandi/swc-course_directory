const express = require("express");
const router = express.Router({ mergeParams: true });
const { isAdmin, isLoggedIn } = require("../middleware");

const faqController = require("../controllers/faq.controller");

router.get("/", isLoggedIn, isAdmin, faqController.getFAQs);

router.get("/add", isLoggedIn, isAdmin, faqController.addFAQForm);

router.post("/", isLoggedIn, isAdmin, faqController.postFAQ);

router.get("/:faqid", faqController.getEditForm);

router.put("/:faqid", faqController.postEditForm);

router.delete("/:faqid", faqController.deleteFAQ);

module.exports = router;
