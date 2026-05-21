const { Sequelize } = require("sequelize");
require("dotenv").config();

// Buradaki değişkenler .env dosyasından geliyor
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  },
);

// Veritabanı bağlantı fonksiyonu
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL bağlantısı başarılı");

    await sequelize.sync();
    console.log("Tablolar senkronize edildi");
  } catch (error) {
    console.error("DB bağlantı hatası:");
    console.error(error.message);
    console.error(error);
    process.exit(1);
  }
};
module.exports = {
  sequelize,
  connectDB,
};
