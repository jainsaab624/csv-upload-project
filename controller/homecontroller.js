import filesModel from "../models/csv.js";

export default class homeController {
  async displayHomePage(req, res) {
    try {
      const file = await filesModel.find({});

      res.render("home", {
        files: file,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
