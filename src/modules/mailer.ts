import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars"
import path from "path";

export const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "",
      pass: ""
    }
  })

  transport.use('compile', hbs({
      viewEngine: 'handlebars',
      viewPath: path.resolve('../resources/mail'),
      extName:'.html'
  }))