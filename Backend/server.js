import "dotenv/config";

const getGeminiAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: message
                        }
                    ]
                }
            ]
        })
    };

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            options
        );

        const data = await response.json();

        console.log("✅ Gemini API raw response:", data);

        if (data.error) {
            console.error("❌ Gemini API Error:", data.error);
            return `❌ Gemini Error: ${data.error.message || "Unknown error"}`;
        }

        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        return reply?.trim() || "⚠️ Gemini did not return a valid response.";
    } catch (err) {
        console.error("❌ Fetch Error:", err);
        return "❌ Failed to connect to Gemini API.";
    }
};

export default getGeminiAPIResponse;
