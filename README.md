# Parate Porfavor

Parate Porfavor is a full-stack application designed to make managing a Huawei modem more user-friendly. It allows users to manage various aspects of the modem, such as mac blacklisting, creating parental control templates, adding devices to templates, monitoring modem hardware utilization, and rebooting the modem.

The frontend is built using **React Native (Expo)** and **TypeScript**, while the backend is powered by **Express**.

## Features

- **MAC Blacklist**: Add devices to the blacklist using their MAC address to prevent them from connecting to the modem.
- **Parental Control Templates**: Create custom templates that define network restrictions for specific devices.
- **Device Management**: Add devices to parental control templates to apply restrictions.
- **Hardware Utilization Monitoring**: View real-time data on modem hardware utilization such as CPU, RAM, and bandwidth usage.
- **Reboot Modem**: Trigger a modem reboot from the application.

## Project Setup

### Frontend

The frontend of the project is built using **React Native** with **Expo**. It is written in **TypeScript** for better type safety and code quality.

To set up the frontend:

1. Install the required dependencies:

   ```bash
   npm install
   ```
2. Start the development server:

   ```bash
   npm start
   ```

   This will open Expo in your browser, and you can start the app on your mobile device or emulator by scanning the QR code.

### Backend

The backend is built using **Express** and is responsible for handling requests to the Huawei modem's API endpoints. The backend communicates with the modem to perform actions such as mac blacklisting, managing devices, retrieving hardware utilization, and rebooting the modem.

To set up the backend:

1. Navigate to the `server` directory and install dependencies:

   ```bash
   cd server
   npm install
   ```
2. Start the server:

   ```bash
   npm run dev
   ```

   The backend will be running on `http://localhost:3000` by default.

## .env Files

### Frontend `.env`

The frontend `.env` file contains a single variable for encryption, which is used to securely encrypt data within the app. You should define the `EXPO_PUBLIC_ENCRYPTION_SECRET` as follows:

EXPO_PUBLIC_ENCRYPTION_SECRET="your_super_secret_key"

Make sure to replace `"your_super_secret_key"` with your own secret key to ensure that the encryption process is secure.

### Backend `.env`

The backend `.env` file contains several environment variables to configure the server, including the server port, modem URL, and user-agent string for API requests. Here's an example:

BACKEND_PORT="6000"
ORIGIN_URL_BASE="[http://192.168.1.62:6000,http://192.168.1.82:6000](http://192.168.1.62,http://192.168.1.82,http://192.168.1.93)"
MODEM_URL_BASE="[http://192.168.1.254](http://192.168.1.254)"
IS_DEV="TRUE"
USER_AGENT="Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0"

**Explanation of the variables:**

- **BACKEND_PORT**: The port number the backend server will run on. Default is `6000`, but can be changed to any available port.
- **ORIGIN_URL_BASE**: The base URLs allowed to make requests to the backend. You can list multiple URLs, separated by commas, to allow requests from different origins.
- **MODEM_URL_BASE**: The local IP address of your Huawei modem. This is the address the backend will use to communicate with the modem.
- **IS_DEV**: Set to `"TRUE"` if running in a development environment, and `"FALSE"` for production.
- **USER_AGENT**: The user-agent string used when making requests to the modem. This can be modified to suit different devices or network environments.

### Setting Up the Server and Modem URLs

When the app is first launched, it will prompt you to enter two URLs:

1. **Server URL**: This is the URL where the backend is running. For example: http://192.168.1.62:6000
   This URL will be used by the frontend to communicate with the backend server.
2. **Modem URL**: This is the local IP address of your Huawei modem. For example: http://192.168.1.254
   This URL is used to interact with the modem for tasks like mac blacklist, parental controls, and hardware utilization monitoring.

**Important**:

- If you are at home, you should use the local IP address of your modem (e.g., `http://192.168.1.254`).
- If you need to use the app while **not** at home, you can use a **public IP address** (not recommended as it may change when the modem reboots) or a **public DNS URL** pointing to the modem.
- **Public IP addresses** can be unreliable since they might change after a modem reboot, and exposing the modem directly to the internet can pose security risks.

### Sharing the Server with Other Huawei Router Users

If you want to share the server with other Huawei router users, you can set up the app as follows:

1. **Server URL**: Use the public IP address or a free public DNS (like DuckDNS or No-IP) with port forwarding configured to forward requests to your backend server. For example:

   http://`<your-public-ip>`:6000
2. **Modem URL**: Use the public IP address or a free public DNS (like DuckDNS or No-IP) with port forwarding configured to forward requests to the modem's local IP. For example:
   http://`<your-public-ip-of-modem>`:80

Be aware that using a public IP address for the modem is not ideal, as it may change after the modem reboots, and exposing the modem to the internet can pose security risks.

