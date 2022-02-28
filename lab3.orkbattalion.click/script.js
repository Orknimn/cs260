Vue.component('star-rating', VueStarRating.default);
let app = new Vue({
    el: '#app',
    data: {
        number: '',
        max: '',
        current: {
            title: '',
            img: '',
            alt: ''
        },
        loading: true,
        addedName: '',
        addedComment: '',
        addedComment: '',
        comments: {},
        ratings: {},
    },
    created() {
        this.xkcd();
    },
    methods: {
        xkcd() {
            let url = 'https://xkcd.now.sh/?comic=';
            if (this.number === '') {
                url += 'latest';
            }
            else {
                url += this.number;
            }
            axios.get(url)
                .then(response => {
                    this.current = response.data;
                    this.loading = false;
                    this.number = response.data.num;
                    return true;
                })
                .catch(error => {
                    this.number = this.max;
                });
        },
        firstComic() {
            this.number = 1;
        },
        previousComic() {
            this.number = this.current.num - 1;
            if(this.number < 1) this.number = 1;
        },
        nextComic() {
            this.number = this.current.num + 1;
            if (this.number > this.max) this.number = this.max;
        },
        lastComic() {
            this.number = this.max;
        },
        getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        randomComic() {
            this.number = this.getRandom(1, this.max);
        },
        getTime() {
            const d = new Date();
            let hour = d.getHours();
            let meridian = "am";
            if(hour >= 12) meridian = "pm";
            hour = hour%12;
            if(hour === 0) {
                hour = 12;
            }
            let time = hour + ":" + d.getMinutes() + meridian;
            return time;
        },
        getDate() {
            const d = new Date();
            return (d.getMonth()+1) + "/"
                + d.getDate() + "/"
                + d.getFullYear();

        },
        addComment() {
            if (!(this.number in this.comments)) {
                Vue.set(app.comments,this.number, new Array);
            }
            this.comments[this.number].push({
                author: this.addedName,
                text: this.addedComment,
                time: this.getTime(),
                date: this.getDate()
            });
            this.addedName = '';
            this.addedComment = '';
        },
        setRating(rating) {
            if (!(this.number in this.ratings)){
                Vue.set(this.ratings,this.number, {
                    sum: 0,
                    total: 0
                });
            }
            this.ratings[this.number].sum += rating;
            this.ratings[this.number].total += 1;
        }
    },
    computed: {
        month() {
            var month = new Array;
            if(this.current.month === undefined) return '';
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            return month[this.current.month - 1];
        },
        getComments() {
            return this.comments[this.number];
        },
        averageRating() {
            if(Object.keys(this.ratings).length === 0)
                return 0;
            else return Math.round(this.ratings[this.number].sum/this.ratings[this.number].total * 10)/10;
        }
    },
    watch: {
        number(value, oldValue) {
            if(oldValue === '') {
                this.max = value;
            }
            else {
                this.xkcd();
            }
        }
    }
});