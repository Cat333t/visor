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
| npm | ^11.5.2 |
| react | ^19.2.0 |
| react-dom | ^19.2.0 |
| react-router-dom | ^7.9.4 |
| express | ^5.1.0 |
| axios | ^1.12.2 |

Other dependencies can be found in the [package.json](package.json) file and in the client's [package.json](client/package.json).

--- 

## 🚀 Installation

### Clone the repository: 
``` bash
git clone https://github.com/Cat333t/visor.git
cd visor
```

### Install dependencies:
``` bash
npm install
npm run install --prefix client 
```

### Start the server:

Run both(server and client):
``` bash
npm run dev
```

Run the server:
``` bash
npm run server
```

Start the client:
``` bash
npm run client
```

And then open [http://localhost:4000](http://localhost:4000) in your browser.

### Build the client:
``` bash
npm run build
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
