module.exports = {
    async afterCreate(event){
        const { result } = event;
console.log(result)
        try{
            await strapi.plugins['email'].services.email.send({
                to:`${result.email}`,
                from:"dhanushka.a@blackvt.com",
                subject:"Thank You for Booking a Meeting", 
                text: `
                
                Dear ${result.name},
                
                Thank you for scheduling a meeting with us. We appreciate your time and look forward to discussing [meeting purpose] with you.
                The details of the meeting are as follows:
                
                Date: [Meeting Date]
                Time: [Meeting Time]
                Location: [Meeting Location or Online Link]
        
                If you have any questions or need to reschedule, please feel free to contact us at [your contact email or phone number].
        
                We are excited about the opportunity to connect with you and discuss how we can work together.
        
                Best regards,
                [Your Name]
                [Your Title]
                MOOS
                `
            })
        }
        catch(err){
            console.log(err);
        }
    }
}