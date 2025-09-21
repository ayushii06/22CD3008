const generateCode = () => Math.random().toString(36).substring(2, 7);

function handleShorten({ list }) {
  const processedLinks = [];

  for (const link of list) {
    // Skip entries that don't have a URL
    if (!link.url) continue;

    // If a custom shortcode is provided, use it; otherwise, generate one
    const shortCode = link.code || generateCode();

    // Check for duplicate short codes
    const exists = processedLinks.find((l) => l.shortCode === shortCode);
    if (exists) {
      //return error
      return null; 
    }

    // Default validity is 30 minutes
    const ttl = link.validity ? parseInt(link.validity) : 30;
    const expiry = new Date(Date.now() + ttl * 60 * 1000);

    const newLink = {
      longUrl: link.url,
      shortCode,
      expiry: expiry.toISOString(),
    };

    processedLinks.push(newLink);
  }

  return processedLinks;
}

export default handleShorten;