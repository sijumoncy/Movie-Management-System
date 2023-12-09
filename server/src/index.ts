import app from './app';

let server:any;

const port = 8000;

app.listen(port, () => {
    console.log(`App is Running in Port : ${port}`)
})