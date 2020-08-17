const express = require("express");
const db = require("./db/index");
const cors = require("cors");
const { getMaxListeners } = require("./db/index");

const obj = {
  users: [
    {
      id: "1",
      name: "John",
      email: "john@gmail.com",
      password: "abc",
      joined: new Date(),
    },
    {
      id: "2",
      name: "Joe",
      password: "ab",
      email: "joe@gmail.com",
      joined: new Date(),
    },
  ],
};

////signin route -> post = success/fail ->posting bec we want to protect password
//register -> post = return profile
//profile/:userID -> GET USER

const app = express();
app.use(express.json());
app.use(cors());

app.post("/Signin", (req, res) => {
  //const { email, password } = req.body;
  if (
    req.body.email === obj.users[0].email &&
    req.body.password === obj.users[0].password
  ) {
    res.send("Success");
  } else {
    res.status(404).send("Error");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  obj.users.push({
    id: "3",
    name: name,
    email: email,
    password: password,
    joined: new Date(),
  });
  res.json(obj.users[obj.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  obj.users.forEach((user) => {
    if (id === user.id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).send("Error");
  }
});

app.get("/women/kurtis", (req, res) => {
  db.select("kurtiimg", "tag", "kurtiprice", "kurtiid")
    .from("kurtis")
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
app.get("/women/trousers", (req, res) => {
  db.select("trouserimg", "tag", "trouserprice", "trouserid")
    .from("trousers")
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
app.get("/men/shirts", (req, res) => {
  db.select("shirtimg", "tag", "shirtprice", "shirtid")
    .from("shirts")
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
app.get("/men/pants", (req, res) => {
  db.select("pantimg", "tag", "pantprice", "pantid")
    .from("pants")
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
app.get("/men/kurta", (req, res) => {
  db.select("kurtaimg", "tag", "kurtaprice", "kurtaid")
    .from("kurtas")
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
app.get("/accessories", (req, res) => {
  db.select("accimg", "tag", "accprice", "accid")
    .from("accessories")
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
app.get("/women/kurtis/:id", (req, res) => {
  console.log(req.params);
  db.select("color", "kurtiimg", "tag", "kurtiprice", "kurtiid", "description")
    .from("kurtis")
    .where({ kurtiid: req.params.id })
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => console.log(err));
});
app.get("/women/trousers/:id", (req, res) => {
  console.log(req.params);
  db.select(
    "color",
    "trouserimg",
    "tag",
    "trouserprice",
    "trouserid",
    "description"
  )
    .from("trousers")
    .where({ trouserid: req.params.id })
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => console.log(err));
});
app.get("/men/shirts/:id", (req, res) => {
  console.log(req.params);
  db.select("color", "shirtimg", "tag", "shirtprice", "shirtid", "description")
    .from("shirts")
    .where({ shirtid: req.params.id })
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => console.log(err));
});
app.get("/men/kurta/:id", (req, res) => {
  console.log(req.params);
  db.select("color", "kurtaimg", "tag", "kurtaprice", "kurtaid", "description")
    .from("kurtas")
    .where({ kurtaid: req.params.id })
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => console.log(err));
});
app.get("/men/pants/:id", (req, res) => {
  console.log(req.params);
  db.select("color", "pantimg", "tag", "pantprice", "pantid", "description")
    .from("pants")
    .where({ pantid: req.params.id })
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => console.log(err));
});
app.get("/accessories/:id", (req, res) => {
  console.log(req.params);
  db.select("color", "accimg", "tag", "accprice", "accid", "description")
    .from("accessories")
    .where({ accid: req.params.id })
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => console.log(err));
});
app.listen(5000, () => console.log("listening to port 5000"));
