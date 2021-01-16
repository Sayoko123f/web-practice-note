let vm = new Vue({
    el: '#list',
    data: {
        mode: 'a',
        newWork: '',
        works: []
    },
    methods: {
        add(e) {
            let str = this.newWork;
            if (str) {
                let newobj = {
                    main:str,
                    show:false,
                    finish:false,
                    checked:false
                };
                this.works.push(newobj);
                this.newWork = '';
            }
        },
        del(i) {
            Vue.delete(this.works, i);
        },
        edit(i) {
            if (!this.works[i].show) {
                this.works[i].show = true;
            } else {
                this.works[i].show = false;
            }
        },
        viewMode() {
            switch (this.mode) {
                case 'a': return this.works;
                case 'b': return this.works.filter(work => work.checked == true);
                case 'c': return this.works.filter(work => work.checked == false);
            }
        }
    }

});