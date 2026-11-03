
import asyncio
from services.ai_service import generate_ai_response


async def main():
    try:
        response = await generate_ai_response(
            "Explain what a syllabus is in two simple sentences."
        )

        print("\nAI RESPONSE:")
        print(response)

    except Exception as error:
        print("\nERROR:")
        print(type(error).__name__, error)


if __name__ == "__main__":
    asyncio.run(main())
