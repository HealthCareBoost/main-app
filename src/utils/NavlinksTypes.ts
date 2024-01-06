export type NavItem = {
  id: string;
  title: string;
  href: string;
  disabled?: boolean;
};

export const LandingNavLinks: NavItem[] = [
  {
    id: "home",
    title: "Home",
    href: "#home",
  },
  // {
  //   id: "features",
  //   title: "Features",
  //   href: "#features",
  // },
  // {
  //   id: "product",
  //   title: "Product",
  //   href: "#product",
  // },
  // {
  //   id: "clients",
  //   title: "Clients",
  //   href: "#clients",
  // },
  {
    id: "recipe",
    title: "Recipes",
    href: "/recipe",
  },
  {
    id: "ai",
    title: "AI Chat",
    href: "/chat",
  },
];

export const MainNavLinks: NavItem[] = [
  {
    id: "home",
    title: "Home",
    href: "/",
  },
  {
    id: "recipe",
    title: "Recipes",
    href: "/recipe",
  },
  // {
  //   id: "add-recipe",
  //   title: "Create Recipe",
  //   href: "/recipe/create",
  // },
  {
    id: "diet",
    title: "Diet",
    href: "/user/diet",
  },
  {
    id: "ai",
    title: "AI Chat",
    href: "/chat",
  },
];
