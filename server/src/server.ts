import app from "./app";

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on 3000");
});
