const { names } = require("debug");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/about", (req, res, next) => {
  res.render("about");
});

router.get("/events", (req, res, next) => {
  res.render("gallery");
});

router.get("/contact", (req, res, next) => {
  res.render("contact");
});

router.post("/submit", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let number = req.body.number;
  fs.appendFile(
    "data.txt",
    `name:${name},email:${email},number:${number}\n`,
    (e) => {
      if (e) {
        console.log(e);
      }

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dummyrehan1234@gmail.com",
          pass: "Dummy1234",
        },
      });

    var mailOption={
      from:'dummyrehan1234@gmail.com',
      to: req.body.email,
      subject:'Successfully Tickets Booked',
      text:'Congrulation have successfully booked the ticket for the upcoming event'
    }
    
    transporter.sendMail(mailOptions,(error,info)=>{
      if (error) {
        console.log(error);
      }else{
        res.render('success')
      }
    })
    }
  );
});

router.get ('submit',(req,res)=>{res.render('success')})

module.exports = router;
