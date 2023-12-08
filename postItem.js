const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/usersModel');
const Product = require('./models/productModel');

//change to your own mongoDB link!
mongoose.connect(
  "mongodb+srv://BiboyQG:chibanghao1023@mp3.ey9z5n7.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.json({ limit: '50mb' }));
// Increase the limit for URL-encoded data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.post('/submit-product', async (req, res) => {
    try {
        const newProduct = new Product({
            userId: req.body.userId,
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productImages: [] 
        });

        newProduct.productImages.push(...req.body.productImages);
        await newProduct.save();
        let user = await User.findOne({ userId: req.body.userId });

        if (user) {
          user.products.push(newProduct.productName);
          await user.save();
        } else {
          const newUser = new User({
            userId: req.body.userId,
            products: [newProduct.productName],
          });
          await newUser.save();
        }
        res.send('success');
    } catch (err) {
        console.log(err);
        res.status(400).send("Item not posted");
    }
});

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/postItem.html');
//   });


const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  console.log("userMessage", userMessage);
  try {
    // Generate a response using OpenAI's ChatGPT
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview", // Replace with your desired model
      messages: [{ role: "user", content: userMessage }]
    });
    // console.log("response", response["choices"][0].message.content);
    const reply = response["choices"][0].message.content.trim();
    res.json({ reply });
  } catch (error) {
    console.error("Error in OpenAI response:", error);
    res.status(500).send("Error processing your request");
  }
});