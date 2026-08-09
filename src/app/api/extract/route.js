export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return Response.json({ error: 'URL is required' }, { status: 400 });
    }

    const apiUrl = "https://ipykqxlpqpcfpftzvbqd.supabase.co/functions/v1/extract-video";
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlweWtxeGxwcXBjZnBmdHp2YnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NTE4NjcsImV4cCI6MjA5MTEyNzg2N30._C9l2de_vkBOmONbcdnrbl1FlnWdLEnrrgP1xalJ3L0";

    const apiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": apiKey,
        "Origin": "https://swift-share-v1x9.vercel.app",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({ url })
    });

    if (!apiResponse.ok) {
      return Response.json({ error: `API failed with status: ${apiResponse.status}` }, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    return Response.json(data);
  } catch (error) {
    console.error("Extraction error:", error);
    return Response.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
