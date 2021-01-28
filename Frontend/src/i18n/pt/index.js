 export default {
  // Login
  loginPage: {
    title: "Bem-Vindo!",
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
    passwordFail: "Palavras-passe diferentes",
    required: "Password é obrigatória",
    registerAccount: "Criar Conta",

    alreadyHasAccount: "Já possui uma conta?",
    login: "Iniciar Sessão"
  },

  // Homepage
  homePage: {
    greeting: "Olá",
    morePopular: "Mais Populares",

    categories: "Categorias",
    seeAll: "Ver Todas",
    recommended: "Recomendações"

  },

  // Favorites
  favoritesPage: {
    title: "Favoritos",
    description: "Lista de Estabelecimentos Favoritos",
    noFavorites: "Sem Favoritos. Começe a Adicionar..."
  },

  // List Categories
  categoriesPage: {
    title: "Categorias",
    results: "Sem Resultados | 1 Resultado | {count} Resultados"
  },

  storesPage: {
    error: "Não foi possível encontrar estabelecimentos da categoria escolhida."
  },

  resultsPage: {
    error: "Não foi possível encontrar estabelecimentos."
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
    language: "Idioma",
    changePassword: "Alterar Password",
    signout: "Terminar Sessão",
    cancel: "Cancelar",
    save: "Salvar",
    passwordTest: "Passwords Diferentes",
    oldPassword: "Password Anterior",
    newPassword: "Nova Password"
  },

  // Reservations
  // Edit Reservation
  // Add Review Reservation
  bookingsPage: {
    title: "Reservas",
    description: "Lista de Reservas Recentes e Anteriores",
    type1: "Recentes",
    type2: "Conluídas",
    catalog: "Reserva Comum",
    emptyType1: "Sem Reservas Recentes",
    emptyType2: "Sem Reservas Concluídas",

    newBooking: {
      title: "Nova Reserva",
      dataNew: "Dados Reserva",
      dataConf: "Confirme os Dados Reserva",
      serviceType: "Tipo de Serviço",
      listService: "Lista dos Serviços",
      noServices: "Este Estabelecimento não dispõe de Catálogo de Serviços.",
      chooseService: "Selecione o(s) seu(s) Serviço(s)",
      numberServices: "Serviços Selecionados",
      dateAndTime: "Data e Hora",
      chooseDataAndTime: "Selecione a Hora e Data",
      listSlots: "Lista das Vagas",
      noSlots: "Este Estabelecimento não tem vagas disponíveis.",
      date: "Data",
      time: "Hora",
      place: "Lugar Planta",
      choosePlace: "Escolher Lugar",
      makeNew: "Fazer Reserva Agora",
      back: "Voltar Página Estabelecimento"
    },
    ratePopup: {
      title: "Avaliar Reserva",
      comment: "Comentário",
      submit: "Submeter"
    },

    editPopup: {
      title: "Alterar Reserva",
      serviceType: "Alterar Tipo de Serviço",
      dateAndTime: "Alterar Data e Hora",

      changeBooking: "Alterar",
      cancelBooking: "Cancelar"
    }
  },

   // Booking page
   // Confirm the booking made before
   bookingPage: {
     bookingDetails: "Detalhes da marcação",
     confirmBooking: "Confirmação da marcação"
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
    noCatalog: "O Estabelecimento não tem associado qualquer tipo de Catálogo de Serviços.",

    ratings: "Avaliações",
    seeAllRatings: "Ver Todas",
    allRating: "Todas Avaliações",
    stars: "0 Estrelas | 1 Estrela | {count} Estrelas",
    basedOn: "Baseado em 1 Avaliação | Baseado em {count} Avaliações",
    book: "Reserve já!",
    date: "Escolha a sua data",
    dateSub: "A sua data para a marcação"
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
