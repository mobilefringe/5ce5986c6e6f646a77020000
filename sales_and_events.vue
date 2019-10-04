<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <banner-component :page_name="pageName"></banner-component>
                <div class="main_container mobile_padding margin_30">
                    <div class="details_row">
                        <div class="details_col_3 hidden_phone">
                            <image-component :page_name="pageName"></image-component>  
                        </div>
                        <div class="details_col_9">
                            <!-- EVENTS -->
                            <b-card no-body class="mb-1 inside_page_toggle">
                                <b-card-header header-tag="header" class="p-1" role="tab">
                                    <b-btn block @click="toggleEvents = !toggleEvents" :aria-expanded="toggleEvents ? 'true' : 'false'" aria-controls="toggleEvents">
                                        Events
                                        <i v-if="toggleEvents"  class="fa fa-minus f"></i>
                                        <i v-else  class="fa fa-plus"></i>
                                    </b-btn>
                                </b-card-header>
                                <b-collapse v-if="eventList.length >= 1" v-for="event in eventList" v-model="toggleEvents" role="tabpanel" id="toggleEvents" class="accordion_body">
                                    <b-card-body>
                                        <div class="row">
                                            <div class="col-md-5" v-if="">
                                                <div class="store_details_image center-block">
                                                    <img :src="event.image_url" alt="" class="max_img" />
                                                </div>
                                            </div>
                                            <div class="col-md-7">
                                                <h3 class="promo_name">{{event.name}}</h3>
                                                <p class="promo_store_name">
                                                    <router-link v-if="event.eventable_type == 'Store'" :to="'/stores/'+ event.store.slug">
                                                        {{ event.store.name }}
                                                    </router-link>
                                                    <span v-else>{{ property.name }}</span>
                                                    <span>| </span>
                                                    <span v-if="isMultiDay(event)" class="promo_date">{{ event.start_date | moment("MMM D", timezone)}} - {{ event.end_date | moment("MMM D", timezone)}}</span>
                                                    <span v-else class="promo_date">{{ event.start_date | moment("MMM D", timezone)}}</span>
                                                </p>
                                                <div class="promo_desc" v-html="event.description_short"></div>
                                                <router-link :to="'/events/'+ event.slug" >
						                            <i class="fa fa-caret-right"></i> <span class="read_more">View Event Details</span>
				                                </router-link>
                                            </div>
                                        </div>
                                        <hr class="promo_separator" />
                                    </b-card-body>
                                </b-collapse>
                                <b-collapse v-if="eventList.length == 0" v-model="toggleEvents" role="tabpanel" id="toggleEvents" class="accordion_body">
                                    <b-card-body>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <p>Sorry, there are no Events posted at this time. Please check back soon!</p>
                                            </div>
                                        </div>
                                        <hr class="promo_separator" />
                                    </b-card-body>
                                </b-collapse>
                            </b-card>
                            <!-- PROMOTIONS -->
                            <b-card no-body class="mb-1 inside_page_toggle">
                                <b-card-header header-tag="header" class="p-1" role="tab">
                                    <b-btn block @click="togglePromos = !togglePromos" :aria-expanded="togglePromos ? 'true' : 'false'" aria-controls="togglePromotions">
                                        Sales
                                        <i v-if="togglePromos"  class="fa fa-minus f"></i>
                                        <i v-else  class="fa fa-plus"></i>
                                    </b-btn>
                                </b-card-header>
                                <b-collapse v-if="promoList.length >= 1" v-for="promo in promoList" v-model="togglePromos" role="tabpanel" id="togglePromotions" class="accordion_body">
                                    <b-card-body>
                                        <div class="row">
                                            <div class="col-md-5">
                                                <div v-if="promo.no_logo" class="store_details_image center-block">
                                                    <div class="no_logo">
                                                        <p class="store_details_name">{{ promo.store_name }}</p>
                                                    </div>    
                                                </div>
                                                <div v-else class="store_details_image center-block">
                                                    <img :src="promo.image_url" alt="" class="max_img" />
                                                </div>
                                            </div>
                                            <div class="col-md-7">
                                                <h3 class="promo_name">{{promo.name}}</h3>
                                                <p class="promo_store_name">
                                                    <router-link v-if="promo.promotionable_type == 'Store'" :to="'/stores/'+ promo.store.slug">
                                                        {{ promo.store.name }}
                                                    </router-link>
                                                    <span v-else>{{ property.name }}</span>
                                                    <span>| </span>
                                                    <span v-if="isMultiDay(promo)" class="promo_date">{{ promo.start_date | moment("MMM D", timezone)}} - {{ promo.end_date | moment("MMM D", timezone)}}</span>
                                                    <span v-else class="promo_date">{{ promo.start_date | moment("MMM D", timezone)}}</span>
                                                </p>
                                                <div class="promo_desc" v-html="promo.description_short"></div>
                                                <router-link :to="'/promotions/'+ promo.slug" >
						                            <i class="fa fa-caret-right"></i> <span class="read_more">View Promotion Details</span>
				                                </router-link>
                                            </div>
                                        </div>
                                        <hr class="promo_separator" />
                                    </b-card-body>
                                </b-collapse>
                                <b-collapse v-if="promoList.length == 0" v-model="togglePromos" role="tabpanel" id="togglePromotions" class="accordion_body">
                                    <b-card-body>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <p>Sorry. There are no Sales posted at this time. Please check back soon!</p>
                                            </div>
                                        </div>
                                        <hr class="promo_separator" />
                                    </b-card-body>
                                </b-collapse>
                            </b-card>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue!inside_banner.vue", "vue!side_image.vue", "json!site.json", "bootstrap-vue"], function (Vue, Vuex, moment, tz, VueMoment, insideBanner, sideImage, site, BootstrapVue) {
        Vue.use(BootstrapVue);
        return Vue.component("promotions-and-events-component", {
            template: template, // the variable template will be injected,
            data: function () {
                return {
                    dataLoaded: false,
                    siteInfo: site,
                    pageName: "Sales & Events",
                    toggleEvents: false,
                    togglePromos: false
                }
            },
            created (){
                this.loadData().then(response => {
                    this.dataLoaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findRepoByName',
                    'processedEvents',
                    'processedPromos'
                ]),
                eventList: function events() {
                    var vm = this;
                    var events = this.processedEvents;
                    var showEvents = [];
                    _.forEach(events, function (value, key) {
                        var today = moment.tz(this.timezone).format();
                        var showOnWebDate = moment.tz(value.show_on_web_date, this.timezone).format();
                        if (today >= showOnWebDate) {
                            if (_.includes(value.image_url, 'missing')) {
                                value.image_url = vm.siteInfo.default_logo_url;
                            }
                            
                            value.description_short = _.truncate(value.description, { 'length': 100, 'separator': ' ' });
                            
                            showEvents.push(value);
                        }
                    });
                    var sortedEvents = _.orderBy(showEvents, function (o) { return o.end_date });
                    if (sortedEvents.length > 0) {
                        this.toggleEvents = true;
                    }
                    return sortedEvents
                },
                promoList: function promos() {
                    var vm = this;
                    var promos = this.processedPromos;
                    var showPromos = [];
                    _.forEach(promos, function(value, key) {
                        var today = moment.tz(this.timezone).format();
                        var showOnWebDate = moment.tz(value.show_on_web_date, this.timezone).format();
                        if (today >= showOnWebDate) {
                            if (_.includes(value.image_url, 'missing')) {
                                if (_.isEmpty(value.store)) {
                                    value.image_url = vm.siteInfo.default_logo_url;
                                } else {
                                    if (_.includes(value.store.store_front_url_abs, 'missing')) {
                                        value.no_logo = true;
                                        value.store_name = value.store.name;
                                    } else {
                                        value.image_url = value.store.store_front_url_abs;
                                    }
                                }
                            }
                            
                            value.description_short = _.truncate(value.description, { 'length': 100, 'separator': ' ' });
                            
                            showPromos.push(value);
                        }
                    });
                    var sortedPromos = _.orderBy(showPromos, [function(o) { return o.end_date; }]);
                    if (sortedPromos.length > 0) {
                        this.togglePromos = true;
                    }
                    return sortedPromos;
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "events"), 
                            this.$store.dispatch("getData","promotions")
                        ]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                isMultiDay(promo) {
                    var timezone = this.timezone
                    var start_date = moment(promo.start_date).tz(timezone).format("MM-DD-YYYY");
                    var end_date = moment(promo.end_date).tz(timezone).format("MM-DD-YYYY");
                    if (start_date === end_date) {
                        return false
                    } else {
                        return true
                    }
                }
            }
        });
    });
</script>
