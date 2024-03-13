function Api() {
  const response = UrlFetchApp.fetch('http://45.155.120.86/index.php?r=keitaro/tablelist&token=pcK4fQ3PgqEnZeqwZ6pfgqmC59U7jX6RK3G3zPgfyfQPqUSv'); 
  const content = response.getContentText();
  const result = JSON.parse(content); 

  const data = result;  

  const arr_list = [];

  const check_array = [];

  const check_array_list = [];

  var sheets = SpreadsheetApp.openById("1QteFIaE3zsPg2_zcnsJMBB9lhECKGBfS59ze4crqcak");
  const tmpl = sheets.getSheetByName('Данные Api');
  const range = tmpl.getRange("B1:B");
  var rangeValues = range.getValues();

  rangeValues.forEach(function(value){
    if(value[0] && value[0] !== "Название листа"){
      check_array.push(value[0]);
      check_array_list.push(value[0]);
      check_array_list.push("t")
    }
  })

  const arr_list_check = [];

  arr_list.push(['Название отчёта','Название листа','Период','Обновлено на сервере']);

  const sh_start_date = SpreadsheetApp.getActive().getSheetByName('Данные Api');

  list_date = 2;

  const sh = SpreadsheetApp.getActiveSpreadsheet();

  data.forEach(function(value){

    keys_list = 0;

    const tmp = [];

    var date_to = new Date("2.2.2024 16:39:00");

    var date_to_table = sh_start_date.getRange(list_date, 4).getValue();
    
    var date_from = new Date(value['time']);

    const ships = sh.getSheetByName(value['list_name']);

    const ss = SpreadsheetApp.getActive().getSheetByName(value['list_name']);

    if(!ships){
      sh.insertSheet(value['list_name']);
      const ss = SpreadsheetApp.getActive().getSheetByName(value['list_name']);
    }

    if(!date_to){
      const arr = []; 
      const keys = []; 

      value['data'].forEach(obj => {

        const arrs = []; 

        Object.entries(obj).forEach(([key, value]) => {
            
          keys.push(key);
          arrs.push(value);

        });
        if(keys_list == 0){
          const uniqNumbers = Array.from(keys);
          arr.push(uniqNumbers);
        }
        arr.push(arrs);
        keys_list++;
      
      });

      const ss = SpreadsheetApp.getActive().getSheetByName(value['list_name']);

      Logger.log(arr);

      var range = ss.getRange(1, 1, arr.length, arr[0].length);
      range.setValues(arr);

      date = new Date();
      
      if(date.getMonth() <= 9){
        month = date.getMonth() + 1;
        month = "0" + month;
      } else {
        month = date.getMonth() + 1;
      }

      hours = date.getHours() + 2;

      minutes = date.getMinutes()

      if(minutes < 10){
        minutes = "0" + date.getMinutes()
      }

      date_full = date.getFullYear()+ "-" + month + "-" + date.getDate() + " " + hours + ":" + minutes
    } else {
      if(date_to.getTime() !== date_from.getTime()){

        const arr = []; 
        const keys = []; 
        const arr_clear = [];

        value['data'].forEach(obj => {

          const arrs = []; 

          Object.entries(obj).forEach(([key, value]) => {
              
            keys.push(key);
            arrs.push(value);

          });
          if(keys_list == 0){
            const uniqNumbers = Array.from(keys);
            arr.push(uniqNumbers);
          }
          arr.push(arrs);
          


          keys_list++;
        
        });


        Logger.log(arr);

        var range_clear = "";
        const ss_clear = SpreadsheetApp.getActive().getSheetByName(value['list_name']);
        var range_clear = ss_clear.getRange("A:S");
        range_clear.clear();


        const ss = SpreadsheetApp.getActive().getSheetByName(value['list_name']);
        var range = ss.getRange(1, 1, arr.length, arr[0].length);
        range.setValues(arr);

        date = new Date();
        
        if(date.getMonth() <= 9){
          month = date.getMonth() + 1;
          month = "0" + month;
        } else {
          month = date.getMonth() + 1;
        }

        hours = date.getHours() + 2;

        minutes = date.getMinutes()

        if(minutes < 10){
          minutes = "0" + date.getMinutes()
        }

        date_full = date.getFullYear()+ "-" + month + "-" + date.getDate() + " " + hours + ":" + minutes

      } else {

        date_to_table = new Date(date_to_table);

        if(date_to_table.getMonth() <= 9){
            month = date_to_table.getMonth() + 1;
            month = "0" + month;
        } else {
            month = date_to_table.getMonth() + 1;
        }

        hours = date_to_table.getHours();

        minutes = date_to_table.getMinutes()

        if(minutes < 10){
          minutes = "0" + date_to_table.getMinutes()
        }

        Logger.log(minutes);

        date_full = date_to_table.getFullYear()+ "-" + month + "-" + date_to_table.getDate() + " " + hours + ":" + minutes;

      }

      if(!date_full){
        date = new Date();
        
        if(date.getMonth() <= 9){
          month = date.getMonth() + 1;
          month = "0" + month;
        } else {
          month = date.getMonth() + 1;
        }

        hours = date.getHours() + 2;

        minutes = date.getMinutes()

        if(minutes < 10){
          minutes = "0" + date.getMinutes()
        }

        date_full = date.getFullYear()+ "-" + month + "-" + date.getDate() + " " + hours + ":" + minutes
      }
    }

    date_period = value['last_period'] + " - " + value['last_shift'];
    Logger.log(value['last_period'])
    Logger.log(value['last_shift'])
    tmp.push(value['post_name']);
    tmp.push(value['list_name']);
    tmp.push(date_period);
    tmp.push(value['time']);

    arr_list.push(tmp);    

    arr_list_check.push(value['list_name']);

    keys_list++;

    list_date++;

  });
  Logger.log(check_array.filter(e => !~arr_list_check.indexOf(e))[0]);
  const sh_start = SpreadsheetApp.getActive().getSheetByName('Данные Api');

  var range_clear_start = sh_start.getRange("A:S");
  range_clear_start.clear();

  if(check_array_list[0]){
    var range_start_clear = sh_start.getRange(1, 1, check_array_list.length, check_array_list[0].length);
    range_start_clear.clearContent();
  }

  var range_start = sh_start.getRange(1, 1, arr_list.length, arr_list[0].length);
  range_start.setValues(arr_list);
  sh_start.getRange('A25').setValue('Время обновления таблицы');
  sh_start.getRange('B25').setValue(date_full);
  
}

