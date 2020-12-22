const express = require("express");
const cron = require("node-cron");
const db = require("./models");
const moment = require("moment");
const randomString = require("randomstring");
const path = require("path");
const { Url } = require("./models");
const { Op } = require("sequelize");
const app = express();
require("dotenv").config();

// delete urls every night at 12 am
async function cleanUp() {
  try {
    await Url.destroy({
      where: { day: { [Op.ne]: moment().format("MMM Do YY") } },
    });
  } catch (err) {
    console.log(err.message);
    return;
  }
}

const task = cron.schedule("0 0 * * *", () => {
  cleanUp();
});
task.start();

(async () => {
  await db.sequelize.sync({ force: false, alter: true });
  console.log("MySQL connected");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.post("/api/createurl", async (req, res) => {
    try {
      const { url } = req.body;

      if (url === undefined || url === "") {
        return res.json({
          success: false,
          message: "Please enter url",
        });
      }

      const code = randomString
        .generate({
          length: 5,
          charset: "alphabetic",
        })
        .toLowerCase();

      await Url.create({
        url,
        code,
        day: moment().format("MMM Do YY"),
      });

      res.json({
        success: true,
        url,
        data: `http://localhost:3000/${code}`,
        message: "Short url has been created",
      });
    } catch (err) {
      console.log(err.message);
      return res.json({
        success: false,
        message: err.message,
      });
    }
  });

  app.get("/api/urls", async (req, res) => {
    try {
      const urls = await Url.findAll();

      res.json({
        success: true,
        data: urls,
      });
    } catch (err) {
      console.log(err.message);
      return res.json({
        success: false,
        message: err.message,
      });
    }
  });

  app.get("/api/url/:code", async (req, res) => {
    try {
      if (req.params.code == undefined || req.params.code === "") {
        return res.json({
          success: false,
          message: "Please enter code",
        });
      }

      const url = await Url.findAll({
        limit: 1,
        where: {
          code: {
            [Op.eq]: req.params.code,
          },
        },
      });

      res.json({
        success: true,
        data: url,
      });
    } catch (err) {
      console.log(err.message);
      return res.json({
        success: false,
        message: err.message,
      });
    }
  });

  // client
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
  });

  app.listen(process.env.PORT, () =>
    console.log(`listening on PORT ${process.env.PORT}`)
  );
})();
