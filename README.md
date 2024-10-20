This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup Instructions

1. Duplicate the `.env.example` file and rename it to `.env`.
2. Replace the placeholder values with your own MongoDB credentials:
    ```env
    URI=mongodb+srv://<your_username>:<your_password>@onlinemenu.izmf2gn.mongodb.net/?retryWrites=true&w=majority&appName=OnlineMenu
    ```

### Database Setup

1. **Create a MongoDB Cluster**:
   If you don't have a MongoDB cluster, create one by signing up at [MongoDB Atlas](https://www.mongodb.com/atlas/database).

2. **Create a Database and Collections**:
   In your MongoDB cluster, create a database (e.g., `onlineMenu`) and add the following collections:

    - `users`
    - `roles` (optional if you store roles in the `users` collection)

3. **Add Default Roles**:
   In your `users` collection, manually add users with different roles:

    Example for a `MANAGER` user:

    ````json
    {
      "email": "manager@example.com",
      "password": "hashed_password_here",
      "phone": "1234567890",
      "role": "MANAGER"
    }

     Example for a `WAITER` user:
     ```json
    {
    "email": "waiter@example.com",
    "password": "hashed_password_here",
    "phone": "0987654321",
    "role": "WAITER"
    }
    ````

### نکات مهم:

1. **توضیح مراحل اضافه کردن کاربران به دیتابیس**: باید به صورت دستی در دیتابیس کاربرانی با نقش‌های `MANAGER` و `WAITER` اضافه کنید تا دسترسی به صفحات محدود برای آن‌ها امکان‌پذیر باشد.
2. **نقش‌ها (Roles)**: باید توضیح دهید که کاربران جدید به صورت پیش‌فرض با نقش `CUSTOMER` ایجاد می‌شوند و برای مدیریت نقش‌ها باید مستقیماً در دیتابیس تغییرات انجام شود.
3. **ورود به دیتابیس**: باید جای مقادیر `<your_username>` و `<your_password>` را پر کنند تا به دیتابیس خودشان متصل شوند.

این راهنما به کاربر کمک می‌کند تا به راحتی تنظیمات پروژه شما را انجام دهد و بدون نیاز به فایل `.env` اصلی شما، دیتابیس خود را بسازد و پروژه را اجرا کند.

### Setup Customers

1 **Access the Menu as a Customer**: To access the menu, customers must use a specific table ID, which is embedded in the URL. For ease of access, a QR code is provided in the images folder.

http://<your_server_ip>:<your_port>/?table=<table_id>

http://192.168.1.10:3000/?table=04NRWIeYKASOtYJsWSL8nIe3Zc22WjN7rnLcSwvAq8ufMZjYIiKuphLBaVAU

### توضیحات این بخش:

1. **دسترسی به منو از طریق QR Code**: به کاربران توضیح می‌دهد که مشتریان باید از طریق اسکن کد QR به صفحه منو دسترسی پیدا کنند.
2. **فرمت URL**: توضیح می‌دهد که URL برای دسترسی به منو باید شامل `table_id` باشد که برای هر میز منحصر به فرد است.
3. **کد QR**: به کاربر یادآوری می‌شود که کد QR در پوشه `images` قرار دارد و برای دسترسی راحت‌تر به منو طراحی شده است.

این توضیحات کمک می‌کند که کاربران به راحتی بتوانند با پروژه شما کار کنند و متوجه شوند که چگونه مشتریان باید از طریق URL و کد QR به منو دسترسی داشته باشند.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
