// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { MongoClient, ReturnDocument } = require("mongodb");
// const dotenv = require("dotenv");
// var ObjectId = require("mongodb".ObjectId);

// dotenv.config();
// const uri = process.env.MONGODB_URI;
// let client;

// async function connectClient() {
//   if (!client) {
//     client = await MongoClient.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     await client.connect();
//   }
// }

// async function signup(req, res) {
//   const { username, password, email } = req.body;
//   try {
//     await connectClient();
//     const db = client.db("gitforge");
//     const userCollection = db.collection("users");
//     const user = await userCollection.findOne({ username });
//     if (user) {
//       return res.status(400).json({ message: "user already exist" });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const newUser = {
//       username,
//       password: hashedPassword,
//       email,
//       repositories: [],
//       followedUsers: [],
//       starRepo: [],
//     };
//     const result = await userCollection.insertOne(newUser);
//     const token = jwt.sign(
//       { id: result.insertId },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "1h" }
//     );
//     res.json({ token });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "user alraedy exist" });
//   }
// }

// async function login(req, res) {
//   const { email, password } = req.body;
//   try {
//     await connectClient();
//     const db = client.db("gitforge");
//     const userCollection = db.collection("users");
//     const user = await userCollection.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "user not found" });
//     }
//     const isMatch = await bcrypt.compare(Password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "invalid credentials" });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
//     res.json({ token, userId: user._id });
//   } catch (error) {
//     console.log("Error during login" + error);
//     res.status(400).send("server error!");
//   }
// }

// async function getAllUser(req, res) {
//   try {
//     await connectClient();
//     const db = client.db("gitforge");
//     const userCollection = db.collection("users");
//     const users = await userCollection.find({}).toArray();
//     res.json(users);
//   } catch (error) {
//     console.log("Error during fetching" + error);
//     res.status(400).send("server error!");
//   }
// }

// async function getUserProfiles(req, res) {
//   const currentId = req.params.id;
//   try {
//     await connectClient();
//     const db = client.db("gitforge");
//     const userCollection = db.collection("users");
//     const user = await userCollection.findOne({
//       _id: ObjectId(currentId),
//     });
//     if (!user) {
//       return res.status(400).json({ message: "user not found" });
//     }
//     res.send(user, { message: "profile fetched" });
//   } catch (error) {
//     console.log("Error during fetching" + error);
//     res.status(400).send("server error!");
//   }
// }

// async function updateUserProfile(req, res) {
//   const currentId = req.params.id;
//   const { email, password } = req.body;

//   try {
//     await connectClient();
//     const db = client.db("gitforge");
//     const userCollection = db.collection("users");
//     let updatefiels = { email };
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
//       updatefiels.password = hashedPassword;
//     }
//     const result = await userCollection.findOneAndUpdate(
//       {
//         _id: ObjectId(currentId),
//       },
//       { $set: updatefiels },
//       {
//         ReturnDocument: "after",
//       }
//     );
//     if (!result.value) {
//       return res.status(400).json({ message: "user not found" });
//     }
//     res.send(result.value);
//   } catch (error) {
//     console.log("Error during updating" + error);
//     res.status(400).send("server error!");
//   }
// }

// async function deleteUserProfile(req, res) {
//   const currentId = req.params.id;
//   try {
//     await connectClient();
//     const db = client.db("gitforge");
//     const userCollection = db.collection("users");

//     const result = await userCollection.deleteOne({
//       _id: ObjectId(currentId),
//     });
//     if (result.deleteCount == 0) {
//       return res.status(400).json({ message: "user not found" });
//     }
//     res.json({message:"user profiledeleted"})
//   } catch (error) {
//     console.log("Error during deleteing" + error);
//     res.status(400).send("server error!");
//   }
// }

// module.exports = {
//   getAllUser,
//   signup,
//   login,
//   getUserProfiles,
//   updateUserProfile,
//   deleteUserProfile,
// };
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
var ObjectId = require("mongodb").ObjectId;

dotenv.config();
const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
}

async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token, userId: result.insertId });
  } catch (err) {
    console.error("Error during signup : ", err.message);
    res.status(500).send("Server error");
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error during login : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (err) {
    console.error("Error during fetching : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function getUserProfile(req, res) {
  const currentID = req.params.id;

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(currentID),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.send(user);
  } catch (err) {
    console.error("Error during fetching : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function updateUserProfile(req, res) {
  const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    let updateFields = { email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const result = await usersCollection.findOneAndUpdate(
      {
        _id: new ObjectId(currentID),
      },
      { $set: updateFields },
      { returnDocument: "after" }
    );
    if (!result.value) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.send(result.value);
  } catch (err) {
    console.error("Error during updating : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function deleteUserProfile(req, res) {
  const currentID = req.params.id;

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(currentID),
    });

    if (result.deleteCount == 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: "User Profile Deleted!" });
  } catch (err) {
    console.error("Error during updating : ", err.message);
    res.status(500).send("Server error!");
  }
}

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
