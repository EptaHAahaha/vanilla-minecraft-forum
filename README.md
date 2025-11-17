# Vanilla Minecraft Forum

Welcome to the Vanilla Minecraft Forum project! This forum is designed for players to ask questions, share knowledge, and engage with the community around Vanilla Minecraft.

## Project Structure

```
vanilla-minecraft-forum
├── public
│   ├── index.html        # Main entry point for the web application
│   ├── FAQ.html         # FAQ section providing answers to common questions
│   └── robots.txt       # Controls how search engines index the site
├── src
│   ├── js
│   │   ├── app.js       # Main JavaScript file for application functionality
│   │   ├── admin.js     # JavaScript functions for admin functionalities
│   │   └── storage.js   # Handles local storage interactions
│   ├── css
│   │   └── styles.css    # CSS styles for the application
│   └── libs
│       └── helpers.js    # Utility functions for various tasks
├── data
│   └── sample-questions.json # Sample questions in JSON format
├── package.json          # npm configuration file
├── .gitignore            # Specifies files to be ignored by Git
└── README.md             # Documentation for the project
```

## Features

- **User Questions**: Users can submit questions related to Vanilla Minecraft.
- **Admin Panel**: Admins can log in to manage questions and answers.
- **Local Storage**: Questions and answers are stored in the browser's local storage for persistence.
- **Responsive Design**: The forum is designed to be user-friendly on both desktop and mobile devices.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd vanilla-minecraft-forum
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Open `public/index.html` in your web browser to view the forum.

## Usage

- Users can ask questions by filling out the form on the main page.
- Admins can log in using the provided credentials to manage the forum.
- The FAQ section provides answers to common questions and issues.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.