const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
const app = express();

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));
// To parse incoming JSON in POST request body:
app.use(express.json());

// To 'fake' put/patch/delete requests:
app.use(methodOverride("_method"));

// serve static files
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let stays = [
  {
    id: uuid(),
    name: "Dunlap Hollow A-Frame",
    location: "Rockbridge, Ohio, United States",
    price: 650,
    img: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48509375/original/0862735b-4abc-4d87-a8d1-f2fb6053adc8.jpeg?im_w=720",
  },
  {
    id: uuid(),
    name: "Dunlap Hollow A-Frame",
    location: "Rockbridge, Ohio, United States",
    price: 650,
    img: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48509375/original/0862735b-4abc-4d87-a8d1-f2fb6053adc8.jpeg?im_w=720",
  },
  {
    id: uuid(),
    name: "Dunlap Hollow A-Frame",
    location: "Rockbridge, Ohio, United States",
    price: 650,
    img: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48509375/original/0862735b-4abc-4d87-a8d1-f2fb6053adc8.jpeg?im_w=720",
  },
  {
    id: uuid(),
    name: "Dunlap Hollow A-Frame",
    location: "Rockbridge, Ohio, United States",
    price: 650,
    img: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48509375/original/0862735b-4abc-4d87-a8d1-f2fb6053adc8.jpeg?im_w=720",
  },
  {
    id: uuid(),
    name: "Dunlap Hollow A-Frame",
    location: "Rockbridge, Ohio, United States",
    price: 650,
    img: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48509375/original/0862735b-4abc-4d87-a8d1-f2fb6053adc8.jpeg?im_w=720",
  },
];

// ================ declaring routes=================//

// *******************************************
// UPDATE STAY PAGE
// *******************************************
app.get("/stays/:id/edit", (req, res) => {
  const { id } = req.params;
  const stay = stays.find((oneStay) => oneStay.id === id);
  res.render("stays/edit", { stay });
});
// *******************************************
// ADD NEW STAY PAGE
// *******************************************

app.get("/stays/new", (req, res) => {
  res.render("stays/new");
});

// *******************************************
// CREATE- creates a new stay
// *******************************************

app.post("/stays", (req, res) => {
  const { location, name, price, img } = req.body;
  stays.push({ location, name, price, img, id: uuid() });
  res.redirect("/stays");
});
// *******************************************
// GET SINGLE STAY FOR DETAILS
// ******************************************
app.get("/stays/:id", (req, res) => {
  const { id } = req.params;
  const singleStay = stays.find((single) => single.id === id);
  res.render("stays/details", { singleStay });
});

// *******************************************
// GET STAYS
// *******************************************
app.get("/stays", (req, res) => {
  res.render("stays/index", { stays });
});

// *******************************************
// PATCH- removes a single stay
// *******************************************

app.patch("/stays/:id", (req, res) => {
  const { id } = req.params;
  let foundStay = stays.find((oneStay) => oneStay.id === id);

  // extract newly updated stay data
  const { name, location, price, img } = req.body;
  foundStay.img = img;
  foundStay.name = name;
  foundStay.location = location;
  foundStay.price = price;

  res.redirect("/stays");
});

// *******************************************
// DELETE/DESTROY- removes a single stay
// *******************************************

app.delete("/stays/:id", (req, res) => {
  const { id } = req.params;
  stays = stays.filter((eachStay) => eachStay.id !== id);
  res.redirect("/stays");
});

app.get("/", (req, res) => {
  res.send("<h1>This is a trial application</h1>");
});

// create server
app.listen(5000, () => {
  console.log("Port is live");
});
