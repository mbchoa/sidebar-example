export type NavNode = {
  id: number;
  parentId: number | null;
  name: string;
  link: string;
  children: NavNode[];
};

export const navigationTree: NavNode = Object.freeze({
  id: 1,
  parentId: null,
  name: "Home",
  link: "#",
  children: [
    {
      id: 2,
      parentId: 1,
      name: "Products",
      link: "#products",
      children: [
        {
          id: 4,
          parentId: 2,
          name: "Electronics",
          link: "#electronics",
          children: [],
        },
        {
          id: 5,
          parentId: 2,
          name: "Clothing",
          link: "#clothing",
          children: [],
        },
      ],
    },
    {
      id: 3,
      parentId: 1,
      name: "About",
      link: "#about",
      children: [],
    },
  ],
});
