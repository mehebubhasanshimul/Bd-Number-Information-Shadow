export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { phone, dialingCode } = req.body || {};

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // নতুন API অনুযায়ী ডায়ালিং কোড এবং নম্বর একসাথে জোড়া হচ্ছে (যেমন: 880 + 17XXXXXXXX)
  const fullNumber = `${dialingCode || '880'}${phone}`;

  try {
    const response = await fetch(`https://truecaller-data2.p.rapidapi.com/search/${fullNumber}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Vercel-এর Environment Variable থেকে কী নিবে
        'x-rapidapi-host': 'truecaller-data2.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
