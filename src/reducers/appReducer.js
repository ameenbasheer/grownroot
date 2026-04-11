export const APP_ACTIONS = {
  SET_CROPS: 'SET_CROPS',
  ADD_CROP: 'ADD_CROP',
  DELETE_CROP: 'DELETE_CROP',
  SET_PRODUCTS: 'SET_PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  SET_WEATHER: 'SET_WEATHER',
  SET_DISEASE_RESULT: 'SET_DISEASE_RESULT',
  CLEAR_DISEASE_RESULT: 'CLEAR_DISEASE_RESULT',
  SET_USERS: 'SET_USERS',
  DELETE_USER: 'DELETE_USER',
};

export const initialAppState = {
  crops: [
    { id: 1, name: 'Tomatoes', status: 'Active', plantedDate: 'Mar 15', harvestDate: 'June 20', field: 'Field A' },
    { id: 2, name: 'Corn', status: 'Growing', plantedDate: 'Apr 1', harvestDate: 'Aug 10', field: 'Field B' },
    { id: 3, name: 'Lettuce', status: 'Ready', plantedDate: 'Feb 20', harvestDate: 'May 5', field: 'Field C' },
  ],
  products: [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      price: 3.50,
      unit: '/kg',
      description: 'Vine-ripened tomatoes grown without pesticides. Perfect for salads and cooking.',
      freshness: 98,
      location: 'Green Valley',
      farmer: 'Maria Santos',
      image: null,
      organic: true,
      category: 'Vegetables',
    },
    {
      id: 2,
      name: 'Organic Carrots',
      price: 2.80,
      unit: '/kg',
      description: 'Sweet organic carrots freshly harvested. Rich in vitamins and nutrients.',
      freshness: 95,
      location: 'Sunrise Farm',
      farmer: 'John Fields',
      image: null,
      organic: true,
      category: 'Vegetables',
    },
    {
      id: 3,
      name: 'Fresh Lettuce',
      price: 1.99,
      unit: '/head',
      description: 'Crispy green lettuce, harvested this morning. Perfect for fresh salads.',
      freshness: 99,
      location: 'Valley View',
      farmer: 'Sarah Green',
      image: null,
      organic: false,
      category: 'Vegetables',
    },
  ],
  weather: {
    temperature: 28,
    condition: 'Sunny',
    humidity: 65,
    rainfall: 12,
  },
  diseaseResult: null,
  users: [
    { id: 1, name: 'Maria Santos', email: 'maria@farm.com', role: 'farmer', status: 'active' },
    { id: 2, name: 'John Fields', email: 'john@farm.com', role: 'farmer', status: 'active' },
    { id: 3, name: 'Sarah Green', email: 'sarah@farm.com', role: 'farmer', status: 'active' },
    { id: 4, name: 'Ahmed Khan', email: 'ahmed@buyer.com', role: 'buyer', status: 'active' },
    { id: 5, name: 'Lisa Wong', email: 'lisa@buyer.com', role: 'buyer', status: 'inactive' },
  ],
};

export function appReducer(state, action) {
  switch (action.type) {
    case APP_ACTIONS.SET_CROPS:
      return { ...state, crops: action.payload };
    case APP_ACTIONS.ADD_CROP:
      return { ...state, crops: [...state.crops, { ...action.payload, id: Date.now() }] };
    case APP_ACTIONS.DELETE_CROP:
      return { ...state, crops: state.crops.filter(c => c.id !== action.payload) };
    case APP_ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case APP_ACTIONS.ADD_PRODUCT:
      return { ...state, products: [...state.products, { ...action.payload, id: Date.now() }] };
    case APP_ACTIONS.DELETE_PRODUCT:
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };
    case APP_ACTIONS.SET_WEATHER:
      return { ...state, weather: action.payload };
    case APP_ACTIONS.SET_DISEASE_RESULT:
      return { ...state, diseaseResult: action.payload };
    case APP_ACTIONS.CLEAR_DISEASE_RESULT:
      return { ...state, diseaseResult: null };
    case APP_ACTIONS.SET_USERS:
      return { ...state, users: action.payload };
    case APP_ACTIONS.DELETE_USER:
      return { ...state, users: state.users.filter(u => u.id !== action.payload) };
    default:
      return state;
  }
}
