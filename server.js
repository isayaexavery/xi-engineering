const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const messageSchema = require("./models/MessageModel");
const ExpenseModel = require("./models/ExpenseModel");
const AccountsModel = require("./models/AccountsModel");
const OpenBalance = require("./models/OpenBalance");
const UserModel = require("./models/UserModel");
const { config } = require("dotenv");
const { error } = require("console");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});

db.once("connected", () => {
  console.log("DB Connected");
});

let staticPath = path.join(__dirname, "public");

const app = express();

app.use(express.static(staticPath));
app.use(express.json());

//home
app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

//About
app.get("/about-us", (req, res) => {
  res.sendFile(path.join(staticPath, "about-us.html"));
});

//services
app.get("/services", (req, res) => {
  res.sendFile(path.join(staticPath, "service.html"));
});

//contact
app.get("/contact", (req, res) => {
  res.sendFile(path.join(staticPath, "contact.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(staticPath, "login.html"));
});

app.post("/login", async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .send({ eror: "error", message: "Incorrect email or password" });
  }

  let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res
      .status(404)
      .send({ eror: "error", message: "Incorrect email or password" });
  }

  let token = jwt.sign({ email: req.body.email }, JWT_SECRET, {
    expiresIn: "1hr",
  });

  user.xiToken = token;

  return res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    employeeId: user.employeeId,
    designation: user.designation,
    priority: user.priority,
    xiToken: token,
  });
});

app.post("/add-member", async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(404)
      .send({ error: "error", message: "Member email exists" });
  }

  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const insertResult = await UserModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPwd,
      email: req.body.email,
      employeeId: req.body.employeeId,
      designation: req.body.designation,
      priority: req.body.priority,
    });

    res.send({ message: "success", data: insertResult });
  } catch (error) {
    res.status(200).send("Internal Error");
  }
});

app.post("/validateToken", (req, res) => {
  try {
    const verified = jwt.verify(req.body.xiToken, JWT_SECRET);
    if (verified) {
      return res.send({ message: "success" });
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
});

app.get("/logout", (req, res) => {
  if (res.clearCookie("jwt")) {
    return res.json("clear");
  }
});

app.post("/contact", (req, res) => {
  const newMessage = new messageSchema({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    subject: req.body.subject,
    message: req.body.message,
  });

  newMessage
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.get("/user-messages", async (req, res) => {
  res.sendFile(path.join(staticPath, "user-messages.html"));
});
app.get("/get-messages", async (req, res) => {
  try {
    const data = await messageSchema.find().sort({ date: -1 });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/get-messages", async (req, res) => {
  try {
    const data = await messageSchema.findById(req.body.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/message-view-:id", async (req, res) => {
  res.sendFile(path.join(staticPath, "message-view.html"));
});

app.post("/delete-message", async (req, res) => {
  try {
    const data = await messageSchema.deleteOne({ _id: req.body.id });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Expenses
app.get("/expenses-types", async (req, res) => {
  res.sendFile(path.join(staticPath, "expensetypes.html"));
});
app.get("/get-expenses", async (req, res) => {
  try {
    const data = await ExpenseModel.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/add-expense-type", (req, res) => {
  const newExpenseType = new ExpenseModel({
    expenseType: req.body.expenseType,
    amount: 0,
  });

  newExpenseType
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

//ACCOUNTS
app.get("/accounts", async (req, res) => {
  res.sendFile(path.join(staticPath, "accounts.html"));
});

app.post("/add-expense-type", (req, res) => {
  const newExpenseType = new ExpenseModel({
    expenseType: req.body.expenseType,
    amount: 0,
  });

  newExpenseType
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/add-accounts", async (req, res) => {
  const newAccounts = new AccountsModel({
    expenseType: req.body.expenseType,
    amount: req.body.amount,
    date: req.body.date,
    transaction: req.body.transaction,
    description: req.body.description,
    reference: req.body.reference,
  });

  let amountTotal = 0;
  const inputAmount = +req.body.amount;
  const expenseTypee = req.body.expenseType;
  try {
    const data = await ExpenseModel.find({ expenseType: expenseTypee });

    if (data[0].expenseType == expenseTypee) {
      amountTotal = data[0].amount + inputAmount;
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  try {
    db.collection("expensetypes").updateOne(
      { expenseType: req.body.expenseType },
      { $set: { amount: amountTotal } }
    );
  } catch (error) {}

  newAccounts
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/delete-accounts", async (req, res) => {
  let expenseTypeTotal = 0;
  try {
    // all data from accounts
    const accounts = await AccountsModel.findByIdAndDelete(req.body.id);

    //data of expense type which is equal to data from accounts expense type
    if (accounts) {
      const expenseType = await ExpenseModel.find({
        expenseType: accounts.expenseType,
      });
      // if (expenseType[0].expenseType == accounts.expenseType) {
      expenseTypeTotal = expenseType[0].amount - accounts.amount;
      // }

      db.collection("expensetypes").updateOne(
        { expenseType: expenseType[0].expenseType },
        { $set: { amount: expenseTypeTotal } }
      );

      res.json({ message: "success" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/get-accounts", async (req, res) => {
  try {
    const data = await AccountsModel.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//ACCOUNTS
app.get("/helpers", async (req, res) => {
  res.sendFile(path.join(staticPath, "helpers.html"));
});

app.get("/get-open-balance", async (req, res) => {
  try {
    const data = await OpenBalance.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/add-open-balance", (req, res) => {
  const newBalance = new OpenBalance({
    openBalance: +req.body.openBalance,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  newBalance
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

//INVOICE AREA
app.get("/invoice-view", (req, res) => {
  res.sendFile(path.join(staticPath, "invoice-view.html"));
});

app.get("/invoice-create", (req, res) => {
  res.sendFile(path.join(staticPath, "invoice-create.html"));
});

//404
app.get("/404", (req, res) => {
  res.sendFile(path.join(staticPath, "404.html"));
});
app.use((req, res) => {
  res.redirect("/404");
});

const routeUrls = require("./routes/routes");

app.use("/app", routeUrls);

app.listen(PORT, () => {
  console.log("running port " + PORT);
});
