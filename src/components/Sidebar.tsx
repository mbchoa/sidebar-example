import cx from "classnames";
import { useState } from "react";
import type { NavNode } from "../constants";

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

const getNavigationMenus = (node: NavNode): Map<NavNode, NavNode[]> => {
  const result = new Map<NavNode, NavNode[]>();

  // Create a recursive function that accepts current node and its depth
  const traverse = (currentNode: NavNode) => {
    const clonedNode = structuredClone(currentNode);
    if (clonedNode.children.length > 0) {
      result.set(clonedNode, clonedNode.children);
      clonedNode.children.forEach((child) => traverse(child));
    }
  };

  traverse(node);
  return result;
};

const menus = getNavigationMenus(navigationTree);

export const SideBar = () => {
  const [selectedNode, setSelectedNode] = useState<NavNode | null>(null);
  const [navHistoryNodes, setNavHistoryNodes] = useState<NavNode[]>([]);
  const navHistoryNodeIds = navHistoryNodes.map(({ id }) => id);

  const goForward = (parentNode: NavNode | null, childNode: NavNode) => {
    if (childNode.children.length === 0) {
      return;
    }

    setNavHistoryNodes([
      ...navHistoryNodes,
      parentNode === null ? childNode : parentNode,
    ]);
    setSelectedNode(childNode);
  };

  const goBack = () => {
    if (navHistoryNodes.length === 0) {
      return;
    }

    const newSelectedNode = navHistoryNodes.pop()!;
    setNavHistoryNodes([...navHistoryNodes]);
    setSelectedNode(navHistoryNodes.length === 0 ? null : newSelectedNode);
  };

  return (
    <div className="fixed w-[365px] h-full bg-gray-50 z-10">
      <div className="overflow-x-hidden h-full">
        {navHistoryNodes.length > 0 && <button onClick={goBack}>Back</button>}
        <div className="relative">
          <ul
            className={cx(`border absolute inset-0`, {
              "-translate-x-full": navHistoryNodeIds.includes(
                navigationTree.id
              ),
            })}
          >
            {[navigationTree].map((linkNode: NavNode) => (
              <li
                className={cx(`flex justify-between py-2 px-4`)}
                onClick={(e) => {
                  e.preventDefault();
                  goForward(null, linkNode);
                }}
              >
                {linkNode.name}{" "}
                {linkNode.children.length > 0 && <span>&gt;</span>}
              </li>
            ))}
          </ul>
          {Array.from(menus.entries()).map(([parent, children]) => (
            <ul
              className={cx(`border absolute inset-0 transition`, {
                "-translate-x-full":
                  navHistoryNodeIds.includes(parent.id) &&
                  selectedNode?.id !== parent.id,
                "translate-x-full":
                  !navHistoryNodeIds.includes(parent.id) &&
                  selectedNode?.id !== parent.id,
              })}
            >
              {children.map((linkNode: NavNode) => (
                <li
                  className={cx(`flex justify-between py-2 px-4`)}
                  onClick={(e) => {
                    e.preventDefault();
                    goForward(parent, linkNode);
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
