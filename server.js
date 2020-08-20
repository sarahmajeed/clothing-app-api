const express = require("express");
const db = require("./db/index");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, saltRounds);
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
          .then((user) => res.json(user[0]))
          .catch((err) => console.log(err.message));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
});
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  db("login")
    .where({
      email: email,
    })
    .select("email", "hash")
    .then((data) => {
      const isValid = data[0].compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where({
            email: email,
          })
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("Unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
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
app.listen(5000, () => console.log("listening to port 5000"));
