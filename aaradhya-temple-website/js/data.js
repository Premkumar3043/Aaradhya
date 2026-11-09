/* Demo content. Replace with verified data (source + last-checked date) before launch. */
const TEMPLES = [
  { id: "tirumala", name: "Tirumala Venkateswara Temple", city: "Tirumala, Tirupati", state: "Andhra Pradesh", deity: "Sri Venkateswara", group: "Vishnu", art: "gopuram", featured: 1,
    sky: ["#191919", "#642D32", "#C49A48"], tiers: 7,
    summary: "A hill-top shrine of Sri Venkateswara in the Seshachalam hills.",
    about: "Tirumala is one of the most visited pilgrimage centres in India. The temple stands among the seven hills of Seshachalam and is dedicated to Sri Venkateswara, a form of Vishnu. Pilgrims often plan the journey around the queue system, so it helps to read the official booking guidance early.",
    reach: { rail: "Tirupati Railway Station, then road to Tirumala", air: "Tirupati Airport", road: "Regular buses and taxis climb from Tirupati to the hill" },
    season: "October to March is usually milder", duration: "1 to 2 days" },
  { id: "srisailam", name: "Srisailam Mallikarjuna Temple", city: "Srisailam", state: "Andhra Pradesh", deity: "Mallikarjuna and Bhramaramba", group: "Shiva", art: "gopuram", sky: ["#13201f", "#3a4a3c", "#C49A48"], tiers: 5,
    summary: "A forest-hill temple that is both a Jyotirlinga and a Shakti Peetha.",
    about: "Set on the Nallamala hills beside the Krishna river, Srisailam is revered as one of the twelve Jyotirlingas and also as a Shakti Peetha, which makes it unusual. The road passes through forest, so allow extra travel time.",
    reach: { rail: "Markapur Road Railway Station, then road", air: "Hyderabad (around 200 km by road)", road: "State buses run from Hyderabad, Kurnool and Vijayawada" },
    season: "Post-monsoon to winter months", duration: "1 day plus travel" },
  { id: "vijayawada", name: "Kanaka Durga Temple", city: "Vijayawada", state: "Andhra Pradesh", deity: "Goddess Kanaka Durga", group: "Devi", art: "gopuram", sky: ["#2a1417", "#642D32", "#d9a441"], tiers: 4,
    summary: "The city's hill-top temple of Goddess Durga above the Krishna river.",
    about: "Kanaka Durga Temple sits on Indrakeeladri hill overlooking the Krishna river in Vijayawada. It is especially busy during Dasara, so plan ahead if you intend to travel then.",
    reach: { rail: "Vijayawada Junction, a major rail hub", air: "Vijayawada Airport at Gannavaram", road: "City buses and autos reach the hill base" },
    season: "Winter is comfortable; expect crowds at Dasara", duration: "Half a day" },
  { id: "varanasi", name: "Kashi Vishwanath Temple", city: "Varanasi", state: "Uttar Pradesh", deity: "Lord Vishwanath (Shiva)", group: "Shiva", art: "ghat", featured: 1, sky: ["#2a1417", "#8a4a3a", "#e8b86a"],
    summary: "A Jyotirlinga shrine in the ancient city on the Ganga.",
    about: "Kashi Vishwanath is among the twelve Jyotirlingas and sits in Varanasi, a city many consider among the oldest continuously inhabited places in the world. A visit often combines temple darshan with the ghats and the evening Ganga aarti.",
    reach: { rail: "Varanasi Junction", air: "Lal Bahadur Shastri Airport", road: "Narrow old-city lanes; plan the last stretch on foot or by e-rickshaw" },
    season: "October to March", duration: "1 to 2 days" },
  { id: "madurai", name: "Meenakshi Amman Temple", city: "Madurai", state: "Tamil Nadu", deity: "Goddess Meenakshi and Sundareswarar", group: "Devi", art: "gopuram", featured: 1, tiers: 9, sky: ["#2b1620", "#8a3b4a", "#f0c36d"],
    summary: "Towering painted gopurams and a temple city at the heart of Madurai.",
    about: "The Meenakshi Amman Temple is known for its tall, richly sculpted gopurams and its long corridors of carved pillars. It is dedicated to Goddess Meenakshi and her consort Sundareswarar, and the old city grew around it.",
    reach: { rail: "Madurai Junction", air: "Madurai Airport", road: "Well connected by road across Tamil Nadu" },
    season: "October to March", duration: "Half a day to 1 day" },
  { id: "rameswaram", name: "Ramanathaswamy Temple", city: "Rameswaram", state: "Tamil Nadu", deity: "Ramanathaswamy (Shiva)", group: "Shiva", art: "gopuram", tiers: 6, sky: ["#10262b", "#2f6a72", "#f0d79a"],
    summary: "An island temple famous for its long pillared corridors.",
    about: "Rameswaram lies on Pamban island and its temple is a Jyotirlinga site as well as part of the Char Dham tradition. The long pillared corridors are among its best-known features.",
    reach: { rail: "Rameswaram Railway Station", air: "Madurai Airport (about 3 to 4 hours by road)", road: "Reached over the Pamban bridge" },
    season: "Winter months", duration: "1 day" },
  { id: "puri", name: "Jagannath Temple", city: "Puri", state: "Odisha", deity: "Lord Jagannath", group: "Vishnu", art: "shikhara", featured: 1, sky: ["#1f1a2b", "#642D32", "#e0a85a"],
    summary: "A seaside Char Dham temple known for the annual Rath Yatra.",
    about: "The Jagannath Temple at Puri is one of the Char Dham pilgrimage sites and is known worldwide for the Rath Yatra, when the deities are drawn through the streets on great chariots. Entry rules for the temple are specific, so check the official guidance before you go.",
    reach: { rail: "Puri Railway Station", air: "Bhubaneswar Airport (about 60 km)", road: "Good highway from Bhubaneswar" },
    season: "October to March; Rath Yatra season draws very large crowds", duration: "1 day" },
  { id: "kedarnath", name: "Kedarnath Temple", city: "Kedarnath, Rudraprayag", state: "Uttarakhand", deity: "Lord Kedarnath (Shiva)", group: "Shiva", art: "mountain", featured: 1, sky: ["#1b2230", "#5b6b86", "#e9d9b8"],
    summary: "A Himalayan Jyotirlinga reached by a mountain trek.",
    about: "Kedarnath stands high in the Garhwal Himalayas and is part of the Chota Char Dham circuit. The temple is open only in the warmer months and the approach involves a trek or other transport arrangements, so fitness, weather and registration rules matter.",
    reach: { rail: "Rishikesh or Haridwar railway stations", air: "Jolly Grant Airport, Dehradun", road: "Road to Gaurikund, then trek or arranged transport" },
    season: "Roughly May to June and September to October; closed in winter", duration: "2 to 3 days" },
  { id: "somnath", name: "Somnath Temple", city: "Prabhas Patan, Veraval", state: "Gujarat", deity: "Lord Somnath (Shiva)", group: "Shiva", art: "shikhara", sky: ["#191919", "#3b4f6a", "#f4d9a0"],
    summary: "The first of the twelve Jyotirlingas, facing the Arabian Sea.",
    about: "Somnath is counted as the first of the twelve Jyotirlingas and stands right beside the Arabian Sea at Prabhas Patan near Veraval. Its coastal setting makes sunset hours especially memorable.",
    reach: { rail: "Veraval Railway Station", air: "Keshod Airport (check current flights)", road: "Highways link Veraval to Junagadh and Rajkot" },
    season: "October to March", duration: "Half a day" }
];

