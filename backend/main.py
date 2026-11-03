
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, HTTPException
from services.pdf_service import extract_text_from_pdf

# Create FastAPI application
app = FastAPI(
    title="SofySpeaks Student Hub API",
    description="Backend services for student academic tools",
    version="1.0.0"
)

# Allow our Next.js frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to SofySpeaks Student Hub!",
        "status": "Backend is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "application": "SofySpeaks Student Hub"
    }

@app.post("/api/documents/extract")
async def extract_pdf(file: UploadFile = File(...)):

    # Check whether the uploaded file is a PDF
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # Read the uploaded file
    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty"
        )

    try:
        result = extract_text_from_pdf(file_bytes)

        return {
            "message": "PDF text extracted successfully",
            "filename": file.filename,
            "data": result
        }

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to read this PDF. Please upload a valid PDF file."
        )