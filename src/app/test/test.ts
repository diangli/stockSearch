import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger, sequence } from '@angular/animations';
import * as moment from 'moment-timezone';
// import {LocalStorage, StorageProperty} from 'h5webstorage';
// import { Chart } from 'angular-highcharts';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-test',
    templateUrl: './test.html',
    animations: [
        trigger('slide1', [
          state('on', style({})),
          state('off', style({})),
          transition('* => *', [style({transform: 'translateX(-100%)'}), animate(500)])
      ]),
      trigger('slide2', [
        state('on', style({})),
        state('off', style({})),
        transition('* => *', [style({transform: 'translateX(-100%)'}), animate(500)])
    ]),
    ]
    // styleUrls: ['./app.component.css']
})
export class TestComponent implements OnInit {
    symbolList = new Array;
    timeNow = '';
    EDTtime = '';
    EDTafter4 = ' 16:00:00 EDT';
    showtabs = false;
    property = '';
    slide1 = 'off';
    slide2 = 'off';
    inputValue = '';
    isInValid = true;
    showHint = false;
    showFirst = true;
    showOption = false;
    showChart = true;
    showNews = false;
    showHistoryChart = false;
    checkboxValue: boolean;
    value1 = '';
    urlGet1 = '';
    urlGet2 = '';
    urlGet3 = '';
    Obj_index = '';
    regex = /^\s*$/;
    regex_news = /(article)/;
    borderColor = new Object;
    stockInfo = new Object;
    chart = new Object;
    openPrice = new Array;
    highPrice = new Array;
    lowPrice = new Array;
    closePrice = new Array;
    stockVolume = new Array;
    xAxisDate = new Array;
    newsItem = new Array;
    newsLink = new Array;
    newsDate = new Array;
    newsPubDate = new Array;
    newsTitle = new Array;
    newsAuthor = new Array;
    timeSplit = '';
    stockName = '';
    timeStamp = '';
    arrowImg = '';
    html = '';
    lastPrice = 0;
    priceChange = 0;
    changePercent = 0;
    favPercent = 0;
    myControl: FormControl = new FormControl();
    symbol: string;
    value = new Array;
    createTable = '';
    showprocess = true;
    close_Price = 0;
    showtable = false;
    favResultArray_symbol = []; favResultArray_value = [];  favResultArray_change = []; autoRefresh = ''; counter = 0; timeout = 0;
    tableData = ''; favResultArray_percent = []; favResultArray_volume = []; index = 0; img = ''; stockSymbol = ''; sequence = '';
    html_header = ''; selectedItem = ''; selectedWay = '';
    // item_name = new Array; item_price = new Array; item_volume = new Array; item_percent = new Array;
    // item_change = new Array;
    constructor(private http: HttpClient) {
        this.showFirst = true;
    }

