'use strict'
{const today=new Date();
    
    let year=today.getFullYear();

    let month=today.getMonth();

    function getCalendarHead(){
        const dates=[]

        const d= new Date(year,month,0).getDate();
        const n= new Date(year,month,1).getDay();

        for (let index = 0; index < n; index++){
            dates.unshift({
                date:d-index,
                 isToday:false,
                 isDisabled:true,
            })
        }
        return dates;
    }

    function getCalendarBody(){
         const dates=[];

         const lastDate = new Date(year,month+1,0).getDate();

         for (let index = 1; index <=lastDate; index++) {
             dates.push({
                 date:index,
                 isToday:false,
                 isDisabled:false,
});
         }
    if(year===today.getFullYear() && month===today.getMonth()){
        dates[today.getDate()-1].isToday=true;
    
    }
         return dates;

    }

    function getCalendarTail(){
        const dates=[];
        const lastDay=new Date(year,month+1,0).getDay();

        for(let index = 1; index <7-lastDay; index++){
            dates.push({
                date:index,
                isToday:false,
                isDisabled:true,
            }
                );
        }
        return dates;
    }
    function clearcalender(){
        const tbody=document.querySelector("tbody");
        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild);
        }}

    //先月のカレンダーを消す

    function rendertitle(){
        const title=`${year}/${String(month+1).padStart(2,0)};`
        document.getElementById('title').textContent=title;
    }//タイトルをつける
    
    function renderweek(){
        const dates=[
            ...getCalendarHead(),
            ...getCalendarBody(),
            ...getCalendarTail(),
        ];

        const weeks=[];
        const weekCount = dates.length/7;

        for(let index=0; index<weekCount;index++){
          weeks.push(dates.splice(0,7));
        }
          weeks.forEach(week=>{
            const tr = document.createElement('tr');
              week.forEach(date=>{
                  const td=document.createElement('td');
　　　　　　　　td.textContent=date.date
if(date.isToday){
    td.classList.add("Today");
}
if(date.isDisabled){
    td.classList.add("Disabled");
}
tr.appendChild(td);

              });
              document.querySelector('tbody').appendChild(tr);
          });
          
          }//週毎に分ける
    

    function createCalendar(){
        clearcalender();
        renderweek();
        rendertitle();
        
        }

        
document.getElementById('prev').addEventListener("click",()=>{
month--;
if(month<0){
    year--;
    month=11;
}
createCalendar();


});
document.getElementById('next').addEventListener("click",()=>{
month++;
if(month>11){
    year++;
    month=0;
}
createCalendar();

});
document.getElementById('today').addEventListener("click",()=>{
year=today.getFullYear();
month=today.getMonth();
createCalendar();

});

    createCalendar();
    console.log(dates);
}