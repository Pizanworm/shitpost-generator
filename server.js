import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
dotenv.config();
const port = parseInt(process.env.PORT)


const configuration = new Configuration({
    apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('client/dist'))

app.post('/dream', async (req, res) => {

    const prompt = req.body.prompt;

    const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: '1024x1024'
    });

    const image = aiResponse.data.data[0].url;
    res.send({ image });
});

app.listen(port, () => console.log(`make art on http://localhost:${port}/dream`));