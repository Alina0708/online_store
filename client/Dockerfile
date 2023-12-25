# Используем официальный образ Node.js в качестве базы
FROM node:latest as build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы из текущего каталога в контейнер
COPY . .

# Собираем React приложение для продакшена
RUN npm run build

# Строим финальный образ для production с nginx
FROM nginx:stable-alpine

# Копируем собранные файлы React приложения из build-директории в nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Экспонируем порт 80 для внешнего доступа
EXPOSE 80

# Запускаем nginx в режиме демона при запуске контейнера
CMD ["nginx", "-g", "daemon off;"]