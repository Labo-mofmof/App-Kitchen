(function($) {
	var defaults = {
		data: null,
		onSlideChange: function() {},
		startDate: new Date(),
		isEditMode: true
	};
	function ozen(element, options) {
		this.element = element;
		this.options = $.extend(true, {}, defaults, options);
		this.swiper = null;
		this.activeDay = 0;
		this.activeRole = null;
		this.additionalMenu = [];
		this.dom = {
			recommend: null,
			menuBox: null,
			recipeBox: null,
			recipeBoxButtons: null,
			recipeBoxIngredients: null
		};
		this.init();
	}
	ozen.prototype.init = function() {
		// 初期化
		this.element.empty();
		this.activeDay = 0;
		// メニュー
		var menuBox = document.createElement('div');
		menuBox.className = 'menuBox';
		menuBox.style.width = window.innerWidth + 'px';
		this.element.append(menuBox);
		this.dom.menuBox = $(menuBox);
		// 追加メニュー
        if(this.options.additionalMenu) {
            var additionalMenu = [];
            for(var i=0; i<this.options.additionalMenu.length; i++) {
                additionalMenu.push([]);
                for(var j=0; j<this.options.additionalMenu[i].length; j++) {
                    additionalMenu[i].push(this.getEmptyMenu(this.options.additionalMenu[i][j]));
        	    }
    		}
            this.additionalMenu = additionalMenu;
        } else {
        	for(var i=0; i<this.options.data.length; i++) {
				this.additionalMenu.push([]);
			}
        }
		// おすすめメニュー
		var recommend = document.createElement('ul');
		recommend.className = 'recommendMenu hide';
		this.element.append(recommend);
		this.dom.recommend = $(recommend);

		// レシピ
		var recipeBox = document.createElement('div');
		recipeBox.className = 'recipeBox hide';
		this.element.append(recipeBox);
		this.dom.recipeBox = $(recipeBox);

		// レシピボタン
		var recipeBoxButtons = document.createElement('div');
		recipeBoxButtons.className = 'recipeBoxButtons control-box';
		this.dom.recipeBox.append(recipeBoxButtons);
		this.dom.recipeBoxButtons = $(recipeBoxButtons);

		// レシピ材料
		var recipeBoxIngredients = document.createElement('div');
		recipeBoxIngredients.className = 'recipeBoxIngredients';
		this.dom.recipeBox.append(recipeBoxIngredients);
		this.dom.recipeBoxIngredients = $(recipeBoxIngredients);
		
		this.render();
	};
	ozen.prototype.render = function() {
		var self = this;
		var menu;
		var infoRatio = 28;
		var mainRatio = 40;
		var otherRatio = 16;
		var upperHeight = Math.floor(window.innerWidth * (mainRatio / 100) + 30);
		var menuName = '';
		var getDish = function(_size, _foodList){
			var dish = document.createElement('div');
			dish.className = 'dish';
			dish.style.width = _size + 'px';
			dish.style.height = _size + 'px';
			if(_foodList) {
				var foodIcon_r = _size / 4;
				var angle = 360 / _foodList.length;
				for(var k=0; k<_foodList.length; k++) {
					var foodIcon = document.createElement('div');
					foodIcon.className = 'foodIcon';
					foodIcon.style.backgroundImage = 'url(css/images/foodIcons/' + _foodList[k].id + '.png)';
					foodIcon.style.width = (_size / 2) + 'px';

					var foodIcon_deg = angle * k;
					var foodIcon_x = Math.cos(foodIcon_deg*Math.PI/180) * foodIcon_r + foodIcon_r;
					var foodIcon_y = Math.sin(foodIcon_deg*Math.PI/180) * foodIcon_r + foodIcon_r;
					foodIcon.style.left = Math.floor((_size / 4) + (foodIcon_x - foodIcon_r)) + 'px';
					foodIcon.style.top = Math.floor((_size / 4) + (foodIcon_y - foodIcon_r)) + 'px';

					dish.appendChild(foodIcon);
				}
			}
			return dish;
		};
		var getMenuName = function(_n){
			var name = document.createElement('div');
			name.className = 'pickupMenuName';
			name.appendChild(document.createTextNode(_n));
			return name;
		};
		
		// スライド
		var swipeMenu = document.createElement('div');
		swipeMenu.className = 'swiper-wrapper';
		
		var swipePage = document.createElement('div');
		swipePage.className = 'swiper-pagination';
		
		var swipe = document.createElement('div');
		swipe.className = 'swiper-container';
		swipe.style.width = window.innerWidth + 'px';
		swipe.appendChild(swipeMenu);
		swipe.appendChild(swipePage);
		this.dom.menuBox.empty().append(swipe);
		
		var f = document.createDocumentFragment();
		for(var i=0; i<this.options.data.length; i++) {
			menu = this.options.data[i];
			var div = document.createElement('div');
			div.className = 'swiper-slide';

			// メイン
			var main = document.createElement('div');
			main.className = 'pickupMainDish editableMenu';
			main.style.height = upperHeight + 'px';
			if(null !== menu.main && 0 !== menu.main){
				main.setAttribute('data-id', menu.main.id);
				main.setAttribute('data-role', 'main');
				menuName = menu.main.name;
			} else {
				main.setAttribute('data-id', menu.food.id);
				main.setAttribute('data-role', 'food');
				menuName = menu.food.name;
			}
			main.appendChild(getMenuName(menuName));
			var mainMenu = menu.main || menu.food;
			main.appendChild(getDish(Math.floor(window.innerWidth * ((mainRatio - 4) / 100)), mainMenu.foodList));
			div.appendChild(main);
			main.onclick = function(){self.showRecommend(this); self.showRecipe(this);};

			// サイド
			var side = document.createElement('div');
			side.className = 'pickupSideDish editableMenu';
			side.setAttribute('data-id', menu.side.id);
			side.setAttribute('data-role', 'side');
			side.appendChild(getMenuName(menu.side.name));
			side.appendChild(getDish(Math.floor(window.innerWidth * ((100 - mainRatio - infoRatio - 6) / 100)), menu.side.foodList));
			div.appendChild(side);
			side.onclick = function(){self.showRecommend(this); self.showRecipe(this);};

			// ごはん
			if(0 === menu.food){
				var rice = document.createElement('div');
				rice.className = 'pickupRice';
				rice.appendChild(getMenuName('ごはん'));
				rice.appendChild(getDish(Math.floor(window.innerWidth * (otherRatio / 100))));
				div.appendChild(rice);
			}

			// スープ
			if(0 === menu.soup){
				var soup = document.createElement('div');
				soup.className = 'pickupSoup';
				soup.appendChild(getMenuName('スープ'));
				soup.appendChild(getDish(Math.floor(window.innerWidth * ((otherRatio - 2) / 100))));
				div.appendChild(soup);
			}

			// 情報
			var info = document.createElement('div');
			info.className = 'pickupInfo';
			var dayLabel = document.createElement('div');
			dayLabel.className = 'pickupInfoDayLabel';
			dayLabel.appendChild(document.createTextNode(self.options.titles[i]));
			info.appendChild(dayLabel);
			
			if(this.options.isEditMode) {
				var addButton = document.createElement('div');
				addButton.className = 'addMenu';
				addButton.appendChild(document.createTextNode('＋'));
				addButton.onclick = function(){self.addFreeDish();};
				info.appendChild(addButton);
			}
			
			var infoMenuList = document.createElement('ul');
			var getListItem = function(_t, _index){
				var gli = document.createElement('li');
				gli.setAttribute('data-index', _index);
				if(self.options.isEditMode) {
					var glicancel = document.createElement('div');
					glicancel.className = 'additionalMenuCancel';
					glicancel.appendChild(document.createTextNode('×'));
					glicancel.onclick = function(){self.deleteAdditionalMenu(this);};
					gli.appendChild(glicancel);
				}
				var gliname = document.createElement('div');
				gliname.className = 'additionalMenuName';
				gliname.appendChild(document.createTextNode(_t));
				if(self.options.isEditMode) {
					gliname.onclick = function(){self.modifyAdditionalMenu(this);};
				}
				gli.appendChild(gliname);
				return gli;
			};
			for(var j=0; j<this.additionalMenu[i].length; j++) {
				infoMenuList.appendChild(getListItem(this.additionalMenu[i][j].name, j));
			}
			info.appendChild(infoMenuList);
			div.insertBefore(info, main);
			f.appendChild(div);
		}
		swipeMenu.appendChild(f);
		
		var slide = self.element.find('.swiper-slide').eq(self.activeDay);
		if('food' == self.activeRole || 'main' == self.activeRole) {
			slide.find('.pickupMainDish').addClass('active');
		} else if('side' == self.activeRole) {
			slide.find('.pickupSideDish').addClass('active');
		}
		this.swiper = new Swiper(this.element.find('.swiper-container'), {pagination: {el: '.swiper-pagination',},});
		this.swiper.on('slideChange', function () {
			self.options.onSlideChange();
			if(self.activeDay !== self.swiper.activeIndex) {
				self.dom.recommend.empty();
			}
			self.activeDay = self.swiper.activeIndex;
		});
		this.swiper.slideTo(this.activeDay, 0);
	};
	ozen.prototype.showRecipe = function(elm) {
		var self = this;
		var menu;
		var role = $(elm).data('role');
		switch (role) {
			case 'food':
				menu = self.options.data[self.swiper.activeIndex].food;
				break;
			case 'main':
				menu = self.options.data[self.swiper.activeIndex].main;
				break;
			case 'side':
				menu = self.options.data[self.swiper.activeIndex].side;
				break;
		}
		self.dom.recipeBox.removeClass('hide');
		// レシピ欄ボタン
		self.dom.recipeBoxButtons.empty();
		// レシピを見るボタン
		var showRecipeButton = $('<input type="button" value="&#xf518;  レシピを見る" class="fas">');
		showRecipeButton.on('click', function(){
			navigator.notification.alert('レシピ手順', function(){}, 'レシピ', 'OK');
		});
		self.dom.recipeBoxButtons.append(showRecipeButton);
		// メニュー変更ボタン
		if(this.options.isEditMode) {
			var changeMenuButton = $('<input type="button" value="&#xf2f1;  メニュー変更" class="fas">');
			changeMenuButton.on('click', function(){
				self.dom.recommend.removeClass('hide');
			});
			self.dom.recipeBoxButtons.append(changeMenuButton);
		}
		// レシピ欄材料
		var ingredientsPeople = Number(self.options.people);
		self.dom.recipeBoxIngredients.empty().append('<h3>材料（' + ingredientsPeople + '人分）</h3>');
		var ingredientsUl = document.createElement('ul');
		for(var i=0; i<menu.foodList.length; i++) {
			var food = getFood(menu.foodList[i].id);
			var ingredientsLi = document.createElement('li');
			var ingredientsAmount = Number(menu.foodList[i].g) * ingredientsPeople;
			if('g' !== food.unit) {
				// 材料の数字を調整する
				ingredientsAmount = decimalToFraction(ingredientsAmount);
			}
			ingredientsLi.appendChild(document.createTextNode(food.name + ': ' + ingredientsAmount + food.unit));
			ingredientsUl.appendChild(ingredientsLi);
		}
		self.dom.recipeBoxIngredients.append(ingredientsUl);
	};
	ozen.prototype.showRecommend = function(elm) {
		var self = this;
		var blackList = [];
		for(var i=0; i<this.options.data.length; i++) {
			if(0 !== this.options.data[i].food && null !== this.options.data[i].food) {
				blackList.push(this.options.data[i].food.id);
			}
			if(0 !== this.options.data[i].main && null !== this.options.data[i].main) {
				blackList.push(this.options.data[i].main.id);
			}
			if(0 !== this.options.data[i].side && null !== this.options.data[i].side) {
				blackList.push(this.options.data[i].side.id);
			}
		 }
		var role = $(elm).data('role');
		this.activeRole = role;
		var PICKUP_LENGTH = 3;
		var f = document.createDocumentFragment();
		
		var cancel = document.createElement('li');
		cancel.className = 'cancel';
		cancel.appendChild(document.createTextNode('×'));
		f.appendChild(cancel);
		
		var noneIcon = document.createElement('div');
		noneIcon.className = 'noneIcon';
		var noneLabel = document.createElement('p');
		noneLabel.appendChild(document.createTextNode('なし'));
		var none = document.createElement('li');
		none.className = 'none';
		none.appendChild(noneIcon);
		none.appendChild(noneLabel);
		f.appendChild(none);
		
		var freeIcon = document.createElement('div');
		freeIcon.className = 'freeIcon';
		var freeLabel = document.createElement('p');
		freeLabel.appendChild(document.createTextNode('入力'));
		var free = document.createElement('li');
		free.className = 'free';
		free.appendChild(freeIcon);
		free.appendChild(freeLabel);
		f.appendChild(free);
		
		for(var i=0; i<PICKUP_LENGTH; i++) {
			var menu = getDish(role, blackList);
			blackList.push(menu.id);
			var li = document.createElement('li');
			li.setAttribute('data-id', menu.id);
			li.setAttribute('data-role', role);
			li.className = 'recommendMenuItem';
			var dish = document.createElement('div');
			dish.className = 'dish';
			li.appendChild(dish);
			li.appendChild(document.createTextNode(menu.name));
			f.appendChild(li);
		}
		this.element.find('.recommendMenu').html(f);
		this.element.find('.recommendMenu li.cancel').click(function() {
			self.dom.recommend.addClass('hide');
		});
		this.element.find('.recommendMenu li.none').click(function() {
			self.changeMenu('なし');
		});
		this.element.find('.recommendMenu li.free').click(function() {
			var name = window.prompt("フリーメニューを変更", "");
			if('' !== name && null !== name) {
				self.changeMenu(name);
			}
		});
		this.element.find('.recommendMenu li.recommendMenuItem').click(function() {
			var newRole = $(this).data('role');
			var newRecipe = getRecipe($(this).data('id'), newRole);
			switch (newRole) {
				case 'food':
					self.options.data[self.swiper.activeIndex].food = newRecipe;
					break;
				case 'main':
					self.options.data[self.swiper.activeIndex].main = newRecipe;
					break;
				case 'side':
					self.options.data[self.swiper.activeIndex].side = newRecipe;
					break;
			}
			self.render();
			self.showRecipe(this);
		});
		this.element.find('.editableMenu.active').removeClass('active');
		$(elm).addClass('active');
	};
	ozen.prototype.changeMenu = function(menuTitle) {
		var freeMenu = this.getEmptyMenu(menuTitle);
		switch (this.activeRole) {
			case 'food':
				this.options.data[this.swiper.activeIndex].food = freeMenu;
				break;
			case 'main':
				this.options.data[this.swiper.activeIndex].main = freeMenu;
				break;
			case 'side':
				this.options.data[this.swiper.activeIndex].side = freeMenu;
				break;
		}
		this.render();
	};
	ozen.prototype.getEmptyMenu = function(title) {
		return {
			canFrozen: false,
			foodList: [],
			hasSoup: false,
			id: "freeInput" + Date.now(),
			name: title,
			seasoningList: []
		};
	};
	ozen.prototype.addFreeDish = function() {
		var name = window.prompt("フリーメニューを追加", "");
		if('' !== name && null !== name) {
			this.additionalMenu[this.swiper.activeIndex].push(this.getEmptyMenu(name));
			this.render();
		}
	};
	ozen.prototype.modifyAdditionalMenu = function(elm) {
		var index = $(elm).parent().data('index');
		var name = window.prompt("フリーメニューを編集", $(elm).text());
		if('' !== name && null !== name) {
			this.additionalMenu[this.swiper.activeIndex][index].name = name;
			this.render();
		}
	};
	ozen.prototype.deleteAdditionalMenu = function(elm) {
		var index = $(elm).parent().data('index');
		if(window.confirm($(elm).parent().find('.additionalMenuName').text() + "　を削除してもよろしいですか？")) {
			this.additionalMenu[this.swiper.activeIndex].splice(index, 1);
			this.render();
		}
	};
	ozen.prototype.updateData = function(_data) {
		this.options.data = _data.data;
		this.options.people = _data.people;
		this.init();
	};
	ozen.prototype.getData = function() {
		return {
			data: this.options.data,
			additionalMenu: this.additionalMenu,
			startDate: this.options.startDate,
			people: this.options.people
		};
	};
	$.fn.ozen = function(options){
		return new ozen($(this), options);
	};
})(jQuery);