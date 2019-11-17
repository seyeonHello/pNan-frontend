<template>
    <div class="main">
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <div class="col-2">
                    <ul class="nav flex-column">
                        <li class="nav-item mt-2 mb-4">
                            <router-link :to="{ path: '/'}" class="navbar-brand nav-link">
                                <img src="../assets/logo.png">
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ path: '/VIC'}" class="nav-link">
                                VIC 작성
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ path: '/followUp'}" class="nav-link">
                                팔로우업 일지 작성
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ path: '/visit'}" class="nav-link">
                                방문 일지 작성
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ path: '/statistic'}" class="nav-link">
                                통계
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ path: '/dataRoom'}" class="nav-link">
                                자료실
                            </router-link>
                        </li>
                    </ul>
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
