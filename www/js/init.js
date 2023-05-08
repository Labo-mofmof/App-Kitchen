var gv = {
	activeSlideId: 'slide-home',
    calendarStartDate: null,
    editDate: null,
    editMealtime: '2',
    ozenInstance: null,
    shoppingListId: null
};
var slideTo = function(slideId) {
	AnimateTransition({
		container: '.animation-container',
		blockIn: '.animation-container__block[data-id="' + slideId + '"]',
		blockOut: '.animation-container__block[data-id="' + gv.activeSlideId + '"]',
		animation: 'slide-out',
		onTransitionEnd: function (blockIn, blockOut, container, event) {
			if(null !== blockIn) {
				blockIn.setAttribute('data-block', 'out');
			}
    			if('slide-home' === $(blockIn).data('id')) {
				$('h1 span').text('今日の献立');
				initSlideHome();
			}
    			if('slide-recipe' === $(blockIn).data('id')) {
				$('h1 span').text('献立をたてる');
				initSlideRecipe();
			}
    			if('slide-calendar' === $(blockIn).data('id')) {
				$('h1 span').text('カレンダー');
				initSlideCalendar();
			}
    			if('slide-shopping' === $(blockIn).data('id')) {
				$('h1 span').text('買い物リスト');
				initSlideShopping();
			}
    			if('slide-checklist' === $(blockIn).data('id')) {
				$('h1 span').text('買い物リスト');
				initSlideChecklist();
			}
    			if('slide-settings' === $(blockIn).data('id')) {
				$('h1 span').text('設定');
				initSlideSettings();
			}
			if(null !== blockOut) {
				blockOut.setAttribute('data-block', 'in');
				container.appendChild(blockOut);
				gv.activeSlideId = slideId;
			}
		}
	});
};
function init() {
    $('.home-btn').on('click', function() {
		slideTo($(this).data('to'));
	});
    $('.top-bar-menu, #sidemenu').on('click', function() {
		$('.top-bar-menu, #sidemenu').toggleClass('active');
	});
	$('#settingBtn').on('click', function() {
		$('#recipe-search-setting').toggleClass('active');
	});
	// カレンダー初期設定
	var date = new Date();
	//削除：日曜日始まりにする
	//date.setDate(date.getDate() - date.getDay());
	gv.calendarStartDate = date;
    // カレンダー欄押下
    $(document).on("click", "#weeklyCalendarTable th, #weeklyCalendarTable td", function () {
		var calendarDate = new Date($(this).data('date'));
		gv.editDate = calendarDate;
		var dateString = formatDate(calendarDate, 'YYYY-MM-DD');
		$('#weeklyCalendarTable .active, #calendarMenuTable .active').removeClass('active');
		$('#weeklyCalendarTable th[data-date="' + dateString + '"], #weeklyCalendarTable td[data-date="' + dateString + '"]').addClass('active');
		$('#calendarMenu li').text('');
		$('li[data-role="rice"], li[data-role="soup"], li[data-role="add"]').remove();
		accessDatabase('SELECT id, date, position, recipeId, mealtime FROM MenuTable WHERE date = "' + dateString + '"',
			function(tx, res) {
				if(res.rows.length) {
					accessDatabase('SELECT name, date, mealtime FROM AdditionalMenuTable WHERE date = "' + dateString + '"',
						function(tx2, res2) {
							for(var i=0;i<res.rows.length;i++) {
								var item = res.rows.item(i);
								var recipe = getRecipe(item.recipeId, item.position);
								var insertElement = $('#calendarMenu .calendar-menu[data-index="' + item.mealtime + '"]');
								insertElement.find('li[data-role="' + item.position + '"]').text(recipe.name);
							}
							$('#calendarMenu .calendar-menu li[data-role="main"]:parent').each(function() {
								$(this).parent().append('<li data-role="rice">ごはん</li>');
							});
							/* スープ表示
							$('#calendarMenu ul').each(function() {
								if($(this).text().length) {
									$(this).append('<li data-role="soup">スープ</li>');
								}
							});
							*/
							for(var j=0;j<res2.rows.length;j++) {
								var item2 = res2.rows.item(j);
								$('#calendarMenu .calendar-menu[data-index="' + item.mealtime + '"] ul').append('<li data-role="add">' + item2.name + '</li>');
							}
						}
					);
				}
			}
		);
		// メモ表示
		$('#calendarMemo').text('');
		accessDatabase('SELECT id, date, memo FROM MemoTable WHERE date = "' + dateString + '"',
			function(tx, res) {
				if(res.rows.length) {
					$('#calendarMemo').text(res.rows.item(0).memo);
				}
			}
		);
    });
    // カレンダーメニュー欄押下
    $(document).on("click", "#calendarMenuTable th, #calendarMenuTable td", function () {
	    var dataIndex = $(this).attr('data-index');
		gv.editMealtime = dataIndex;
		$("#calendarMenuTable .active").removeClass('active');
		$("#calendarMenuTable th").eq(dataIndex).addClass('active');
		$("#calendarMenuTable td").eq(dataIndex).addClass('active');
		if($("#calendarMenuTable td").eq(dataIndex).find('ul').text().length) {
			$('#editCalendarMenuBtn').removeClass('hide');
			$('#createCalendarMenuBtn').addClass('hide');
		} else {
			$('#editCalendarMenuBtn').addClass('hide');
			$('#createCalendarMenuBtn').removeClass('hide');
		}
	});
	// カレンダーメモ欄押下
	$(document).on("click", "#calendarMemo", function () {
		var dateString = formatDate(gv.editDate, 'YYYY-MM-DD');
		if ($(this).is(':empty')){
			var memo = window.prompt("メモを追加", "");
			if('' !== memo && null !== memo) {
				accessDatabase('INSERT INTO MemoTable (id, date, memo) VALUES ("' + Date.now() + '", "' + dateString + '", "' + memo + '")');
				initSlideCalendar();
			}
		} else {
			var memo = window.prompt("メモを編集", $(this).text());
			if('' !== memo && null !== memo) {
				accessDatabase('UPDATE MemoTable SET memo = "' + memo + '" WHERE date = "' + dateString + '"');
				initSlideCalendar();
			}
		}
	});
	// カレンダー週変更
	$('#tablePagenaterLeft').on('click', function() {
		var date = gv.calendarStartDate;
		date.setDate(date.getDate() - 7);
		gv.calendarStartDate = date;
		initSlideCalendar();
	});
	$('#tablePagenaterRight').on('click', function() {
		var date = gv.calendarStartDate;
		date.setDate(date.getDate() + 7);
		gv.calendarStartDate = date;
		initSlideCalendar();
	});
	// カレンダー今日表示
	$('#showTodayCalendarBtn').on('click', function() {
		gv.calendarStartDate = new Date();
		initSlideCalendar();
	});
	// 献立をたてるボタン押下
	$('#kitchenForTodayCreate').on('click', function() {
		slideTo('slide-recipe');
	});
	// 献立を編集するボタン押下
	$('#editCalendarMenuBtn, #createCalendarMenuBtn').on('click', function() {
		slideTo('slide-recipe');
	});
	// 再作成ボタン押下
	$('#researchBtn').on('click', function() {
		if(window.confirm('献立を再作成します。よろしいですか？')) {
			gv.ozenInstance.updateData({
				data: getMenu({
					days: 1,
					people: $('#recipe-people').val()
				}),
				people: $('#recipe-people').val()
			});
		}
	});
	// 確定ボタン押下
	$('#commitBtn').on('click', function() {
		// 献立保存
		var data = gv.ozenInstance.getData();
		var date = data.startDate;
		var dateString = formatDate(date, 'YYYY-MM-DD');
		accessDatabase('DELETE FROM MenuTable WHERE date = "' + dateString + '" AND mealtime = "' + gv.editMealtime + '"');
		accessDatabase('DELETE FROM AdditionalMenuTable WHERE date = "' + dateString + '" AND mealtime = "' + gv.editMealtime + '"');
		for(var i=0; i<data.data.length; i++) {
			var menu = data.data[i];
			if(0 !== menu.food && 'なし' !== menu.food.name) {
				accessDatabase('INSERT INTO MenuTable (id, date, position, recipeId, people, mealtime) VALUES ("' + Date.now() + '", "' + dateString + '", "food", "' + menu.food.id + '", "' + data.people + '", "' + gv.editMealtime + '")');
			} else if(0 !== menu.main && 'なし' !== menu.main.name) {
				accessDatabase('INSERT INTO MenuTable (id, date, position, recipeId, people, mealtime) VALUES ("' + Date.now() + '", "' + dateString + '", "main", "' + menu.main.id + '", "' + data.people + '", "' + gv.editMealtime + '")');
			}
			if(0 !== menu.side && 'なし' !== menu.side.name) {
				accessDatabase('INSERT INTO MenuTable (id, date, position, recipeId, people, mealtime) VALUES ("' + Date.now() + '", "' + dateString + '", "side", "' + menu.side.id + '", "' + data.people + '", "' + gv.editMealtime + '")');
			}
			date.setDate(date.getDate() + 1);
		}
		date.setDate(date.getDate() - 1);
		for(var i=0; i<data.additionalMenu.length; i++) {
			for(var j=0; j<data.additionalMenu[i].length; j++) {
				accessDatabase('INSERT INTO AdditionalMenuTable (id, name, date, mealtime) VALUES ("' + Date.now() + '", "' + data.additionalMenu[i][j].name + '", "' + dateString + '", "' + gv.editMealtime + '")');
			}
		}
		alert('献立を保存しました');
		slideTo('slide-calendar');
		$('#mkitchen').empty();
		$('#recipe-search-setting').addClass('active');
	});
	// 買い物リスト作成日付
	var todayString = formatDate(new Date(), 'YYYY-MM-DD');
	$('#shopping-start').val(todayString);
	$('#shopping-end').val(todayString);
	// 買い物リスト作成ボタン押下
	$('#createShoppingListBtn').on('click', function() {
		var shoppingStartDate = new Date($('#shopping-start').val());
		var shoppingEndDate = new Date($('#shopping-end').val());
		if(shoppingEndDate < shoppingStartDate) {
			alert('開始日は終了日より前の日付を設定してください');
			return;
		}
		if(2764800000 < (shoppingEndDate - shoppingStartDate)) {
			alert('期間は1ヶ月未満にしてください');
			return;
		}
		shoppingStartDate = formatDate(shoppingStartDate, 'YYYY-MM-DD');
		shoppingEndDate = formatDate(shoppingEndDate, 'YYYY-MM-DD');
		var shoppingListId = Date.now();
		accessDatabase('INSERT INTO ShoppingListTable (id, startDate, endDate) VALUES ("' + shoppingListId + '", "' + shoppingStartDate + '", "' + shoppingEndDate + '")');
		accessDatabase('SELECT id, date, position, recipeId, people FROM MenuTable WHERE date >= "' + shoppingStartDate + '" AND "' + shoppingEndDate + '" >= date ORDER BY date',
			function(tx, res) {
				if(res.rows.length) {
					for(var i=0;i<res.rows.length;i++) {
						var menu = res.rows.item(i);
						var recipe = getRecipe(menu.recipeId, menu.position);
						for(var j=0; j<recipe.foodList.length; j++) {
							accessDatabase('INSERT INTO ShoppingListItemTable (id, listId, foodId, amount, isChecked, recipeId) VALUES ("' + Date.now() + '", "' + shoppingListId + '", "' + recipe.foodList[j].id + '", "' + (Number(recipe.foodList[j].g) * Number(menu.people)) + '", "false", "' + recipe.id + '")');
						}
					}
					initSlideShopping();
				} else {
					accessDatabase('DELETE FROM ShoppingListTable WHERE id = "' + shoppingListId + '"');
					alert('指定した期間に献立がありません。開始日または終了日を変更してください。');
				}
			}
		);
	});
	// 買い物リスト押下
	$(document).on("click", "#shoppingList li", function() {
		gv.shoppingListId = $(this).data('id');
		slideTo('slide-checklist');
	});
	// 買い物リストチェックボタン押下
	$(document).on("click", "#shoppingItemList .shopping-item-checkbox", function() {
		var flg = 'true';
		var elm = $(this).parent('li');
		if('true' === elm.attr('data-checked')) {
			flg = 'false';
		}
		elm.attr('data-checked', flg);
		accessDatabase('UPDATE ShoppingListItemTable SET isChecked = "' + flg + '" WHERE id = "' + elm.data('id') + '"');
	});
	// 買い物リスト開閉ボタン押下
	$(document).on("click", "#shoppingItemList .shopping-item-toggle", function() {
		if($(this).hasClass('fa-angle-up')) {
			$(this).attr('class', 'shopping-item-toggle fas fa-angle-down');
		} else {
			$(this).attr('class', 'shopping-item-toggle fas fa-angle-up');
		}
		$(this).parent().parent('li').find('.shopping-item-details').toggleClass('hide');
	});
	// 買い物リストに戻るボタン押下
	$('.goToSlideShopping').on('click', function() {
		slideTo('slide-shopping');
	});
	initSlideHome();
}
function initSlideHome() {
    // 今日の献立
	var todayString = formatDate(new Date(), 'YYYY-MM-DD');
	gv.editDate = new Date();
	accessDatabase('SELECT id, date, position, recipeId, people, mealtime FROM MenuTable WHERE date = "' + todayString + '" AND mealtime = "2"',
		function(tx, res) {
			if(res.rows.length) {
				$('#kitchenForTodayNone').addClass('hide');
				accessDatabase('SELECT name, date, mealtime FROM AdditionalMenuTable WHERE date = "' + todayString + '" AND mealtime = "2"',
					function(tx2, res2) {
						var todaysMenu = {
							food: null,
							main: null,
							side: null,
							soup: null
						};
						for(var i=0;i<res.rows.length;i++) {
							var role = res.rows.item(i).position;
							var todaysMenuRecipe = getRecipe(res.rows.item(i).recipeId, role);
							if(role === 'food') {
								todaysMenu.food = todaysMenuRecipe;
							} else if(role === 'main') {
								todaysMenu.main = todaysMenuRecipe;
								todaysMenu.food = 0;
							} else if(role === 'side') {
								todaysMenu.side = todaysMenuRecipe;
							}
							if(todaysMenuRecipe.hasSoup) {
								todaysMenu.soup = 0;
							}
						}
						var additionalMenu = [];
						for(var i=0;i<res2.rows.length;i++) {
							additionalMenu.push(res2.rows.item(i).name);
						}
						$('#kitchenForToday').ozen({
							titles: ['Today'],
							data: [todaysMenu],
							people: res.rows.item(0).people,
							additionalMenu: [additionalMenu],
							isEditMode: false
						});
					}
				);
			} else {
				$('#kitchenForTodayNone').removeClass('hide');
			}
		}
	);
}
function initSlideRecipe() {
	var dayString = formatDate(gv.editDate, 'YYYY-MM-DD');
	accessDatabase('SELECT id, date, position, recipeId, people, mealtime FROM MenuTable WHERE date = "' + dayString + '" AND mealtime = "' + gv.editMealtime + '"',
		function(tx, res) {
			var title = formatDate(gv.editDate, 'MM/DD', true) + '(' + '日月火水木金土'[gv.editDate.getDay()] + ')' + '朝昼夜'[gv.editMealtime];
			if(res.rows.length) {
				accessDatabase('SELECT name, date, mealtime FROM AdditionalMenuTable WHERE date = "' + dayString + '" AND mealtime = "' + gv.editMealtime + '"',
					function(tx2, res2) {
						var dayMenu = {
							food: null,
							main: null,
							side: null,
							soup: null
						};
						for(var i=0;i<res.rows.length;i++) {
							var role = res.rows.item(i).position;
							var dayMenuRecipe = getRecipe(res.rows.item(i).recipeId, role);
							if(role === 'food') {
								dayMenu.food = dayMenuRecipe;
							} else if(role === 'main') {
								dayMenu.main = dayMenuRecipe;
								dayMenu.food = 0;
							} else if(role === 'side') {
								dayMenu.side = dayMenuRecipe;
							}
							if(dayMenuRecipe.hasSoup) {
								dayMenu.soup = 0;
							}
						}
						var additionalMenu = [];
						for(var i=0;i<res2.rows.length;i++) {
							additionalMenu.push(res2.rows.item(i).name);
						}
						gv.ozenInstance = $('#mkitchen').ozen({
							titles: [title],
							data: [dayMenu],
							people: res.rows.item(0).people,
							additionalMenu: [additionalMenu],
							startDate: gv.editDate
						});
					}
				);
			} else {
				gv.ozenInstance = $('#mkitchen').ozen({
					titles: [title],
					data: getMenu({
						days: 1,
						people: $('#recipe-people').val()
					}),
					people: Number($('#recipe-people').val()),
					startDate: gv.editDate
				});
			}
		}
	);
}
function initSlideCalendar() {
	var date = gv.calendarStartDate;
	var startDate = formatDate(date, 'YYYY-MM-DD');
	date.setDate(date.getDate() + 7);
	var endDate = formatDate(date, 'YYYY-MM-DD');
	date.setDate(date.getDate() - 7);
	// 週間テーブル表示
	for(var i=0; i<7; i++) {
		var dateLabel = formatDate(date, 'YYYY-MM-DD');
		var dateTitleTag = '<div class="weekly-calendar-date">' + formatDate(date, 'MM/DD', true) + '</div><div class="weekly-calendar-day">' + '日月火水木金土'[date.getDay()] + '</div>';
		$('#weeklyCalendarTable thead tr.date th').eq(i).attr('data-date', dateLabel).attr('data-day', date.getDay()).html(dateTitleTag);
		$('#weeklyCalendarTable tbody tr.summary td').eq(i).attr('data-date', dateLabel);
		date.setDate(date.getDate() + 1);
	}
	date.setDate(date.getDate() - 7);
	//$('#weeklyCalendar').find('[data-date="' + formatDate(new Date(), 'YYYY-MM-DD') + '"]').addClass('today');
	
	// 献立数表示
	$('#weeklyCalendarTable tr.summary i').addClass('hide');
	accessDatabase('SELECT date, mealtime FROM MenuTable WHERE date >= "' + startDate + '" AND "' + endDate + '" >= date GROUP BY mealtime, date ORDER BY date',
		function(tx, res) {
			if(res.rows.length) {
				for(var i=0;i<res.rows.length;i++) {
					var item = res.rows.item(i);
					$('#weeklyCalendarTable tbody tr.summary td[data-date="' + item.date + '"] i').eq(item.mealtime).removeClass('hide');
				}
			}
		}
	);
	// 表示初期化
	$('#weeklyCalendarTable .active, #calendarMenuTable .active').removeClass('active');
	$('#editCalendarMenuBtn, #createCalendarMenuBtn').addClass('hide');
	$('.calendar-menu li').empty();
	$('#calendarMemo').text('');
	$('#weeklyCalendarTable th[data-date="' + formatDate(gv.editDate, 'YYYY-MM-DD') + '"]').click();
}
function initSlideShopping() {
	accessDatabase('SELECT id, startDate, endDate FROM ShoppingListTable',
		function(tx, res) {
			if(res.rows.length) {
				var shoppingListTags = '';
				for(var i=0;i<res.rows.length;i++) {
					var item = res.rows.item(i);
					var startDate = formatDate(item.startDate, 'MM/DD', true);
					var endDate = formatDate(item.endDate, 'MM/DD', true);
					var itemLabel = startDate + '～' + endDate;
					if(startDate === endDate) {
						itemLabel = startDate;
					}
					itemLabel += 'の買い物リスト';
					shoppingListTags += '<li data-id="' + item.id + '"><i class="fas fa-list"></i>' + itemLabel + '</li>';
				}
				$('#shoppingList').html(shoppingListTags);
			}
		}
	);
}
function initSlideChecklist() {
	accessDatabase('SELECT id, listId, foodId, amount, isChecked, recipeId FROM ShoppingListItemTable WHERE listId = "' + gv.shoppingListId + '" ORDER BY foodId',
		function(tx, res) {
			if(res.rows.length) {
				var listTags = '';
				var listDetailTags = '';
				var totalAmount = 0;
				for(var i=0;i<res.rows.length;i++) {
					var item = res.rows.item(i);
					var food = getFood(item.foodId);
					var canInsertListTags = false;
					if((i+1) < res.rows.length) {
						if(res.rows.item(i+1).foodId !== food.id) {
							canInsertListTags = true;
						}
					} else if((i+1) == res.rows.length) {
						canInsertListTags = true;
					}
					listDetailTags += '<li>';
					listDetailTags += '<div class="shopping-recipe-name">' + getRecipe(item.recipeId).name + '</div>';
					listDetailTags += '<div class="shopping-item-amount">' + decimalToFraction(item.amount) + food.unit + '</div>';
					listDetailTags += '</li>';
					totalAmount += Number(item.amount);

					if(canInsertListTags) {
						listTags += '<li data-id="' + item.id + '" data-location="' + food.location + '" data-checked="' + item.isChecked + '">';
						listTags += '<div class="shopping-item-label">';
						listTags += '<i class="shopping-item-toggle fas fa-angle-down"></i>';
						listTags += '<i class="shopping-item-location fas ' + getLocationIconClass(food.location) + '"></i>';
						listTags += '<div class="shopping-item-name">' + food.name + '</div>';
						listTags += '<div class="shopping-item-amount">' + decimalToFraction(totalAmount) + food.unit + '</div>';
						listTags += '</div>';
						listTags += '<i class="shopping-item-checkbox fas fa-check-circle"></i>';
						listTags += '<i class="shopping-item-checkbox far fa-circle"></i>';
						listTags += '<ul class="shopping-item-details hide">' + listDetailTags + '</ul>';
						listTags += '</li>';
						totalAmount = 0;
						listDetailTags = '';
					}
				}
				$('#shoppingItemList').html(listTags);
			}
		}
	);
}
function initSlideSettings() {
	/*
	accessDatabase('SELECT key, value FROM SettingTable',
		function(tx, res) {
			if(res.rows.length) {
				for(var i=0;i<res.rows.length;i++) {
					var item = res.rows.item(i);
					if('people' === item.key) {
						$('#setting-people').val(item.value);
					}
					if('days' === item.key) {
						$('#setting-days').val(item.value);
					}
				}
			}
		}
	);
	*/
}
function getLocationIconClass(location) {
	switch (location) {
		case '1':
			return 'fa-bread-slice';
		case '2':
			return 'fa-leaf';
		case '3':
			return 'fa-wine-bottle';
		case '4':
			return 'fa-wine-bottle';
		case '5':
			return 'fa-brain';
		case '6':
			return 'fa-leaf';
		case '7':
			return 'fa-apple-alt';
		case '8':
			return 'fa-leaf';
		case '9':
			return 'fa-water';
		case '10':
			return 'fa-fish';
		case '11':
			return 'fa-drumstick-bite';
		case '12':
			return 'fa-egg';
		case '13':
			return 'fa-cheese';
	}
	return '';
}
function formatDate(date, format, notZeroPadding) {
	date = new Date(date);
	if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
	format = format.replace(/YYYY/g, date.getFullYear());
	if(notZeroPadding) {
		format = format.replace(/MM/g, (date.getMonth() + 1));
		format = format.replace(/DD/g, date.getDate());
		format = format.replace(/hh/g, date.getHours());
		format = format.replace(/mm/g, date.getMinutes());
		format = format.replace(/ss/g, date.getSeconds());
	} else {
		format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
		format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
		format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
		format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
		format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
	}
	if (format.match(/S/g)) {
		var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
		var length = format.match(/S/g).length;
		for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
	}
	return format;
};
function decimalToFraction(_decimal) {
	var positiveNumber = Math.floor(_decimal);
	var decimalNumber = 0;
	var decimal = _decimal - positiveNumber;
	if(0 !== decimal) {
		if(decimal <= 0.125) {
			if(0 < positiveNumber) {
				decimalNumber = 0;
			} else {
				decimalNumber = '1/4';
			}
		} else if(decimal <= 0.25) {
			decimalNumber = '1/4';
		} else if(decimal <= 0.5) {
			decimalNumber = '1/2';
		} else if(decimal <= 0.75) {
			decimalNumber = '3/4';
		} else if(decimal <= 0.875) {
			decimalNumber = 0;
			positiveNumber++;
		}
		if(0 !== positiveNumber) {
			formattedText = 'と';
		}
		formattedText += decimalNumber;
	}
	var formattedText = '';
	if(0 !== positiveNumber) {
		formattedText = positiveNumber;
	}
	if(0 !== decimalNumber) {
		if(0 !== positiveNumber) {
			formattedText += 'と';
		}
		formattedText += decimalNumber;
	}
	return formattedText;
};
function sort_by(field, reverse, primer) {
	reverse = (reverse) ? -1 : 1;
	return function(a,b){
		 a = a[field];
		 b = b[field];
		 if (typeof(primer) != 'undefined'){
			  a = primer(a);
			  b = primer(b);
		 }
		 if (a<b) return reverse * -1;
		 if (a>b) return reverse * 1;
		 return 0;
	}
}
/* Database */
if(typeof device === 'undefined'){
    var drEvent = typeof cordova === 'undefined' ? 'DOMContentLoaded' : 'deviceready';
	document.addEventListener(drEvent, onDeviceReady, false);
}else{
	onDeviceReady();
}
function onDeviceReady() {
	var db = openDB();
	db.transaction(executeQuery, errorCB);
}
function openDB() {
	return window.openDatabase("database", "1.0", "MsKitchenDatabase", 1000000);
}
function executeQuery(tx) {
	// Menu (position=food, main, side), (mealtime=0:breakfast, 1:lunch, 2:dinner)
	tx.executeSql('DROP TABLE IF EXISTS MenuTable');
	tx.executeSql('CREATE TABLE IF NOT EXISTS MenuTable (id AUTO_INCREMENT, date, position, recipeId, people, mealtime)');
	// AdditionalMenu
	tx.executeSql('DROP TABLE IF EXISTS AdditionalMenuTable');
	tx.executeSql('CREATE TABLE IF NOT EXISTS AdditionalMenuTable (id AUTO_INCREMENT, name, date, mealtime)');
	// Memo
	tx.executeSql('DROP TABLE IF EXISTS MemoTable');
	tx.executeSql('CREATE TABLE IF NOT EXISTS MemoTable (id AUTO_INCREMENT, date, memo)');
	// ShoppingList
	tx.executeSql('DROP TABLE IF EXISTS ShoppingListTable');
	tx.executeSql('CREATE TABLE IF NOT EXISTS ShoppingListTable (id AUTO_INCREMENT, startDate, endDate)');
	// ShoppingListItem
	tx.executeSql('DROP TABLE IF EXISTS ShoppingListItemTable');
	tx.executeSql('CREATE TABLE IF NOT EXISTS ShoppingListItemTable (id AUTO_INCREMENT, listId, foodId, amount, isChecked, recipeId)');
	// Settings
	//tx.executeSql('DROP TABLE IF EXISTS SettingTable');
	//tx.executeSql('CREATE TABLE IF NOT EXISTS SettingTable (id AUTO_INCREMENT, key, value)');
	//tx.executeSql('INSERT IGNORE INTO SettingTable (key, value) VALUES ("people", "3")');
	//tx.executeSql('INSERT IGNORE INTO SettingTable (key, value) VALUES ("days", "3")');

	// Test Data
	//tx.executeSql('INSERT INTO MenuTable (date, position, recipeId) VALUES ("2019-03-24", "food", "1553305882142")');
	//tx.executeSql('INSERT INTO MenuTable (date, position, recipeId) VALUES ("2019-03-24", "side", "1553332117795")');
	//tx.executeSql('INSERT INTO AdditionalMenuTable (name, date) VALUES ("サラダ", "2019-03-24")');
	//tx.executeSql('INSERT INTO AdditionalMenuTable (name, date) VALUES ("漬物", "2019-03-24")');

	init();
}
function errorCB(err) {
	console.log("Error occured while executing SQL: " + err.code);
}
function accessDatabase(sql, successFunction) {
	var db = openDB();
	db.transaction(function(tx) {
		tx.executeSql(sql, [], successFunction, errorCB);
	}, errorCB);
}