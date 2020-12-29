 export default {
  // Login
  loginPage: {
    title: "Bem Vindo!",
    description: "Inicie Sessão para ver todas as suas Reservas",

    username: "Username/E-mail",
    password: "Password",
    login: "Iniciar Sessão",

    noAccount: "Ainda não possui uma Conta?",
    createAccount: "Criar Conta",
    loginSucceded: "Login bem sucedido"
  },

  // Register
  registerPage: {
    title: "Vamos Começar!",
    description: "Cria uma conta AGORA para ter acesso a <b>Todas as Vantagens</b>",

    fullName: "Nome Completo",
    username: "Username",
    email: "E-mail",
    address: "Morada",
    city: "Cidade",
    postalCode: "Cód. Postal",
    password: "Password",
    confirmPassword: "Confirmar Password",

    registerAccount: "Criar Conta",

    alreadyHasAccount: "Já possui uma conta?",
    login: "Iniciar Sessão"
  },

  // Homepage
  homePage: {
    greeting: "Olá, {name}!",
    morePopular: "Mais Populares",

    categories: "Categorias",
    seeAll: "Ver Todas",
    recommended: "Recomendações"

  },

  // Favorites
  favoitesPage: {
    title: "Favoritos",
    description: "Lista de Estabelecimentos Favoritos"
  },

  // List Categories
  categoriesPage: {
    title: "Categorias",
    results: "Sem Resultados | 1 Resultado | {count} Resultados"
  },

  // Notifications
  notificationsPage: {
    title: "Notificações"
  },

  // Profile Data
  profilePage: {
    personalDetails: "Detalhes Pessoais",
    editData: "Editar Dados",
    security: "Segurança",
    changePassword: "Alterar Password",
    signout: "Terminar Sessão"
  },

  // Reservations
  // Edit Reservation
  // Add Review Reservation
  bookingsPage: {
    title: "Reservas",
    description: "Lista de Reservas Recentes e Anteriores",

    newBooking: {
      title: "Nova Reserva",
      serviceType: "Tipo de Serviço",
      dateAndTime: "Data e Hora",
      date: "Data",
      time: "Hora",
      place: "Lugar Planta",
      choosePlace: "Escolher Lugar"
    },
    ratePopup: {
      title: "Avaliar Reserva",
      comment: "Comentário",
      submit: "Submeter Avaliação"
    },

    editPopup: {
      title: "Alterar/Cancelar Reserva",
      serviceType: "Tipo de Serviço",
      dateAndTime: "Data e Hora",

      changeBooking: "Alterar Reserva",
      cancelBooking: "Cancelar Reserva"
    }
  },

  // View Reservation / Confirm Booking
  confirmBooking: {
    title: "Confirmação de Reserva",
    details: "Detalhes da Reserva",
    serviceType: "Tipo de Serviço",
    time: "Hora",
    date: "Data",
    utilInfo: "Informações Úteis"
  },

  // Establishment Information
  storePage: {
    reservations: "0 Reservas | 1 Reserva | {count} Reservas",
    photos: "Fotos",
    description: "Descrição",
    readMore: "Ler Mais",

    utilInfo: "Informações Úteis",
    servicesCatalog: "Catálogo de Serviços",
    seeAll: "Ver Todos",

    ratings: "Avaliações",
    seeAllRatings: "Ver Todas",
    stars: "0 Estrelas | 1 Estrela | {count} Estrelas",
    basedOn: "Baseado em 1 Avaliação | Baseado em {count} Avaliações"
  },

  // Search Results
  searchResultsPage: {
    title: "Resultados",
    description: 'A Mostrar {count} Resultados para "{query}"',
  },

  settingsPage: {
    language: "Idioma"
  },

  languages: {
    english: "Inglês",
    portuguese: "Português",
    french: "Francês"
  },

  commonButtons: {
    moreIcons: "Restantes Ícones",
    search: "Pesquisar...",
    cancel: "Cancelar",
    submit: "Submeter",
    close: "Fechar",
    save: "Guardar"
  }
}
