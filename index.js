import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 5510;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) =>{
    res.render("index.ejs")
})

app.post("/", async(req,res) =>{
    try{
        const location = req.body.location;
        const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`,{
            headers: { 
                'X-RapidAPI-Key': '6479d51509msh2aac78eae064577p1c586cjsne045c23aeebb'
              }
        })
        const result = response.data;
        res.render("index.ejs", { data : result});
    }catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: `No activity that matches your criteria 😔`,
        });
      }
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}.`);
})