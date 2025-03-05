import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("/user/generate-token to generate token\n /user/validate-token to validate token");
});

//generate jwt token
app.post("/user/generate-token", (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  let data = {
    time: Date.now(),
    userId: 1,
  };

  let token = jwt.sign(
    {
      data: data,
    },
    jwtSecretKey,
    { expiresIn: "1h" }
  );

  res.send(token);
});

// validate jwt token
app.get("/user/validate-token", (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
     
        // Extract the token after "Bearer "
        const token = req.header("Authorization").split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Token missing" });
        }

        const verified = jwt.verify(token, jwtSecretKey);
        return res.json({ message: "Successfully Verified", user: verified });

    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
