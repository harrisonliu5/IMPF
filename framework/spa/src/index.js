import sync from './components/sync/index';

import(/* webpackChunkName: "sync-banner" */ './components/banner/index').then(_=>{
    _.default.init();
})
sync();
