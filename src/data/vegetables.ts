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
    category: "vegetable",
    type: "vegetable"
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
    category: "leafy-green",
    type: "vegetable"
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
    category: "vegetable",
    type: "vegetable"
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
    category: "vegetable",
    type: "vegetable"
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
    category: "root",
    type: "vegetable"
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
    category: "vegetable",
    type: "vegetable"
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
    category: "vegetable",
    type: "vegetable"
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
    category: "root",
    type: "vegetable"
  },
  {
    id: 9,
    name: "Broccoli",
    price: 55,
    unit: "kg",
    description: "Fresh green broccoli florets with tight buds and firm stalks. Perfect for stir-fries, steaming, or roasting.",
    nutritionalInfo: "Rich in vitamin C, vitamin K, fiber, and antioxidants.",
    origin: "Farms in Himachal Pradesh",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh broccoli"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 10,
    name: "Eggplant",
    price: 40,
    unit: "kg",
    description: "Glossy purple eggplants with firm flesh. Perfect for grilling, roasting, or using in curries and dips.",
    nutritionalInfo: "Good source of fiber, potassium, and antioxidants.",
    origin: "Local farms in Karnataka",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1613884823272-63004a547ab8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh eggplant"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 11,
    name: "Green Beans",
    price: 30,
    unit: "kg",
    description: "Crisp, slender green beans. Perfect for stir-fries, salads, or as a side dish.",
    nutritionalInfo: "Good source of vitamin C, vitamin K, and fiber.",
    origin: "Farms in Maharashtra",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh green beans"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 12,
    name: "Sweet Corn",
    price: 15,
    unit: "piece",
    description: "Golden sweet corn with plump kernels. Perfect for grilling, boiling, or adding to salads.",
    nutritionalInfo: "Good source of fiber, vitamin B, and antioxidants.",
    origin: "Farms in Punjab",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh sweet corn"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 13,
    name: "Organic Kale",
    price: 60,
    unit: "bunch",
    description: "Dark, leafy kale with curly edges. Perfect for salads, smoothies, or sautéing.",
    nutritionalInfo: "Rich in vitamins A, K, C, and antioxidants.",
    origin: "Organic farms in Kashmir",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1515472071456-1b5e29371602?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh kale"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "leafy-green",
    type: "vegetable"
  },
  {
    id: 14,
    name: "Garlic",
    price: 80,
    unit: "kg",
    description: "Aromatic garlic bulbs with firm cloves. Essential for flavoring countless dishes.",
    nutritionalInfo: "Contains allicin and other beneficial compounds.",
    origin: "Farms in Madhya Pradesh",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1615475874519-e4d4dba2533f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh garlic"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "root",
    type: "vegetable"
  },
  {
    id: 15,
    name: "Ginger",
    price: 90,
    unit: "kg",
    description: "Fresh ginger with spicy, aromatic flesh. Essential for teas, curries, and many other dishes.",
    nutritionalInfo: "Contains gingerol, which has powerful medicinal properties.",
    origin: "Farms in Kerala",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1603431777007-45a29c0e0c2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh ginger"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "root",
    type: "vegetable"
  },
  {
    id: 16,
    name: "Cabbage",
    price: 35,
    unit: "piece",
    description: "Crisp, tightly packed cabbage heads. Perfect for slaws, stir-fries, or fermenting.",
    nutritionalInfo: "Good source of vitamin C, vitamin K, and fiber.",
    origin: "Farms in Himachal Pradesh",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1551904122-94415b5bcd8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh cabbage"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 17,
    name: "Organic Zucchini",
    price: 45,
    unit: "kg",
    description: "Tender green zucchini with mild flavor. Perfect for grilling, sautéing, or spiralizing.",
    nutritionalInfo: "Low in calories and high in water content. Good source of vitamin A and potassium.",
    origin: "Organic farms in Maharashtra",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1583687355032-89b902b7335f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh zucchini"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 18,
    name: "Radish",
    price: 25,
    unit: "bunch",
    description: "Crunchy red radishes with peppery flavor. Perfect for salads, pickling, or roasting.",
    nutritionalInfo: "Good source of vitamin C and fiber.",
    origin: "Farms in Punjab",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh radishes"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "root",
    type: "vegetable"
  },
  {
    id: 19,
    name: "Beetroot",
    price: 40,
    unit: "kg",
    description: "Deep purple beetroots with sweet, earthy flavor. Perfect for roasting, juicing, or adding to salads.",
    nutritionalInfo: "Rich in folate, manganese, and nitrates.",
    origin: "Farms in Uttar Pradesh",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1593105522058-b4b084467f35?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh beetroot"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "root",
    type: "vegetable"
  },
  {
    id: 20,
    name: "Coriander",
    price: 15,
    unit: "bunch",
    description: "Fresh, aromatic coriander leaves. Perfect for garnishing curries, salads, and soups.",
    nutritionalInfo: "Contains antioxidants and essential oils.",
    origin: "Local farms in Gujarat",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1600507454442-3b811dd39384?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh coriander"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "leafy-green",
    type: "vegetable"
  },
  {
    id: 21,
    name: "Organic Mint",
    price: 20,
    unit: "bunch",
    description: "Fresh, aromatic mint leaves with cooling flavor. Perfect for teas, cocktails, and garnishing.",
    nutritionalInfo: "Contains menthol and antioxidants.",
    origin: "Organic farms in Punjab",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1628699265231-97b2a3e7b9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh mint"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "leafy-green",
    type: "vegetable"
  },
  {
    id: 22,
    name: "Red Bell Peppers",
    price: 60,
    unit: "kg",
    description: "Sweet, crunchy red bell peppers. Perfect for roasting, stuffing, or enjoying raw in salads.",
    nutritionalInfo: "Rich in vitamin C, vitamin A, and antioxidants.",
    origin: "Farms in Karnataka",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Red bell peppers"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 23,
    name: "Yellow Bell Peppers",
    price: 65,
    unit: "kg",
    description: "Sweet, vibrant yellow bell peppers. Perfect for adding color and flavor to dishes.",
    nutritionalInfo: "Rich in vitamin C and antioxidants.",
    origin: "Farms in Maharashtra",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1563565375-707594595016?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Yellow bell peppers"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 24,
    name: "Sweet Potatoes",
    price: 50,
    unit: "kg",
    description: "Orange-fleshed sweet potatoes with sweet flavor. Perfect for roasting, mashing, or making fries.",
    nutritionalInfo: "Rich in beta-carotene, vitamin A, and fiber.",
    origin: "Farms in Tamil Nadu",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1596097557993-54e1bbd3d253?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Sweet potatoes"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "root",
    type: "vegetable"
  },
  {
    id: 25,
    name: "Organic Lettuce",
    price: 35,
    unit: "head",
    description: "Crisp, fresh lettuce leaves. Perfect for salads, sandwiches, and wraps.",
    nutritionalInfo: "Low in calories and high in water content. Contains vitamin A and K.",
    origin: "Organic farms in Himachal Pradesh",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1621664280979-97d81abdbd8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh lettuce"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "leafy-green",
    type: "vegetable"
  },
  {
    id: 26,
    name: "Celery",
    price: 30,
    unit: "bunch",
    description: "Crisp celery stalks with mild flavor. Perfect for soups, stir-fries, or enjoying raw.",
    nutritionalInfo: "Low in calories and high in fiber. Contains vitamin K and antioxidants.",
    origin: "Farms in Maharashtra",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1601089104927-48155f9c9961?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh celery"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 27,
    name: "Pumpkin",
    price: 45,
    unit: "piece",
    description: "Sweet, orange-fleshed pumpkin. Perfect for soups, curries, or roasting.",
    nutritionalInfo: "Rich in vitamin A, vitamin C, and fiber.",
    origin: "Farms in Madhya Pradesh",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh pumpkin"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 28,
    name: "Brussels Sprouts",
    price: 70,
    unit: "kg",
    description: "Small, cabbage-like Brussels sprouts. Perfect for roasting, sautéing, or steaming.",
    nutritionalInfo: "Rich in vitamin K, vitamin C, and fiber.",
    origin: "Imported",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1508607345401-7bdde7ae1696?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh Brussels sprouts"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 29,
    name: "Organic Asparagus",
    price: 120,
    unit: "bunch",
    description: "Tender, young asparagus spears. Perfect for grilling, roasting, or sautéing.",
    nutritionalInfo: "Good source of vitamin K, folate, and antioxidants.",
    origin: "Organic imported",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1605869063225-eaa25db4981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh asparagus"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 30,
    name: "Leeks",
    price: 45,
    unit: "bunch",
    description: "Mild-flavored leeks with white and light green parts. Perfect for soups, stews, and sautés.",
    nutritionalInfo: "Good source of vitamin K, manganese, and antioxidants.",
    origin: "Farms in North India",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1616661316529-0c46ba529036?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh leeks"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 31,
    name: "Turnips",
    price: 35,
    unit: "kg",
    description: "White and purple turnips with mild flavor. Perfect for roasting, mashing, or adding to stews.",
    nutritionalInfo: "Good source of vitamin C, fiber, and antioxidants.",
    origin: "Farms in Punjab",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1592394533824-9440e5d68513?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh turnips"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "root",
    type: "vegetable"
  },
  {
    id: 32,
    name: "Organic Okra",
    price: 55,
    unit: "kg",
    description: "Fresh green okra pods. Perfect for stir-fries, stews, or frying.",
    nutritionalInfo: "Good source of vitamin C, folate, and fiber.",
    origin: "Organic farms in Gujarat",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1658757889477-11691e0de768?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh okra"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 33,
    name: "Green Chilies",
    price: 20,
    unit: "100g",
    description: "Spicy green chilies. Perfect for adding heat to curries and other dishes.",
    nutritionalInfo: "Rich in capsaicin and vitamin C.",
    origin: "Local farms in Andhra Pradesh",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1589485257252-3dee8500166e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Green chilies"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 34,
    name: "Organic Arugula",
    price: 60,
    unit: "bunch",
    description: "Peppery arugula leaves. Perfect for salads, sandwiches, or as a pizza topping.",
    nutritionalInfo: "Rich in vitamin K, calcium, and antioxidants.",
    origin: "Organic farms in Maharashtra",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh arugula"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "leafy-green",
    type: "vegetable"
  },
  {
    id: 35,
    name: "Fenugreek Leaves",
    price: 25,
    unit: "bunch",
    description: "Aromatic fenugreek leaves. Perfect for curries, dals, and paratha.",
    nutritionalInfo: "Rich in iron, vitamin K, and antioxidants.",
    origin: "Local farms in Rajasthan",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1631805058005-5393079f03d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh fenugreek leaves"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "leafy-green",
    type: "vegetable"
  },
  {
    id: 36,
    name: "Bitter Gourd",
    price: 40,
    unit: "kg",
    description: "Bumpy, green bitter gourds. Popular in Asian cuisine and known for its unique bitter flavor.",
    nutritionalInfo: "Low in calories and rich in vitamin C, vitamin A, and antioxidants.",
    origin: "Farms in Kerala",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1586094577158-bbe99e0642df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh bitter gourd"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 37,
    name: "Ridge Gourd",
    price: 35,
    unit: "kg",
    description: "Long, ribbed ridge gourds. Perfect for curries, stir-fries, or chutneys.",
    nutritionalInfo: "Low in calories and high in dietary fiber.",
    origin: "Farms in Tamil Nadu",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh ridge gourd"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 38,
    name: "Snake Gourd",
    price: 40,
    unit: "kg",
    description: "Long, snake-like gourds. Perfect for curries and stir-fries.",
    nutritionalInfo: "Low in calories and rich in vitamin A, vitamin B, and vitamin C.",
    origin: "Farms in Karnataka",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1629385697093-57be2cc97fa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh snake gourd"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 39,
    name: "Bottle Gourd",
    price: 30,
    unit: "piece",
    description: "Light green bottle gourds. Perfect for curries, soups, and stir-fries.",
    nutritionalInfo: "Low in calories and high in vitamin C, vitamin K, and minerals.",
    origin: "Local farms in Uttar Pradesh",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1596097557993-54e1bbd3d253?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh bottle gourd"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 40,
    name: "Organic Drumstick",
    price: 50,
    unit: "bunch",
    description: "Long, slender drumsticks. Perfect for sambar, curries, and stir-fries.",
    nutritionalInfo: "Rich in vitamin C, potassium, and antioxidants.",
    origin: "Organic farms in Kerala",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1622371504358-e0a3a9e6d02d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh drumstick"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 41,
    name: "Curry Leaves",
    price: 10,
    unit: "bunch",
    description: "Aromatic curry leaves. Essential for South Indian cuisine.",
    nutritionalInfo: "Contains alkaloids, glycosides, and essential oils.",
    origin: "Farms in Tamil Nadu",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1599546820583-8cf7ab4ecec9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh curry leaves"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "leafy-green",
    type: "vegetable"
  },
  {
    id: 42,
    name: "Organic Taro Root",
    price: 60,
    unit: "kg",
    description: "Starchy taro roots. Perfect for curries, frying, or boiling.",
    nutritionalInfo: "Rich in fiber, vitamin E, vitamin C, and potassium.",
    origin: "Organic farms in West Bengal",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1599546820583-8cf7ab4ecec9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh taro root"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "root",
    type: "vegetable"
  },
  {
    id: 43,
    name: "Yam",
    price: 70,
    unit: "kg",
    description: "Starchy yams with firm texture. Perfect for roasting, boiling, or mashing.",
    nutritionalInfo: "Good source of vitamin C, vitamin B6, potassium, and manganese.",
    origin: "Farms in Kerala",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1598030304671-5aa1d6f13fdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh yam"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "root",
    type: "vegetable"
  },
  {
    id: 44,
    name: "Organic Turmeric",
    price: 90,
    unit: "kg",
    description: "Fresh turmeric roots with bright orange flesh. Known for its anti-inflammatory properties.",
    nutritionalInfo: "Contains curcumin, a powerful antioxidant and anti-inflammatory compound.",
    origin: "Organic farms in Tamil Nadu",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1615485500704-8e990f9027f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh turmeric"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "root",
    type: "vegetable"
  },
  {
    id: 45,
    name: "Lotus Root",
    price: 80,
    unit: "kg",
    description: "Cylindrical lotus roots with hollow channels. Popular in Asian cuisine.",
    nutritionalInfo: "Rich in fiber, vitamin C, potassium, and copper.",
    origin: "Farms in Assam",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh lotus root"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "root",
    type: "vegetable"
  },
  {
    id: 46,
    name: "Water Chestnuts",
    price: 90,
    unit: "kg",
    description: "Crunchy water chestnuts. Perfect for stir-fries and salads.",
    nutritionalInfo: "Low in calories and fat. Contains vitamin B6, potassium, and manganese.",
    origin: "Imported",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1604394330716-abce1e17fa3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh water chestnuts"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "root",
    type: "vegetable"
  },
  {
    id: 47,
    name: "Organic Spring Onions",
    price: 25,
    unit: "bunch",
    description: "Fresh spring onions with green tops and white bulbs. Perfect for garnishes, salads, and stir-fries.",
    nutritionalInfo: "Good source of vitamin K, vitamin C, and folate.",
    origin: "Organic farms in Maharashtra",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1580294672675-06fe04c3631e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh spring onions"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 48,
    name: "Red Cabbage",
    price: 50,
    unit: "piece",
    description: "Purple-red cabbage with firm heads. Perfect for slaws, salads, and stir-fries.",
    nutritionalInfo: "Rich in vitamin C, vitamin K, and antioxidants.",
    origin: "Farms in Himachal Pradesh",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1598030320080-2f274372ae8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh red cabbage"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  {
    id: 49,
    name: "Bok Choy",
    price: 55,
    unit: "kg",
    description: "Tender bok choy with white stalks and green leaves. Perfect for stir-fries and soups.",
    nutritionalInfo: "Rich in vitamin A, vitamin C, and calcium.",
    origin: "Farms in North East India",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1594282486552-05a3f2f14ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh bok choy"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "leafy-green",
    type: "vegetable"
  },
  {
    id: 50,
    name: "Organic Mushrooms",
    price: 85,
    unit: "250g",
    description: "Fresh button mushrooms with firm texture. Perfect for sautéing, grilling, or stuffing.",
    nutritionalInfo: "Low in calories and high in vitamin D, selenium, and potassium.",
    origin: "Organic farms in Maharashtra",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1602529317895-73120555fdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh mushrooms"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "vegetable",
    type: "vegetable"
  },
  
  {
    id: 101,
    name: "Organic Apples",
    price: 80,
    unit: "kg",
    description: "Crisp, sweet apples with firm flesh. Perfect for eating fresh, baking, or juicing.",
    nutritionalInfo: "Rich in fiber, vitamin C, and antioxidants.",
    origin: "Organic farms in Himachal Pradesh",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh apples"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "fruit",
    type: "fruit"
  },
  {
    id: 102,
    name: "Bananas",
    price: 60,
    unit: "dozen",
    description: "Sweet, energy-rich bananas. Perfect for snacking, smoothies, or baking.",
    nutritionalInfo: "Good source of potassium, vitamin B6, and fiber.",
    origin: "Farms in Kerala",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh bananas"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "fruit",
    type: "fruit"
  },
  {
    id: 103,
    name: "Organic Oranges",
    price: 90,
    unit: "kg",
    description: "Juicy, sweet-tart oranges. Perfect for eating fresh or juicing.",
    nutritionalInfo: "Excellent source of vitamin C and antioxidants.",
    origin: "Organic farms in Nagpur",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh oranges"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "fruit",
    type: "fruit"
  },
  {
    id: 104,
    name: "Strawberries",
    price: 150,
    unit: "punnet",
    description: "Sweet, juicy strawberries. Perfect for eating fresh, in desserts, or smoothies.",
    nutritionalInfo: "Rich in vitamin C, manganese, and antioxidants.",
    origin: "Farms in Maharashtra",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh strawberries"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "fruit",
    type: "fruit"
  },
  {
    id: 105,
    name: "Organic Watermelon",
    price: 120,
    unit: "piece",
    description: "Sweet, juicy watermelon with red flesh. Perfect for hot summer days.",
    nutritionalInfo: "High in water content, vitamin A, vitamin C, and lycopene.",
    origin: "Organic farms in Rajasthan",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1563114773-84221bd62daa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh watermelon"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "fruit",
    type: "fruit"
  },
  {
    id: 106,
    name: "Grapes",
    price: 100,
    unit: "kg",
    description: "Sweet, juicy grapes. Perfect for snacking, making juice, or adding to fruit salads.",
    nutritionalInfo: "Contains resveratrol, vitamin K, and various antioxidants.",
    origin: "Farms in Maharashtra",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1596363229129-5561756aae46?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh grapes"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "fruit",
    type: "fruit"
  },
  {
    id: 107,
    name: "Organic Mangoes",
    price: 150,
    unit: "kg",
    description: "Sweet, fragrant mangoes. The king of fruits, perfect for eating fresh or in desserts.",
    nutritionalInfo: "Rich in vitamin A, vitamin C, and various antioxidants.",
    origin: "Organic farms in Uttar Pradesh",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh mangoes"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "fruit",
    type: "fruit"
  },
  {
    id: 108,
    name: "Pineapple",
    price: 80,
    unit: "piece",
    description: "Sweet-tart pineapple with juicy yellow flesh. Perfect for eating fresh, grilling, or in desserts.",
    nutritionalInfo: "Rich in vitamin C, manganese, and bromelain.",
    origin: "Farms in North East India",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh pineapple"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "fruit",
    type: "fruit"
  },
  {
    id: 109,
    name: "Organic Papaya",
    price: 70,
    unit: "piece",
    description: "Sweet, orange-fleshed papaya. Perfect for breakfast or dessert.",
    nutritionalInfo: "Rich in vitamin C, vitamin A, and papain enzyme.",
    origin: "Organic farms in Gujarat",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh papaya"
      }
    ],
    isOrganic: true,
    inStock: true,
    category: "fruit",
    type: "fruit"
  },
  {
    id: 110,
    name: "Pomegranate",
    price: 120,
    unit: "piece",
    description: "Ruby-red pomegranate filled with juicy arils. Perfect for eating fresh or in salads.",
    nutritionalInfo: "Rich in antioxidants, vitamin C, and potassium.",
    origin: "Farms in Maharashtra",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1575964908996-9af766f8a68b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Fresh pomegranate"
      }
    ],
    isOrganic: false,
    inStock: true,
    category: "fruit",
    type: "fruit"
  },
  {
    id: 111,
    name: "Organic Kiwi",
    price: 140,
    unit: "kg",
    description: "Tangy-sweet kiwi with
