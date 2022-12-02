import { createStarryNight, common } from "@wooorm/starry-night";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Plugin } from "unified";

export const rehypeStarryNight: Plugin = () => {
  const starryNightPromise = createStarryNight(common);
  const prefix = "language-";
  return async (tree) => {
    const starryNight = await starryNightPromise;
    visit(tree, (node, index, parent) => {
      if (!parent || index === null || node.tagName !== "pre") {
        return;
      }

      const head = node.children[0];

      if (
        !head ||
        head.type !== "element" ||
        head.tagName !== "code" ||
        !head.properties
      ) {
        return;
      }
      const classes = head.properties.className;

      if (!Array.isArray(classes)) return;

      const language = classes.find(
        (d) => typeof d === "string" && d.startsWith(prefix)
      );

      if (typeof language !== "string") return;

      const scope = starryNight.flagToScope(language.slice(prefix.length));

      // Maybe warn?
      if (!scope) return;

      const fragment = starryNight.highlight(toString(head), scope);
      const children = /** @type {Array<ElementContent>} */ fragment.children;

      parent.children.splice(index, 1, {
        type: "element",
        tagName: "div",
        properties: {
          className: [
            "highlight",
            "highlight-" + scope.replace(/^source\./, "").replace(/\./g, "-"),
          ],
        },
        children: [
          { type: "element", tagName: "pre", properties: {}, children },
        ],
      });
    });
  };
};
