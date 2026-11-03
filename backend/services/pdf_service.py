
import fitz


def extract_text_from_pdf(file_bytes: bytes):
    """
    Extract text from every page of an uploaded PDF.
    """

    pdf_document = fitz.open(
        stream=file_bytes,
        filetype="pdf"
    )

    extracted_pages = []

    for page_number, page in enumerate(pdf_document, start=1):
        page_text = page.get_text("text")

        extracted_pages.append({
            "page": page_number,
            "text": page_text.strip()
        })

    result = {
        "total_pages": len(pdf_document),
        "pages": extracted_pages
    }

    pdf_document.close()

    return result
