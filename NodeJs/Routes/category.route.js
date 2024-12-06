import { createCategory } from "../Controller/category.controller.js";
import { createBlanks } from "../Controller/blanks.controller.js";

export function routes(server) {

    server.post("/api/category", createCategory);
    server.post("/api/question2", createBlanks);

}
