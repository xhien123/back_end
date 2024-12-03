const NewCollection = require("../models/newCollection");

exports.createNewCollection = async (req, res) => {
  try {
    const { name, description, products } = req.body;
    const newCollection = new NewCollection({ name, description, products });
    await newCollection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllNewCollections = async (req, res) => {
  try {
    const newCollections = await NewCollection.find();
    res.status(200).json(newCollections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNewCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const newCollection = await NewCollection.findById(id);
    if (!newCollection) {
      return res.status(404).json({ message: "New collection not found" });
    }
    res.status(200).json(newCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNewCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, products } = req.body;
    const updatedNewCollection = await NewCollection.findByIdAndUpdate(
      id,
      { name, description, products },
      { new: true }
    );
    if (!updatedNewCollection) {
      return res.status(404).json({ message: "New collection not found" });
    }
    res.status(200).json(updatedNewCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNewCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNewCollection = await NewCollection.findByIdAndDelete(id);
    if (!deletedNewCollection) {
      return res.status(404).json({ message: "New collection not found" });
    }
    res.status(200).json({ message: "New collection deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
