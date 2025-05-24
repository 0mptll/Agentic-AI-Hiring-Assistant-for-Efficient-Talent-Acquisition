# pip install pdfplumber

import pdfplumber
from tkinter import Tk
from tkinter.filedialog import askopenfilename

def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            if page.extract_text():
                text += page.extract_text() + "\n"
    return text

if __name__ == "__main__":
    print("📄 Select a PDF file to extract text from...")
    root = Tk()
    root.withdraw()  # Hide the main Tkinter window
    file_path = askopenfilename(filetypes=[("PDF files", "*.pdf")])

    if file_path:
        extracted_text = extract_text_from_pdf(file_path)
        print("\n📄 Extracted Text:\n")
        print(extracted_text.strip())
    else:
        print("❌ No file selected.")