function Blacklist(){
  TableDateApiBlacklist();
}

function TableDateApiBlacklist(){
  const response = UrlFetchApp.fetch('http://45.155.120.86/index.php?r=keitaro/tableblacklistgoogledate&token=pcK4fQ3PgqEnZeqwZ6pfgqmC59U7jX6RK3G3zPgfyfQPqUSv'); 
  const content = response.getContentText();
  const result = JSON.parse(content); 
  Logger.log(result);

  const sh = SpreadsheetApp.getActiveSpreadsheet();
 
  result.forEach(function(value){

    const ships = sh.getSheetByName(value['name_list']);

    const ss = SpreadsheetApp.getActive().getSheetByName(value['name_list']);

    if(!ships){
      sh.insertSheet(value['name_list']);
      const ss = SpreadsheetApp.getActive().getSheetByName(value['name_list']);
    } else {
      var range_clear_start = ss.getRange("A:F");
      range_clear_start.clear();
    }
    
    date = new Date();
        
    if(date.getMonth() <= 9){
      month = date.getMonth() + 1;
      month = "0" + month;
    } else {
      month = date.getMonth() + 1;
    }

    hours = date.getHours() + 2;

    minutes = date.getMinutes()

    if(minutes < 10){
      minutes = "0" + date.getMinutes()
    }

    date_full = date.getFullYear()+ "-" + month + "-" + date.getDate() + " " + hours + ":" + minutes

    ss.getRange('D1').setValue('Время обновления таблицы');
    ss.getRange('E1').setValue('Обновлено на сервере');
    ss.getRange('D2').setValue(date_full);
    ss.getRange('E2').setValue(value['date_post']);
    if(value['id'] == 1){
      TableSourceApiBlacklist(ss);
    }
    if(value['id'] == 2){
      TableCreativeApiBlacklist(ss);
    }
  })
}

function TableSourceApiBlacklist(ss){
  const response = UrlFetchApp.fetch('http://45.155.120.86/index.php?r=keitaro/tableblacklistgooglesource&token=pcK4fQ3PgqEnZeqwZ6pfgqmC59U7jX6RK3G3zPgfyfQPqUSv'); 
  const content = response.getContentText();
  const result = JSON.parse(content); 

  const arr_list = [];
  const tmp = [];

  arr_list.push(['Площадки']);

  result.forEach(function(value){
    arr_list.push([value]);
  })

  var range_start = ss.getRange(1, 1, arr_list.length, arr_list[0].length);
  range_start.setValues(arr_list);
}

function TableCreativeApiBlacklist(ss){
  const response = UrlFetchApp.fetch('http://45.155.120.86/index.php?r=keitaro/tableblacklistgooglecreative&token=pcK4fQ3PgqEnZeqwZ6pfgqmC59U7jX6RK3G3zPgfyfQPqUSv'); 
  const content = response.getContentText();
  const result = JSON.parse(content); 

  const arr_list = [];
  const tmp = [];

  arr_list.push(['Объявления']);

  result.forEach(function(value){
    arr_list.push([value]);
  })

  var range_start = ss.getRange(1, 1, arr_list.length, arr_list[0].length);
  range_start.setValues(arr_list);
}

function onOpen(){
  var MySpreadSheet = SpreadsheetApp.getActive();
  MySpreadSheet.addMenu("Данные Api",[
  {name: "Обновить данные", functionName: "Api"},
  {name: "Обновить чёрный список", functionName: "Blacklist"}
  ]);
}
