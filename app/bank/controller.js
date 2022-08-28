const Bank = require("./model");

module.exports = {
  index: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    const bank = await Bank.find();

    res.render("admin/bank/view", {
      name: req.session.user.name,
      title: "Bank",
      alert,
      bank,
    });
    try {
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/bank");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create", {
        name: req.session.user.name,
        title: "Tambah Data",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/bank");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, bankName, noRekening } = req.body;

      let bank = await Bank({ name, bankName, noRekening });
      await bank.save();

      req.flash("alertMessage", "Nama BANK berhasil ditambahkan!");
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/bank");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const bank = await Bank.findOne({ _id: id });

      res.render("admin/bank/edit", {
        name: req.session.user.name,
        title: `Edit data bank "${bank.name}"`,
        bank,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, bankName, noRekening } = req.body;

      const bank = await Bank.findOneAndUpdate(
        {
          _id: id,
        },
        { name, bankName, noRekening }
      );

      req.flash("alertMessage", "Data berhasil diperbarui!");
      req.flash("alertStatus", "info");

      res.redirect("/bank", {
        bank,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/bank");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const bank = await Bank.findOneAndRemove({
        _id: id,
      });

      req.flash("alertMessage", "Data berhasil dihapus!");
      req.flash("alertStatus", "warning");

      res.redirect("/bank", {
        bank,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/bank");
    }
  },
};
