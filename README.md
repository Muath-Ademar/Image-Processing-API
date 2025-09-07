# Image Processing API

**Version:** 1.0.0  

A lightweight **TypeScript**-based REST API built with **Express**, designed specifically for **resizing images** using the **Sharp** library. Users can provide an image name and desired width and height, and the API will return the resized image.  

---

## 🚀 Features

- Resize images to specific width and height  
- Handles single images from a predefined folder  
- Returns resized images as JPG  
- Built with **Express** and **TypeScript**  
- Tested using **Jasmine** and **Supertest**  
- Code quality enforced with **ESLint** and **Prettier**

---

## 🛠️ Technologies Used

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" alt="ESLint" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prettier/prettier-original.svg" alt="Prettier" width="40" height="40"/>
  <img src="https://img.shields.io/badge/Sharp-Image%20Processing-blue" alt="Sharp"/>
  <img src="https://img.shields.io/badge/Jasmine-Testing-purple" alt="Jasmine"/>
  <img src="https://img.shields.io/badge/Supertest-HTTP%20Testing-lightgrey" alt="Supertest"/>
</p>

---

## 📦 Installation

```bash
git clone https://github.com/Muath-Ademar/Image-Processing-API.git
cd Image-Processing-API
npm install
```

---

## 📜 Available Scripts

The following npm scripts are available in this project:

- `npm run build` → Compiles the TypeScript source into JavaScript using `tsc`.  
- `npm run start` → Launches the server with `nodemon`, watching `src/index.ts`.  
- `npm run test` → Builds the project and runs unit/integration tests with Jasmine.  
- `npm run jasmine` → Runs Jasmine tests directly, without rebuilding.  
- `npm run lint` → Runs ESLint on the built `dist/index.js` to check for code quality.  
- `npm run prettier` → Formats all code using Prettier for consistent style.

---

📂 Project Structure
```bash
Copy code
├── src/
│   └── index.ts            # Main server and API route
├── dist/                   # Compiled JavaScript output
├── spec/                   # Jasmine test files
├── processed/              # Resized image outputs
├── .eslintrc.js            # ESLint config
├── .prettierrc             # Prettier config
├── tsconfig.json           # TypeScript config
└── package.json            # Scripts and dependencies
```
---

⚡ Usage Example
```bash
# Example request
curl -X GET "http://localhost:8000/api/images?fileName=example&width=400&height=400" -o output.jpg
```
Notes:

- fileName → name of the image in the input folder (without extension)
- width → desired width (number)
- height → desired height (number)
- If only one of width or height is provided, the missing dimension will match the other (maintaining square aspect)

---

🧪 Testing
```bash
Copy code
npm test        # Build and run Jasmine tests
npm run jasmine # Run tests without rebuilding
```
👤 Author
Muath Ademar
