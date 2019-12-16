<template>
    <footer v-if="dataLoaded" v-cloak>
        <section class="footer_menu main_container">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-4">
                    <p class="footer_heading">DIRECTIONS</p>
                    <iframe :src="siteInfo.googleMapURL" width="100%" height="130" frameborder="0" style="border:0" allowfullscreen></iframe>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4 footer_newsletter">
                    <p class="footer_heading">NEWSLETTER SUBSCRIPTION</p>
                    <p>Stay up to date on the latest news from {{ property.name }}!</p>
                    <form id="subForm" class="js-cm-form" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="92D4C54F0FEC16E5ADC2B1904DE9ED1A4C1EA850C2E9F4EEFED1DC797957CE341B46B7665E717F14E746133C2D8B319DDB61590953A515B88015F90954685508">	
                        <label class="accessibility" for="fieldEmail">Email</label>
                        <input id="fieldEmail" name="cm-yddyhyr-yddyhyr" type="email" class="js-cm-email-input" placeholder="Your Email" required />
                        <button id="newsletter_submit" class="js-cm-submit-button" type="submit">Subscribe To Our Newsletter</button>
                    </form>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <p class="footer_heading">FOLLOW US ON FACEBOOK</p>
                    <vue-facebook-page :data-href="siteInfo.facebook" :link-text="property.name"></vue-facebook-page>
                </div>
            </div>
        </section>
        <section class="footer_privacy ">
            <div class="main_container row">
                <div>
                    <p class="footer_text">
                        <a :href="siteInfo.leasing" target="_blank">Leasing</a> |
                        <router-link to="/pages/applevalley-retailer-hub" exact>Retailer Hub</router-link> |
                        <router-link to="/terms-of-use" exact>Terms of Use</router-link> |
                        <a :href="siteInfo.privacy" target="_blank">Privacy Policy</a>
                    </p>
                </div>
                <div>
                    <p class="footer_text text-center">Powered by <a href="https://www.mallmaverick.com/" target="_blank">Mall Maverick</a></p>
                </div>
                <div>
                    <div class="footer_logo">
                        <p class="footer_text">&#169; {{copyright_year}} {{property.name}}</p>
                        <a :href="siteInfo.propertyManagementURL" target="_blank">
                            <img src="//codecloud.cdn.speedyrails.net/sites/5c9a464e6e6f6470e9060000/image/png/1554491926156/LewisRetailCentersWhite11.png" class="property_mgmt" alt="Lewis Retail Centers Logo">
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </footer>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "json!site.json", "vue!vue_facebook", "campaignMonitor"], function (Vue, Vuex, moment, tz, VueMoment, site, vueFacebookPage, campaignMonitor) {
        return Vue.component("footer-component", {
            template: template, // the variable template will be injected,
            data: function data() {
                return {
                    dataLoaded: false,
                    siteInfo: site
                }
            },
            created () {
                this.dataLoaded = true;
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findRepoByName'
                ]),
                copyright_year() {
                    return moment().year();
                },
                getPropertyAddress() {
                    return this.property.address1 + ' ' + this.property.city + ' ' + this.property.country + ' ' + this.property.province_state
                }
            }
        });
    });
</script>