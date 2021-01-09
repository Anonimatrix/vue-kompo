export default {
    computed: {
    	//by default, one id per element, otherwise concatenate key to id
        $_elementId() { 
        	return key => this.component.id ? (this.component.id + ( key || '' )) : null 
        },
        $_elKompoId() {
        	return this.$_config('X-Kompo-Id')
        }
    }
}
