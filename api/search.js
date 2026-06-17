export default async function handler(req, res) {
  // শুধুমাত্র POST রিকোয়েস্ট অ্যালাউ করার জন্য
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ফ্রন্টএন্ড থেকে পাঠানো ফোন নম্বর ও কান্ট্রি কোড রিসিভ করা
  const { phone, countryCode } = req.body || {};

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // RapidAPI-এর জন্য URL-encoded বডি তৈরি করা
  const searchParams = new URLSearchParams();
  searchParams.append('phone', phone);
  searchParams.append('countryCode', countryCode || 'bd');

  try {
    const response = await fetch('https://truecaller-api11.p.rapidapi.com/v2.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Vercel-এর Environment Variable থেকে কী নিবে
        'x-rapidapi-host': 'truecaller-api11.p.rapidapi.com'
      },
      body: searchParams.toString()
    });

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
