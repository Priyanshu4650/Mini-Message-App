const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Msg = require("./models/message");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(morgan("dev"));

const dbURI =
	"mongodb+srv://bloguser:test1234@nodelearning.lvzfb5p.mongodb.net/?retryWrites=true&w=majority";
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(3000);
	})
	.catch((err) => {
		console.log("Error connecting to MongoDB:", err);
	});

// const messages = [
// 	{
// 		text: "Hi there!",
// 		user: "Amando",
// 		added: new Date(),
// 	},
// 	{
// 		text: "Hello World!",
// 		user: "Charles",
// 		added: new Date(),
// 	},
// 	{
// 		text: "Good Morning",
// 		user: "Priyanshu",
// 		added: new Date(),
// 	},
// ];

app.get("/", (req, res) => {
	Msg.find()
		.sort({ createdAt: 1 })
		.then((result) => {
			res.render("index", { title: "Home Page", messages: result });
		})
		.catch((err) => {
			throw err;
		});
});

app.post("/", (req, res) => {
	const msg = new Msg(req.body);
	msg.save()
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get("/new", (req, res) => {
	res.render("new", { title: "New Message" });
});

app.delete("/:id", (req, res) => {
	const id = req.params.id;

	Msg.findById(id)
		.then(result => {
			res.render("index", { title: "Home Page", messages: result })
		})
		.catch(err => {
			res.send("Not Found");
			res.end();
		})
})

app.use("/404", (req, res) => {
	res.send("Not Found");
});
