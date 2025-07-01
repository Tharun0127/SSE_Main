# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Local Development

To run the application locally, use the following command:

```bash
npm run dev
```

## Docker & Deployment

This project includes a `Dockerfile` to containerize the application, ensuring a consistent environment for development and production.

### Building and Running with Docker Locally

1.  **Build the Docker image:**
    ```bash
    docker build -t sri-sai-app .
    ```

2.  **Run the container:**
    ```bash
    docker run -p 3000:3000 sri-sai-app
    ```
    You can then access the application at `http://localhost:3000`.

### Deploying to Firebase

This project is configured for **Firebase App Hosting**. You do not need to manually build or push the Docker image. Firebase will automatically build the container from your source code and deploy it.

To deploy your application, use the **Deploy** button within your Firebase Studio environment or run the following command using the Firebase CLI:

```bash
firebase deploy
```
