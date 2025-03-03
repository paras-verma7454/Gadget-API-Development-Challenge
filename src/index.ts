const express = require("express");
const GadgetRouter=require("./routes/Gadgets");
const userRouter = require("./routes/User");
const cors = require("cors");

const app=express();
app.use(cors());
app.use(express.json());

app.use("/gadgets", GadgetRouter)
app.use('/auth', userRouter)


app.listen(3000,()=> console.log("listening on port 3000"));