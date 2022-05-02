## First, run the development server:

```
git clone source
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Environment variables 
To set up your environment variables change `.env.development` to `.env.production`

## Project Structure (Vietnamese)

```
src\
 |--@assets\              # Chứa Ảnh và Ngôn ngữ
 |--@components\          # Các Components tái sử dụng
    |--LoadingSpin\       # Icon Loading (Template)
    |--PrivateRoute\      # Route kiểm tra phân quyền

 |--@constants\           # Các biến constants không đổi

 |--@containers\          # Các Page hoàn chỉnh
 
 |--@helper\              # Các Function dùng chung

 |--@network\             # Giao tiếp API

 |--@styles\   

 |--@types\               # Khai báo interface
```

## Packages

- [Ant design](https://ant.design/)

- [TailWind CSS](https://tailwindcss.com/)

- [Firebase](https://firebase.google.com/docs)
