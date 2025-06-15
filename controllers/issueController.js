const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createIssue(req, res) {
  const { title, description } = req.body;
  const { id } = req.params.id;

  try {
    const issue = new issue({
      title,
      description,
      repository: id,
    });
    await issue.save();
    res.status(201).json(issue);
  } catch (error) {
    console.log("Error creating issue" + error);
    res.status(400).send("server error!");
  }
}

async function updateIssueById(req, res) {
  const { id } = req.params.id;
  try {
    const issue = await Issue.findById({ id });
    if (!issue) {
      return res.status(404).json({ error: "issue not found" });
    }
    issue.title = title;
    issue.description = description;
    issue.status = status;
  } catch (error) {
    console.log("Error updating issue" + error);
    res.status(400).send("server error!");
  }
}

async function deleteIssueById(req, res) {
  const { id } = req.params.id;
  try {
    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) {
      return res.status(404).json({ error: "issue not found" });
    }
    res.json({ message: "issue deleted" });
  } catch (error) {
    console.log("Error deleting issue" + error);
    res.status(400).send("server error!");
  }
}

async function getAllIssue(req, res) {
  const { id } = req.params.id;
  try {
    const issue = Issue.find({ repository: id });
    if (!issue) {
      return res.status(400).json({ error: "issue not found" });
    }
    res.status(200).json(issue);
  } catch (error) {
    console.log("Error deleting issue" + error);
    res.status(400).send("server error!");
  }
}
async function getIssueById(req, res) {
  const { id } = req.params.id;
  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(400).json({ error: "issue not found" });
    }
    res.json(issue);
  } catch (error) {
    console.log("Error deleting issue" + error);
    res.status(400).send("server error!");
  }
}

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssue,
  getIssueById,
};
