import BaseElement from '../../element/mixins/BaseElement'

export default {
    mixins: [ BaseElement ],
    props: {
        kompoid: { type: String, required: false },
        kompoinfo: { type: String, required: false }
    },
	computed: {

        $_kompoInfo() { return this.kompoinfo }, //coming from blade menu

        $_submitsOnInput(){ return this.$_config('submitsOnInput') },
        $_hideIndicators(){ return this.$_config('hideIndicators') },

        $_keepOpen(){ return this.$_config('keepOpen') },
        $_getFreshForm(){ return this.$_config('getFreshForm') },

        $_sortsQuery(){ return this.$_config('sortsQuery') },
        $_sortValue(){ return this.$_sortsQuery }, //overriden in Field and Th

        $_revertsPanel(){ return this.$_config('revertsPanel') },
        $_revertsFormRow(){ return this.$_config('revertsFormRow') },
        
        $_debouncedSubmit(){ return _.debounce(this.$_submit, this.$_submitsOnInput)}

    },
    methods:{
        $_getPathById(id, path){
            if(this.$_elKompoId == id)
                return path.substring(1) //because the first . should not be taken into account
        },
        $_togglesForm(toggleId){
            if(toggleId || this.$_toggleId)
                this.$kompo.vlToggle(this.kompoid, toggleId || this.$_toggleId)
        },
        $_submit(){
            this.$_state({ loading: true })
            this.$kompo.vlSubmit(this.kompoid, this)
        },
        $_resetSort(exceptId) {
            if(this.$_sortsQuery && this.$_elKompoId != exceptId){
                this.$_state({ activeSort: false })
                this.$_resetSortValue()
            }
        },
        $_resetSortValue(){}, //overriden in Field
        $_revertPanel(){
            if(this.$_revertsPanel)
                this.$_closestParentOfType('VlFormPanel').revertPanel()
        },
        $_revertFormRow(){
            if(this.$_revertsFormRow)
                this.$_closestParentOfType('VlMultiForm').revertFormRow(this.$_elKompoId)
        },
        $_closestParentOfType(type){
            let vm = this.$parent
            while(vm && vm.$options._componentTag !== type) { vm = vm.$parent }
            return vm 
        },

    }
}