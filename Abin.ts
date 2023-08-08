import * as readline from "node:readline";
import { TreeNode } from "./TreeNode";

class Abin {
  // ** ======== PUBLIC ========
  public head: TreeNode | null = null;

  constructor(head?: TreeNode) {
    this.head = head ?? null;
  }
  public show() {
    this.printNodes(this.head, "");
  }

  public insertNode() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Ingresa un número: ", (numStr) => {
      const num = parseInt(numStr, 10);

      if (isNaN(num)) {
        console.log("Eso no es un número válido.");
        rl.close();
        return;
      }

      console.log(`Vas a ingresar ${num} nombres.`);

      const getNames = (count: number) => {
        if (count <= 0) {
          rl.close();
          return;
        }

        rl.question(`Insert node: `, (value) => {
          this.head = this.insert(this.head, parseInt(value));
          getNames(count - 1);
        });
      };

      getNames(num);
    });

    rl.on("close", () => {
      console.log("¡Proceso finalizado!");
      this.show();
    });
  }

  // ** ======== PRIVATE ========
  private printNodes(p: TreeNode | null, prefix: string) {
    if (p === null) {
      process.stdout.write(".");
    } else {
      let prefix2: string;
      process.stdout.write(`[${p.data}]\n ${prefix} \\__`);
      prefix2 = prefix + " | ";
      this.printNodes(p.right, prefix2);
      process.stdout.write(`\n ${prefix} \\__`);
      prefix2 = prefix + "    ";
      this.printNodes(p.left, prefix2);
    }
  }

  private insert(p: TreeNode | null, n: number): TreeNode {
    if (p === null) {
      const root = new TreeNode(n);
      return root;
    } else {
      if (n < p.data) {
        p.left = this.insert(p.left, n);
      } else if (n > p.data) {
        p.right = this.insert(p.right, n);
      }
      return p;
    }
  }
}

export default Abin;