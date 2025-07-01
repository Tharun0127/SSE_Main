# Sri Sai Enterprises - Next.js HVAC Solutions Website

This is a Next.js application for Sri Sai Enterprises, a provider of HVAC solutions. The project features a product catalog, an enquiry system, and a full admin dashboard for content management, all backed by Firebase.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Firebase CLI](https://firebase.google.com/docs/cli#install_the_cli) (`npm install -g firebase-tools`)

---

## 1. Firebase Project Setup

This application requires a Firebase project to function. If you haven't already, follow these steps.

### A. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and follow the on-screen instructions to create a new project.

### B. Set Up Firebase Services

You need to enable **Firestore** (for the database) and **Storage** (for image uploads).

1.  **Firestore Database**:
    *   In the Firebase Console, go to **Build > Firestore Database**.
    *   Click **Create database**.
    *   Start in **production mode**.
    *   Choose a location for your database (e.g., `us-central`).

2.  **Storage**:
    *   Go to **Build > Storage**.
    *   Click **Get started**.
    *   Follow the prompts to set up your storage bucket.

### C. Get Firebase Configuration

1. In your Firebase project, go to **Project Overview** and click the **Web** icon (`</>`) to add a web app to your project.
2. Give your app a nickname and click **Register app**.
3. You will see a `firebaseConfig` object. Copy this object.
4. Open the file `src/lib/firebase.ts` in your local code editor and replace the existing `firebaseConfig` object with the one you just copied.

### D. Configure Security Rules (Crucial Step!)

By default, your database and storage are locked down. You **must** update the security rules to allow your app to work.

1.  **Firestore Rules**:
    *   Go to **Build > Firestore Database > Rules**.
    *   Replace the contents with the following and click **Publish**:
    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // Allow public read and write access for development
        // TODO: Secure these rules for production
        match /{document=**} {
          allow read, write: if true;
        }
      }
    }
    ```

2.  **Storage Rules**:
    *   Go to **Build > Storage > Rules**.
    *   Replace the contents with the following and click **Publish**:
    ```
    rules_version = '2';
    service firebase.storage {
      match /b/{bucket}/o {
        // Allow public read and write access for development
        // TODO: Secure these rules for production
        match /{allPaths=**} {
          allow read, write: if true;
        }
      }
    }
    ```
> **Note**: These rules are permissive and intended for development. Before launching your site publicly, you should implement more secure rules.

---

## 2. Local Development

Follow these steps to run the application on your local machine.

### A. Clone & Install Dependencies

1.  Clone the repository from GitHub:
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  Install the necessary npm packages:
    ```bash
    npm install
    ```

### B. Set Up Environment Variables

This project uses Resend for sending emails.
1. Sign up for a free account at [Resend.com](https://resend.com).
2. Create an API key.
3. In your project's root directory, create a new file named `.env.local`.
4. Add your Resend API key to it:
   ```
   RESEND_API_KEY=your_api_key_here
   ```

### C. Run the Application

Start the Next.js development server:
```bash
npm run dev
```
Your application should now be running at `http://localhost:9002`.

---

## 3. Docker Development

This project includes a `Dockerfile` to containerize the application, ensuring a consistent environment.

1.  **Build the Docker image:**
    ```bash
    docker build -t sri-sai-app .
    ```

2.  **Run the container:**
    ```bash
    docker run -p 3000:3000 sri-sai-app
    ```
    You can then access the application at `http://localhost:3000`.

---

## 4. Deployment to Firebase

This project is configured for **Firebase App Hosting**. You do not need to manually build or push the Docker image. Firebase will automatically build the container from your source code and deploy it.

1.  **Log in to Firebase:**
    If you haven't already, log in to the Firebase CLI:
    ```bash
    firebase login
    ```

2.  **Deploy your application:**
    Run the following command from your project's root directory:
    ```bash
    firebase deploy
    ```

Firebase will provide you with a URL where your live application is hosted.
