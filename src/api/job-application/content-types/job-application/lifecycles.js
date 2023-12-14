module.exports = {
    async afterCreate(event) {
        const { result } = event;
        try {
            await strapi.plugins['email'].services.email.send({
                to: `careers@moos.nu`,
                from: "dhanushka.a@blackvt.com",
                subject: "You received a new job application.",
                html: `
                <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Job Application Received</title>
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
                        <h2>New Job Application Received</h2>
                        <p>We have received a new job application. Kindly review the details on your CMS dashboard. Below is a summary of the applicant's information:</p>
                        <ul>
                        <li><strong>Name:</strong> ${result.name}</li>
                        <li><strong>Position:</strong> ${result.position}</li>
                        <li><strong>Email:</strong> <a href="mailto:${result.email}">${result.email}</a></li>
                        <li><strong>LinkedIn:</strong> <a href="${result.linkedin_profile}" target="_blank">linkedin</a></li>
                        <li><strong>Resume:</strong> <a href="${result.resume_link}" target="_blank">resume</a></li>
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