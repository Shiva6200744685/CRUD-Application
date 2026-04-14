const router = require("express").Router();
const Item = require("../models/Item");

// Create
router.post("/", async (req, res) => {
  try {
    console.log("📥 Received from frontend:", req.body);
    const item = await Item.create(req.body);
    console.log("✅ Saved to MongoDB:", item.toObject());
    res.status(201).json(item);
  } catch (err) {
    console.error("❌ Error saving to DB:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Read one
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    console.log(`📝 Update request for ID: ${req.params.id}`, req.body);
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Not found" });
    console.log("✅ Updated in MongoDB:", item.toObject());
    res.json(item);
  } catch (err) {
    console.error("❌ Error updating in DB:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    console.log(`🗑️ Deleted from MongoDB - ID: ${req.params.id}`);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("❌ Error deleting from DB:", err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
