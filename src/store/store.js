import { createStore } from "vuex";

const capitalizeFirstWord = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const store = createStore({
  state() {
    return {
      projects: [],
      newSections: 0,
    };
  },
  actions: {
    createProject(context, payload) {
      context.commit("createProject", payload);
    },
    deleteProject(context, payload) {
      context.commit("deleteProject", payload);
    },
    deleteSection(context, payload) {
      const editedProjectIndex = context.state.projects.findIndex(
        (project) => project.id === payload.id
      );
      context.commit("deleteSection", {
        id: editedProjectIndex,
        deletedSection: payload.deletedSection,
      });
    },
    addSection(context, payload) {
      const editedProjectIndex = context.state.projects.findIndex(
        (project) => project.id === payload.id
      );
      context.state.newSections++;
      const newSections =
        context.state.newSections === 1 ? "" : " " + context.state.newSections;
      context.commit("addSection", {
        id: editedProjectIndex,
        newSection: {
          sectionName: payload.sectionName + newSections,
          sectionData: payload.sectionData,
        },
      });
    },
    editProjectName(context, payload) {
      const editedProjectIndex = context.state.projects.findIndex(
        (project) => project.id === payload.id
      );
      context.commit("editProjectName", {
        id: editedProjectIndex,
        newName: capitalizeFirstWord(payload.name),
      });
    },
    editProjectSectionName(context, payload) {
      const editedProjectIndex = context.state.projects.findIndex(
        (project) => project.id === payload.id
      );
      context.commit("editProjectSectionName", {
        id: editedProjectIndex,
        editedSectionName: payload.editedSectionName,
        updatedSectionName: payload.updatedSectionName,
      });
    },
    editProjectSectionData(context, payload) {
      const editedProjectIndex = context.state.projects.findIndex(
        (project) => project.id === payload.id
      );
      context.commit("editProjectSectionData", {
        id: editedProjectIndex,
        editedSectionName: payload.editedSectionName,
        updatedContent: payload.updatedContent,
      });
    },
  },
  mutations: {
    createProject(state, payload) {
      state.projects.push(JSON.parse(JSON.stringify(payload)));
    },
    deleteProject(state, payload) {
      state.projects = state.projects.filter(
        (project) => project.id !== payload
      );
    },
    deleteSection(state, payload) {
      state.projects[payload.id].sections = state.projects[
        payload.id
      ].sections.filter(
        (section) => section.sectionName !== payload.deletedSection
      );
    },
    addSection(state, payload) {
      const currentProjectSections = state.projects[payload.id].sections;
      const injectAt = currentProjectSections.length - 1;
      currentProjectSections.splice(injectAt, 0, payload.newSection);
    },
    editProjectName(state, payload) {
      state.projects[payload.id].name = payload.newName;
    },
    editProjectSectionName(state, payload) {
      const editedSection = state.projects[payload.id].sections.find(
        (section) => section.sectionName === payload.editedSectionName
      );
      editedSection.sectionName = payload.updatedSectionName;
    },

    editProjectSectionData(state, payload) {
      const editedSection = state.projects[payload.id].sections.find(
        (section) => section.sectionName === payload.editedSectionName
      );
      editedSection.sectionData = payload.updatedContent;
    },
  },
  getters: {
    projects(state) {
      return state.projects;
    },
  },
});

export default store;
