const express = require("express");
const db = require("./db/index");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/billingform", (req, res) => {
  const { name, email, address, contact, city, card } = req.body;
  db("billing")
    .returning("*")
    .insert({
      name: name,
      email: email,
      address: address,
      contact: contact,
      city: city,
      card: card,
    })
    .then(console.log);
  res.json("Success");
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
  console.log("done");
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      console.log(isValid);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            console.log(user);
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("cant get user"));
      } else {
        res.status(400).json("wrong password");
      }
    })
    .catch((err) => res.status(400).json("wrong info"));
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
  db.table("kurtis")
    .innerJoin("kurtiquantity", "kurtis.kurtiid", "=", "kurtiquantity.kurti_id")
    .where({ kurtiid: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});
app.get("/women/trousers/:id", (req, res) => {
  console.log(req.params);
  db.table("trousers")
    .innerJoin(
      "trouserquantity",
      "trousers.trouserid",
      "=",
      "trouserquantity.trouser_id"
    )
    .where({ trouserid: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});
app.get("/men/shirts/:id", (req, res) => {
  console.log(req.params);
  db.table("shirts")
    .innerJoin("shirtquantity", "shirts.shirtid", "=", "shirtquantity.shirt_id")
    .where({ shirtid: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});
app.get("/men/kurta/:id", (req, res) => {
  console.log(req.params);
  db.table("kurtas")
    .innerJoin("kurtaquantity", "kurtas.kurtaid", "=", "kurtaquantity.kurta_id")
    .where({ kurtaid: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});
app.get("/men/pants/:id", (req, res) => {
  console.log(req.params);
  db.table("pants")
    .innerJoin("pantquantity", "pants.pantid", "=", "pantquantity.pant_id")
    .where({ pantid: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});
app.get("/accessories/:id", (req, res) => {
  console.log(req.params);
  db.table("accessories")
    .innerJoin("accquantity", "accessories.accid", "=", "accquantity.acc_id")
    .where({ accid: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

var port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening to port ${port}`));
