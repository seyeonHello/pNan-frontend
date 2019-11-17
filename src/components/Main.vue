<template>
    <div class="main">
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <div class="col-2">
                    <nav class="navbar" role="navigation">
                        <div class="collapse navbar-collapse navbar-ex1-collapse">
                            <ul class="nav navbar-nav">
                                <li class="nav-item mt-2 mb-4">
                                    <router-link :to="{ path: '/'}" class="navbar-brand button">
                                        <img src="../assets/logo.png">
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="{ path: '/VIC'}" class="button">
                                        VIC 작성
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="{ path: '/followUp'}" class="button">
                                        팔로우업 일지 작성
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="{ path: '/visit'}" class="button">
                                        방문 일지 작성
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{ path: '/statistic'}" class="button">
                                        통계
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="{ path: '/dataRoom'}" class="button">
                                        자료실
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div class="col-10">
                    <div class="page-content">
                        <router-view/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
import 'bootstrap';

export default {
  name: 'Main',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .navbar-brand img {
        width: 100px;
    }
</style>

<style scoped>
    @import 'bootstrap/dist/css/bootstrap.min.css';
</style>
