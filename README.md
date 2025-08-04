# Order Management Frontend (React.js)

This is the frontend part of the Order Management System. It’s connected to a Spring Boot backend hosted on Render. Users can create, view, and manage orders — and also upload invoices which are saved to AWS S3.

## ✅ Features

- Create order form (Product Name + Price)
- Order list view with dynamic links
- Detailed order page with invoice upload
- Reusable animations + consistent theme
- Fully deployed with Vercel (CI/CD active)

## 🛠 Tech Stack

- React.js (with Hooks + Functional Components)
- CSS + keyframe animations
- Hosted on Vercel

## 🚀 Deployment

The frontend is live here:

🔗 [Frontend Live URL](https://order-management-frontend.vercel.app)

## 📁 Pages

| Path              | Description                |
|-------------------|----------------------------|
| `/`               | List all orders            |
| `/create`         | Create a new order         |
| `/orders/:id`     | View order + upload invoice|

## 🖼 Sample Animations & Styling

I didn't use Tailwind because of setup issues in Bash, so I added my own CSS and animations using `@keyframes` and transitions to make it look more appealing and responsive.

## 🔄 API Communication

Every frontend call goes to the deployed backend on Render. I had to handle CORS errors by updating the backend config to allow frontend origin.

## 💻 How I Built It

- Started with the `OrderList` and `OrderForm` components.
- Connected them with `fetch` to the backend.
- Designed the `OrderDetails` page to support file uploads.
- Fixed issues related to file upload encoding and S3 response.
- Added `useEffect`, `useNavigate`, and `useParams` logic.
- Deployed to Vercel and configured CI/CD (auto deploy on push).

---

