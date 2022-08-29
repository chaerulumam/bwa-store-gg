const Transaction = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const transaction = await Transaction.find().populate("player");

      res.render("admin/transaction/view", {
        alert,
        transaction,
        name: req.session.user.name,
        title: "Method Payment",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/transaction");
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;

      await Transaction.findByIdAndUpdate({ _id: id }, { status });

      req.flash("alertMessage", `Status berhasil di update!`);
      req.flash("alertStatus", "success");

      res.redirect("/transaction");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/transaction");
    }
  },
};
