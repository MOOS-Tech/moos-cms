module.exports = {
    async afterCreate(event) {
        const { result } = event;
        try {
            await strapi.plugins['email'].services.email.send({
                to: `info@moos.nu`,
                from: "Contact@moos.nu",
                subject: "You received a new message.",
                html: `
                <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Message Received</title>
                    <style>
                        body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #F4F4F4;
                        }
                        .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        h2 {
                        color: #333;
                        }
                        p {
                        color: #555;
                        }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                        <h2>New Message Received</h2>
                        <p>We have received a new message. Kindly review the details on your CMS dashboard.</p>
                        <ul>
                        <li><strong>Name:</strong> ${result.name}</li>
                        <li><strong>Email:</strong> <a href="mailto:${result.email}">${result.email}</a></li>
                        <li><strong>Request demonstration:</strong> ${result.request_demonstration}</li>
                        <li><strong>Message:</strong> ${result.message}</li>
                        </ul>
                        <p>Thank you!</p>
                        <p>Best regards,<br>MOOS</p>
                    </div>
                    </body>
                </html>`

            })
        }
        catch (err) {
            console.log(err);
        }
    }
}