const PACKAGES = [
  { id: "andhra", title: "Andhra Sacred Triangle", route: "Tirumala, Srisailam, Vijayawada", temples: ["tirumala", "srisailam", "vijayawada"], days: 5, art: "gopuram", sky: ["#191919", "#642D32", "#C49A48"], tiers: 8,
    tags: ["family", "multi"], suits: "Families and multi-temple routes", window: "October to March", price: 18500, basis: "per person, twin sharing (demo estimate)",
    inc: ["Suggested day-wise route", "Help coordinating local transfers", "Stay suggestions near each temple"],
    exc: ["Darshan tickets", "Meals", "Train or flight fares", "Taxes"],
    plan: [
      ["Arrive in Tirupati", "Arrive and check in", "Rest and local sightseeing", "Early night before the hill"],
      ["Tirumala darshan", "Drive up to Tirumala", "Darshan as per booked slot", "Return to Tirupati"],
      ["Travel to Srisailam", "Long drive through forest road", "Check in and rest", "Evening temple visit"],
      ["Srisailam darshan", "Morning darshan", "Dam and viewpoint stop", "Travel towards Vijayawada"],
      ["Kanaka Durga and depart", "Hill-top darshan", "Prakasam Barrage walk", "Departure"]
    ] },
  { id: "kashi", title: "Kashi and the Ganga", route: "Varanasi, with an evening aarti", temples: ["varanasi"], days: 4, art: "ghat", sky: ["#2a1417", "#8a4a3a", "#e8b86a"],
    tags: ["family", "short"], suits: "First-time pilgrims and families", window: "October to March", price: 14800, basis: "per person, twin sharing (demo estimate)",
    inc: ["Suggested itinerary", "Ghat and boat ride planning", "Guide coordination on request"],
    exc: ["Darshan arrangements", "Meals", "Travel to Varanasi", "Taxes"],
    plan: [
      ["Arrive in Varanasi", "Arrive and check in", "Rest", "Evening Ganga aarti"],
      ["Kashi Vishwanath", "Morning darshan", "Old-city lanes", "Free evening"],
      ["Ghats and nearby", "Sunrise boat ride", "Sarnath visit", "Dinner"],
      ["Departure", "Last morning at the ghats", "Check out", "Departure"]
    ] },
  { id: "tamil", title: "Temple Towns of Tamil Nadu", route: "Madurai and Rameswaram", temples: ["madurai", "rameswaram"], days: 5, art: "gopuram", tiers: 9, sky: ["#2b1620", "#8a3b4a", "#f0c36d"],
    tags: ["multi", "family"], suits: "Multi-temple route", window: "October to March", price: 16900, basis: "per person, twin sharing (demo estimate)",
    inc: ["Suggested route and timings", "Road transfer planning", "Stay suggestions"],
    exc: ["Darshan tickets", "Meals", "Travel to Madurai", "Taxes"],
    plan: [
      ["Arrive in Madurai", "Arrive and check in", "Rest", "Evening at the old city"],
      ["Meenakshi Amman", "Morning darshan", "Thirumalai Nayakkar Mahal", "Free evening"],
      ["Drive to Rameswaram", "Road journey", "Check in", "Temple area walk"],
      ["Ramanathaswamy", "Morning visit", "Dhanushkodi trip", "Rest"],
      ["Return and depart", "Drive back to Madurai", "Departure", ""]
    ] },
  { id: "puri", title: "Jagannath Puri Weekend", route: "Puri and Bhubaneswar", temples: ["puri"], days: 3, art: "shikhara", sky: ["#1f1a2b", "#642D32", "#e0a85a"],
    tags: ["short", "senior"], suits: "Short visits and senior travellers", window: "October to March", price: 11900, basis: "per person, twin sharing (demo estimate)",
    inc: ["Gentle-paced suggested plan", "Pickup coordination from Bhubaneswar", "Stay near the temple suggested"],
    exc: ["Darshan arrangements", "Meals", "Travel to Bhubaneswar", "Taxes"],
    plan: [
      ["Arrive and settle in", "Transfer to Puri", "Rest", "Evening on the beach"],
      ["Jagannath darshan", "Morning visit", "Rest", "Local markets"],
      ["Depart", "Optional Konark visit", "Transfer back", "Departure"]
    ] },
  { id: "tirumala", title: "Tirumala Easy Darshan", route: "Tirupati and Tirumala", temples: ["tirumala"], days: 2, art: "gopuram", sky: ["#191919", "#642D32", "#C49A48"], tiers: 7,
    tags: ["senior", "short"], suits: "Senior-friendly, short visit", window: "October to March", price: 7600, basis: "per person, twin sharing (demo estimate)",
    inc: ["Slow-paced schedule", "Wheelchair and mobility needs noted", "Transfers coordinated"],
    exc: ["Darshan tickets", "Meals", "Travel to Tirupati", "Taxes"],
    plan: [
      ["Arrive and rest", "Arrive in Tirupati", "Check in and rest", "Early dinner"],
      ["Darshan and return", "Drive to Tirumala", "Darshan as per booked slot", "Return and depart"]
    ] }
];