### Proxy Server for Modem Requests

To mitigate the risk of exposing your modem directly to the internet, a proxy server can be set up. This is particularly useful if you want to share the server with other users who have Huawei routers.

- **Proxy Server**: A script is provided in the `/proxy-server` directory that can be run on an old Android phone. This phone acts as a proxy and forwards requests to the modem. This allows you to keep the modem's IP address local to the home network, while still allowing access from external users via the proxy.

### Proxy Server Setup

1. Download the script from the `/proxy-server` directory.
2. Run the script on an old Android phone.
3. The script will forward requests from the public server URL to the modem’s local IP address.

This allows multiple users to share the server without directly exposing the modem to the internet.

**Note**: While this solution helps mitigate risks, make sure to follow best practices for security when exposing any internal network device (like your modem) to the outside world.

### Reverse Engineering the API

The hardest part of this project was **reverse engineering the API endpoints** of the Huawei modem, as there is no official documentation available. Much of the modem's functionality had to be discovered by trial and error, using network analysis tools to capture requests and responses.

## Development

### Code Structure

#### `/frontend`

*React Native (Expo) app for managing the modem.*

```
/frontend
    /components         # Reusable UI components
    /constants          # Constants used throughout the app
    /functions          # Business logic and helper functions
    /helpers            # Utility functions to assist with various tasks
    /hooks              # Custom React hooks
    /navigation         # Navigation configuration (React Navigation)
    /screens            # Screens in the app (Login, Dashboard, etc.)
    /styles             # Global styles
    /utils              # General utility functions (e.g., API calls)
```

---

#### `/server`

*Express backend responsible for communicating with the modem.*

```
/server
    /src
        /controllers    # Functions handling business logic for the routes
        /routes         # API routes for modem actions
        /session        # Session handling and authentication logic
        /util           # Utility functions for API calls and general server tasks
        index.ts        # Main entry point for the server
```

---

#### `/shared`

*Shared TypeScript types between the frontend and backend.*

```
/shared
    /types              # TypeScript types shared across the project
```

### Explanation:

- **Frontend**:

  - `/components`: Contains reusable UI components used throughout the app.
  - `/constants`: Stores constant values that are used throughout the app.
  - `/functions`: Contains logic and functions used for specific actions or tasks in the app.
  - `/helpers`: Includes utility functions that assist with various tasks like data manipulation.
  - `/hooks`: Custom React hooks used for encapsulating logic and managing state.
  - `/navigation`: Contains the configuration for navigating between different screens (using React Navigation).
  - `/screens`: Defines different screens (e.g., Login, Dashboard, Device Management, etc.).
  - `/styles`: Global styles for the app (e.g., theme, shared styles).
  - `/utils`: General utility functions such as helper methods for making API calls.
- **Server**:

  - `/src/controllers`: Defines controller functions for handling the business logic and processing requests.
  - `/src/routes`: Contains API routes for interacting with the modem (e.g., mac blacklist, device management, etc.).
  - `/src/session`: Handles session management, including authentication and maintaining user sessions.
  - `/src/util`: Includes utility functions for general server tasks, such as managing API requests and responses.
  - `index.ts`: The main entry point for the server that sets up routes, middleware, and starts the Express server.
- **Shared**:

  - `/types`: Contains shared TypeScript types used by both the frontend and backend to ensure consistent data structures across both.

### Technologies Used

- **Frontend**:

  - React Native
  - Expo
  - TypeScript
- **Backend**:

  - Express
  - Nodejs
  - Axios (for HTTP requests to the modem)
- **Tools**:

  - Network analysis tools (for reverse engineering Huawei modem API)

## Challenges

- **Reverse Engineering**: The lack of official API documentation for the Huawei modem meant that most of the work involved reverse engineering the API. This was the most difficult part of the project as I had to use network analysis tools such as Wireshark to figure out how to interact with the modem’s endpoints.
- **Parsing Data**: The modem does not return standard JSON responses. Instead, it embeds important data inside JavaScript variables within HTML documents. Parsing this data into structured, usable JSON for the frontend was extremely challenging and required writing complex extraction logic to reliably isolate and interpret the needed information.
- **Handling Modem Specificities**: The modem’s behavior was not consistent across different endpoints, and there was no formal documentation on error handling, session management, or data formats. I had to build custom logic to manage devices, retrieve hardware utilization stats, apply parental control templates, and send reboot commands, all while accounting for quirks specific to the modem’s internal system.

## Contributing

Contributions are welcome! If you have suggestions, bug fixes, or new features, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Huawei Modem**: Special thanks to the Huawei modem for providing the functionality to control and monitor the network, even without official documentation.
- **Network Analysis Tools**: Used for reverse engineering the API and discovering hidden endpoints.
