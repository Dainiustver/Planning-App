import { createRouter, createWebHistory } from "vue-router";

import NewProject from "./components/pages/NewProject.vue";
import EditProject from "./components/pages/EditProject.vue";
import BrowseProjects from "./components/pages/BrowseProjects.vue";
import NotFound from "./components/pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/new-project" },
    { path: "/new-project", component: NewProject },
    { path: "/browse-projects", component: BrowseProjects },
    { path: "/edit-project/:id", component: EditProject, name: "EditProject" },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
