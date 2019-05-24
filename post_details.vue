<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <banner-component :page_name="pageName"></banner-component>
                <div class="main_container margin_30" v-if="currentPost">
                    <div class="row">
                        <div class="col-md-12" id="post_container">
                            <div class="post_details_header">
                                <h3 class="promo_name">{{ currentPost.title }}</h3>
                                <!--<p class="promo_store_name">-->
                                <!--    <span v-if="currentPost.author" class="blog-author">by {{ currentPost.author }}<span class="regular"> | </span></span>-->
                                <!--    {{ currentPost.publish_date | moment("MMM D, YYYY", timezone) }}-->
                                <!--</p>-->
                                <p class="promo_store_name" v-if="currentPost.author">by: {{ currentPost.author }}</p>
                            </div>
                            <img class="" v-if="currentPost.image_url" :src="currentPost.image_url" alt="" />
                            <hr v-if="currentPost.image_url">
                            <div class="promo_desc margin_40" v-html="currentPost.html_body"></div>
                            <hr>
                            <social-sharing v-if="currentPost" :url="shareURL(currentPost.slug)" :title="currentPost.title" :description="currentPost.body" :quote="truncate(currentPost.body)" :media="currentPost.image_url" inline-template>
                                <div class="social_share">
                                    <p>Share</p>
                                    <network network="facebook">
                                        <i class="fab fa-facebook"></i>
                                    </network>
                                    <network network="twitter">
                                        <i class="fab fa-twitter"></i>
                                    </network>
                                </div>
                            </social-sharing>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue!inside_banner.vue", "vue-social-sharing"], function (Vue, Vuex, moment, tz, VueMoment, insideBanner, SocialSharing) {
        Vue.component('social-sharing', SocialSharing);
        return Vue.component("post-details-component", {
            template: template, // the variable template will be injected,
            props: ['id'],
            data: function () {
                return {
                    dataLoaded: false,
                    pageName: "What's New",
                    currentPost: null
                }
            },
            created() {
                this.loadData().then(response => {
                    this.updateCurrentBlog(this.id);
                    this.dataLoaded = true;
                });
            },
            watch: {
                $route: function () {
                    this.updateCurrentBlog(this.$route.params.id);
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'blogs',
                    'findBlogByName',
                    'findBlogPostBySlug'
                ]),
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "blogs")
                        ]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                updateCurrentBlog(id) {
                    var blogName = "What's New";
                    this.currentPost = this.findBlogPostBySlug(blogName, id);
                    if (this.currentPost === null || this.currentPost === undefined) {
                        this.$router.replace({ name: 'posts' });
                    }
                },
                truncate(val_body) {
                    var truncate = _.truncate(val_body, { 'length': 99, 'separator': ' ' });
                    return truncate;
                },
				shareURL(slug) {
                    var share_url = window.location.href
                    return share_url
                }
            }
        });
    });
</script>