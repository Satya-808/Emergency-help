const twilio = require('twilio');

const medicalData = [
  { area: "bhimavaram", name: "Sri Balaji Medical Store", type: "Pharmacy", phone: "+919000999363", timings: "8 AM - 10:30 PM" },
  { area: "bhimavaram", name: "Sri Rajeswari Medicals", type: "Pharmacy", phone: "+918884328289", timings: "9 AM - 10:30 PM" },
  { area: "bhimavaram", name: "Apollo Pharmacy", type: "Pharmacy", phone: "+91917942970071", timings: "7 AM - 11 PM" },
  { area: "bhimavaram", name: "Sruthi Medicals", type: "Pharmacy", phone: "+9191954200007", timings: "8:30 AM - 10:30 PM" },
  { area: "bhimavaram", name: "Harsha Diabetes & Endocrine Clinic", type: "Clinic", phone: "+9191573269629", timings: "6 AM - 7 PM" },
  { area: "bhimavaram", name: "Sri Uma Mahesh Clinic", type: "Clinic", phone: "+9191440664589", timings: "Call to confirm" },
  { area: "bhimavaram", name: "SHINE Dental Hospital", type: "Clinic", phone: "+919059727674", timings: "9 AM - 9 PM" }
];

module.exports = async (req, res) => {
  const incomingMsg = (req.body.Body || '').toLowerCase().trim();
  const twiml = new twilio.twiml.MessagingResponse();
  let replyText = "";

  if (incomingMsg.includes('bhimavaram')) {
    replyText = "🏥 *Medical Help in Bhimavaram:*\n\n";
    
    medicalData.forEach(place => {
      replyText += `📍 *${place.name}* (${place.type})\n⏰ ${place.timings}\n📞 ${place.phone}\n\n`;
    });
    
    replyText += "_Reply with another area to search again._";
  } else {
    replyText = "Hello! I am your local emergency bot. Please reply with your area name (e.g., 'Bhimavaram') to find nearby medical help.";
  }

  twiml.message(replyText);
  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
};
