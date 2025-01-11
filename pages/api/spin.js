export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    return res.status(200).json("2");
    try {
      const { APP_URL, AUTH_TOKEN } = process.env;
  
      // Faites un appel à l'API avec les informations sensibles
      const response = await fetch(`${APP_URL}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
  
      // Renvoyez les données au client
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  