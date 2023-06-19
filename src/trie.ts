import { RouteInfo } from "./types.ts";

interface RouteInfoTrieNode {
  key: string;
  children: RouteInfoTrieNode[];
  routeInfo?: RouteInfo;
}

const add = (
  routeInfo: RouteInfo,
  keys: string[],
  trie: RouteInfoTrieNode[],
) => {
  // split keys in first key and the rest
  const [first, ...rest] = keys;

  // search for a trie node with the first key
  // if not found, create a new trie node with it
  let node = trie.find((node) => node.key === first);
  if (!node) {
    node = { key: first, children: [] };
    trie.push(node);
  }

  // if there are keys left, add module
  // else set trie node's module and finish
  if (rest.length !== 0) {
    add(routeInfo, rest, node.children);
  } else {
    node.routeInfo = routeInfo;
  }
};

export const getRouteInfoBranch = (
  routeInfo: RouteInfo,
  keys: string[],
  trie: RouteInfoTrieNode[],
) => {
  const [first, ...rest] = keys;

  const result: RouteInfo[] = [];

  const node = trie.find((node) => node.key === first);
  if (node) {
    if (node.routeInfo) {
      result.push(node.routeInfo);
    }

    if (rest.length !== 0) {
      result.push(...getRouteInfoBranch(routeInfo, rest, node.children));
    }
  }

  return result;
};

export const buildTrie = (routeInfoList: RouteInfo[], splitter: string) => {
  const trie: RouteInfoTrieNode[] = [];

  routeInfoList.forEach((routeInfo) => {
    add(routeInfo, routeInfo.path.split(splitter), trie);
  });

  return trie;
};
