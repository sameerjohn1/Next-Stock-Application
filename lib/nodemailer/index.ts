import nodemailer from 'nodemailer'
import { WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE } from './templates'

export const   transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.NODEMAILER_EMAIL!,
        pass:process.env.NODEMAILER_PASSWORD!
    }
})


export const sendWelcomeEmail=async({email,name,intro}:WelcomeEmailData)=>{
  try {
    const htmlTemplate=WELCOME_EMAIL_TEMPLATE.replace('{{name}}',name).replace('{{intro}}',intro);

    const mailOptions={
        from:`"Signalist" <sameerprogrammer5@gmail.com>`,
        to:email,
        subject:"Welcome to Signalist - Your stock market toolkit is ready!",
        text:"Thanks for joining Signalist",
        html:htmlTemplate,
    }

    const result=await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${email}:`, result.response);
    return {success:true, messageId:result.messageId};
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
    throw error;
  }
}

export const sendNewsSummaryEmail=async({email,date,newsContent}:NewsSummaryEmailData)=>{
  try {
    const htmlTemplate=NEWS_SUMMARY_EMAIL_TEMPLATE.replace('{{date}}',date).replace('{{newsContent}}',newsContent);

    const mailOptions={
        from:`"Signalist" <sameerprogrammer5@gmail.com>`,
        to:email,
        subject:"Market News Summary - Signalist Daily Update",
        text:"Daily market news summary",
        html:htmlTemplate,
    }

    const result=await transporter.sendMail(mailOptions);
    console.log(`News summary email sent successfully to ${email}:`, result.response);
    return {success:true, messageId:result.messageId};
  } catch (error) {
    console.error(`Failed to send news summary email to ${email}:`, error);
    throw error;
  }
}


