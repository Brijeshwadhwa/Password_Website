🔐 Password Strength Checker
A professional, production-ready static website for analyzing password strength and estimating brute-force attack times. Built entirely with vanilla HTML, CSS, and JavaScript - no frameworks, no backend, no external dependencies.

🌟 Features
Real-time Password Analysis: Instant feedback as you type
Strength Classification: Five-tier strength rating system
Brute-Force Estimation: Calculates attack time based on password complexity
Criteria Checklist: Visual feedback on password requirements
Modern Dark UI: Professional, minimal design with smooth animations
Fully Responsive: Works perfectly on desktop, tablet, and mobile devices
100% Client-Side: All processing happens in your browser - no data transmission
🎯 Strength Classification
The password strength is evaluated based on:

Length: Longer passwords are exponentially more secure
Character Variety: Mix of lowercase, uppercase, numbers, and special characters
Strength Levels
❌ Very Weak: Score < 1.0 - Can be cracked almost instantly
⚠️ Weak: Score 1.0-2.0 - Vulnerable to modern brute-force attacks
✅ Moderate: Score 2.0-3.5 - Basic protection, could be stronger
🔐 Strong: Score 3.5-4.5 - Good protection against brute-force attacks
🛡️ Very Strong: Score ≥ 4.5 - Excellent protection against brute-force attacks
🧮 How Strength is Calculated
Scoring Algorithm
The password receives points based on:

Length Scoring:

4-7 characters: +0.5 points
8-11 characters: +1 point
12-15 characters: +2 points
16+ characters: +3 points
Character Variety Scoring:

1 character type: +0.5 points
2 character types: +1 point
3 character types: +1.5 points
4 character types (lowercase, uppercase, numbers, special): +2 points
The final score determines the strength level.

⏱️ Brute-Force Attack Time Estimation
Formula
The brute-force time is calculated using:

Total Combinations = (Character Set Size) ^ (Password Length)
Estimated Time = Total Combinations / 10,000,000,000 guesses per second
Character Set Sizes
Lowercase letters (a-z): 26 characters
Uppercase letters (A-Z): 26 characters
Numbers (0-9): 10 characters
Special characters: 32 common characters (!@#$%^&*()_+-=[]{}|;:,.<>?)
The character set size is the sum of all character types present in the password.

Assumptions
Attacker Speed: 10 billion guesses per second (modern GPU cluster capability)
Attack Method: Exhaustive brute-force (trying all possible combinations)
No Dictionary: Assumes attacker doesn't use word lists or common patterns
Time Display
The estimated time is displayed in the most appropriate unit:

Seconds (for very weak passwords)
Minutes
Hours
Days
Years
Millennia (for very strong passwords)
🚀 Deployment on GitHub Pages
Method 1: Using GitHub Web Interface
Create a new repository on GitHub (or use an existing one)

Upload files to the repository:

index.html
style.css
script.js
README.md
Enable GitHub Pages:

Go to repository Settings
Scroll to Pages section
Under Source, select Deploy from a branch
Choose main (or master) branch
Select / (root) folder
Click Save
Access your site:

Your site will be available at: https://[username].github.io/[repository-name]
It may take a few minutes to become available
Method 2: Using Git Command Line
# Initialize repository
git init

# Add files
git add index.html style.css script.js README.md

# Commit
git commit -m "Initial commit: Password Strength Checker"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/[username]/[repository-name].git

# Push to GitHub
git branch -M main
git push -u origin main
Then enable GitHub Pages in repository settings as described in Method 1.

Method 3: Using GitHub Desktop
Open GitHub Desktop
Create a new repository or add existing folder
Commit all files
Publish to GitHub
Enable GitHub Pages in repository settings
📁 Project Structure
password-strength-checker/
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # Password analysis logic
└── README.md       # This file
🔒 Security & Privacy
100% Client-Side Processing: All password analysis happens in your browser
No Data Transmission: Passwords are never sent to any server
No Logging: No analytics, no tracking, no data collection
No External Dependencies: No CDN calls, no external APIs
No Storage: Passwords are not stored in cookies, localStorage, or sessionStorage
🛠️ Technologies Used
HTML5: Semantic markup with accessibility features
CSS3: Modern styling with CSS variables, flexbox, and animations
Vanilla JavaScript: No frameworks or libraries - pure ES6+ JavaScript
📱 Browser Compatibility
Chrome/Edge (latest)
Firefox (latest)
Safari (latest)
Opera (latest)
Mobile browsers (iOS Safari, Chrome Mobile)
🎨 Design Features
Dark Theme: Easy on the eyes, modern aesthetic
Gradient Accents: Subtle color gradients for visual appeal
Smooth Animations: Fade-in effects and transitions
Responsive Layout: Adapts to all screen sizes
Accessibility: Keyboard navigation, ARIA labels, focus indicators
📝 Usage
Open index.html in a web browser (or visit the GitHub Pages URL)
Type a password in the input field
View real-time strength analysis:
Strength level and badge
Visual strength bar
Detailed explanations
Brute-force attack time estimate
Criteria checklist
🔍 Example Passwords
Very Weak: password (8 chars, 1 type)
Weak: Password1 (10 chars, 3 types)
Moderate: Password123 (12 chars, 3 types)
Strong: P@ssw0rd123! (13 chars, 4 types)
Very Strong: MyStr0ng!P@ssw0rd#2024 (22 chars, 4 types)
📄 License
This project is open source and available for use in portfolios, educational purposes, and commercial projects.

🤝 Contributing
This is a static project designed to be simple and self-contained. For improvements:

Fork the repository
Make your changes
Test thoroughly
Submit a pull request
⚠️ Important Notes
This tool provides estimates based on mathematical calculations
Real-world attack times may vary based on:
Actual attacker capabilities
Use of dictionary attacks
Password patterns and predictability
Security measures in place (rate limiting, account lockouts)
Always use strong, unique passwords for important accounts
Consider using a password manager for generating and storing passwords
📧 Support
For issues, questions, or suggestions, please open an issue on the GitHub repository.
