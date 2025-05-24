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
    lines = text.strip().splitlines()
    top_lines = lines[:10]  # Usually name is near the top
    header_text = " ".join(top_lines)
    doc = nlp(header_text)


    TECH_KEYWORDS = {"django", "react", "python", "developer", "engineer", "machine", "learning"}


    # 1. Try NER using spaCy
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            name = ent.text.strip()
            if not re.search(r"[0-9@+]", name) and len(name.split()) <= 4:
                name_lower = name.lower()
                if not any(tech in name_lower for tech in TECH_KEYWORDS):
                    return name


    # 2. Fallback: Look for candidate lines manually
    for line in top_lines:
        cleaned_line = line.strip()
        # Ignore lines with emails, numbers, or special characters
        if re.search(r"[0-9@+]", cleaned_line):
            continue
        if any(char.islower() for char in cleaned_line):  # must have some lowercase
            words = cleaned_line.split()
            if 1 < len(words) <= 4 and all(w[0].isupper() for w in words if w):
                return cleaned_line
        # Handle full uppercase names like "VANRAJ PARMAR"
        if cleaned_line.isupper() and 1 < len(cleaned_line.split()) <= 4:
            return cleaned_line.title()  # convert to Vanraj Parmar


    return None


def extract_email(text):
    match = re.search(r'[\w\.-]+@[\w\.-]+', text)
    return match.group(0) if match else None


def extract_phone(text):
    match = re.search(r'(\+?\(?\d{1,4}\)?[\s.-]?)?\d{10}', text)
    return match.group(0) if match else None


def extract_skills(text):
    text_lower = text.lower()
    return [skill for skill in SKILLS if skill in text_lower]


def extract_section(text, keywords, max_lines=15):
    lines = text.splitlines()
    for i, line in enumerate(lines):
        for keyword in keywords:
            if keyword.lower() in line.lower():
                extracted_lines = lines[i : i + max_lines]
                # Clean bullets and whitespace
                cleaned = [
                    re.sub(r"^[•\-\–\*•\s]+", "", l).strip()
                    for l in extracted_lines
                    if l.strip() and not re.fullmatch(r"[•\-\–\*•\s]+", l)
                ]
                return "\n".join(cleaned)
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


