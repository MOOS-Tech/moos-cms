module.exports = {
    async afterCreate(event) {
        const { result } = event;

        try {
            await strapi.plugins['email'].services.email.send({
                to: `${result.email}`,
                from: "dhanushka.a@blackvt.com",
                subject: "Successfully added data",
                text: `
                Dear ${result.name},
                    
                Thank you for submitting your CV for the ${result.position} position at MOOS. We appreciate your interest in joining our team.Your application is important to us, and we will carefully review your qualifications to determine if your skills and experience match our requirements. If we find that your profile aligns with what we are looking for, we will contact you to discuss the next steps in the hiring process.Once again, thank you for considering MOOS as your potential employer. We look forward to the possibility of working together.
                
                Best regards,
                [Name]
                [Title]
                MOOS`
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}