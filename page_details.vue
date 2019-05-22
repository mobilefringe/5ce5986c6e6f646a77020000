<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <div class="inside_header_background" :style="{ background: 'linear-gradient(0deg, rgba(129, 2, 0, 0.8), rgba(129, 2, 0, 0.8)), url(' + pageBanner.image_url + ') center center no-repeat rgba(129, 2, 0)' }">
                    <div class="main_container">
                        <h2 v-if="currentPage.title" v-html="currentPage.title"></h2>
                    </div>
                </div>
                <div class="main_container mobile_padding margin_30">
                    <div class="details_row">
                        <div class="details_col_3 hidden_phone">
                            <image-component :page_name="pageName"></image-component>  
                        </div>
                        <div class="details_col_9">
                            <div class="page_body" v-if="currentPage" v-html="currentPage.body"></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "vue!inside_banner.vue", "vue!side_image.vue", "lightbox"], function (Vue, Vuex, insideBanner, sideImage, Lightbox) {
        Vue.use(Lightbox);
        return Vue.component("page-details-component", {
            template: template, // the variable template will be injected,
            props: ['id'],
            data: function data() {
                return {
                    dataLoaded: false,
                    pageBanner: null,
                    pageName: "Default",
                    currentPage: {}
                }
            },
            created() {
                var temp_repo = this.findRepoByName('Inside Page Banner').images;
                if (temp_repo != null) {
                    this.pageBanner = temp_repo[0];
                } else {
                    this.pageBanner = {
                        "image_url": "//codecloud.cdn.speedyrails.net/sites/5c9a464e6e6f6470e9060000/image/png/1554588744991/default_inside_banner.png"
                    }
                }
                            
                this.updateCurrentPage(this.id);
            },
            watch: {
                $route: function () {
                    this.updateCurrentPage(this.$route.params.id);
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'findRepoByName'
                ])
            },
            methods: {
                updateCurrentPage(id) {
                    this.$nextTick(function() {
                        // Determine the incoming route
                        var route_url = "";
                        if (_.includes(this.$route.path, "privacy-policy")) {
                            route_url = this.property.slug + "-privacy-policy"
                        } else if (_.includes(this.$route.path, "terms-of-use")) {
                            route_url = this.property.slug + "-terms-of-use"
                        } else {
                            route_url = this.id;
                        }
                        
                        var _this = this;
                        this.property.mm_host = this.property.mm_host.replace("http:", "");
                        this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/" + route_url + ".json" }).then(function (response) {
                            _this.currentPage = response.data;
                            _this.dataLoaded = true;
                        }, function (error) {
                            console.error( "Could not retrieve data from server. Please check internet connection and try again.");
                            _this.$router.replace({ name: 'home' });
                        });
                    });
                }
            }
        });
    });
</script>