const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://trinhtduc512:bNkfD4qh6zf4KxD2@ssrlab.hpa88bo.mongodb.net/?retryWrites=true&w=majority&appName=SSRLab";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("HealthData");
    const movies = database.collection("SampleHealthData");

    // Query for a movie that has the title 'Back to the Future'
    const query = { };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
