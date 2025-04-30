
import { Vegetable } from "../types/vegetable";

export const vegetables: Vegetable[] = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: 30,
    unit: "kg",
    description: "Plump, juicy tomatoes grown without synthetic pesticides or fertilizers. Perfect for salads, sauces, or enjoying raw with a sprinkle of salt.",
    nutritionalInfo: "Rich in vitamin C, potassium, folate, and vitamin K. Contains lycopene, a powerful antioxidant.",
    origin: "Local farms in Maharashtra",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh organic tomatoes"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Sliced tomatoes"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1565680018160-64b74276b678?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Tomato variety assortment"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable"
  },
  {
    id: 2,
    name: "Fresh Spinach",
    price: 25,
    unit: "bunch",
    description: "Crisp, dark green spinach leaves packed with nutrients. A versatile green that can be enjoyed raw in salads or cooked in countless dishes.",
    nutritionalInfo: "Excellent source of iron, vitamin K, vitamin A, vitamin C, folate, and manganese.",
    origin: "Organic farms in Punjab",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh spinach bunch"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Spinach leaves"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "leafy-green"
  },
  {
    id: 3,
    name: "Green Bell Peppers",
    price: 40,
    unit: "kg",
    description: "Crisp and mildly sweet bell peppers. Their hollow, crunchy nature makes them perfect for stuffing, roasting, or enjoying raw in salads.",
    nutritionalInfo: "High in vitamin C, vitamin B6, and folate. Also contains vitamin A and fiber.",
    origin: "Karnataka farms",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1513530176992-0cf39c4cbed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Green bell peppers"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1596371718739-e841b63f5b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Sliced bell peppers"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable"
  },
  {
    id: 4,
    name: "Red Onions",
    price: 35,
    unit: "kg",
    description: "Sweet and mildly pungent red onions with their vibrant purple-red skin. Ideal for salads, grilling, pickling, or caramelizing.",
    nutritionalInfo: "Contains quercetin, a powerful antioxidant. Also provides vitamin C, vitamin B6, and manganese.",
    origin: "Maharashtra farms",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Red onions"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Sliced red onions"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable"
  },
  {
    id: 5,
    name: "Fresh Carrots",
    price: 30,
    unit: "kg",
    description: "Sweet, crunchy carrots that are perfect for snacking, cooking, juicing or grating into salads. Their natural sweetness makes them a favorite.",
    nutritionalInfo: "Exceptional source of beta-carotene, fiber, vitamin K, potassium and antioxidants.",
    origin: "Organic farms in Himachal",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh carrots bunch"
      },
      {
        id: 2, 
        url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Sliced carrots"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "root"
  },
  {
    id: 6,
    name: "Cucumber",
    price: 20,
    unit: "piece",
    description: "Cool and refreshing cucumbers with high water content. Perfect for salads, sandwiches, or making refreshing summer drinks.",
    nutritionalInfo: "Low in calories and high in water content. Contains vitamin K, vitamin C, potassium, and magnesium.",
    origin: "Gujarat farms",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1589621316382-008455b857cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh cucumber"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Sliced cucumber"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable"
  },
  {
    id: 7,
    name: "Organic Cauliflower",
    price: 45,
    unit: "piece",
    description: "Pristine white cauliflower with firm, tightly packed florets. Perfect for roasting, making cauliflower rice, or enjoying in curries.",
    nutritionalInfo: "High in vitamin C, vitamin K, and folate. Also provides vitamin B6, fiber, and choline.",
    origin: "Farms in Kashmir",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh cauliflower"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1510627498534-cf389f9bae4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Cauliflower florets"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable"
  },
  {
    id: 8,
    name: "Baby Potatoes",
    price: 35,
    unit: "kg",
    description: "Small, tender potatoes with delicate skin. Perfect for roasting whole, making potato salads, or as a quick side dish.",
    nutritionalInfo: "Good source of potassium, vitamin C, vitamin B6, and fiber.",
    origin: "Farms in Uttar Pradesh",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Baby potatoes"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1576181256399-834e3b3a49bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Roasted baby potatoes"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "root"
  }
];

export const getVegetableById = (id: number): Vegetable | undefined => {
  return vegetables.find(vegetable => vegetable.id === id);
};
