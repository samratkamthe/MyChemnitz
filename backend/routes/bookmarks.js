const express = require("express");
const router = express.Router();
const Bookmark = require("../models/Bookedmark.js");
const fetchUser = require("../middleware/fetchuser");

// route POST /api/bookmarks
// Save a bookmark
router.post("/save", fetchUser, async (req, res) => {
  try {
    const { name, amenity, tourism, description, website,LocId } = req.body;

    const bookmark = new Bookmark({
      userId: req.user.id,
      name,
      amenity,
      tourism,
      description,
      website,
      LocId
    });

    await bookmark.save();
    res.json(bookmark);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// route GET /api/bookmarks
// Get all bookmarks for logged-in user
router.get("/getBookmarks", fetchUser, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// route DELETE /api/bookmarks/:id
// Delete a bookmark
router.delete("/deletebookmark/:id", fetchUser, async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) return res.status(404).send("Not found");
    if (bookmark.userId.toString() !== req.user.id) return res.status(401).send("Unauthorized");

    await Bookmark.findByIdAndDelete(req.params.id);
    res.send("Deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
