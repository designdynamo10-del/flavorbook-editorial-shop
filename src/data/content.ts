import catBaking from "@/assets/cat-baking.jpg";
import catDesserts from "@/assets/cat-desserts.jpg";
import catAirfryer from "@/assets/cat-airfryer.jpg";
import catHealthy from "@/assets/cat-healthy.jpg";
import catDinner from "@/assets/cat-dinner.jpg";
import catBreakfast from "@/assets/cat-breakfast.jpg";
import recipePasta from "@/assets/recipe-pasta.jpg";
import recipeCookies from "@/assets/recipe-cookies.jpg";
import recipeMediterranean from "@/assets/recipe-mediterranean.jpg";

export const images = {
  catBaking,
  catDesserts,
  catAirfryer,
  catHealthy,
  catDinner,
  catBreakfast,
  recipePasta,
  recipeCookies,
  recipeMediterranean,
};

export interface Category {
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export const featuredCategories: Category[] = [
  { name: "Baking", slug: "baking", description: "Breads, cakes and everyday bakes.", image: catBaking },
  { name: "Desserts", slug: "desserts", description: "Cookies, brownies and sweet classics.", image: catDesserts },
  { name: "Air Fryer", slug: "air-fryer", description: "Crisp, fast and weeknight friendly.", image: catAirfryer },
  { name: "Healthy Recipes", slug: "healthy", description: "Fresh plates that still feel generous.", image: catHealthy },
  { name: "Dinner", slug: "dinner", description: "Family dinners on the table by seven.", image: catDinner },
  { name: "Breakfast", slug: "breakfast", description: "Slow mornings and quick starts.", image: catBreakfast },
];

export const moreCategories: Category[] = [
  { name: "Meal Prep", slug: "meal-prep", description: "Cook once, eat all week." },
  { name: "Bread", slug: "bread", description: "Sourdough, focaccia and simple loaves." },
  { name: "Slow Cooker", slug: "slow-cooker", description: "Set it and forget it comfort." },
  { name: "Mediterranean", slug: "mediterranean", description: "Olive oil, lemon and herbs." },
  { name: "Family Meals", slug: "family-meals", description: "Crowd pleasers for every night." },
  { name: "Holiday Recipes", slug: "holiday", description: "Festive tables and gatherings." },
];

export const allCategories = [...featuredCategories, ...moreCategories];

export interface Recipe {
  slug: string;
  title: string;
  category: string;
  time: string;
  prep: string;
  cook: string;
  servings: string;
  calories: string;
  difficulty: string;
  excerpt: string;
  intro: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  substitutions: string[];
  storage: string;
  faq: Array<{ q: string; a: string }>;
}

export const recipes: Recipe[] = [
  {
    slug: "easy-creamy-chicken-pasta",
    title: "Easy Creamy Chicken Pasta",
    category: "Dinner",
    time: "30 min",
    prep: "10 min",
    cook: "20 min",
    servings: "4 servings",
    calories: "540 kcal per serving",
    difficulty: "Easy",
    excerpt: "A silky garlic cream sauce, tender chicken and pasta that comes together in one pan.",
    intro:
      "This creamy chicken pasta is the weeknight dinner we come back to most. Everything happens in one skillet, the sauce thickens on its own, and it uses ingredients you likely already keep in the kitchen.",
    image: recipePasta,
    ingredients: [
      "350 g linguine or spaghetti",
      "2 chicken breasts, cut into bite-size pieces",
      "2 tbsp olive oil",
      "3 garlic cloves, finely chopped",
      "250 ml heavy cream",
      "60 g grated Parmesan",
      "Handful of flat-leaf parsley, chopped",
      "Sea salt and black pepper",
    ],
    instructions: [
      "Bring a large pot of salted water to a boil and cook the pasta until al dente. Reserve a cup of pasta water before draining.",
      "Season the chicken generously. Sear in olive oil over medium-high heat until golden, about 6 minutes.",
      "Lower the heat, add garlic and cook for one minute until fragrant.",
      "Pour in the cream and simmer gently for 4 minutes, then stir through the Parmesan.",
      "Toss the pasta into the sauce, loosening with pasta water until glossy. Finish with parsley and pepper.",
    ],
    tips: [
      "Let the chicken sit undisturbed for the first two minutes so it browns instead of steaming.",
      "Grate the Parmesan yourself; pre-shredded cheese can make the sauce grainy.",
    ],
    substitutions: [
      "Swap the cream for full-fat coconut milk for a dairy-free version.",
      "Use thighs instead of breasts for a richer result.",
    ],
    storage: "Keeps in an airtight container in the fridge for 3 days. Reheat gently with a splash of milk.",
    faq: [
      { q: "Can I make it ahead?", a: "Yes, cook the sauce a day ahead and toss with fresh pasta before serving." },
      { q: "Can I freeze it?", a: "Cream sauces can split when frozen, so we recommend refrigerating instead." },
    ],
  },
  {
    slug: "classic-chocolate-chip-cookies",
    title: "Classic Chocolate Chip Cookies",
    category: "Baking",
    time: "25 min",
    prep: "10 min",
    cook: "12 min",
    servings: "18 cookies",
    calories: "210 kcal per cookie",
    difficulty: "Easy",
    excerpt: "Crisp edges, soft centres and pools of dark chocolate in every bite.",
    intro:
      "The cookie recipe our readers bake most. Brown butter is optional, but a rest in the fridge is what gives these their bakery-style chew.",
    image: recipeCookies,
    ingredients: [
      "225 g unsalted butter, softened",
      "180 g light brown sugar",
      "100 g caster sugar",
      "2 eggs",
      "1 tsp vanilla extract",
      "320 g plain flour",
      "1 tsp baking soda",
      "250 g dark chocolate, chopped",
      "Flaky sea salt",
    ],
    instructions: [
      "Beat butter and both sugars until pale and fluffy, about 3 minutes.",
      "Add eggs one at a time, then the vanilla.",
      "Fold in the flour and baking soda, then the chocolate.",
      "Chill the dough for at least 30 minutes.",
      "Scoop onto lined trays and bake at 180°C for 11 to 13 minutes. Finish with flaky salt.",
    ],
    tips: [
      "Pull the cookies while the centres still look underdone; they set as they cool.",
      "Chopped chocolate gives better melted pools than chips.",
    ],
    substitutions: ["Use half wholemeal flour for a nuttier crumb.", "Swap dark chocolate for milk or white."],
    storage: "Store in an airtight tin for 4 days, or freeze scooped dough for up to 3 months.",
    faq: [
      { q: "Do I have to chill the dough?", a: "It is optional, but chilling deepens the flavour and prevents spreading." },
      { q: "Can I bake from frozen?", a: "Yes, add two extra minutes to the bake time." },
    ],
  },
  {
    slug: "easy-mediterranean-chicken",
    title: "Easy Mediterranean Chicken",
    category: "Healthy",
    time: "40 min",
    prep: "10 min",
    cook: "30 min",
    servings: "4 servings",
    calories: "430 kcal per serving",
    difficulty: "Easy",
    excerpt: "Lemon, olives and oregano roasted together into a bright, no-fuss traybake.",
    intro:
      "One dish, one tray, and a sauce that makes itself. This is the recipe we recommend to anyone starting a more Mediterranean way of cooking.",
    image: recipeMediterranean,
    ingredients: [
      "6 bone-in chicken thighs",
      "1 lemon, sliced",
      "120 g green olives",
      "3 tbsp olive oil",
      "2 tsp dried oregano",
      "4 garlic cloves, smashed",
      "Sea salt and black pepper",
    ],
    instructions: [
      "Heat the oven to 200°C.",
      "Toss the chicken with olive oil, oregano, garlic, salt and pepper.",
      "Arrange skin-side up in a baking dish with the lemon and olives.",
      "Roast for 30 to 35 minutes until the skin is deeply golden and the juices run clear.",
      "Rest for 5 minutes and spoon the pan juices over before serving.",
    ],
    tips: ["Pat the skin dry before roasting for the crispiest result.", "Add potatoes to the tray for a full meal."],
    substitutions: ["Chicken breasts work; reduce the roasting time to 22 minutes.", "Capers can replace olives."],
    storage: "Refrigerate for up to 3 days. Reheat uncovered at 180°C to keep the skin crisp.",
    faq: [
      { q: "Is this good for meal prep?", a: "Yes, it reheats beautifully and pairs with grains or salad." },
      { q: "Can I use dried lemon?", a: "Fresh lemon is important here for both acidity and aroma." },
    ],
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  updated: string;
  readTime: string;
  author: string;
  image: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "25-easy-dinner-recipes-for-busy-weeknights",
    title: "25 Easy Dinner Recipes for Busy Weeknights",
    category: "Dinner",
    excerpt: "Fast, family-friendly dinners you can put together after a long day without a trip to the shops.",
    date: "2026-05-12",
    updated: "2026-08-02",
    readTime: "8 min read",
    author: "The FlavorBook Kitchen",
    image: catDinner,
    body: [
      "A good weeknight dinner has three qualities: it uses ingredients you already have, it finishes in under 40 minutes, and it leaves you with fewer than three pans to wash. Every recipe in this collection meets all three.",
      "Start with a protein you can cook quickly, add one starch, and finish with something fresh. That formula is the backbone of nearly every dinner in our cookbooks, and once it becomes habit you can improvise endlessly.",
      "If you are cooking for a mixed table, build meals that can be adjusted at the last moment: sauces served on the side, spice added at the plate, and vegetables roasted separately so everyone gets what they like.",
    ],
  },
  {
    slug: "best-homemade-bread-recipes-for-beginners",
    title: "Best Homemade Bread Recipes for Beginners",
    category: "Baking",
    excerpt: "Five forgiving loaves that teach you dough without any special equipment.",
    date: "2026-04-28",
    updated: "2026-07-19",
    readTime: "10 min read",
    author: "The FlavorBook Kitchen",
    image: catBaking,
    body: [
      "Bread rewards patience more than skill. If you can stir a bowl and wait, you can bake a loaf worth sharing.",
      "Begin with a no-knead white loaf, then move on to focaccia, soda bread and a simple enriched dough. Each one teaches a different lesson about hydration, time and heat.",
      "The single biggest improvement most beginners can make is baking hotter and longer than feels comfortable. Colour is flavour.",
    ],
  },
  {
    slug: "30-easy-dessert-recipes-everyone-loves",
    title: "30 Easy Dessert Recipes Everyone Loves",
    category: "Desserts",
    excerpt: "Crowd-pleasing sweets from ten-minute puddings to showstopping cakes.",
    date: "2026-04-02",
    updated: "2026-06-30",
    readTime: "7 min read",
    author: "The FlavorBook Kitchen",
    image: catDesserts,
    body: [
      "Dessert does not need to be complicated to feel special. Most of our favourites use fewer than eight ingredients.",
      "Keep a short list of desserts you can make without a recipe. A tray of brownies, a fruit crumble and a whipped cream base will carry you through most occasions.",
      "When baking for a group, choose recipes that can be made a day ahead. Flavour usually improves overnight.",
    ],
  },
  {
    slug: "how-to-meal-prep-for-the-week",
    title: "How to Meal Prep for the Week",
    category: "Meal Prep",
    excerpt: "A realistic two-hour Sunday plan that keeps weekday cooking to fifteen minutes.",
    date: "2026-03-18",
    updated: "2026-07-05",
    readTime: "9 min read",
    author: "The FlavorBook Kitchen",
    image: catHealthy,
    body: [
      "Meal prep fails when it tries to finish every meal in advance. Prep components instead: grains, roasted vegetables, a protein and two sauces.",
      "Work in the order of oven time first, stovetop second, cold prep last. That keeps everything moving and finishes the session in about two hours.",
      "Store components separately and assemble at the last minute so nothing turns soft in the fridge.",
    ],
  },
  {
    slug: "best-air-fryer-recipes-for-beginners",
    title: "Best Air Fryer Recipes for Beginners",
    category: "Air Fryer",
    excerpt: "What to cook first, the temperatures that actually work, and mistakes to skip.",
    date: "2026-02-24",
    updated: "2026-06-11",
    readTime: "6 min read",
    author: "The FlavorBook Kitchen",
    image: catAirfryer,
    body: [
      "An air fryer is a small, very fast convection oven. Once you think of it that way, the recipes make sense.",
      "Do not crowd the basket, and toss halfway through. Airflow is the whole point of the machine.",
      "Start with chicken thighs, potatoes and halloumi. All three are forgiving and show off what the machine does best.",
    ],
  },
  {
    slug: "easy-baking-tips-for-beginners",
    title: "Easy Baking Tips for Beginners",
    category: "Baking",
    excerpt: "Small habits that make a large difference to every cake, cookie and loaf you bake.",
    date: "2026-01-30",
    updated: "2026-05-22",
    readTime: "5 min read",
    author: "The FlavorBook Kitchen",
    image: catBreakfast,
    body: [
      "Weigh your ingredients. A digital scale is the least expensive way to make your baking consistent.",
      "Get an oven thermometer. Most home ovens run hot or cold by 15 degrees or more, which explains a surprising number of failed bakes.",
      "Room-temperature butter and eggs emulsify properly, which is what gives cakes their light crumb.",
    ],
  },
];