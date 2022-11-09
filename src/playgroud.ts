import { Lyra } from "@lyrasearch/lyra";
import { useLyra } from "./index";

const { init, add, search } = useLyra();

function insert(db: Lyra<any>) {
  add(db, {
    key: "对方asd的看法",
    quote: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  });

  add(db, {
    key: "对方dfdf看法",
    quote: "If you really look closely, most overnight successes took a long time.",
    author: "Steve Jobs"
  });

  add(db, {
    key: "对方说的dfas法",
    quote: "If you are not willing to risk the usual, you will have to settle for the ordinary.",
    author: "Jim Rohn"
  });

  add(db, {
    key: "放倒过来放个假dsfdfdsfl",
    quote: "You miss 100% of the shots you don't take",
    author: "Wayne Gretzky - Michael Scott"
  });
}

const db = init({
  key: "string",
  quote: "string",
  author: "string"
});

console.log("init success.");

insert(db);

console.log("add success.");

const res = search(db, "砍伐");

console.log("search success:\n", res);
