import { useCallback, useState } from "react";
import cx from "classnames";

type NavNode = {
  id: number;
  parentId: number | null;
  name: string;
  link: string;
  children: NavNode[];
};

const navigationTree: NavNode = Object.freeze({
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

const getNavigationMenus = (node: NavNode) => {
  const result: Array<NavNode[]> = [];

  // Create a recursive function that accepts current node and its depth
  const traverse = (currentNode: NavNode, depth: number) => {
    // Ensure the result has an array for the current depth
    if (!result[depth]) {
      result[depth] = [currentNode];
    } else {
      // Add the current node to the array representing its depth
      result[depth].push(currentNode);
    }

    // If there are children, iterate over them and traverse deeper
    currentNode.children.forEach((child) => traverse(child, depth + 1));
  };

  traverse(node, 0);
  return result;
};

const menus = getNavigationMenus(navigationTree);

export const SideBar = () => {
  const [selectedNode, setSelectedNode] = useState<NavNode | null>(null);
  return (
    <div className="fixed w-[365px] h-full bg-gray-50 z-10">
      <div className="overflow-x-hidden h-full">
        <div className="relative">
          {menus.map((m: NavNode[]) => (
            <ul className={cx(`border absolute inset-0`)}>
              {m.map((linkNode: NavNode) => (
                <li
                  className={cx(`flex justify-between py-2 px-4`)}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  {linkNode.name}{" "}
                  {linkNode.children.length > 0 && <span>&gt;</span>}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
