(function () {
    let datepicker = window.datepicker;
    let monthData;
    let datepickTable;
    let tbody;
    let isOpen = false;
    let input;
    let selectTds = [];
    let wrapper;
    datepicker.init = function () {
        let main = document.createElement('div');
        let html = `
        <input type="text" class="datepicker-input" id="datepicker-input">
        <div class="ui-datepicker-wrapper-hidden" id="datepicker-wrapper">
            <div class="ui-datepicker-header">
                <a href="#" class="ui-datepicker-btn ui-datepicker-pre-btn">&lt;</a>
                <a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>
                <span class="ui-datepicker-curr-month" id="current-month"></span>
            </div>
            <div class="ui-datepicker-body">
                <table id="datepicker-table">
                    <thead>
                        <tr>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>日</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
      `;
        main.innerHTML = html;
        document.body.appendChild(main);
        datepicker.renderUI();
        input = document.querySelector('#datepicker-input');
        input.addEventListener('click', datepicker.showDatePicker, false);
        main.addEventListener('click', datepicker.changeDate, false);   //事件委托
    };
    datepicker.showDatePicker = function() {  //datePicker的显示和关闭控制
        wrapper = document.querySelector('#datepicker-wrapper');
        if (isOpen) {
            wrapper.className  = 'ui-datepicker-wrapper-hidden';
            isOpen = false;
        }else {
            wrapper.className  = 'ui-datepicker-wrapper';
            isOpen = true;
        }
    };
    datepicker.changeDate = function(e) {
        e.preventDefault();
        selectTds[0] = '';
        if(e.target.tagName === 'A') {
            datepickTable.removeChild(tbody);
            if(e.target.classList.contains('ui-datepicker-pre-btn')){  //往前的按钮
                monthData.month--;
                if (monthData.month + 1 === 1) {   //年份越界的处理
                    monthData.year--;
                    monthData.month = 12;
                }
                datepicker.renderUI(monthData.year, monthData.month);   //重新显示数据
            }else if(e.target.classList.contains('ui-datepicker-next-btn')){  //往后的按钮
                monthData.month++;
                if (monthData.month > 12) {    //年份越界的处理
                    monthData.year++;
                    monthData.month -= 12;
                }
                datepicker.renderUI(monthData.year, monthData.month);  //重新显示数据
            }
        }
        if(e.target.tagName === 'TD') {
            selectTds[0] = e.target.dataset.tid;
            let date = JSON.parse(e.target.dataset.date);
            input.value = e.target.dataset.year + '-' + date.month + '-' + date.showDate;
            datepickTable.removeChild(tbody);
            datepicker.renderUI(e.target.dataset.year, e.target.dataset.month);
            wrapper.className  = 'ui-datepicker-wrapper-hidden';
            isOpen = false;
        }
    };
    datepicker.renderUI = function (year, month) {   //初始化UI
        monthData = datepicker.getMonthData(year, month);
        let currentMonth = document.querySelector('#current-month');
        currentMonth.innerHTML = monthData.year + '-' + monthData.month;
        datepickTable = document.querySelector('#datepicker-table');
        tbody = document.createElement('tbody');
        let showResult = monthData.showResult;
        let tdRes = [];
        for (let i = 0; i < showResult.length; i++) {
            tdRes.push(i);
            if (tdRes.length === 7) {   //一行为7天
                let tr = document.createElement('tr');
                tdRes.forEach((item) => {
                    let td = document.createElement('td');
                    td.setAttribute('data-tid', item.toString());
                    td.setAttribute('data-date', JSON.stringify(showResult[item]));
                    td.setAttribute('data-year', monthData.year);
                    td.setAttribute('data-month', monthData.month);
                    td.innerHTML = showResult[item].showDate;
                    tr.appendChild(td);
                    let date = JSON.parse(td.dataset.date).date;
                    if(date <= 0) {
                       td.style.color = 'rgba(0, 0, 0, 0.25)';
                    }
                    if(selectTds.indexOf(td.dataset.tid) !== -1){
                        td.style.color = 'skyblue';
                    }
                });
                tbody.appendChild(tr);
                tdRes = [];
            }
        }
        datepickTable.appendChild(tbody);
    };
})();