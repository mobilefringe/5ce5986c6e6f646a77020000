<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <banner-component :page_name="pageName"></banner-component>
                <div class="main_container margin_30">
                    <div class="">
                        <div class="row store_nav">
                            <div class="col-md-6">
                                <v-select v-model="selectedCat" :options="dropDownCats" :searchable="false" :on-change="filteredByCategory" class="category-select" placeholder="FILTER LIST" id="selectByCat" transition="menu-fade"></v-select>
                            </div>
                            <div class="col-md-6">
                                <span class="legend"><span class="promo_exist"><i class="fas fa-tag"></i></span> Promotion</span>  
                                <span class="legend"><span class="new_store"><i class="fas fa-star"></i></span> New Store </span>
                                <span class="legend"><span class="coming_soon_store"><i class="far fa-clock"></i></span> Coming Soon</span>
                            </div>
                        </div>
                        <div class="row" v-if="sortByStores">
                            <div class="col-md-6">
                                <div v-if="listOne" v-for="(stores, index) in listOne">
                                    <div class="list_header">
                                        <div class="store_initial_container">
                                            {{index}}
                                        </div>
                                    </div>
                                    <div class="store-section" v-for="store in stores">
                                        <p class="store_list_name">
                                            <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">
                                                {{store.name}}
                                            </router-link>
                                            <span v-if="store.is_new_store" class="pull-right new_store"><i class="fas fa-star"></i></span>
                                            <span v-if="store.is_coming_soon_store" class="pull-right coming_soon_store"><i class="far fa-clock"></i></span>
                                            <span v-if="store.promotions != null" class="promo_exist pull-right"><i class="fas fa-tag"></i></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6" >
                                <div v-if="listTwo" v-for="(stores, index) in listTwo">
                                    <div class="list_header">
                                        <div class="store_initial_container">
                                            {{index}}
                                        </div>
                                    </div>
                                    <div class="store-section" v-for="store in stores">
                                        <p class="store_list_name">
                                            <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">
                                                {{store.name}}
                                            </router-link>
                                            <span v-if="store.is_new_store" class="pull-right new_store"><i class="fas fa-star"></i></span>
                                            <span v-if="store.is_coming_soon_store" class="pull-right coming_soon_store"><i class="far fa-clock"></i></span>
                                            <span v-if="store.promotions != null" class="promo_exist pull-right"><i class="fas fa-tag"></i></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-else>
                            <div class="col-md-12">
                                <div v-for="(stores, index) in filteredStores" >
                                    <div class="list_header">
                                        <div class="store_initial_container">
                                            {{index}}
                                        </div>
                                    </div>
                                    <div class="store-section" v-for="store in stores">
                                        <p class="store_list_name">
                                            <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">
                                                {{store.name}}
                                            </router-link>
                                            <span v-if="store.is_new_store" class="pull-right new_store"><i class="fas fa-star"></i></span>
                                            <span v-if="store.is_coming_soon_store" class="pull-right coming_soon_store"><i class="far fa-clock"></i></span>
                                            <span v-if="store.promotions != null" class="promo_exist pull-right"><i class="fas fa-tag"></i></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "vue-select", "vue!inside_banner.vue"], function(Vue, Vuex, VueSelect, insideBanner) {
        Vue.component('v-select', VueSelect.VueSelect);
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            props:['inside_banner'],
            data: function() {
                return {
                    dataLoaded: false,
                    pageName: "Stores",
                    sortByStores: true,
                    listOne: null,
                    listTwo: null,
                    filteredStores: null,
                    selectedCat: "FILTER LIST"
                }
            },
            created(){
                this.loadData().then(response => {
                    this.allStores;
                    this.dataLoaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'findRepoByName',
                    'processedStores',
                    'processedCategories',
                    'storesByAlphaIndex',
                    'storesByCategoryName',
                    'findCategoryByName',
                    'findCategoryById'
                ]), 
                allStores() {
                    var all_stores = this.processedStores;
                    var listOne = [];
                    var listTwo = [];
                    _.forEach( all_stores, function( value, key ) {
                        if (_.startsWith(value.name, 'The ')) {
                            value.name_sort = _.trimStart(value.name, 'The ')
                            value.name_sort = _.trimStart(value.name_sort)
                        } else {
                            value.name_sort = value.name
                        } 

                        var starter = "A";
                        var breaker = "M";
                        var store_initial = _.toUpper(value.name_sort[0]);
                        console.log("store_initial", store_initial)
                        if (isNaN(store_initial){
                            if (store_initial.charCodeAt(0) <= breaker.charCodeAt(0) && store_initial.charCodeAt(0) >= starter.charCodeAt(0)){
                                listOne.push(value);
                            } else {
                                listTwo.push(value);    
                            }
                        }
                    });
                    this.listOne = _.groupBy(listOne, store => (isNaN(_.upperCase(store.name_sort.charAt(0))) ? _.upperCase(store.name_sort.charAt(0)) : "#"));
                    this.listTwo = _.groupBy(listTwo, store => (isNaN(_.upperCase(store.name_sort.charAt(0))) ? _.upperCase(store.name_sort.charAt(0)) : "#"));
                },
                dropDownCats() {
                    var cats = _.filter(this.processedCategories, function(o) { return o.store_ids !== null && o.store_ids.length > 0 });
                    cats = _.map(cats, 'name');
                    cats.unshift('Alphabetical');
                    return cats;
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "categories")
                        ]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                filteredByCategory (cat_id) {
                    if (cat_id === null || cat_id === undefined || _.includes(cat_id, "FILTER LIST") ||  _.includes(cat_id, "Alphabetical")){
                        category_id = "all";
                    } else {
                        category_id = this.findCategoryByName(cat_id).id;
                    }
                    
                    if (category_id == "all") {
                        this.sortByStores = true;
                    } else {
                        this.sortByStores = false;
                        var find = this.findCategoryById;
                        var filtered = _.filter(this.processedStores, function(o) {return _.indexOf(o.categories, _.toNumber(category_id)) > -1; });
                        _.forEach(filtered, function(value, i) {
                            value.currentCategory = find(category_id).name;
                        });
                        sortedCats = _.groupBy(filtered, store => store.currentCategory);
                        this.filteredStores = sortedCats;
                    }
                }
            }
        });
    });
</script>
