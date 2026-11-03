
import os
import httpx
from dotenv import load_dotenv

# Load environment variables from backend/.env
load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


async def generate_ai_response(prompt: str):

    if not OPENROUTER_API_KEY:
        raise ValueError("OpenRouter API key is missing.")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "openrouter/free",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            OPENROUTER_URL,
            headers=headers,
            json=payload
        )

        response.raise_for_status()

        result = response.json()

        return result["choices"][0]["message"]["content"]
