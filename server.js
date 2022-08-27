const express = require("express");
const mongoose = require("mongoose");
const { render } = require("ejs");
const dotenv = require("dotenv");
const blogRoute = require("./routes/blogRoutes");
const cors = require("cors");

dotenv.config();
const app = express();

//connect to mongodb
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}) //this is a asynchronous method and takes some time to load
	.then((result) => {
		app.listen(8080);
		console.log(`Server started `);
		console.log(`MongoDB Connected`);
	})
	.catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs"); // this will take current directory

//middle & static files(files that are public)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.redirect("/blogs");
});
app.get("/blogs/create", (req, res) => {
	const pageTitle = "New Blog";
	res.render("blogs/create", { pageTitle });
});
app.get("/about", (req, res) => {
	const pageTitle = "About";
	res.render("about", { pageTitle });
});

//blog routes
app.use("/blogs", blogRoute);

app.use((req, res) => {
	res.status(404).render("404", { pageTitle: "404" });
});
