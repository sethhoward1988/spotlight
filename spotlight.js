(function(){

    DataStructure = function () {
        this.hash = {};
        this.array = [];
        this.count = 0;
    }

    DataStructure.prototype = {

        add: function (key, pair) {
            key = key.toLowerCase();
            this.hash[key] = {
                index: this.count,
                value: pair
            }
            this.array.push(key);
            this.count++;
        },

        remove: function (key) {
            var index = this.hash[key].index;
            var replacement = this.array[this.count - 1]

            this.array[index] = replacement;
            this.hash[replacement].index = index;
            
            this.array.pop();
            delete this.hash[key];
        },

        get: function (key) {
            return this.hash[key].value;
        },

        getAllFor: function (string) {
            if(!string.length){
                return [];
            }
            var results = [];

            for(var i = 0; i < this.count; i++){
                if(this.array[i].indexOf(string) >= 0){
                    results.push(this.array[i]);
                }
            }

            return results;
        }

    }

    var Utility = function () {}

    Utility.prototype = {
        // Merge two hashmaps together, latter attributes take precedence
        merge: function (a, b) {
            for(prop in b){
                a[prop] = b[prop];
            }

            return a;

        },

        createElement: function (html) {
            var el = document.createElement('div');
            el.innerHTML = html;
            return el.childNodes[0];
        },

        addClass: function (el, className) {
            this.alterClass(el, className, true);
        },

        removeClass: function (el, className) {
            this.alterClass(el, className);
        },

        alterClass: function (el, className, add) {
            var classes = el.className.split(' ');
            var added = false;
            var removed = false;
            for(var i = 0, len = classes.length; i < len; i++){
                if(classes[i] == className){
                    if(add){
                        added = true;
                        break;
                    } else {
                        classes.splice(i,1);
                        break;
                    }
                }
            }
            if(add && !added){
                classes.push(className);
            }
            el.className = classes.join(' ');
        },

        bind: function (context, fn) {
            return function () {
                fn.apply(context, arguments);
            }
        }
    }
  
    Spotlight = function () {
        this.initialize.apply(this, arguments);
    }

    Spotlight.prototype = {

        initialize: function () {
            this.options = {
                className: 'spotlight',
                searchBarEl: '<div class="input-container"></div>',
                listItemEl: '<li class="item"><div class="icon"></div></li>'
            }

            this.util = new Utility;
            this.ds = new DataStructure;

            this.options = this.util.merge(this.options, arguments[0]);
            this.data = this.options.data;
            this.el = this.util.createElement(this.options.searchBarEl);
            this.input = this.util.createElement('<input type="text"></input>')
            this.el.appendChild(this.input);
            this.items = this.util.createElement('<ul class="items"></ul>');
            this.el.appendChild(this.items);
            this.setup();
            this.parseData();
        },

        setup: function () {
            this.onInputFocus = this.util.bind(this, this.onInputFocus);
            this.onInputKeyup = this.util.bind(this, this.onInputKeyup);
            this.onInputBlur = this.util.bind(this, this.onInputBlur);

            this.input.addEventListener('focus', this.onInputFocus);
            this.input.addEventListener('keyup', this.onInputKeyup);
            this.input.addEventListener('blur', this.onInputBlur);
        },

        activate: function () {
            this.util.addClass(this.el, 'active');
        },

        deactivate: function () {
            this.util.removeClass(this.el, 'active');
        },

        render: function (array) {
            this.items.innerHTML = '';
            for(var i = 0, len = array.length; i < len; i++){
                this.addListItem(array[i]);
            }
        },

        addListItem: function (title) {
            var item = this.util.createElement(this.options.listItemEl);
            var description = this.util.createElement('<div class="description"></div>');
            var that = this;
            description.innerText = title;
            item.appendChild(description);
            this.items.appendChild(item);
            
            item.addEventListener('click', function () {
                that.onListItemClick(title)
            });
        },

        parseData: function () {
            for(type in this.data) {
                for(var i = 0, len = this.data[type].length; i < len; i++){
                    var obj = this.data[type][i];
                    this.ds.add(obj.title, obj);
                }
            }
        },

        addItem: function (title, fn) {
            this.ds.add(title, fn);
        },

        removeItem: function () {
            this.ds.remove(title, fn);
        },

        onListItemClick: function (title) {
            var obj = this.ds.get(title);
            obj.fn();
        },

        onInputFocus: function () {
            this.activate();
        },

        onInputBlur: function () {
            this.deactivate();
        },

        onInputKeyup: function () {
            this.render(this.ds.getAllFor(this.input.value));
        }
    }

}());