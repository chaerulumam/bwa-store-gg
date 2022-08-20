module.exports = {
  index: async (req, res) => {
    try {
      res.render("admin/nominal/view");
    } catch (err) {
      console.log(err);
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/nominal/create");
    } catch (err) {
      console.log(err);
    }
  },
};
