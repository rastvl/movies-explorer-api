/**
 * Error messagges
 */
const errorMessages = {
  auth: 'Неправильная почта или пароль',
  unauthorized: 'Необходима авторизация',
  forbidden: 'У вас нет прав для совершения данного действия',
  cors: 'CORS error',
  notFoundDB: 'Запрашиваемая запись в базе не найдена',
  notFoundUser: 'Данный пользователь не существует',
  notFountRoute: 'Несуществующий адрес',
  badRequestNewUser: 'Переданы некорректные данные при создании пользователя',
  conflict: 'Неверные данные',
  conflictEmail: 'Данный email уже зарегистрирован',
  server: 'Ошибка сервера',
};

const messagges = {
  deleteMovie: 'Ваш фильм удалён',
};

module.exports = {
  errorMessages,
  messagges,
};
