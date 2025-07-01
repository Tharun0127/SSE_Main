
# Sri Sai Enterprises - Next.js HVAC Solutions Website

This is a Next.js application for Sri Sai Enterprises, a provider of HVAC solutions. The project features a product catalog, an enquiry system, and a full admin dashboard for content management, all backed by Firebase. It is configured for containerized deployment using Docker and Firebase App Hosting.

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Firebase CLI](https://firebase.google.com/docs/cli#install_the_cli) (`npm install -g firebase-tools`)
- [Docker](https://www.docker.com/products/docker-desktop/) (for local containerized development)

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

## 3. Deployment

This project is configured for **Firebase App Hosting**. You have two main options for deployment.

### Option 1: Automated Deploys with GitHub (Recommended)

This is the best method for continuous deployment. Firebase will automatically build and deploy your application whenever you push code to your GitHub repository.

#### A. Initial Setup

1.  **Push your project to GitHub:**
    If you haven't already, create a new repository on GitHub and push your project code to it.

2.  **Connect Firebase to GitHub:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/) and navigate to your project.
    *   In the **Build** menu, select **App Hosting**.
    *   You should see your backend listed. Click on it to manage it.
    *   Find the option to **Connect to GitHub**.
    *   Follow the on-screen prompts to authorize Firebase to access your GitHub account and select the repository for this project.

3.  **Configure Deployment Settings:**
    *   Set your **live branch** to `main` (or whichever branch you want to deploy from).
    *   Enable **automatic deployments**.

#### B. Committing and Deploying Changes

Once the initial setup is complete, deploying new changes is as simple as committing and pushing your code to the live branch.

1.  **Stage Your Changes:** This command prepares all the modified files for saving.
    ```bash
    git add .
    ```

2.  **Save Your Changes (Commit):** This command saves a snapshot of your files with a descriptive message.
    ```bash
    git commit -m "Your descriptive message about the changes"
    ```

3.  **Push to GitHub:** This command sends your changes to GitHub, which automatically triggers your Firebase deployment.
    ```bash
    git push
    ```

### Option 2: Manual Deploys from the Command Line

You can also deploy your application manually from your local machine using the Firebase CLI.

1.  **Log in to Firebase:**
    If you haven't already, log in to the Firebase CLI:
    ```bash
    firebase login
    ```

2.  **Deploy your application:**
    From your project's root directory, run the deploy command:
    ```bash
    firebase deploy
    ```
    Firebase will use your `apphosting.yaml` and `Dockerfile` to automatically build and deploy your containerized application to App Hosting.

    > **Note on Prompts**: If this is your first time deploying and the Firebase CLI asks for your "public root directory", you can safely enter **`.`** (a single dot) for the root directory. This setting is for static file hosting, but your primary deployment is the container managed by App Hosting, which builds from the project root.

---

## 4. Local Docker Development

This project includes a `Dockerfile` to containerize the application, ensuring a consistent environment. You can use this to test a production-like build on your local machine.

1.  **Build the Docker image:**
    This command builds the container image based on the instructions in the `Dockerfile`.
    ```bash
    docker build -t sri-sai-app .
    ```

2.  **Run the container:**
    This command starts a container from the image you just built.
    ```bash
    docker run -p 3000:3000 sri-sai-app
    ```
    You can then access the application at `http://localhost:3000`.
