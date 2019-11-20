<template>
    <div class="page-wrap d-flex flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                    <h1 class="display-0 d-block">404</h1>
                    <div class="mb-4 lead display-4">죄송합니다 페이지를 찾을 수 없습니다.</div>
                    <router-link :to="{ path: '/' }"
                                 class="btn btn-success btn-lg mt-4"
                                 id="go-home">
                        Home
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Lato:400,700,400italic");

    body {
        background: #dedede;
        font-family: "Lato";
    }

    .display-0 {
        font-size: 12rem;
        font-weight: 300;
        line-height: 1.2;
    }

    .page-wrap {
        min-height: 80vh;
    }

    #go-home {
        background-color: #18BC9C;
        border-color: #18BC9C;
    }
</style>
