```bash
`8.`888b           ,8'     8 8888       d888888o.          ,o888888o.        8 888888888o.   
 `8.`888b         ,8'      8 8888     .`8888:' `88.     . 8888     `88.      8 8888    `88.  
  `8.`888b       ,8'       8 8888     8.`8888.   Y8    ,8 8888       `8b     8 8888     `88  
   `8.`888b     ,8'        8 8888     `8.`8888.        88 8888        `8b    8 8888     ,88  
    `8.`888b   ,8'         8 8888      `8.`8888.       88 8888         88    8 8888.   ,88'  
     `8.`888b ,8'          8 8888       `8.`8888.      88 8888         88    8 888888888P'   
      `8.`888b8'           8 8888        `8.`8888.     88 8888        ,8P    8 8888`8b       
       `8.`888'            8 8888    8b   `8.`8888.    `8 8888       ,8P     8 8888 `8b.     
        `8.`8'             8 8888    `8b.  ;8.`8888     ` 8888     ,88'      8 8888   `8b.   
         `8.`              8 8888     `Y8888P ,88P'        `8888888P'        8 8888     `88. 
```

# Visor 🌐

This project is deployed on Vercel. You can find the deployment link [here](https://visor-app.vercel.app).

---

## 📝 Description

Visor is a free and open source website analytics tool that allows you to track the traffic of your website. It is a simple and easy to use tool that allows you to track the traffic of your website. It is a more simple alternative to Google Analytics and other similar products.

---

## 🚀 Features
- 📈 Interactive charts for website visits
- 🌍 Referrer traffic sources
- 💻 Browser and device information
- 🔐 Planned authentication (WIP)
- ⚡ Real-time updates (future feature)

---

## 🤖 Technologies
- React
- Node.js
- Express
- Axios
- Auth0

---

## 📦 Dependencies

| Package | Version |
| --- | --- |
| node | ^24.4.0 |
| pnpm | ^10.20.0 |
| react | ^19.2.0 |
| react-dom | ^19.2.0 |
| react-router-dom | ^7.9.4 |
| express | ^5.1.0 |
| axios | ^1.12.2 |

Other dependencies can be found in the [package.json](package.json) file and in the client's [package.json](client/package.json).

--- 

## 🏗️ Architecture

The architecture of the project is as follows:

```mermaid
├── LICENSE.md
├── README.md
├── client
│   ├── index.html
│   └── src
│       ├── App.jsx
│       ├── components/
│       ├── context/
│       ├── main.jsx
│       └── pages/
├── dist
│   ├── client
│   └── server
├── eslint.config.mjs
├── package.json
├── pnpm-lock.yaml
├── public/
├── src
│   ├── entry-client.jsx
│   ├── entry-server.jsx
│   ├── index.js
│   └── routes
│       └── api.js
├── vercel.json
└── vite.config.js
```
---

## 🚀 Installation

### Clone the repository: 
``` bash
git clone https://github.com/Cat333t/visor.git
cd visor
```

### Install dependencies:
``` bash
pnpm install
pnpm run install --prefix client 
```

### Start the server:

Run both(server and client):
``` bash
pnpm run dev
```

Run the server:
``` bash
pnpm run server
```

Start the client:
``` bash
pnpm run client
```

And then open [http://localhost:4000](http://localhost:4000) in your browser.

### Build the client:
``` bash
pnpm run build
```

---

## 📝 TODO

- [x] Add authentication
- [ ] Add dashboard for statistics
- [ ] Add script tag to track events
- [ ] Connect to database

---

## License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details. 📝
