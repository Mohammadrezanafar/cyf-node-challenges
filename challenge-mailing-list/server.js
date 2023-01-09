const { request } = require("express");
const express = require("express");
const app = express();
let tip = [
  {
    name: "staff",
    members: ["talea@techtonica.org", "michelle@techtonica.org"],
  },
  {
    name: "students",
    members: ["chris@techtonica.org", "hamid@techtonica.org"],
  },
];

app.listen(3000, () => {
  console.log("listening on port 3000");
});

app.use(express.json());

app.get("/lists", (req, res) => {
  res.send(tip);
});

app.get("/lists/:name", (req, res) => {
  const job = req.params.name;
  const human = tip.find((y) => y.name === job);
  res.send(human);
});
app.delete("/lists/:name", (req, res) => {
  const job = req.params.name;
  const human = tip.some((y) => y.name === job);

  if (human) {
    tip = tip.filter((y) => y.name !== job);
    res.send("deleted");
  } else res.status(404).send("not availble for delete");
});

app.put("/lists/:name", (req, res) => {
  const job = req.params.name;
  const human = tip.find((y) => y.name === job);

  if (human) {
    tip.map((y) => (y.name === job ? (y.members = req.body.members) : human));
    res.send(tip);
  } else {
    tip.push({ name: job, ...req.body });
    res.send(tip);
  }
});
