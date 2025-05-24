import pdfplumber
import spacy
import re
from tkinter import Tk
from tkinter.filedialog import askopenfilename

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Predefined skills list
SKILLS = [
    "python", "java", "c++", "react", "node.js", "machine learning", "sql",
    "excel", "javascript", "spring", "docker", "git", "html", "css", "pandas", "numpy"
]

EXPERIENCE_KEYWORDS = ["experience", "employment", "work history", "professional summary"]
EDUCATION_KEYWORDS = ["education", "academic background", "qualifications"]

def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            if page.extract_text():
                text += page.extract_text() + "\n"
    return text

def extract_name(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return None

def extract_email(text):
    match = re.search(r'[\w\.-]+@[\w\.-]+', text)
    return match.group(0) if match else None

def extract_phone(text):
    match = re.search(r'(\+?\d{1,3}[\s-]?)?\(?\d{2,4}\)?[\s.-]?\d{6,8}', text)
    return match.group(0) if match else None

def extract_skills(text):
    text_lower = text.lower()
    return [skill for skill in SKILLS if skill in text_lower]

def extract_section(text, keywords, max_lines=15):
    lines = text.splitlines()
    for i, line in enumerate(lines):
        for keyword in keywords:
            if keyword.lower() in line.lower():
                return "\n".join(lines[i : i + max_lines])
    return None

def parse_resume(text):
    return {
        "Name": extract_name(text),
        "Email": extract_email(text),
        "Phone": extract_phone(text),
        "Skills": extract_skills(text),
        "Experience": extract_section(text, EXPERIENCE_KEYWORDS),
        "Education": extract_section(text, EDUCATION_KEYWORDS)
    }

if __name__ == "__main__":
    print("📄 Please select a resume PDF file...")
    Tk().withdraw()  # Hide tkinter GUI
    file_path = askopenfilename(filetypes=[("PDF files", "*.pdf")])

    if file_path:
        extracted_text = extract_text_from_pdf(file_path)
        result = parse_resume(extracted_text)

        print(f"\n✅ Parsed Resume: {file_path}\n")
        for key, value in result.items():
            print(f"{key}:\n{value}\n{'-'*40}")
    else:
        print("❌ No file selected.")