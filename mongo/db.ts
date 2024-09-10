import mongoose from "mongoose";

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@experiments.u2ldf.mongodb.net/`;

if (!connectionString) {
  throw new Error("Database connection string is not provided");
}

const connectionDb = async () => {
  try {
    if (mongoose.connection?.readyState >= 1) {
      return;
    }
    console.debug("Connecting to the database..."

    );
    await mongoose.connect(connectionString, {
    });
    console.debug("Connected to the database");
  } catch (error) {
    console.error("Não foi possível se conectar ao mongo", error);
  }
};

export default connectionDb;
