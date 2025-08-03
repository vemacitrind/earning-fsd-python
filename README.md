# Full Stack Development & Python Course Materials

This repository contains learning materials, code examples, and notes for Full Stack Development (FSD) and Python-related topics. Organized by unit for clarity and easy access.

---

## 📁 Folder Structure
```
.
├── FSD/ # Full Stack Development (Node.js, JS, etc.)
│ ├── unit-1/
│ ├── unit-2/
│ ├── ...
│ ├── package.json
│ └── package-lock.json
└── PYTHON/ # Python topics including ML, Django, Web Scraping
├── unit-3-regex.ipynb
├── unit-4-5-6-ML.ipynb
├── unit-8-webscraping-socket.ipynb
├── unit-9-10-django/
└── Churn.csv
```
yaml
Copy
Edit

---

## 🧠 Topics Covered

### 🔧 FSD (Node.js / JS)
- Unit 1–10 basics to advanced concepts
- `node_modules/` excluded via `.gitignore`
- Package management with `package.json`

### 🐍 Python
- Regex and string processing
- Machine Learning using `scikit-learn`, `pandas`, `matplotlib`
- Web Scraping using `requests`, `BeautifulSoup`
- Django basics (unit 9–10)

---

## ⚙️ Setup Instructions

```bash
# Install Node.js dependencies
cd FSD
npm install

# Setup Python environment (optional)
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt  # if requirements.txt exists
