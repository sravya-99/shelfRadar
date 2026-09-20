# shelfRadar
First Commit Hackathon project using AWS Console for WeMakeDevs
# ShelfRadar

ShelfRadar is a real‑time AI‑powered marketplace assistant built with **AWS Lightsail** and **Amazon SageMaker**.  
It connects **customers** and **retailers** instantly through WebSockets, while SageMaker categorizes item requests so only relevant retailers are notified.

---

##  Overview
- **Customers** broadcast what they need (e.g., “9V battery”).
- **SageMaker AI** classifies the item into categories (Electronics, Groceries, etc.).
- **Retailers** registered for those categories receive live pings.
- **WebSockets** ensure instant communication.
- **Login Portal** lets users choose their role (Customer or Retailer).
- **Frontend** styled with Tailwind CSS: light‑blue theme + clean fonts.

---

## 🖥️ Features
- 🔑 **Login Portal** → enter name, choose role.
- 👤 **Customer Portal** → broadcast item requests, view retailer responses.
- 🛒 **Retailer Portal** → register category, receive pings in real time.
- 🤖 **AI Categorization** → powered by Amazon SageMaker.
- 🌐 **Backend Hosting** → Node.js WebSocket server on AWS Lightsail.
- 🎨 **Frontend Styling** → React + Tailwind CSS, light‑blue theme, modern fonts.

---

## ⚙️ Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, WebSocket (`ws` library)
- **AI**: Amazon SageMaker Runtime
- **Hosting**: AWS Lightsail
- **Version Control**: GitHub

---