    ngOnInit() {
        // localStorage.clear();
        // $('#select1').change(function() {
        //     alert($(this).children('option:selected').val());
        //     var p2=$('#param2').val();
        //     window.location.href="xx.php?param1="+p1+"¶m2="+p2+"";
        //     })
        $('#favoriteList').show();
        $('#refresh_switch').on('change', function () {
            if ($('#refresh_switch').prop('checked') === true) {
                alert('hhhhhh');
            }
        });
        $('#clear_btn').on('click', function () {
            // localStorage.clear();
            console.log(localStorage);
            $('#stockInput').val('');
            $('#favoriteList').hide();
            // $('#nextPage_btn').prop('disabled', true);
        });
        $('#favoriteList').on('click', '.delete_btn', function () {
            console.log(localStorage);
            this.stockSymbol = $(this).closest('tr').children('td:first').text();
            this.stockSymbol = this.stockSymbol.trim();
            console.log(this.stockSymbol);
            $(this).parent().parent().remove();
            // $('#newLine').remove();
            $('#starElement').removeClass('glyphicon glyphicon-star');
            $('#starElement').addClass('glyphicon glyphicon-star-empty');
            // for (let j = localStorage.length - 1; j >= 0; j--) {
            //     if (localStorage.getItem(j.toString()).toLowerCase() === this.tdValue.toLowerCase()) {
            //         localStorage.removeItem(j.toString());
            //         localStorage.removeItem((j + 1).toString());
            //         localStorage.removeItem((j + 2).toString());
            //         localStorage.removeItem((j + 3).toString());
            //         localStorage.removeItem((j + 4).toString());
            //         console.log(111); console.log(localStorage);
            //     }
            // }
            // let local = '';
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(i.toString()) === null) {
                    continue;
                }
                if (localStorage.getItem(i.toString()) === this.stockSymbol) {
                    localStorage.removeItem(i.toString());
                }
            }
            let pointer = 0; let local = '';
            for (let i = 0; i < localStorage.length + 1; i++) {
                if (localStorage.getItem(i.toString()) === null) {
                    continue;
                }
                local = localStorage.getItem(i.toString());
                localStorage.removeItem(i.toString());
                localStorage.setItem(pointer.toString(), local);
                pointer++;
            }
            console.log(localStorage);
        });
    }
    sortNumber(a, b) {
        return a - b;
    }
    selectChangeHandler1(event: any) {
        this.selectedItem = event.target.value;
        console.log(this.selectedItem);
    }
    selectChangeHandler2(event: any) {
        this.selectedWay = event.target.value;
        console.log(this.selectedWay);
    }
    refresh() {
        $('.oneLine').text('');
        // let html1 = '';
        for (let i = 0; i < localStorage.length; i++) {
            this.call(localStorage.getItem(i.toString()));
            // html1 += '<tr class="oneLine" id="' + this.stockName + '"><td><a>' + this.stockName + '';
            // html1 += '</a></td><td>' + this.lastPrice + '</td>';
            // html1 += '<td>' + this.priceChange.toFixed(2) ;
            // html1 +=  '(' + this.changePercent.toFixed(2) + '%)';
            // html1 += '<img src="' + this.img + '"width="10px" height="12px"></td>';
            // html1 += '<td>' + this.stockVolume + '</td>';
            // html1 += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
            // html1 += '</span></button></td></tr>';
            this.sequenceBySymbol();
        }
        // $('#favoriteList').append(html1);
    }
    sequenceBySymbol() {
        $('.oneLine').text('');    console.log('begin');
     if (this.selectedWay === 'Ascending' && this.selectedItem === 'Symbol') {
        let html = ''; const sl = new Array;
        // let html_header = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
        // html_header += '<th>Change (Change Percent)</th><th>Volume</th><th>   </th></tr>';
        $('.oneLine').text('');
        // $('#favoriteList').append(html_header);
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(i.toString()) === null || localStorage.getItem(i.toString()) === '') {
                continue;
            }else {
                sl.push(localStorage.getItem(i.toString()));
            }
            sl.sort();
        }
            for ( let j = 0; j < sl.length; j++) {
                for ( let k = this.favResultArray_symbol.length; k >= 0; k--) {
                    if (sl[j] === this.favResultArray_symbol[k]) {
                        const item_name = sl[j];
                        console.log(item_name);
                        const item_change = this.favResultArray_change[k];
                        console.log(item_change);
                        const item_percent = this.favResultArray_percent[k];
                        console.log(item_percent);
                        const item_price = this.favResultArray_value[k];
                        const item_volume = this.favResultArray_volume[k];
                        if (item_change > 0) {
                            this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                        }else {
                            this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                        }
                        html += '<tr class="oneLine" id="' + item_name + '"><td><a>' + item_name + '';
                        html += '</a></td><td>' + item_price + '</td>';
                        html += '<td>' + item_change.toFixed(2) ;
                        html +=  '(' + item_percent.toFixed(2) + '%)';
                        html += '<img src="' + this.img + '"width="10px" height="12px"></td>';
                        html += '<td>' + item_volume + '</td>';
                        html += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
                        html += '</span></button></td></tr>';
                        $('#favoriteList').append(html);
                        html = '';
                        break;
                    }
                }
            }
            console.log(sl);
        }else if (this.selectedWay === 'Descending' && this.selectedItem === 'Symbol') {
            console.log('symbol descending');
            let html1 = ''; const st = new Array;
            // let html_header = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
            // html_header += '<th>Change (Change Percent)</th><th>Volume</th><th>   </th></tr>';
            $('.oneLine').text('');
            // $('#favoriteList').append(html_header);
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(i.toString()) === null || localStorage.getItem(i.toString()) === '') {
                    continue;
                }else {
                    st.push(localStorage.getItem(i.toString()));
                }
                st.sort();
                console.log(st);
            }
                for ( let j = st.length; j >= 0; j--) {
                    for ( let k = this.favResultArray_symbol.length - 1; k >= 0; k--) {
                        if (st[j] === this.favResultArray_symbol[k]) {
                            console.log(j); console.log(k);
                            const item_name1 = st[j];
                            const item_change1 = this.favResultArray_change[k];
                            console.log(item_change1);
                            const item_percent1 = this.favResultArray_percent[k];
                            const item_price1 = this.favResultArray_value[k];
                            const item_volume1 = this.favResultArray_volume[k];
                            if (item_change1 > 0) {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                            }else {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                            }
                            html1 += '<tr class="oneLine" id="' + item_name1 + '"><td><a>' + item_name1 + '';
                            html1 += '</a></td><td>' + item_price1 + '</td>';
                            html1 += '<td>' + item_change1.toFixed(2) ;
                            html1 +=  '(' + item_percent1.toFixed(2) + '%)';
                            html1 += '<img src="' + this.img + '"width="10px" height="12px"></td>';
                            html1 += '<td>' + item_volume1 + '</td>';
                            html1 += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
                            html1 += '</span></button></td></tr>';
                            $('#favoriteList').append(html1);
                            html1 = '';
                            break;
                        }
                    }
                }
                console.log(st);
        }else if (this.selectedWay === '' || this.selectedItem === '') {
            console.log('default');
            let html1 = ''; const st = new Array;
            // let html_header = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
            // html_header += '<th>Change (Change Percent)</th><th>Volume</th><th>   </th></tr>';
            $('.oneLine').text('');
            // $('#favoriteList').append(html_header);
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(i.toString()) === null || localStorage.getItem(i.toString()) === '') {
                    continue;
                }else {
                    st.push(localStorage.getItem(i.toString()));
                }
                console.log(st);
            }
                for ( let j = 0; j < st.length; j++) {
                    for ( let k = this.favResultArray_symbol.length - 1; k >= 0; k--) {
                        if (st[j] === this.favResultArray_symbol[k]) {
                            console.log(j); console.log(k);
                            const item_name1 = st[j];
                            const item_change1 = this.favResultArray_change[k];
                            const item_percent1 = this.favResultArray_percent[k];
                            const item_price1 = this.favResultArray_value[k];
                            const item_volume1 = this.favResultArray_volume[k];
                            if (item_change1 > 0) {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                            }else {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                            }
                            html1 += '<tr class="oneLine" id="' + item_name1 + '"><td><a>' + item_name1 + '';
                            html1 += '</a></td><td>' + item_price1 + '</td>';
                            html1 += '<td>' + item_change1.toFixed(2) ;
                            html1 +=  '(' + item_percent1.toFixed(2) + '%)';
                            html1 += '<img src="' + this.img + '"width="10px" height="12px"></td>';
                            html1 += '<td>' + item_volume1 + '</td>';
                            html1 += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
                            html1 += '</span></button></td></tr>';
                            $('#favoriteList').append(html1);
                            html1 = '';
                            break;
                        }
                    }
                }
                console.log(st);
        }else if (this.selectedWay === 'Descending' && this.selectedItem === 'Price') {
            console.log('price descending');
            let html1 = ''; const st = new Array; const pr = new Array;
            // let html_header = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
            // html_header += '<th>Change (Change Percent)</th><th>Volume</th><th>   </th></tr>';
            $('.oneLine').text('');
            // $('#favoriteList').append(html_header);
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(i.toString()) === null || localStorage.getItem(i.toString()) === '') {
                    continue;
                }else {
                    st.push(localStorage.getItem(i.toString()));
                }
                console.log(st);
            }
                for (let m = st.length; m >= 0; m--) {
                    for (let n = this.favResultArray_symbol.length - 1; n >= 0; n--) {
                        if (st[m] === this.favResultArray_symbol[n]) {
                            pr.push(parseFloat(this.favResultArray_value[n]));
                        }
                    }
                }
                pr.sort(this.sortNumber);
                for ( let j = pr.length; j >= 0; j--) {
                    for ( let k = this.favResultArray_value.length - 1; k >= 0; k--) {
                        if (pr[j] === parseFloat(this.favResultArray_value[k])) {
                            console.log(j); console.log(k);
                            const item_name1 = this.favResultArray_symbol[k];
                            const item_change1 = this.favResultArray_change[k];
                            console.log(item_change1);
                            const item_percent1 = this.favResultArray_percent[k];
                            const item_price1 = pr[j];
                            const item_volume1 = this.favResultArray_volume[k];
                            if (item_change1 > 0) {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                            }else {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                            }
                            html1 += '<tr class="oneLine" id="' + item_name1 + '"><td><a>' + item_name1 + '';
                            html1 += '</a></td><td>' + item_price1 + '</td>';
                            html1 += '<td>' + item_change1.toFixed(2) ;
                            html1 +=  '(' + item_percent1.toFixed(2) + '%)';
                            html1 += '<img src="' + this.img + '"width="10px" height="12px"></td>';
                            html1 += '<td>' + item_volume1 + '</td>';
                            html1 += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
                            html1 += '</span></button></td></tr>';
                            $('#favoriteList').append(html1);
                            html1 = '';
                            break;
                        }
                    }
                }
                console.log(pr);
        }else if (this.selectedWay === 'Ascending' && this.selectedItem === 'Price') {
            console.log('price ascending');
            let html1 = ''; const st = new Array; const pr = new Array;
            // let html_header = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
            // html_header += '<th>Change (Change Percent)</th><th>Volume</th><th>   </th></tr>';
            $('.oneLine').text('');
            // $('#favoriteList').append(html_header);
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(i.toString()) === null || localStorage.getItem(i.toString()) === '') {
                    continue;
                }else {
                    st.push(localStorage.getItem(i.toString()));
                }
                console.log(st);
            }
                for (let m = st.length; m >= 0; m--) {
                    for (let n = this.favResultArray_symbol.length - 1; n >= 0; n--) {
                        if (st[m] === this.favResultArray_symbol[n]) {
                            pr.push(parseFloat(this.favResultArray_value[n]));
                        }
                    }
                }
                pr.sort(this.sortNumber);
                for ( let j = 0; j < pr.length; j++) {
                    for ( let k = this.favResultArray_value.length - 1; k >= 0; k--) {
                        if (pr[j] === parseFloat(this.favResultArray_value[k])) {
                            console.log(j); console.log(k);
                            const item_name1 = this.favResultArray_symbol[k];
                            const item_change1 = this.favResultArray_change[k];
                            console.log(item_change1);
                            const item_percent1 = this.favResultArray_percent[k];
                            const item_price1 = pr[j];
                            const item_volume1 = this.favResultArray_volume[k];
                            if (item_change1 > 0) {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                            }else {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                            }
                            html1 += '<tr class="oneLine" id="' + item_name1 + '"><td><a>' + item_name1 + '';
                            html1 += '</a></td><td>' + item_price1 + '</td>';
                            html1 += '<td>' + item_change1.toFixed(2) ;
                            html1 +=  '(' + item_percent1.toFixed(2) + '%)';
                            html1 += '<img src="' + this.img + '"width="10px" height="12px"></td>';
                            html1 += '<td>' + item_volume1 + '</td>';
                            html1 += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
                            html1 += '</span></button></td></tr>';
                            $('#favoriteList').append(html1);
                            html1 = '';
                            break;
                        }
                    }
                }
                console.log(pr);
        }else if (this.selectedWay === 'Ascending' && this.selectedItem === 'Change') {
            console.log('change ascending');
            let html1 = ''; const st = new Array; const ch = new Array;
            // let html_header = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
            // html_header += '<th>Change (Change Percent)</th><th>Volume</th><th>   </th></tr>';
            $('.oneLine').text('');
            // $('#favoriteList').append(html_header);
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(i.toString()) === null || localStorage.getItem(i.toString()) === '') {
                    continue;
                }else {
                    st.push(localStorage.getItem(i.toString()));
                }
                console.log(st);
            }
                for (let m = st.length; m >= 0; m--) {
                    for (let n = this.favResultArray_symbol.length - 1; n >= 0; n--) {
                        if (st[m] === this.favResultArray_symbol[n]) {
                            ch.push(parseFloat(this.favResultArray_change[n]));
                        }
                    }
                }
                ch.sort(this.sortNumber);
                for ( let j = 0; j < ch.length; j++) {
                    for ( let k = this.favResultArray_change.length - 1; k >= 0; k--) {
                        if (ch[j] === parseFloat(this.favResultArray_change[k])) {
                            console.log(j); console.log(k);
                            const item_name1 = this.favResultArray_symbol[k];
                            const item_change1 = ch[j];
                            console.log(item_change1);
                            const item_percent1 = this.favResultArray_percent[k];
                            const item_price1 = this.favResultArray_value[k];
                            const item_volume1 = this.favResultArray_volume[k];
                            if (item_change1 > 0) {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                            }else {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                            }
                            html1 += '<tr class="oneLine" id="' + item_name1 + '"><td><a>' + item_name1 + '';
                            html1 += '</a></td><td>' + item_price1 + '</td>';
                            html1 += '<td>' + item_change1.toFixed(2) ;
                            html1 +=  '(' + item_percent1.toFixed(2) + '%)';
                            html1 += '<img src="' + this.img + '"width="10px" height="12px"></td>';
                            html1 += '<td>' + item_volume1 + '</td>';
                            html1 += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
                            html1 += '</span></button></td></tr>';
                            $('#favoriteList').append(html1);
                            html1 = '';
                            break;
                        }
                    }
                }
                console.log(ch);
        }else if (this.selectedWay === 'Descending' && this.selectedItem === 'Change') {
            console.log('change descending');
            let html1 = ''; const st = new Array; const ch = new Array;
            // let html_header = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
            // html_header += '<th>Change (Change Percent)</th><th>Volume</th><th>   </th></tr>';
            $('.oneLine').text('');
            // $('#favoriteList').append(html_header);
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(i.toString()) === null || localStorage.getItem(i.toString()) === '') {
                    continue;
                }else {
                    st.push(localStorage.getItem(i.toString()));
                }
                console.log(st);
            }
                for (let m = st.length; m >= 0; m--) {
                    for (let n = this.favResultArray_symbol.length - 1; n >= 0; n--) {
                        if (st[m] === this.favResultArray_symbol[n]) {
                            ch.push(parseFloat(this.favResultArray_change[n]));
                        }
                    }
                }
                ch.sort(this.sortNumber);
                for ( let j = ch.length; j >= 0; j--) {
                    for ( let k = this.favResultArray_value.length - 1; k >= 0; k--) {
                        if (ch[j] === parseFloat(this.favResultArray_change[k])) {
                            console.log(j); console.log(k);
                            const item_name1 = this.favResultArray_symbol[k];
                            const item_change1 = ch[j];
                            console.log(item_change1);
                            const item_percent1 = this.favResultArray_percent[k];
                            const item_price1 = this.favResultArray_value[k];
                            const item_volume1 = this.favResultArray_volume[k];
                            if (item_change1 > 0) {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                            }else {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                            }
                            html1 += '<tr class="oneLine" id="' + item_name1 + '"><td><a>' + item_name1 + '';
                            html1 += '</a></td><td>' + item_price1 + '</td>';
                            html1 += '<td>' + item_change1.toFixed(2) ;
                            html1 +=  '(' + item_percent1.toFixed(2) + '%)';
                            html1 += '<img src="' + this.img + '"width="10px" height="12px"></td>';
                            html1 += '<td>' + item_volume1 + '</td>';
                            html1 += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
                            html1 += '</span></button></td></tr>';
                            $('#favoriteList').append(html1);
                            html1 = '';
                            break;
                        }
                    }
                }
                console.log(ch);
        }else if (this.selectedWay === 'Descending' && this.selectedItem === 'Change Percent') {
            console.log('changepercent descending');
            let html1 = ''; const st = new Array; const chp = new Array;
            // let html_header = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
            // html_header += '<th>Change (Change Percent)</th><th>Volume</th><th>   </th></tr>';
            $('.oneLine').text('');
            // $('#favoriteList').append(html_header);
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(i.toString()) === null || localStorage.getItem(i.toString()) === '') {
                    continue;
                }else {
                    st.push(localStorage.getItem(i.toString()));
                }
                console.log(st);
            }
                for (let m = st.length; m >= 0; m--) {
                    for (let n = this.favResultArray_symbol.length - 1; n >= 0; n--) {
                        if (st[m] === this.favResultArray_symbol[n]) {
                            chp.push(parseFloat(this.favResultArray_percent[n]));
                        }
                    }
                }
                chp.sort(this.sortNumber);
                for ( let j = chp.length; j >= 0; j--) {
                    for ( let k = this.favResultArray_percent.length - 1; k >= 0; k--) {
                        if (chp[j] === parseFloat(this.favResultArray_percent[k])) {
                            console.log(j); console.log(k);
                            const item_name1 = this.favResultArray_symbol[k];
                            const item_change1 = this.favResultArray_change[k];
                            const item_percent1 = chp[j];
                            const item_price1 = this.favResultArray_value[k];
                            const item_volume1 = this.favResultArray_volume[k];
                            if (item_change1 > 0) {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                            }else {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                            }
                            html1 += '<tr class="oneLine" id="' + item_name1 + '"><td><a>' + item_name1 + '';
                            html1 += '</a></td><td>' + item_price1 + '</td>';
                            html1 += '<td>' + item_change1.toFixed(2) ;
                            html1 +=  '(' + item_percent1.toFixed(2) + '%)';
                            html1 += '<img src="' + this.img + '"width="10px" height="12px"></td>';
                            html1 += '<td>' + item_volume1 + '</td>';
                            html1 += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
                            html1 += '</span></button></td></tr>';
                            $('#favoriteList').append(html1);
                            html1 = '';
                            break;
                        }
                    }
                }
                console.log(chp);
        }else if (this.selectedWay === 'Ascending' && this.selectedItem === 'Change Percent') {
            console.log('changepercent ascending');
            let html1 = ''; const st = new Array; const chp = new Array;
            // let html_header = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
            // html_header += '<th>Change (Change Percent)</th><th>Volume</th><th>   </th></tr>';
            $('.oneLine').text('');
            // $('#favoriteList').append(html_header);
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(i.toString()) === null || localStorage.getItem(i.toString()) === '') {
                    continue;
                }else {
                    st.push(localStorage.getItem(i.toString()));
                }
                console.log(st);
            }
                for (let m = st.length; m >= 0; m--) {
                    for (let n = this.favResultArray_symbol.length - 1; n >= 0; n--) {
                        if (st[m] === this.favResultArray_symbol[n]) {
                            chp.push(parseFloat(this.favResultArray_percent[n]));
                        }
                    }
                }
                chp.sort(this.sortNumber);
                for ( let j = 0; j < chp.length; j++) {
                    for ( let k = this.favResultArray_percent.length - 1; k >= 0; k--) {
                        if (chp[j] === parseFloat(this.favResultArray_percent[k])) {
                            console.log(j); console.log(k);
                            const item_name1 = this.favResultArray_symbol[k];
                            const item_change1 = this.favResultArray_change[k];
                            const item_percent1 = chp[j];
                            const item_price1 = this.favResultArray_value[k];
                            const item_volume1 = this.favResultArray_volume[k];
                            if (item_change1 > 0) {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                            }else {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                            }
                            html1 += '<tr class="oneLine" id="' + item_name1 + '"><td><a>' + item_name1 + '';
                            html1 += '</a></td><td>' + item_price1 + '</td>';
                            html1 += '<td>' + item_change1.toFixed(2) ;
                            html1 +=  '(' + item_percent1.toFixed(2) + '%)';
                            html1 += '<img src="' + this.img + '"width="10px" height="12px"></td>';
                            html1 += '<td>' + item_volume1 + '</td>';
                            html1 += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
                            html1 += '</span></button></td></tr>';
                            $('#favoriteList').append(html1);
                            html1 = '';
                            break;
                        }
                    }
                }
                console.log(chp);
        }else if (this.selectedWay === 'Ascending' && this.selectedItem === 'Volume') {
            console.log('Volume ascending');
            let html1 = ''; const st = new Array; const vol = new Array;
            // let html_header = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
            // html_header += '<th>Change (Change Percent)</th><th>Volume</th><th>   </th></tr>';
            $('.oneLine').text('');
            // $('#favoriteList').append(html_header);
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(i.toString()) === null || localStorage.getItem(i.toString()) === '') {
                    continue;
                }else {
                    st.push(localStorage.getItem(i.toString()));
                }
                console.log(st);
            }
                for (let m = st.length; m >= 0; m--) {
                    for (let n = this.favResultArray_symbol.length - 1; n >= 0; n--) {
                        if (st[m] === this.favResultArray_symbol[n]) {
                            vol.push(parseFloat(this.favResultArray_volume[n]));
                        }
                    }
                }
                vol.sort(this.sortNumber);
                for ( let j = 0; j < vol.length; j++) {
                    for ( let k = this.favResultArray_volume.length - 1; k >= 0; k--) {
                        if (vol[j] === parseFloat(this.favResultArray_volume[k])) {
                            console.log(j); console.log(k);
                            const item_name1 = this.favResultArray_symbol[k];
                            const item_change1 = this.favResultArray_change[k];
                            const item_percent1 = this.favResultArray_percent[k];
                            const item_price1 = this.favResultArray_value[k];
                            const item_volume1 = vol[j];
                            if (item_change1 > 0) {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                            }else {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                            }
                            html1 += '<tr class="oneLine" id="' + item_name1 + '"><td><a>' + item_name1 + '';
                            html1 += '</a></td><td>' + item_price1 + '</td>';
                            html1 += '<td>' + item_change1.toFixed(2) ;
                            html1 +=  '(' + item_percent1.toFixed(2) + '%)';
                            html1 += '<img src="' + this.img + '"width="10px" height="12px"></td>';
                            html1 += '<td>' + item_volume1 + '</td>';
                            html1 += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
                            html1 += '</span></button></td></tr>';
                            $('#favoriteList').append(html1);
                            html1 = '';
                            break;
                        }
                    }
                }
                console.log(vol);
        }else if (this.selectedWay === 'Descending' && this.selectedItem === 'Volume') {
            console.log('Volume descending');
            let html1 = ''; const st = new Array; const vol = new Array;
            // let html_header = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
            // html_header += '<th>Change (Change Percent)</th><th>Volume</th><th>   </th></tr>';
            $('.oneLine').text('');
            // $('#favoriteList').append(html_header);
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(i.toString()) === null || localStorage.getItem(i.toString()) === '') {
                    continue;
                }else {
                    st.push(localStorage.getItem(i.toString()));
                }
                console.log(st);
            }
                for (let m = st.length; m >= 0; m--) {
                    for (let n = this.favResultArray_symbol.length - 1; n >= 0; n--) {
                        if (st[m] === this.favResultArray_symbol[n]) {
                            vol.push(parseFloat(this.favResultArray_volume[n]));
                        }
                    }
                }
                vol.sort(this.sortNumber);
                for ( let j = vol.length; j >= 0; j--) {
                    for ( let k = this.favResultArray_volume.length - 1; k >= 0; k--) {
                        if (vol[j] === parseFloat(this.favResultArray_volume[k])) {
                            console.log(j); console.log(k);
                            const item_name1 = this.favResultArray_symbol[k];
                            const item_change1 = this.favResultArray_change[k];
                            const item_percent1 = this.favResultArray_percent[k];
                            const item_price1 = this.favResultArray_value[k];
                            const item_volume1 = vol[j];
                            if (item_change1 > 0) {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                            }else {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                            }
                            html1 += '<tr class="oneLine" id="' + item_name1 + '"><td><a>' + item_name1 + '';
                            html1 += '</a></td><td>' + item_price1 + '</td>';
                            html1 += '<td>' + item_change1.toFixed(2) ;
                            html1 +=  '(' + item_percent1.toFixed(2) + '%)';
                            html1 += '<img src="' + this.img + '"width="10px" height="12px"></td>';
                            html1 += '<td>' + item_volume1 + '</td>';
                            html1 += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
                            html1 += '</span></button></td></tr>';
                            $('#favoriteList').append(html1);
                            html1 = '';
                            break;
                        }
                    }
                }
                console.log(vol);
        }else if (this.selectedWay === 'Default' || this.selectedItem === 'Default') {
            console.log('default');
            let html1 = ''; const st = new Array;
            // let html_header = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
            // html_header += '<th>Change (Change Percent)</th><th>Volume</th><th>   </th></tr>';
            $('.oneLine').text('');
            // $('#favoriteList').append(html_header);
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(i.toString()) === null || localStorage.getItem(i.toString()) === '') {
                    continue;
                }else {
                    st.push(localStorage.getItem(i.toString()));
                }
                console.log(st);
            }
                for ( let j = 0; j < st.length; j++) {
                    for ( let k = this.favResultArray_symbol.length - 1; k >= 0; k--) {
                        if (st[j] === this.favResultArray_symbol[k]) {
                            console.log(j); console.log(k);
                            const item_name1 = st[j];
                            const item_change1 = this.favResultArray_change[k];
                            const item_percent1 = this.favResultArray_percent[k];
                            const item_price1 = this.favResultArray_value[k];
                            const item_volume1 = this.favResultArray_volume[k];
                            if (item_change1 > 0) {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                            }else {
                                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                            }
                            html1 += '<tr class="oneLine" id="' + item_name1 + '"><td><a>' + item_name1 + '';
                            html1 += '</a></td><td>' + item_price1 + '</td>';
                            html1 += '<td>' + item_change1.toFixed(2) ;
                            html1 +=  '(' + item_percent1.toFixed(2) + '%)';
                            html1 += '<img src="' + this.img + '"width="10px" height="12px"></td>';
                            html1 += '<td>' + item_volume1 + '</td>';
                            html1 += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
                            html1 += '</span></button></td></tr>';
                            $('#favoriteList').append(html1);
                            html1 = '';
                            break;
                        }
                    }
                }
                console.log(st);
        }
    }
    focusOnInput() {
        this.showHint = false;
        this.borderColor = {'border': '1px solid blue'};
    }
    blurOutInput() {
        if (this.isInValid === true) {
            this.showHint = true;
            this.borderColor = {'border': '1px solid red'};
        }else if (this.isInValid === false) {
            this.showHint = false;
            this.borderColor = {'border': '1px solid blue'};
        }
    }
    completeTable() {
            if (this.favResultArray_change[this.favResultArray_change.length - 1] > 0) {
                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
            }else {
                this.img = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
            }
            console.log(this.img);
            // this.html = '<table class="table table-striped" style="margin-left:2%"><tr><th>Symbol</th><th>Stock Price</th>';
            // this.html += '<th>Change (Change Percent)</th><th>Volume</th></tr>';
            this.html += '<tr class="oneLine" id="' + this.value1 + '"><td><a>';
            this.html += this.favResultArray_symbol[this.favResultArray_symbol.length - 1];
            this.html += '</a></td><td>' + this.favResultArray_value[this.favResultArray_symbol.length - 1] + '</td>';
            this.html += '<td>' + this.favResultArray_change[this.favResultArray_change.length - 1].toFixed(2) ;
            this.html +=  '(' + this.favResultArray_percent[this.favResultArray_percent.length - 1].toFixed(2) + '%)';
            this.html += '<img src="' + this.img + '"width="10px" height="12px"></td>';
            this.html += '<td>' + this.favResultArray_volume[this.favResultArray_percent.length - 1] + '</td>';
            this.html += '<td>' + '<button  class = "delete_btn"><span class="glyphicon glyphicon-trash">' ;
            this.html += '</span></button></td></tr>';
            $('#favoriteList').append(this.html);
            this.html = '';
            $('#starElement').removeClass('glyphicon glyphicon-star');
            $('#starElement').addClass('glyphicon glyphicon-star-empty');

            for (let i = 0; i < localStorage.length; i++) {
                if (this.value1.toLowerCase() === localStorage.getItem(localStorage.key(i)).toLowerCase()) {
                    $('#starElement').removeClass('glyphicon glyphicon-star-empty');
                    $('#starElement').addClass('glyphicon glyphicon-star');

                }

            }
        }

    // }
    starChange() {
        // localStorage.clear();
        this.showHint = false;
            if ($('#starElement').hasClass('glyphicon glyphicon-star-empty')) {
                // this.property = 'glyphicon glyphicon-star-empty';
                $('#starElement').removeClass('glyphicon glyphicon-star-empty');
                $('#starElement').addClass('glyphicon glyphicon-star');
                localStorage.setItem( localStorage.length.toString(), this.value1);
                console.log(localStorage);
                // localStorage.setItem( (this.index + 1).toString() , this.closePrice[0]);
                // localStorage.setItem( (this.index + 2).toString() , this.priceChange .toString());
                // localStorage.setItem( (this.index + 3).toString() , this.changePercent.toString());
                // localStorage.setItem( (this.index + 4).toString() , this.stockVolume[0]);
                // this.index = this.index + 5;
                // this.completeTable();
                // this.html = '';
                // this.ngOnInit();
                // $('#favoriteList').on('click', '.delete_btn', function () {
                //     $(this).parent().parent().remove();
                // });
                this.completeTable();
                this.html = '';
            }else if ($('#starElement').hasClass('glyphicon glyphicon-star') || localStorage.length === 0) {
                // this.property = 'glyphicon glyphicon-star';
                $('#' + this.value1 + '').remove();
                for (let i = 0; i < localStorage.length; i++) {
                    if (this.value1.toLowerCase() === localStorage.getItem(i.toString()).toLowerCase()) {
                        $('#starElement').removeClass('glyphicon glyphicon-star');
                        $('#starElement').addClass('glyphicon glyphicon-star-empty');
                        localStorage.removeItem(i.toString());
                        console.log('delete same'); console.log(localStorage);
                    }
                }
                if (localStorage.length === 0) {
                    $('#favoriteList').append('');
                }else {
                    let pointer = 0; let local = '';
                    for (let i = 0; i < localStorage.length + 1; i++) {
                        if (localStorage.getItem(i.toString()) === null) {
                            continue;
                        }
                        local = localStorage.getItem(i.toString());
                        localStorage.removeItem(i.toString());
                        localStorage.setItem(pointer.toString(), local);
                        pointer++;
                    }
                // localStorage.removeItem((localStorage.length - 1).toString());
                // localStorage.removeItem((localStorage.length - 1).toString());
                // localStorage.removeItem((localStorage.length - 1).toString());
                // localStorage.removeItem((localStorage.length - 1).toString());
                // localStorage.removeItem((localStorage.length - 1).toString());
                // console.log(localStorage);
                // this.favResultArray_symbol.pop();
                // this.favResultArray_change.pop();
                // this.favResultArray_percent.pop();
                // this.favResultArray_value.pop();
                // this.favResultArray_volume.pop();
                }
            }
    }
    animateLeft() {
        this.showFirst = false;
        this.slide2 = (this.slide2 === 'on' ? 'off' : 'on');
    }
    animateright() {
        this.showFirst = true;
        this.slide1 = (this.slide1 === 'on' ? 'off' : 'on');
    }
    inputCompanyName(event: Event) {
        this.showHint = false;
        this.inputValue = (<HTMLInputElement>event.target).value;
        if (this.regex.test(this.inputValue)) {
            this.isInValid = true;
            this.showHint = true;
            this.borderColor = {'border': '1px solid red'};
        }else if (this.inputValue.length === 0) {
            this.isInValid = true;
            this.showHint = false;
        } else {
            this.isInValid = false;
            this.showHint = false;
            this.borderColor = {'border': '1px solid blue'};
            this.callAutoComplete(this.inputValue);
        }
    }
    getInputValue() {
        return this.value1;
    }
    callAutoComplete(stockName) {
        this.showHint = false;
        this.inputValue = 'http://diangli-env.us-west-1.elasticbeanstalk.com/';
        this.http.get(this.inputValue + stockName)
        .subscribe(data => {
            this.symbol = JSON.parse(JSON.stringify(data));
          }
        );
    }
    call(stockSymbol1) {
        // localStorage.clear();
        if ($('#historicalCharts').hasClass('active')) {
            $('#historicalCharts').removeClass('active');
            $('#currentStock').addClass('active');
            this.showHistoryChart = false;
            this.showNews = false;
        }
        if ($('#newsFeeds').hasClass('active')) {
            $('#newsFeeds').removeClass('active');
            $('#currentStock').addClass('active');
            this.showHistoryChart = false;
            this.showNews = false;
        }
    if ($('#currentStock').hasClass('active')) {
        this.closePrice = [];
        this.openPrice = [];
        this.highPrice = [];
        this.lowPrice = [];
        this.stockVolume = [];
        this.xAxisDate = [];
        this.showprocess = true;
        this.showtable = false;
        this.showChart = true;
        this.showNews = false;
        if (this.isInValid === false) {
            this.showHint = false;
            this.borderColor = {'border': '1px solid blue'};
            this.urlGet1 = 'http://diangli-env.us-west-1.elasticbeanstalk.com/api/stock/';
            this.http.get(this.urlGet1 + stockSymbol1)
            .subscribe(data => {
                this.stockInfo = data;
                this.stockName = data['Meta Data']['2. Symbol'];
                this.timeStamp = data['Meta Data']['3. Last Refreshed'];
                this.EDTtime = moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
                this.timeSplit = this.EDTtime.toString().substr(11, 2);
                console.log('hour'); console.log(this.timeSplit);
                if (+this.timeSplit >= 16) {
                    this.EDTtime = this.timeStamp + this.EDTafter4;
                }else {
                    this.EDTtime = moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss') + ' EDT';
                }
                this.Obj_index = 'Time Series (Daily)';
                this.value = Object.keys(data[this.Obj_index]);
                this.lastPrice = parseFloat(data[this.Obj_index][this.value[1]]['4. close']);
                this.priceChange = data[this.Obj_index][this.value[0]]['4. close'] - data[this.Obj_index][this.value[1]]['4. close'];
                this.changePercent = this.priceChange / this.lastPrice;
                this.favPercent = this.changePercent * 100;
                if (this.priceChange > 0) {
                    this.arrowImg = 'http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png';
                }else {
                    this.arrowImg = 'http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png';
                }
                for (let i = 0; i < 121; i++) {
                    this.xAxisDate.push(this.value[i]);
                    this.openPrice.push(parseFloat(data[this.Obj_index][this.value[i]]['1. open']));
                    this.highPrice.push(parseFloat(data[this.Obj_index][this.value[i]]['2. high']));
                    this.lowPrice.push(parseFloat(data[this.Obj_index][this.value[i]]['3. low']));
                    this.closePrice.push(parseFloat(data[this.Obj_index][this.value[i]]['4. close']));
                    this.stockVolume.push(parseFloat(data[this.Obj_index][this.value[i]]['5. volume']));
                }
                // if (this.favResultArray_symbol.indexOf(this.stockName) === -1) {
                //     $('#starElement').removeClass('glyphicon glyphicon-star');
                //     $('#starElement').addClass('glyphicon glyphicon-star-empty');
                // }else {
                //     $('#starElement').removeClass('glyphicon glyphicon-empty');
                //     $('#starElement').addClass('glyphicon glyphicon-star-star');
                // }
                this.showtable = true;
                this.showprocess = false;
                this.showtabs = true;
                    // localStorage.setItem( this.index.toString() , this.stockName);
                    // localStorage.setItem( (this.index + 1).toString() , this.closePrice[0]);
                    // localStorage.setItem( (this.index + 2).toString() , this.priceChange .toString());
                    // localStorage.setItem( (this.index + 3).toString() , this.changePercent.toString());
                    // localStorage.setItem( (this.index + 4).toString() , this.stockVolume[0]);
                    // this.index = this.index + 5;
                    // console.log(localStorage); console.log(this.index);
                    this.favResultArray_symbol.push(this.stockName);
                    this.favResultArray_value.push(this.closePrice[0]);
                    this.favResultArray_change.push(this.priceChange);
                    this.favResultArray_percent.push(this.favPercent);
                    this.favResultArray_volume.push(this.stockVolume[0]);
                    $('#starElement').removeClass('glyphicon glyphicon-star');
                    $('#starElement').addClass('glyphicon glyphicon-star-empty');
                    for (let i = 0; i < localStorage.length; i++) {
                        if (this.value1.toLowerCase() === localStorage.getItem(localStorage.key(i)).toLowerCase()) {
                            $('#starElement').removeClass('glyphicon glyphicon-star-empty');
                            $('#starElement').addClass('glyphicon glyphicon-star');

                        }
                    }
            });
            // for ( let i = 0; i < localStorage.length; i++) {
            //     if (localStorage.getItem(i.toString()) === this.stockName) {
            //         $('#starElement').removeClass('glyphicon glyphicon-star');
            //         $('#starElement').addClass('glyphicon glyphicon-star-empty');
            //     }
            // }
        }
    }
    }
    callServer2(stockSymbol) {
        console.log(stockSymbol);
        this.showHint = false;
        if (this.showFirst === false) {
            this.call(stockSymbol);
        }else {
            this.animateLeft();
            this.call(stockSymbol);
        }
    }
    callNews(stockSymbol2) {
        this.newsAuthor = [];
        this.newsLink = [];
        this.newsTitle = [];
        this.newsPubDate = [];
        this.newsDate = [];
        this.showHint = false;
        $('#newsFeeds').addClass('active').siblings().removeClass('active');
        this.showHistoryChart = false;
        this.showNews = true;
        this.showChart = false;
        this.urlGet2 = 'http://diangli-env.us-west-1.elasticbeanstalk.com/stock/news/';
        this.http.get(this.urlGet2 + stockSymbol2)
        .subscribe(data => {
            this.newsItem = data['rss']['channel']['item'];
            for (let i = 0; i < this.newsItem.length; i++) {
                if (this.regex_news.test(this.newsItem[i]['link'])) {
                    this.newsAuthor.push(this.newsItem[i]['sa:author_name']);
                    this.newsLink.push(this.newsItem[i]['link']);
                    this.newsTitle.push(this.newsItem[i]['title']);
                    this.newsPubDate.push(this.newsItem[i]['pubDate']);
                }
            }
            for (let j = 0; j < this.newsPubDate.length; j++) {
                const news_date = this.newsPubDate[j].substring(0, this.newsPubDate[j].length - 5);
                this.newsDate.push(news_date + 'EDT');
            }
            $('#newsFeeds').addClass('active').siblings().removeClass('active');
        }
    );
    }
    showCharts() {
        this.showHint = false;
        this.showChart = true;
        this.showNews = false;
        this.showHistoryChart = false;
    }

    currentStock() {
        this.showtabs = true;
        this.showChart = true;
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(i.toString()).toLowerCase() === this.value1.toLowerCase()) {
                console.log(i); console.log(this.value1);
                $('#starElement').removeClass('glyphicon glyphicon-star-empty');
                $('#starElement').addClass('glyphicon glyphicon-star');
            }
        }
        // this.starChange();
        this.showHint = false;
        $('#currentStock').addClass('active').siblings().removeClass('active');
    }
    historicalCharts() {
        this.showtabs = false;
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(i.toString()).toLowerCase() === this.value1.toLowerCase()) {
                console.log(i); console.log(this.value1);
                $('#starElement').removeClass('glyphicon glyphicon-star-empty');
                $('#starElement').addClass('glyphicon glyphicon-star');
            }
        }
        this.showHint = false;
        this.showHistoryChart = true;
        this.showChart = false;
        this.showNews = false;
        $('#historicalCharts').addClass('active').siblings().removeClass('active');
    }
    chart1Navigation() {
        this.showHint = false;
        $('#chart1').addClass('active').siblings().removeClass('active');
    }
    chart2Navigation() {
        this.showHint = false;
        $('#chart2').addClass('active').siblings().removeClass('active');
    }
    chart3Navigation() {
        this.showHint = false;
        $('#chart3').addClass('active').siblings().removeClass('active');
    }
    chart4Navigation() {
        this.showHint = false;
        $('#chart4').addClass('active').siblings().removeClass('active');
    }
    chart5Navigation() {
        this.showHint = false;
        $('#chart5').addClass('active').siblings().removeClass('active');
    }
    chart6Navigation() {
        this.showHint = false;
        $('#chart6').addClass('active').siblings().removeClass('active');
    }
    chart7Navigation() {
        this.showHint = false;
        $('#chart7').addClass('active').siblings().removeClass('active');
    }
    chart8Navigation() {
        this.showHint = false;
        $('#chart8').addClass('active').siblings().removeClass('active');
    }
    chart9Navigation() {
        this.showHint = false;
        $('#chart9').addClass('active').siblings().removeClass('active');
    }
}
