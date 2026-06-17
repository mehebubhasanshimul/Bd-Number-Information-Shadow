export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { phone, countryCode } = req.body || {};

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  const searchParams = new URLSearchParams();
  searchParams.append('phone', phone);
  searchParams.append('countryCode', countryCode || 'bd');

  try {
    const response = await fetch('https://truecaller-api11.p.rapidapi.com/v2.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'truecaller-api11.p.rapidapi.com'
      },
      body: searchParams.toString()
    });

    const data = await response.json();
    
    // এই লাইনটি Vercel Logs-এ এপিআই-এর আসল ডাটা প্রিন্ট করবে
    console.log("RapidAPI Response Data:", JSON.stringify(data));
    
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
