import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import configuration from "@/utils/configuration";

export async function POST(request: Request) {
  try {
    const {
      firstName,
      phone,
      email,
      address,
      message,
      city,
      warehouse,
      products,
    } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: configuration.apiMailUser,
        pass: configuration.apiMailPass,
      },
    });

    const materialsTable = `
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr>
        <th style="border: 1px solid black; padding: 8px;">№</th>
        <th style="border: 1px solid black; padding: 8px;">Назва</th>
        <th style="border: 1px solid black; padding: 8px;">К-сть</th>
        <th style="border: 1px solid black; padding: 8px;">Ціна за одиницю</th>
        <th style="border: 1px solid black; padding: 8px;">Загальна ціна</th>
      </tr>
    </thead>
    <tbody>
      ${[...products]
        .map(
          (product, index) => `
        <tr>
        <td style="border: 1px solid black; padding: 8px;">${index + 1}</td>
          <td style="border: 1px solid black; padding: 8px;">${product.title} ${
            product.subTitle
          } ${product.size}</td>
          <td style="border: 1px solid black; padding: 8px;">${
            product.quantity
          }</td>
          <td style="border: 1px solid black; padding: 8px;">${
            product.price
          } грн.</td>
          <td style="border: 1px solid black; padding: 8px;">${(
            product.quantity * product.price
          ).toFixed(2)} грн.</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
`;

    const mailOptions = {
      from: configuration.apiMailFrom,
      to: `${configuration.apiMailTo}, rimmakhomich@gmail.com`,
      subject: "Нова заявка з сайту KonopliUa",
      html: `
        <p>Імʼя: ${firstName}</p>
        <p>Телефон: ${phone}</p>
        <p>Email: ${email}</p>
        <p>Місто: ${city}</p>
        <p>Відділення: ${warehouse ? warehouse : address}</p>
        <p>Коментар: ${message}</p>
        ${materialsTable}
      `,
    };

    const mailOptionsToClient = {
      from: configuration.apiMailFrom,
      to: email || `${configuration.apiMailTo}`,
      subject: "Підтвердження замовлення з сайту KonopliUa",
      html: `
        <p>Дякуємо за Ваше замовлення, ${firstName}!</p>
        <p>Ось деталі Вашого замовлення:</p>
        <p>Імʼя: ${firstName}</p>
        <p>Телефон: ${phone}</p>
        <p>Email: ${email}</p>
         <p>Місто: ${city}</p>
        <p>Відділення: ${warehouse ? warehouse : address}</p>
        <p>Коментар: ${message}</p>
        ${materialsTable}
        
      `,
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptionsToClient);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to send message.", { status: 500 });
  }
}
