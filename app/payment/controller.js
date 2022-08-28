const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate("banks");

      res.render("admin/payment/view", {
        name: req.session.user.name,
        title: "Payment Method",
        alert,
        payment,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/payment");
    }
  },

  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render("admin/payment/create", {
        name: req.session.user.name,
        title: "Tambah Data Payment Method",
        banks,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/payment");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;

      let payment = await Payment({ type, banks });
      await payment.save();

      req.flash("alertMessage", "Berhasil menambahkan metode transfer");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/payment");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const banks = await Bank.find();
      const payment = await Payment.findOne({ _id: id }).populate("banks");

      res.render("admin/payment/edit", {
        name: req.session.user.name,
        title: `Edit payment method "${payment.type}"`,
        banks,
        payment,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/payment");
    }
},

actionEdit: async(req, res) => {
    try {
        const {id} = req.params
        const {type, banks} = req.body

        await Payment.findOneAndUpdate(
          {
            _id: id,
          },
          { type, banks }
        );

        req.flash("alertMessage", "Data berhasil di update!")
        req.flash("alertStatus", "info")

        res.redirect("/payment")
        
    } catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        
        res.redirect("/payment");
    }
},

actionDelete: async(req, res) => {
    try {
        const {id} = req.params

        const payment = await Payment.findOneAndRemove({
            _id: id
        })

        req.flash("alertMessage", "Data berhasil di delete!");
        req.flash("alertStatus", "warning");

        res.redirect("/payment");

    } catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        
        res.redirect("/payment");
        
    }
  }
};