const FAQS = [
  ["Is Aaradhya a booking website?", "Not yet. This version is a front-end prototype. The enquiry form shows how planning will work, but it does not send your details or confirm any booking."],
  ["Where do darshan timings and rules come from?", "Timings and entry rules change, so Aaradhya will always point you to the temple's official website and show the date information was last checked. Always confirm there before you travel."],
  ["Can I plan a trip for senior family members?", "Yes. The enquiry flow lets you note mobility support, wheelchair needs and medical-facility preferences, and the packages marked senior-friendly use a slower pace."],
  ["Are the prices on this page real?", "No. Prices and itineraries here are labelled demo estimates for design purposes. Real prices will be shown with inclusions, exclusions and cancellation terms before any payment."],
  ["Will Aaradhya be available in Telugu and other languages?", "English comes first. The content is organised so Telugu and other Indian languages can be added in a later phase."],
  ["How do I contact the team?", "Use the Plan Your Journey form, or write to the demo address in the footer. A live support channel will be added once the service is running."]
];

/* Temple photography: Wikimedia Commons thumbnails. See PHOTO_CREDITS.md for authors and licences.
   If a remote image is unavailable, the original locally generated SVG illustration remains visible. */
const TEMPLE_PHOTOS = {
  tirumala: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/A_View_of_Tirumala_Venkateswara_Temple.JPG/1280px-A_View_of_Tirumala_Venkateswara_Temple.JPG",
  srisailam: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Srisailam_Gopuram.jpg/960px-Srisailam_Gopuram.jpg",
  vijayawada: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Kanaka_Durga_Gopuram%2C_Vijayawada.jpg",
  varanasi: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Kashi_Vishwanath_Temple_in_Varanasi.jpg/1280px-Kashi_Vishwanath_Temple_in_Varanasi.jpg",
  madurai: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Meenakshi_Temple%2C_Gopuram%2C_Madurai%2C_India.jpg/1280px-Meenakshi_Temple%2C_Gopuram%2C_Madurai%2C_India.jpg",
  rameswaram: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Ramanathaswamy_Temple%2C_Rameswaram.jpg/1280px-Ramanathaswamy_Temple%2C_Rameswaram.jpg",
  puri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Jagannath_Temple_Puri.jpg/1280px-Jagannath_Temple_Puri.jpg",
  kedarnath: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kedarnath_temple.jpg/1280px-Kedarnath_temple.jpg",
  somnath: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Somnath_Temple%2C_Somnath.jpg/1280px-Somnath_Temple%2C_Somnath.jpg"
};
TEMPLES.forEach(t => { t.photo = TEMPLE_PHOTOS[t.id] || null; });
