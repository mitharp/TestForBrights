import './css/site.css';
import 'bootstrap';
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
    { path: '/', component: require('./components/urlinfo/urlinfo.vue.html').default },
    { path: '/urlstat', component: require('./components/urlstat/urlstat.vue.html').default },
    { path: '/urlplot', component: require('./components/urlplot/urlplot.vue.html').default }
];

new Vue({
    el: '#app-root',
    router: new VueRouter({ mode: 'history', routes: routes }),
    render: h => h(require('./components/app/app.vue.html').default)
});
