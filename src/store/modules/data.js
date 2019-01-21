const state = {
    leftMenu: false, //左侧菜单栏
}

const actions = {
    toggleMenu({
        commit
    }, payload) {
        commit("toggleMenu", payload);
    },
}

const mutations = {
    toggleMenu(state, payload) {
        state.leftMenu = payload == false ? false : true;
    },
}

export default {
    namespaced: true,
    state,
    // getters,
    actions,
    mutations
};