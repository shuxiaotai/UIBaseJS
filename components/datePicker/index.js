(function () {
    let datepicker = {};

    datepicker.getMonthData = function(year, month) {
        let result = [];
        if(!year || !month) {  //year和month为空的处理
            let today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }
        let firstDay = new Date(year, month - 1, 1);   //这个月的第一天
        let fisrtDayWeekDay = firstDay.getDay();
        if(fisrtDayWeekDay === 0) fisrtDayWeekDay = 7;

        let lastDayOfLastMonth = new Date(year, month - 1, 0);   //上个月的最后一天
        let lastDateOfLastMonth = lastDayOfLastMonth.getDate();
        let distanceNums = fisrtDayWeekDay - 1;

        let lastDay = new Date(year, month, 0);   //这个月的最后一天
        let lastDate = lastDay.getDate();

        for (let i = 0; i < 6 * 7; i++) {    //显示为6*7=42天
            let date = i - distanceNums + 1;
            let showDate = date;
            let showMonth = month;
            if(date <= 0) {   //date小于0表示上个月
                showMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            }else if(date > lastDate) {  //大于本月最后一天，表示下个月
                showMonth = month + 1;
                showDate = date - lastDate;
            }
            if (showMonth === 0) showMonth = 12;  //月份越界处理
            if (showMonth === 13) showMonth = 1;
            result.push({
                month: showMonth,
                date: date,
                showDate: showDate,
            });
        }
        return {
            year: year,  //最上面的日期显示的数据
            month: month,
            showResult: result
        };
    };

    window.datepicker = datepicker;
})();